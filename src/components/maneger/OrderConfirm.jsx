import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

function OrderConfirm({ orders, setIsReload, reload }) {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const order = orders[id];
  const [workers, setWorkers] = useState();
  const [freeTime, setFreeTime] = useState(["Виберіть дату і техніка"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/workers/technician"
        );
        setWorkers(response.data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkers();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      id: id,
      worker: "",
      date: "",
      time: "",
    },
    onSubmit: async (values) => {
      const data = {
        id: order._id.$oid,
        worker: values.worker,
        date: values.date,
        time: values.time,
      };
      if (data.worker === "") return toast.error("Виберіть пріцівника");
      if (data.date === "") return toast.error("Виберіть дату");
      if (data.time === "") return toast.error("Ви не вибрали час");
      if (data.worker === "Виберіть дату і техніка")
        return toast.error("Виберіть дату і техніка");
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/order/confirm",
          data,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
          }
        );
        if (response.data === "confirm") {
          toast.success("Замовлення успішно підтверджене");
          navigate("/manager/confirmOrders/0");
          setIsReload(!reload);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  function deleteOrder() {
    const answer = window.confirm("Видалити замовлення");
    if (!answer) {
      return;
    }

    setIsLoading(true);

    axios
      .post(
        "http://127.0.0.1:5000/order/delete",
        { id: order._id.$oid },
        { headers: { Authorization: `Bearer ${localStorage.getItem("key")}` } }
      )
      .then((res) => {
        if (res.data === "confirm") {
          toast.success("Замовлення успішно підтверджене");
          setIsReload((prev) => !prev);
          navigate("/manager/confirmOrders/0");
        }
      })
      .catch((e) => {
        toast.error("Сталася помилка. Неможливо видалити замовлення.", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (formik.values.worker.length === 0) return;
    if (formik.values.date.length === 0) return;

    const fetchFreeTime = async () => {
      setIsLoading(true);
      try {
        const worker = {
          id: formik.values.worker,
          date: formik.values.date,
        };
        const response = await axios.post(
          "http://127.0.0.1:5000/workers/day/orders",
          worker
        );
        if (JSON.stringify(response.data) === "[]") {
          setFreeTime([]);
          toast.error(
            "У даного працівника немає усі години на цей день зайняті"
          );
        } else {
          setFreeTime(response.data);
        }
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFreeTime();
  }, [formik.values.date, formik.values.worker]);

  if (isLoading) return <Loading text="" />;

  return (
    <div className=" text-xl p-3 space-y-5  min-w-[850px] max-w-[850px]  border-l-2 border-gray h-screen  pl-4">
      <div className="flex w-full justify-around ">
        <div></div>
        <div className=" text-center">ID: {order._id.$oid}</div>
        <div className=" cursor-pointer" onClick={deleteOrder}>
          <AiOutlineDelete size={30} />
        </div>
      </div>

      <div className=" flex ">
        Статус : <p className=" pl-2 text-yellow"> Очікує підтвердження</p>
      </div>

      <form onSubmit={formik.handleSubmit} className=" space-y-8 py-8 ">
        <div className=" flex justify-between">
          <div className=" space-y-5">
            <div>
              Технік:
              <select
                className=" bg-border_button ml-2"
                id="worker"
                name="worker"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.worker}
              >
                <option value="" disabled selected hidden>
                  Обитіть техніка
                </option>

                {workers.map((e, key) => (
                  <option key={key} value={e._id.$oid}>
                    {e.name_surname}
                  </option>
                ))}
              </select>
            </div>

            <div>
              Дата:
              <input
                id="date"
                name="date"
                className=" ml-2 bg-border_button"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.date}
              ></input>
            </div>

            <div>
              Час виконання:
              <select
                className=" bg-border_button ml-2"
                id="time"
                name="time"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.time}
              >
                <option value="" disabled selected hidden>
                  Обитіть час
                </option>

                {freeTime.map((e, key) => (
                  <option key={key} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>Адрес: {order.customer_adres}</div>
        <div>Клієнт: {order.customer_name}</div>
        <div>Мобільний номер : {order.customer_namber}</div>
        <div>Тип техніки : {order.technic_type}</div>

        <div className="  py-5 space-x-2 flex">
          <div>Опис проблеми:</div>
          <div>{order.description}</div>
        </div>

        <div className={`${isLoading ? "hidden " : "inline"}`}>
          <button
            className=" py-4 px-7 text-lg  border-4 border-blue border-double rounded-lg transition duration-300 hover:scale-105"
            type="submit"
          >
            Підтвердити
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderConfirm;
