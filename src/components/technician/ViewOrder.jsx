import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import axios from "axios";
import toast from "react-hot-toast";
import AccessoriesItem from "./AccessoriesItem";
import { useFormik } from "formik";
import BackHeader from "./BackHeader";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function ViewOrder({ orders }) {
  const link = window.location.pathname;
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [order, setOrder] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [cost, setCost] = useState(0);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    if (!orders) {
      fetchOrder();
    } else {
      setOrder(orders.find((order) => order._id.$oid === id));
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const s = link.substring(0, link.lastIndexOf("/") + 1);
    if (s === "/technician/todayOrders/") {
      if (width > 768) navigate(`/technician/todayOrders/${id}`);
    } else {
      if (width > 768) navigate(`/technician/future/orders/${id}`);
    }
  }, [width]);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
    },

    onSubmit: async (values) => {
      const data = {
        name: values.name,
        price: values.price,
      };

      if (!data.name) {
        return toast.error("Ви не увели назву");
      }
      if (!data.price) {
        return toast.error("Ви не увели вартість");
      }

      setIsLoading(true);
      await axios
        .post(`http://127.0.0.1:5000/orders/${id}/accessories`, {
          data,
        })
        .then(() => {
          toast.success("Успішно додано");
          fetchOrder();
        })
        .catch((e) => {
          toast.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  function сompleteOrder() {
    const answer = window.confirm("Завершити замовлення");
    if (!answer) {
      return;
    }

    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:5000/order/сomplete/${id}/${cost}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
        window.location.reload();
      });
  }

  if (isLoading) return <Loading text="" />;
  return (
    <div className=" flex  text-2xl md:text-base p-2 space-y-6 md:px-5 border-l-2 border-gray h-screen  ">
      <div className=" w-full">
        <div className=" flex justify-around md:py-5">
          <div>{order.status}</div>
          <div></div>
          <div className=" w-[200px] truncate">id: {order._id.$oid}</div>
        </div>

        <div className=" md:flex justify-between">
          <div className="py-2 border-y-4 border-gray  space-y-3">
            <div>Адрес: {order.customer_adres}</div>
            <div>Клієнт: {order.customer_name}</div>
            <div>Мобільний номер: {order.customer_namber}</div>
            <div>Тип техніки: {order.technic_type}</div>
            <div>Опис: {order.description}</div>
          </div>

          <div>
            <div className=" text-center text-4xl pt-4">Компектуючі</div>
            {order.accessories.map((e, key) => (
              <AccessoriesItem
                name={e.name}
                price={e.price}
                key={key}
                index={key}
                id={id}
                fetchOrder={fetchOrder}
              />
            ))}
          </div>
        </div>

        <div className=" 2xl:flex justify-between  gap-10 lg:mb-0">
          <div className=" flex justify-center pt-5 text-center">
            <form onSubmit={formik.handleSubmit} className=" space-y-8 ">
              <div className=" text-left space-y-3">
                <div>Назва</div>
                <input
                  className=" w-64 md:w-96 bg-dark py-2 px-3 rounded-lg "
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Назва"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>

              <div className=" text-left space-y-3">
                <div>Ціна</div>
                <input
                  className=" w-64 md:w-96 bg-dark py-2 px-3 rounded-lg "
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Ціна"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
              </div>

              <button
                className=" py-4 px-7 text-lg  border-4 border-blue border-double rounded-lg transition duration-300 hover:scale-105"
                type="submit"
              >
                Додати
              </button>
            </form>
          </div>

          <div>
            <div className=" flex justify-center items-center my-5 ">
              Ціна роботи
              <input
                value={cost}
                type="number"
                placeholder="Ціна роботи"
                onInput={(e) => setCost(e.target.value)}
                className=" w-32 md:w-64  bg-dark py-2 px-3 rounded-lg ml-3"
              />
            </div>
            <div className=" text-center  flex justify-center items-center gap-x-4">
              <div>
                <button
                  className=" py-4 px-7 text-lg  border-4 border-h2 border-double rounded-lg transition duration-300 hover:scale-105"
                  onClick={() => {
                    if (cost <= 0) {
                      return toast.error("Ви не увели вартість роботи");
                    }
                    сompleteOrder();
                  }}
                >
                  Завершити замовлення
                </button>
              </div>
              <div>
                <button
                  className=" py-4 px-7 text-lg border-4 border-yellow border-double rounded-lg transition duration-300 hover:scale-105"
                  onClick={() => navigate(`/technician/continue/order/${id}`)}
                >
                  Продовжити замовлення
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
