import OrdersList from "../../components/ordersList/OrdersList";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import OrdersItemActiveOrder from "../../components/ordersList/OrdersItemActiveOrder";
import OrdersActive from "../../components/OrdersActive";
import { useNavigate } from "react-router-dom";

function ActiveOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [reload, setIsReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    toast("Замовлення завантажеються");
    axios
      .get("http://127.0.0.1:5000/order", {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        setOrders(res.data);
        navigate(`/manager/activeOrders/${res.data[0]._id.$oid}`);
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
    return <div className=" text-3xl p-40">Схоже немає замовлень</div>;
  }

  return (
    <div className=" flex space-x-5">
      <div>
        <OrdersList orders={orders} item={<OrdersItemActiveOrder />} />
      </div>
      <div>
        <OrdersActive
          orders={orders}
          setIsReload={setIsReload}
          reload={reload}
        />
      </div>
    </div>
  );
}

export default ActiveOrders;
