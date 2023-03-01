import { AiFillDelete } from "react-icons/ai";
import React, { useState } from "react";
import Loading from "../Loading";
import axios from "axios";
import toast from "react-hot-toast";

function AccessoriesItem({ name, price, index, id, reload, setReload }) {
  const [isLoading, setIsLoading] = useState(false);

  function deleteOrder() {
    const answer = window.confirm("Видалити замовлення");
    if (!answer) {
      return;
    }

    setIsLoading(true);
    axios
      .delete(`http://127.0.0.1:5000/orders/${id}/accessories`, {
        data: { index: index },
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setReload((prev) => !prev);
          toast.success("Замовлення успішно видалено");
        }
      })
      .catch((e) => {
        toast.error("Сталася помилка. Неможливо видалити.", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) return <Loading />;
  return (
    <div className=" flex  justify-between px-5 sm:w-48">
      <div>{name} </div>
      <div className=" flex space-x-2 ">
        <div>{price}$</div>

        <div
          className=" flex justify-center items-center active:scale-125 transition"
          onClick={deleteOrder}
        >
          <AiFillDelete />
        </div>
      </div>
    </div>
  );
}

export default AccessoriesItem;
