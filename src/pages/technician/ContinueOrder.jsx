import BackHeader from "../../components/technician/BackHeader";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

function ContinueOrder({ sidebar }) {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [freeTime, setFreeTime] = useState(["Виберіть дату"]);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { profile } = useContext(AuthContext);

  toast(lin);
  const formik = useFormik({
    initialValues: {
      id: id,
      worker: profile._id.$oid,
      date: "",
      time: "",
    },
    onSubmit: async (values) => {
      const data = {
        id: id,
        worker: profile._id.$oid,
        date: values.date,
        time: values.time,
      };
      if (data.date === "") return toast.error("Виберіть дату");
      if (data.time === "") return toast.error("Ви не вибрали час");
      if (data.worker === "Виберіть дату ")
        return toast.error("Виберіть дату ");
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/workers/continue/order",
          data,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
          }
        );
        if (response.data === "confirm") {
          toast.success("Замовлення успішно продовжинно");

          if (width < 640) {
            navigate(`/technician/viewOrder/${id}`);
          }
          navigate(`/technician/todayOrders/${id}`);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (formik.values.worker.length === 0) return;
    if (formik.values.date.length === 0) return;

    const fetchFreeTime = async () => {
      setIsLoading(true);
      try {
        const worker = {
          id: profile._id.$oid,
          date: formik.values.date,
        };
        const response = await axios.post(
          "http://127.0.0.1:5000/workers/day/orders",
          worker
        );
        if (JSON.stringify(response.data) === "[]") {
          setFreeTime([]);
          toast.error("Нажаль усі години на цей день зайняті");
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
  }, [formik.values.date]);

  if (isLoading) return <Loading text="" />;
  return (
    <div className=" flex w-screen space-y-10 text-center lg:space-y-0 text-3xl">
      {sidebar ? (
        width > 640 ? (
          <div className=" w-96">{sidebar}</div>
        ) : (
          <BackHeader link={`/technician/viewOrder/${id}`} />
        )
      ) : (
        <div className=" my-10"></div>
      )}

      <div className=" flex justify-center items-center w-full">
        <form onSubmit={formik.handleSubmit} className=" space-y-7">
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

          <button
            className=" py-4 px-7 text-lg  border-4 border-blue border-double rounded-lg transition duration-300 hover:scale-105"
            type="submit"
          >
            Підтвердити
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContinueOrder;
