import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import TechnicianOrders from "./TechnicianOrders";
import { AiOutlineDelete } from "react-icons/ai";
import Loading from "../Loading";

function Worker({ workers, reload, setIsReload }) {
  const { id } = useParams();
  const worker = workers.find((e) => e._id.$oid === id);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function deleteOrder() {
    const answer = window.confirm("Видалити замовлення");
    if (!answer) {
      return;
    }
    setIsLoading(true);
    axios
      .delete(`http://127.0.0.1:5000/worker/${worker._id.$oid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        if (res.data === "confirm") {
          toast.success("Замовлення успішно підтверджене");
          setIsReload(!reload);
          navigate("/manager/workers/0");
          window.location.reload(false);
        }
      })
      .catch((e) => {
        toast.error("Сталася помилка. Неможливо видалити працівника.", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) return <Loading text="" />;
  return (
    <div className=" text-xl space-y-6 p-5 min-w-[850px] fixed  overflow-y-clip  border-l-2 border-gray h-screen pl-4">
      <div className=" flex justify-between items-center">
        <div></div>
        <div>{worker._id.$oid}</div>
        <div className=" cursor-pointer" onClick={deleteOrder}>
          <AiOutlineDelete size={30} />
        </div>
      </div>

      <div>Ім'я та прізвище:{worker.name_surname}</div>
      <div>Місце проживання:{worker.adres}</div>
      <div>Мобільний номер:{worker.phon_namber}</div>
      <div>Електроний адрес: {worker.email}</div>
      <div>
        Посада: {workers.job_title === "technician" ? "Технік" : "Менеджер"}
      </div>

      <div className=" text-right">Зарплата: {worker.solary}$</div>

      {worker.job_title === "technician" ? (
        <TechnicianOrders worker={worker} />
      ) : (
        ""
      )}
    </div>
  );
}

export default Worker;
