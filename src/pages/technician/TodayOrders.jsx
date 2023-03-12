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
        if (res.data.length === 0) {
          return toast.success("Схоже немає замовлень");
        }
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

  return (
    <div className=" w-screen flex">
      <div>{width > 1500 ? <div className=" w-96">{sidebar}</div> : ""}</div>
      <div className=" h-screen ">
        <div>
          {width < 1500 ? <BackHeader link="/technician/sidebar" /> : ""}
        </div>

        {orders.length !== 0 ? (
          <OrdersList
            data={orders}
            item={<OrdersItemTodayOrders link="/technician/todayOrders/" />}
            link="http://localhost:5173/сreateOrder"
            find={true}
          />
        ) : (
          <div className=" text-3xl  pt-20 px-3">Схоже немає замовлень</div>
        )}
      </div>
      <div className=" w-full">
        {orders.length !== 0 ? (
          width > 768 ? (
            <ViewOrder
              orders={orders}
              width={width}
              link="/technician/todayOrders/"
            />
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TodayOrders;
