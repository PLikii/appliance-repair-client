import React from "react";
import OrdersList from "../../components/ordersList/OrdersList";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import OrderConfirm from "../../components/OrderConfirm";

function ConfirmOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [reload, setIsReload] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    toast("Замовлення завантажеються");
    axios
      .get("http://127.0.0.1:5000/order/unconfirmedOrder", {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((e) => {
        toast.error("Схоже виникла проблема", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reload]);

  if (isLoading) return <Loading text="Замовлення створюється" />;
  if (orders.length === 0) {
    return (
      <div className=" text-3xl p-40">
        Схоже немає замовлень які б потребували підтвердження
      </div>
    );
  }
  return (
    <div className=" flex space-x-5">
      <div>
        <OrdersList orders={orders} />
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
