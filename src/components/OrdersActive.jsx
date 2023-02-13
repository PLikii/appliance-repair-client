import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import Loading from "./Loading";

function OrdersActive({ orders, setIsReload, reload }) {
  const [isLoading, setIsLoading] = useState(false);
  const [worker, setWorker] = useState({ name_surname: "" });
  const { id } = useParams();
  const order = orders.find((e) => e._id.$oid === id);

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
    <div className=" text-xl space-y-6  min-w-[850px] fixed  overflow-y-clip">
      <div className="flex w-full justify-around py-2">
        <div className=" cursor-pointer">
          <FiEdit3 size={30} />
        </div>
        <div className=" text-center">ID: {order._id.$oid}</div>
        <div className=" cursor-pointer" onClick={deleteOrder}>
          <AiOutlineDelete size={30} />
        </div>
      </div>

      <div className=" flex justify-center">
        Статус : <p className=" pl-2 text-yellow"> Очікує підтвердження</p>
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

      <ul class="list-disc space-y-3">
        <div className="  space-y-3 items-center">
          <div>Витрати:</div>
        </div>

        <li
          className={`ml-5 ${
            order.accessories.length >= 2 ? " overflow-y-scroll h-28" : ""
          }`}
        >
          {order.accessories.map((e) => {
            return (
              <div className=" flex space-x-2  items-center">
                <div>{e.name} </div>
                <div>-</div>
                <div>{e.price} $</div>
              </div>
            );
          })}
        </li>
      </ul>
      <div className="  py-5 space-x-2 flex">
        <div>Опис проблеми:</div>
        <div>{order.description}</div>
      </div>
    </div>
  );
}

export default OrdersActive;
