import React from "react";
import { useNavigate } from "react-router-dom";

function OrdersItemActiveOrder({ order, index }) {
  const navigate = useNavigate();
  const active =
    window.location.pathname === `/manager/activeOrders/${order._id.$oid}`;

  return (
    <div
      className={` w-[300px] flex flex-col items-center duration-300  rounded-lg py-3 px-4 cursor-pointer border-b-2 border-gray hover:bg-gray ${
        active ? "  bg-blue" : " bg-border_button"
      }`}
      onClick={() => {
        navigate(`/manager/activeOrders/${order._id.$oid}`);
      }}
    >
      <div className=" flex space-x-10 ">
        <div>
          <div className={`${active ? " text-white" : " text-h2"}`}>
            {order.customer_name}
          </div>

          <div className={`${active ? " text-white" : " text-blue"}`}>
            {order.customer_adres}
          </div>

          <div>{order.status}</div>
        </div>

        <div>
          <div className=" w-[100px] truncate ">{order._id.$oid}</div>
          <div>{order.date}</div>
          <div className=" text-sm">{order.time}</div>
        </div>
      </div>
    </div>
  );
}

export default OrdersItemActiveOrder;
