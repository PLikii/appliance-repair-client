import React from "react";
import { useNavigate } from "react-router-dom";

function OrdersItemConfirmationOrders({ data, index }) {
  const navigate = useNavigate();
  const active = window.location.pathname === `/manager/confirmOrders/${index}`;

  return (
    <div
      className={` w-[300px] flex flex-col  gap-2 items-center duration-300  rounded-lg py-3 px-4 cursor-pointer border-b-2 border-gray hover:bg-gray ${
        active ? "  bg-blue" : " bg-border_button"
      }`}
      onClick={() => {
        if (window.location.pathname !== `/manager/confirmOrders/${index}`)
          navigate(`/manager/confirmOrders/${index}`);
      }}
    >
      <div className={`${active ? " text-white" : " text-blue"}`}>
        {data.customer_adres}
      </div>
      <div>+ {data.customer_namber}</div>
    </div>
  );
}

export default OrdersItemConfirmationOrders;
