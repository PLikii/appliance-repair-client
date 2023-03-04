import Loading from "../../components/Loading";
import BackHeader from "../../components/technician/BackHeader";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function OrderView({ sidebar }) {
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState({ name_surname: "" });
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://127.0.0.1:5000/orders/${id}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((e) => {
        toast.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading text="" />;

  return (
    <div className=" w-screen flex">
      <div>{width > 768 ? <div className=" w-96">{sidebar}</div> : ""}</div>
      <div className=" w-full">
        <div className=" ">
          {width < 768 ? <BackHeader link="/technician/statistics/0" /> : ""}
        </div>
        <div className=" px-5 w-full py-10">
          <div className="">
            <div className=" flex justify-center space-x-3 text-center">
              <div>ID: </div>
              <div>{order._id.$oid}</div>
            </div>

            <div className=" flex space-x-3">
              <div>Статус: </div>
              <div>{order.status}</div>
            </div>

            <div className=" flex space-x-3">
              <div>Адрес: </div>
              <div>{order.customer_adres}</div>
            </div>

            <div className=" flex space-x-3">
              <div>Тип техніки: </div>
              <div>{order.technic_type}</div>
            </div>

            <div className=" flex space-x-3">
              <div>Замовник: </div>
              <div>{order.customer_name}</div>
            </div>

            <div className=" flex space-x-3">
              <div>Опис: </div>
              <div>{order.description}</div>
            </div>

            <div className=" flex justify-around">
              <div className=" flex space-x-3">
                <div>Дата : </div>
                <div>{order.date}</div>
              </div>{" "}
              <div className=" flex space-x-3">
                <div>Час: </div>
                <div>{order.time}</div>
              </div>
            </div>
            <div className=" flex space-x-3">
              <div>Вартість роботи: </div>
              <div>{order.сost_work}</div>
            </div>
            <div>
              <div>Комплектуючі:</div>
              {order.accessories.map((item, key) => {
                return (
                  <div key={key}>
                    <div>{item.name}</div> <div>{item.price}</div>{" "}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderView;
