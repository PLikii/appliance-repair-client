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
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  useEffect(() => {
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
    if (!orders) {
      fetchOrder();
    } else {
      setOrder(orders.find((order) => order._id.$oid === id));
      setIsLoading(false);
    }
  }, [id, reload]);

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
          setReload(!reload);
          toast.success("Успішно додано");
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
      .get(`http://127.0.0.1:5000/order/сomplete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data);
          navigate(`/technician/todayOrders/0`);
        }
      })
      .catch((e) => {
        toast.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) return <Loading text="" />;
  return (
    <div className=" flex  text-2xl sm:text-base p-2 space-y-6 sm:px-5">
      <div className=" w-full">
        <div>
          {width < 640 ? <BackHeader link="/technician/todayOrders/0" /> : ""}
        </div>

        <div className=" flex justify-around sm:py-5">
          <div>{order.status}</div>
          <div></div>
          <div className=" w-[200px] truncate">id: {order._id.$oid}</div>
        </div>

        <div className=" sm:flex justify-between">
          <div className="py-2 border-y-4 border-gray  space-y-3">
            <div>Адрес: {order.customer_adres}</div>
            <div>Клієнт: {order.customer_name}</div>
            <div>Мобільний номер: {order.customer_namber}</div>
            <div>Тип техніки: {order.technic_type}</div>
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
                reload={reload}
                setReload={setReload}
              />
            ))}
          </div>
        </div>

        <div className=" flex justify-center pt-5 text-center">
          <form onSubmit={formik.handleSubmit} className=" space-y-8 ">
            <div className=" text-left space-y-3">
              <div>Назва</div>
              <input
                className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
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
                className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                id="price"
                name="price"
                type="text"
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

        <div className=" text-center space-y-7 py-10">
          <button
            className=" py-4 px-7 text-lg  border-4 border-h2 border-double rounded-lg transition duration-300 hover:scale-105"
            onClick={сompleteOrder}
          >
            Завершити замовлення
          </button>

          <button
            className=" py-4 px-7 text-lg border-4 border-yellow border-double rounded-lg transition duration-300 hover:scale-105"
            //onClick={сompleteOrder}
          >
            Продовжити замовлення
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
