import OrdersList from "../../components/ordersList/OrdersList";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import OrdersItemWorkers from "../../components/ordersList/OrdersItemWorkers";
import Worker from "../../components/maneger/Worker";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Workers() {
  const [isLoading, setIsLoading] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [reload, setIsReload] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://127.0.0.1:5000/workers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        setWorkers(res.data);
        if (id === "0") navigate(`/manager/workers/${res.data[0]._id.$oid}`);
      })
      .catch((e) => {
        toast.error("Схоже виникла проблема", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reload]);

  if (isLoading) return <Loading text="Замовлення створюється" />;

  if (workers.length === 0) {
    return <div className=" text-3xl p-40">Схоже немає замовлень</div>;
  }

  return (
    <div className=" flex space-x-5">
      <div>
        <OrdersList
          data={workers}
          item={<OrdersItemWorkers />}
          link="http://localhost:5173/сreateWorker"
        />
      </div>
      <div>
        <Worker workers={workers} reload={reload} setIsReload={setIsReload} />
      </div>
    </div>
  );
}

export default Workers;
