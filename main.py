from flask import Flask, Response, request, redirect, jsonify, make_response
from bson.json_util import dumps
from pymongo import MongoClient
from bson.objectid import ObjectId
import urllib
import hashlib
from flask_cors import CORS
import secrets
from datetime import date
from bson.objectid import ObjectId
from datetime import datetime
import pymongo


# Підключення до бази даних
client = MongoClient('localhost', 27017)
db = client.local
workers = db.workers
orders = db.orders
losses = db.losses


# Створення Flask додатку та налаштування CORS
app = Flask(__name__)
CORS(app)


def check_key(request):
    token = None
    try:
        headers = request.headers
        bearer = headers.get('Authorization')
        token = bearer.split()[1]
    except:
        pass

    if not token:
        return "Authorization required", 401

    if not workers.find_one({"key": token}):
        return "Invalid key", 401


@ app.route("/")
def main():
    return Response(dumps({"status": "200"}, ensure_ascii=False))


@ app.route("/getStats", methods=['GET'])
def getStat():
    if check_key(request):
        return Response(check_key(request))

    losses_data = list(losses.find())
    orders_data = list(orders.find({"status": "Закінчене"}))
    workers_data = list(workers.find())

    data = losses_data + orders_data

    current_month = datetime.now().month

    data = filter(lambda x: datetime.strptime(
        x['date'], '%Y-%m-%d').month == current_month, data)
    data = list(
        sorted(data, key=lambda x: datetime.strptime(x["date"], '%Y-%m-%d')))

    data += workers_data
    expenses = 0
    revenue = 0

    for item in data:
        if "loss" in item:
            expenses += int(item["loss"])
        if "accessories" in item:
            for accessory in item["accessories"]:
                expenses += int(accessory["price"])
        if "сost_work" in item:
            revenue += int(item["сost_work"])
        if "solary" in item:
            expenses += int(item["solary"])

    return Response(dumps({"data": data, "expenses": expenses, "revenue": revenue}, ensure_ascii=False))


@ app.route("/technician/Stats/<string:worker_id>", methods=['GET'])
def technicianStats(worker_id):

    worker = workers.find_one({'_id': ObjectId(worker_id)})
    if worker is None:
        return Response("error")

    orderlist = list(orders.find(
        {"id_worker": ObjectId(worker_id), "status": "Закінчене"}))

    expenses = 0
    revenue = 0

    for item in orderlist:
        if "loss" in item:
            expenses += int(item["loss"])
        if "accessories" in item:
            for accessory in item["accessories"]:
                expenses += int(accessory["price"])
        if "сost_work" in item:
            revenue += int(item["сost_work"])
        if "solary" in item:
            expenses += int(item["solary"])

    # повертаємо інформацію про робітника та його замовлення
    return Response(dumps({
        'salary': worker['solary'],
        'expenses': expenses,
        'revenue': revenue,
        'orders': orderlist
    }, ensure_ascii=False))


@ app.route("/loss", methods=['GET', 'POST'])
def lossess():
    if request.method == 'GET':
        losses_list = list(losses.find())
        return Response(dumps(losses_list, ensure_ascii=False))

    if request.method == 'POST':
        losses.insert_one(request.json)
        return Response("confirm")

    return Response("error: unsupported HTTP method")


@ app.route("/user", methods=['GET'])
def getUser():
    headers = request.headers
    bearer = headers.get('Authorization')
    key = bearer.split()[1]
    user = workers.find_one({"key": key})
    if not user:
        return Response("User not found", status=404)
    return Response(dumps(user, ensure_ascii=False))


@ app.route("/workers", methods=['GET', 'POST'])
def workerss():
    if request.method == 'GET':
        workers_data = list(workers.find())
        return Response(dumps(workers_data, ensure_ascii=False))

    if request.method == 'POST':
        workers.insert_one(request.json)
        return Response("confirm")

    return Response("error: unsupported HTTP method")


@app.route('/worker/<string:worker_id>/orders', methods=['GET'])
def get_orders(worker_id):
    orders_list = orders.find({'id_worker':  ObjectId(worker_id)})
    return Response(dumps(orders_list, ensure_ascii=False))


@app.route('/worker/<string:id>', methods=['DELETE'])
def delete_orders(id):
    workers.delete_one({"_id": ObjectId(id)})
    return Response("confirm")


@ app.route("/workers/technician", methods=['GET'])
def getWorkers():
    technicians_data = list(workers.find({"job_title": "technician"}))
    return Response(dumps(technicians_data, ensure_ascii=False))


@ app.route("/workers/byID", methods=['POST'])
def getWorkersByID():
    worker_id = request.json.get("id")
    if not worker_id:
        return Response("Invalid worker ID", status=400)
    worker = workers.find_one({"_id": ObjectId(worker_id)})
    if not worker:
        return Response("Worker not found", status=404)
    return Response(dumps(worker, ensure_ascii=False))


@ app.route("/workers/todayOrders/<string:id>", methods=['GET'])
def todayOrders(id):

    today = date.today()
    today = today.strftime('%Y-%m-%d')
    results = orders.find({"id_worker": ObjectId(id), "date": today})

    def extract_time_range(time_range):
        start, end = time_range.split(" - ")
        return int(start.split(":")[0]), int(end.split(":")[0])

    results = sorted(results, key=lambda x: extract_time_range(x["time"]))

    return Response(dumps(results, ensure_ascii=False))


@ app.route("/workers/future/orders/<string:id>", methods=['GET'])
def futureOrders(id):
    today = datetime.today().strftime('%Y-%m-%d')
    results = orders.find({"id_worker": ObjectId(id), "date": {"$gte": today}})
    return Response(dumps(results, ensure_ascii=False))


@ app.route("/orders/<string:id>", methods=['GET'])
def ordersFindOne(id):
    results = orders.find_one({"_id": ObjectId(id)})
    return Response(dumps(results, ensure_ascii=False))


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
    for e in results:
        time.remove(e["time"])

    return Response(dumps(time))


@app.route("/workers/continue/order", methods=['POST'])
def continue_order():
    data = request.json
    order_id = data.get("id")
    order_date = data.get("date")
    order_time = data.get("time")

    result = orders.update_one({"_id": ObjectId(order_id)}, {
                               "$set": {"date": order_date, "time": order_time, "status": "Продовження"}})

    if result.modified_count > 0:
        return Response("confirm")
    return Response("error")


@ app.route("/order", methods=['POST', 'GET', 'DELETE'])
def createOrder():
    # повернути список замовлень зі статусом "Діагностика", "Продовження" або "Закінчене"
    if request.method == 'GET':
        if check_key(request):
            return Response(check_key(request))
        return Response(dumps(orders.find({"status": {"$in": ["Діагностика", "Продовження", "Закінчене"], }}), ensure_ascii=False))

    # створити нове замовлення та повернути підтвердження
    if request.method == 'POST':
        orders.insert_one(request.json["data"]).inserted_id
        return Response("confirm")

    # идалити замовлення за вказаним ідентифікатором та повернути підтвердження
    if request.method == 'DELETE':
        if check_key(request):
            return Response(check_key(request))
        order_id = request.json.get("_id")
        if order_id:
            orders.delete_one({"_id": ObjectId(order_id)})
            return Response("confirm")
        else:
            return Response("error: no order ID provided")

    return Response("error: unsupported HTTP method")


@ app.route("/order/active", methods=['GET'])
def activeOrder():
    if check_key(request):
        return Response(check_key(request))

    # Знайти замовлення зі статусом "Продовження" або "Діагностика" та повернути їх у відповіді
    orderExecuted = orders.find({"status": "Продовження"})
    orderDiagnostics = orders.find(
        {"status": {"$in": ["Діагностика", "Продовження"]}})
    orderActive = orderDiagnostics
    return Response(dumps(orderActive))


@ app.route("/order/сomplete/<string:order_id>/<string:cost>", methods=['GET'])
def completeOrder(order_id, cost):
    if check_key(request):
        return Response(check_key(request))

    # Знаходження замовлення з вказаним ідентифікатором
    order = orders.find_one({"_id": ObjectId(order_id)})
    if order is None:
        return f"Замовлення з ідентифікатором {order_id} не знайдено", 404

    if order.get("status") == "Закінчене":
        return f"Замовлення з ідентифікатором {order_id} вже має статус 'Закінчене'", 200

    # Оновлення поля "status" замовлення на "Закінчене"
    result = orders.update_one(
        {"_id": ObjectId(order_id)}, {"$set": {"status": "Закінчене", "сost_work": cost}})

    if result.modified_count == 1:
        # Додавання половини cost до зарплати робітника, який виконав замовлення
        worker_id = order.get("id_worker")
        worker = workers.find_one({"_id": ObjectId(worker_id)})

        if worker is None:
            return f"Робітника з _id {worker_id} не знайдено", 200
        else:
            current_salary = worker.get("solary")
            new_salary = float(current_salary) + float(cost) / 2
            result = workers.update_one(
                {"_id": ObjectId(worker_id)}, {"$set": {"solary": new_salary}})
            if result.modified_count == 1:
                return f"Замовлення з ідентифікатором {order_id} відзначено як завершене. Зарплата робітника з id_worker {worker_id} збільшена на половину вартості замовлення", 200
            else:
                return "Не вдалося оновити зарплату робітника", 200
    else:
        return "Не вдалося оновити статус замовлення", 200


@ app.route("/order/delete", methods=['POST'])
def deleteOrder():
    orders.delete_one({"_id": ObjectId(request.json["id"])})
    return Response("confirm")


@ app.route("/order/unconfirmedOrder", methods=['GET'])
def getUnconfirmedOrder():
    if check_key(request):
        return Response(check_key(request))

    unconfirmedOrders = orders.find({"status": "Очікує підтвердження"})
    return Response(dumps(unconfirmedOrders, ensure_ascii=False))


@ app.route("/order/update", methods=['POST'])
def updateOrder():
    if check_key(request):
        return Response(check_key(request))

    json = request.json
    order_id = json["order_id"]["$oid"]

    # Пошук замовлення в базі даних за заданим ID
    order = orders.find_one({'_id': ObjectId(order_id)})

    parameter_name = json["parameter_name"]
    new_value = json["new_value"]

    # Оновити параметр замовлення в базі даних
    orders.update_one(
        {'_id': ObjectId(order_id)},
        {'$set': {parameter_name: ObjectId(new_value)} if parameter_name == 'id_worker' else {
            parameter_name: new_value}}
    )

    return Response("successfully")


@ app.route("/order/confirm", methods=['POST'])
def confirmOrder():
    if check_key(request):
        return Response(check_key(request))

    orders_id = ObjectId(request.json["id"])
    date = request.json["date"]
    time = request.json["time"]
    worker_id = request.json["worker"]

  # Оновити замовлення з новою датою, часом, ідентифікатором робітника та статусом
    orders.update_one({"_id": orders_id}, {"$set": {
                      "date": date, "time": time, "id_worker": ObjectId(worker_id), "status": "Діагностика"}})

    return Response("confirm")


@app.route('/orders/<string:order_id>/accessories', methods=['POST', 'DELETE'])
def add_accessory(order_id):
    order = orders.find_one({'_id': ObjectId(order_id)})
    if not order:
        return {'error': 'Order not found'}, 404

    if request.method == 'DELETE':
        print(request.json)

        index = request.json['index']

        # Перевірити, чи існує елемент з таким індексом у списку accessories замовлення
        if not (0 <= index < len(order['accessories'])):
            return {'error': f'Index {index} is out of range for accessories in order'}, 404

        # Видалити елемент зі списку accessories замовлення
        del order['accessories'][index]

        # Оновити замовлення в MongoDB та перевірити успішність оновлення
        result = orders.update_one({'_id': ObjectId(order_id)}, {
                                   '$set': {'accessories': order['accessories']}})
        if result.modified_count < 1:
            return {'error': 'Failed to update order'}, 500

        return dumps({'order': order}), 200

    elif request.method == 'POST':
        name = request.json['data']['name']
        price = request.json['data']['price']
        if not name or not price:
            return {'error': 'Invalid accessory data'}, 400

        # Додати новий елемент до списку accessories
        new_accessory = {'name': name, 'price': price}
        order['accessories'].append(new_accessory)

        # Оновити замовлення в MongoDB
        orders.update_one({'_id': ObjectId(order_id)}, {
                          '$set': {'accessories': order['accessories']}})

        return dumps({'order': order}), 200


@ app.route("/login", methods=['GET', 'POST'])
def logIn():
    json = request.json
    login = json["data"]["login"]
    password = json["data"]["password"]

    # шукаємо користувача в базі даних
    user = workers.find_one({"login": login, "password": password})

    # якщо користувач не знайдений, повертаємо відповідь з помилкою
    if not user:
        return Response("error")

    # генеруємо токен для аутентифікації користувача
    key = secrets.token_urlsafe(16)

    # зберігаємо токен у базі даних
    workers.update_one({"login": login, "password": password}, {
        "$set": {"key": key}})
    user = workers.find_one({"login": login, "password": password})

    if not user:
        return Response("error")
    return Response(dumps(user))


if __name__ == "__main__":
    app.run(host='0.0.0.0')
