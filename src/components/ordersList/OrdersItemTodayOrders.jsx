import React from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import toast from "react-hot-toast";

function OrdersItemTodayOrders({ data, link }) {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const active = window.location.pathname === `${link}${data._id.$oid}`;

  return (
    <div className=" m-3">
      <div
        className={`  w-screen sm:w-full flex flex-col items-center duration-300  rounded-lg py-2 px-4 cursor-pointer  border-2 border-b-4 border-gray hover:bg-gray  ${
          active ? "  bg-blue" : " bg-border_button"
        }`}
        onClick={() => {
          if (width < 768) {
            navigate(`/technician/viewOrder/${data._id.$oid}`);
          } else {
            if (window.location.pathname !== `${link}/${data._id.$oid}`)
              navigate(`${link}${data._id.$oid}`);
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
    </div>
  );
}

export default OrdersItemTodayOrders;
