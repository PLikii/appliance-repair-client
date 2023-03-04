import OrdersList from "../../components/ordersList/OrdersList";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import OrdersItemActiveOrder from "../../components/ordersList/OrdersItemActiveOrder";
import OrdersActive from "../../components/maneger/OrdersActive";
import { useNavigate } from "react-router-dom";

function ActiveOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [reload, setIsReload] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:5000/order", {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        setOrders(res.data);
        if (id === "0")
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
        <OrdersList
          data={orders}
          item={<OrdersItemActiveOrder />}
          link="http://localhost:5173/сreateOrder"
          find={true}
        />
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
