import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loading";
import ItemOrder from "../statisticsItem/ItemOrder";

function TechnicianOrders({ worker }) {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:5000/worker/${worker._id.$oid}/orders`, {
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
  }, [worker]);

  if (isLoading) return <Loading text="" />;
  return (
    <div className="grid grid-cols-2 place-items-center overflow-y-scroll gap-2 h-[360px]">
      {orders.map((item, index) => {
        return <ItemOrder key={index} data={item} />;
      })}
    </div>
  );
}

export default TechnicianOrders;
