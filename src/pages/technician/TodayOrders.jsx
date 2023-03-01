import React, { useContext, useEffect, useState } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OrdersList from "../../components/ordersList/OrdersList";
import OrdersItemTodayOrders from "../../components/ordersList/OrdersItemTodayOrders";
import ViewOrder from "../../components/technician/ViewOrder";
import { AuthContext } from "../../context/AuthContext";
import BackHeader from "../../components/technician/BackHeader";

function TodayOrders({ sidebar }) {
  const { profile } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:5000/workers/todayOrders/${profile._id.$oid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        setOrders(res.data);
        if (width > 640) {
          if (id === "0")
            navigate(`/technician/todayOrders/${res.data[0]._id.$oid}`);
        }
      })
      .catch((e) => {
        toast.error("Схоже виникла проблема", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;
  if (orders.length === 10) {
    return <div className=" text-3xl p-40">Схоже немає замовлень</div>;
  }
  return (
    <div className=" w-screen flex">
      <div>{width > 640 ? <div className=" w-96">{sidebar}</div> : ""}</div>
      <div className=" ">
        <div>
          {width < 640 ? <BackHeader link="/technician/sidebar" /> : ""}
        </div>

        <OrdersList data={orders} item={<OrdersItemTodayOrders />} link="" />
      </div>
      <div className=" w-full">
        {width > 640 ? <ViewOrder orders={orders} /> : ""}
      </div>
    </div>
  );
}

export default TodayOrders;
