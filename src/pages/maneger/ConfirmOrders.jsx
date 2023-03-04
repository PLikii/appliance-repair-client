import React from "react";
import OrdersList from "../../components/ordersList/OrdersList";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import OrderConfirm from "../../components/maneger/OrderConfirm";
import OrdersItemConfirmationOrders from "../../components/ordersList/OrdersItemConfirmationOrders";

function ConfirmOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [reload, setIsReload] = useState(false);

  useEffect(() => {
    const fetchUnconfirmedOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/order/unconfirmedOrder",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
          }
        );
        setOrders(response.data);
      } catch (error) {
        toast.error("Схоже виникла проблема", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnconfirmedOrders();
  }, [reload]);

  if (isLoading) return <Loading text="Замовлення створюється" />;
  if (orders.length === 0) {
    return (
      <div>
        <div className=" text-3xl p-40 ">
          Схоже немає замовлень які б потребували підтвердження
        </div>

        <a
          className=" mx-32 py-3 px-5 flex gap-2 items-center justify-center duration-300  rounded-lg  cursor-pointer bg-gray  hover:scale-105 active:bg-blue"
          href="http://localhost:5173/сreateOrder"
          target="_blank"
        >
          Створити замовлення
        </a>
      </div>
    );
  }
  return (
    <div className=" flex space-x-5">
      <div>
        <OrdersList
          data={orders}
          item={<OrdersItemConfirmationOrders />}
          link="http://localhost:5173/сreateOrder"
          find={true}
        />
      </div>
      <div>
        <OrderConfirm
          orders={orders}
          setIsReload={setIsReload}
          reload={reload}
        />
      </div>
    </div>
  );
}

export default ConfirmOrders;
