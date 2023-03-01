import React from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import toast from "react-hot-toast";

function OrdersItemTodayOrders({ data }) {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const active =
    window.location.pathname === `/technician/todayOrders/${data._id.$oid}`;

  return (
    <div
      className={` w-screen sm:w-[300px] flex flex-col items-center duration-300  rounded-lg py-3 px-4 cursor-pointer border-b-2 border-gray hover:bg-gray ${
        active ? "  bg-blue" : " bg-border_button"
      }`}
      onClick={() => {
        toast(width);
        if (width < 640) {
          navigate(`/technician/viewOrder/${data._id.$oid}`);
        } else {
          if (
            window.location.pathname !==
            `/technician/todayOrders/${data._id.$oid}`
          )
            navigate(`/technician/todayOrders/${data._id.$oid}`);
        }
      }}
    >
      <div className=" flex space-x-10">
        <div>
          <div className=" text-lg">{data.status}</div>
          <div className={`${active ? " text-white" : " text-blue"}`}>
            {data.customer_adres}
          </div>
        </div>

        <div className=" text-sm">
          <div>{data.date}</div>
          <div className=" text-sm">{data.time}</div>
        </div>
      </div>
    </div>
  );
}

export default OrdersItemTodayOrders;
