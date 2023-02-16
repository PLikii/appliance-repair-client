import React from "react";
import { useNavigate } from "react-router-dom";

function OrdersItemActiveOrder({ data }) {
  const navigate = useNavigate();
  const active =
    window.location.pathname === `/manager/activeOrders/${data._id.$oid}`;

  return (
    <div
      className={` w-[300px] flex flex-col items-center duration-300  rounded-lg py-3 px-4 cursor-pointer border-b-2 border-gray hover:bg-gray ${
        active ? "  bg-blue" : " bg-border_button"
      }`}
      onClick={() => {
        if (
          window.location.pathname !== `/manager/activeOrders/${data._id.$oid}`
        )
          navigate(`/manager/activeOrders/${data._id.$oid}`);
      }}
    >
      <div className=" flex space-x-10 ">
        <div>
          <div className={`${active ? " text-white" : " text-h2"}`}>
            {data.customer_name}
          </div>

          <div className={`${active ? " text-white" : " text-blue"}`}>
            {data.customer_adres}
          </div>

          <div>{data.status}</div>
        </div>

        <div>
          <div className=" w-[100px] truncate ">{data._id.$oid}</div>
          <div>{data.date}</div>
          <div className=" text-sm">{data.time}</div>
        </div>
      </div>
    </div>
  );
}

export default OrdersItemActiveOrder;
