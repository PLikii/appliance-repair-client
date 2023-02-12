from flask import Flask, Response, request, redirect, jsonify, make_response
from bson.json_util import dumps
from pymongo import MongoClient
from bson.objectid import ObjectId
import pprint
import urllib
import hashlib
from flask_cors import CORS
import secrets
client = MongoClient('localhost', 27017)
db = client.local
workers = db.workers
orders = db.orders


def addWorker(worker):
    worker_id = workers.insert_one(worker).inserted_id
    print(worker_id)


def getOWorkersFormId(id):
    return workers.find_one({'_id': ObjectId(id)})


def addOrder(order):
    order_id = orders.insert_one(order).inserted_id
    print(order_id)


def getOrders():
    return dumps(orders.find(), ensure_ascii=False)


def getOrdersFormId(id):
    return orders.find_one({'_id': ObjectId(id)})


def checkKey(request):
    try:
        headers = request.headers
        bearer = headers.get('Authorization')
        token = bearer.split()[1]
    except:
        token = None

    if not token:
        return "user not login"

    if not workers.find_one({"key": token}):
        return "invalid key"


app = Flask(__name__)
CORS(app)


@ app.route("/")
def main():
    return Response(dumps({"status": "200"}, ensure_ascii=False))

# Order #

# створити замовелння


@ app.route("/user", methods=['GET'])
def getUser():
    headers = request.headers
    bearer = headers.get('Authorization')
    key = bearer.split()[1]
    print("/user  ok", key)
    print(request.method)
    user = workers.find_one({"key": key})
    print("/user  ok", key)
    return Response(dumps(user, ensure_ascii=False))


@ app.route("/workers/technician", methods=['GET'])
def getWorkers():

    print("/workers/technician  OK")
    return Response(dumps(workers.find(
        {"job_title": "technician"}), ensure_ascii=False))

# створити замовелння


@ app.route("/workers/day/orders", methods=['POST'])
def dayOrder():
    time = [
        "8:00 - 9:00",
        "9:30 - 10:30",
        "11:00 - 12:00",
        "13:00 - 14:30",
        "15:00 - 16:00",
        "16:30 - 17:30",
        "18:00 - 19:00",
    ]
    id_worker = request.json["id"]
    date = request.json["date"]
    results = orders.find({"id_worker": ObjectId(id_worker), "date": date})
    for ti in time:
        for result in results:
            if result["time"] == ti:
                time.remove(ti)
                print(ti)
    print(time)

    return Response(dumps(time))


@ app.route("/order", methods=['POST', 'GET', 'DELETE'])
def createOrder():
    print(request.method)
    print("order")

    if request.method == 'GET':
        if not checkKey(request):
            print("/order  GET OK")
            return Response(getOrders())

        return Response(checkKey(request))
    if request.method == 'POST':
        addOrder(request.json["data"])
        return Response("confirm")

    if request.method == 'DELETE':
        if checkKey(request):
            return Response(checkKey(request))
        print((request.json))
        orders.delete_one({"_id": getOrdersFormId(request.json["_id"])})
        return Response("confirm")

    return Response("error")


@ app.route("/order/active", methods=['GET'])
def activeOrder():

    if request.method == 'GET':
        if checkKey(request):
            return Response(checkKey(request))

        orderExecuted = orders.find({"status": "Виконується"})
        orderDiagnostics = orders.find(
            {"status": {"$in": ["Діагностика", "Виконується"]}})
        orderActive = orderDiagnostics
        return Response(dumps(orderActive))

    return Response("error")


@ app.route("/order/delete", methods=['POST'])
def deleteOrder():
    print(request.method)
    print(request.json)

    orders.delete_one({"_id": ObjectId(request.json["id"])})
    return Response("confirm")


@ app.route("/order/unconfirmedOrder", methods=['GET'])
def getUnconfirmedOrder():
    print(request.method)
    if checkKey(request):
        return Response(checkKey(request))

    if request.method == 'GET':
        if not checkKey(request):
            print("/order/unconfirmedOrder   OK")
            return Response(dumps(orders.find({"status": "Очікує підтвердження"}), ensure_ascii=False))

        return Response(checkKey(request))

    print("/order/unconfirmedOrder    ERROR")
    return Response("error")


# оновии замовелння


@ app.route("/order/update", methods=['POST'])
def updateOrder():
    if checkKey(request):
        return Response(checkKey(request))

    json = request.json
    order_id = json["order_id"]["$oid"]
    order = getOrdersFormId(order_id)

    if json["parameter_name"] == "id_worker":
        order[json["parameter_name"]] = json["new_walue"]
        orders.update_one({'_id': ObjectId(order_id)}, {
            "$set": {json["parameter_name"]: ObjectId(order[json["parameter_name"]])}})
        return Response("successfully")
    else:
        order[json["parameter_name"]] = json["new_walue"]
        print(order[json["parameter_name"]])
        orders.update_one({'_id': ObjectId(order_id)}, {
            "$set": {json["parameter_name"]: order[json["parameter_name"]]}})
        return Response("successfully")

    return Response("error")


# /order/confirm"
@ app.route("/order/confirm", methods=['POST'])
def confirmOrder():
    print(request.json)
    if checkKey(request):
        return Response(checkKey(request))

    orders_id = ObjectId(request.json["id"])
    date = request.json["date"]
    time = request.json["time"]

    worker_id = request.json["worker"]

    orders.update_one({"_id": orders_id}, {
        "$set": {"date": date}})

    orders.update_one({"_id": orders_id}, {
        "$set": {"id_worker": ObjectId(worker_id)}})

    orders.update_one({"_id": orders_id}, {
        "$set": {"status": "Діагностика"}})

    orders.update_one({"_id": orders_id}, {
        "$set": {"time": time}})

    return Response("confirm")


# витрати на росхоники
@ app.route("/order/accessories", methods=['POST', 'DELETE'])
def accessoriesOrder():
    if checkKey(request):
        return Response(checkKey(request))

    json = request.json
    order_id = json["order_id"]["$oid"]
    order = getOrdersFormId(order_id)

    if request.method == 'POST':
        order["accessories"] = order["accessories"] + json["accessories"]

        orders.update_one({'_id': ObjectId(order_id)}, {
            "$set": {"accessories": order["accessories"]}})
        return Response("successfully")

    if request.method == 'DELETE':
        order["accessories"].pop(json["accessories_id"])

        orders.update_one({'_id': ObjectId(order_id)}, {
            "$set": {"accessories": order["accessories"]}})
        return Response("successfully")

    return Response("error")


# log in
@ app.route("/login", methods=['GET', 'POST'])
def logIn():
    json = request.json
    login = json["data"]["login"]
    password = json["data"]["password"]

    user = workers.find_one({"login": login, "password": password})
    key = secrets.token_urlsafe(16)

    workers.update_one({"login": login, "password": password}, {
        "$set": {"key": key}})
    user = workers.find_one({"login": login, "password": password})
    if not user:
        print("/login ERROR")
        return Response("error")
    print("/logi GET OK ", user)
    return Response(dumps(user))


if __name__ == "__main__":
    app.run(host='0.0.0.0')
