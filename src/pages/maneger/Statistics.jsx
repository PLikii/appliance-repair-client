import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import ItemOrder from "../../components/statisticsItem/ItemOrder";
import ItemLoss from "../../components/statisticsItem/ItemLoss";
import ItemWorker from "../../components/statisticsItem/ItemWorker";

function Statistics() {
  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState({ expenses: 0, revenue: 0 });
  const [reload, setIsReload] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://127.0.0.1:5000/getStats", {
        headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
      });
      setStatistics(response.data);
    } catch (error) {
      toast.error("Схоже виникла проблема", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats, reload]);

  if (isLoading) return <Loading text="Замовлення створюється" />;
  return (
    <div className=" space-y-10 p-5">
      <div className=" flex justify-around">
        <div></div>

        <div className=" text-2xl">Статистика</div>

        <a
          className="py-3 px-5 flex gap-2 items-center justify-center duration-300  rounded-lg  cursor-pointer bg-gray  hover:scale-105 active:bg-blue"
          href="http://localhost:5173/сreateLoss"
          target="_blank"
        >
          Додати
        </a>
      </div>

      <div
        className={`grid grid-cols-2 place-items-center 
           overflow-y-scroll space-y-5 h-[550px] 
        `}
      >
        {statistics.data.map((item, index) => {
          if (item.hasOwnProperty("сost_work")) {
            return <ItemOrder key={index} data={item} />;
          } else if (item.hasOwnProperty("loss")) {
            return <ItemLoss key={index} data={item} />;
          } else if (item.hasOwnProperty("solary")) {
            return <ItemWorker key={index} data={item} />;
          } else {
            return null;
          }
        })}
      </div>

      <div className="flex justify-around">
        <div>Витрати: {statistics.expenses}$</div>
        <div>Прибуток: {statistics.revenue}$</div>
        <div>Чистий прибуток: {statistics.revenue - statistics.expenses}$</div>
      </div>
    </div>
  );
}

export default Statistics;
