import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import Loading from "../Loading";

function OrdersActive({ orders, setIsReload, reload }) {
  const [isLoading, setIsLoading] = useState(false);
  const [worker, setWorker] = useState({ name_surname: "" });
  const { id } = useParams();
  const order = orders.find((e) => e._id.$oid === id);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    axios
      .post("http://127.0.0.1:5000/workers/byID", {
        id: order.id_worker.$oid,
      })
      .then((res) => {
        setWorker(res.data);
      })
      .catch((e) => {
        toast.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  function deleteOrder() {
    var answer = window.confirm("Видалити замовлення");
    if (answer) {
      setIsLoading(true);
      axios
        .post(
          "http://127.0.0.1:5000/order/delete",
          { id: order._id.$oid },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
          }
        )
        .then((res) => {
          if (res.data === "confirm") {
            toast.success("Замовлення успішно підтверджене");
            setIsReload(!reload);
            navigate("/manager/activeOrders/0");
            window.location.reload(false);
          }
        })
        .catch((e) => {
          alert(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }
  if (isLoading) return <Loading text="" />;

  return (
    <div className=" text-xl space-y-6  min-w-[850px] fixed  overflow-y-clip  border-l-2 border-gray h-screen pl-4">
      <div className="flex w-full justify-around py-2">
        <div></div>
        <div className=" text-center">ID: {order._id.$oid}</div>
        <div className=" cursor-pointer" onClick={deleteOrder}>
          <AiOutlineDelete size={30} />
        </div>
      </div>

      <div className=" flex justify-center">
        Статус : <p className=" pl-2 text-yellow">{order.status}</p>
      </div>

      <a href={`http://localhost:5173/manager/workers/${order.id_worker.$oid}`}>
        Технік: {worker.name_surname}
      </a>
      <div className=" flex justify-between ">
        <div>Дата: {order.date}</div>
        <div>Час виконання: {order.time}</div>
      </div>

      <div className=" flex justify-between">
        <div>Клієнт: {order.customer_name}</div>
        <div>Мобільний номер : {order.customer_namber}</div>
      </div>

      <div className=" flex justify-between">
        <div>Адрес: {order.customer_adres}</div>
        <div>Тип техніки : {order.technic_type}</div>
      </div>
      <div>Вартість роботи : {order.сost_work}</div>
      <div className="list-disc space-y-3">
        <div className="  space-y-3 items-center">
          <div>Витрати:</div>
        </div>

        <div
          className={`ml-5 ${
            order.accessories.length >= 2
              ? " overflow-y-scroll space-y-5 h-28"
              : ""
          }`}
        >
          {order.accessories.map((e, key) => {
            return (
              <div key={key} className=" flex space-x-2  items-center">
                <div>{e.name}</div>
                <div>-</div>
                <div>{e.price} $</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="  py-5 space-x-2 flex">
        <div>Опис проблеми:</div>
        <div>{order.description}</div>
      </div>
    </div>
  );
}

export default OrdersActive;
