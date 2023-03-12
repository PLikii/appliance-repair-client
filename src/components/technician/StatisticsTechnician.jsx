import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";
import ItemOrder from "../statisticsItem/ItemOrder";

function StatisticsTechnician() {
  const { profile } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:5000//technician/Stats/${profile._id.$oid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      })
      .then((res) => {
        setStats(res.data);
      })
      .catch((e) => {
        toast.error("Схоже виникла проблема", e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading text="" />;

  return (
    <div className=" px-10 mr-5  ">
      <div className=" space-y-3">
        <div className=" flex space-x-3">
          <div>Кількість виконаних замовлень</div>
          <div className=" text-h2"> {stats.orders.length}</div>
        </div>

        <div className=" flex space-x-3">
          <div>Ваша заробітня плата:</div>
          <div className=" text-h2">{(stats.revenue - stats.expenses) / 2}</div>
        </div>

        <div className=" md:flex justify-between">
          <div className=" flex space-x-3">
            <div>Витрати на комплектуючі:</div>
            <div className=" text-read"> {stats.expenses}</div>
          </div>
          <div className=" flex space-x-3">
            <div>Прибуток:</div>
            <div className=" text-yellow"> {stats.revenue}</div>
          </div>
          <div className=" flex space-x-3">
            <div>Чистий дохід:</div>
            <div className=" text-h2"> {stats.revenue - stats.expenses}</div>
          </div>
        </div>
      </div>

      <div className=" pt-10 pl-4">
        <div
          className={`grid md:grid-cols-2 gap-10  
          md:overflow-y-scroll  md:h-[500px] 
          
        `}
        >
          {stats.orders.map((item, index) => {
            return (
              <div className=" ">
                <ItemOrder key={index} data={item} link="/view/order/" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StatisticsTechnician;
