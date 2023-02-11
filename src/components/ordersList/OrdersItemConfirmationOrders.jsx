import React from "react";
import { useNavigate } from "react-router-dom";

function OrdersItemConfirmationOrders({ id, adres, phon_namber, index }) {
  const navigate = useNavigate();
  const active = window.location.pathname === `/manager/confirmOrders/${index}`;

  return (
    <div
      className={` w-[300px] flex flex-col  gap-2 items-center duration-300  rounded-lg py-3 px-4 cursor-pointer border-b-2 border-gray hover:bg-gray ${
        active ? "  bg-blue" : " bg-border_button"
      }`}
      onClick={() => {
        navigate(`/manager/confirmOrders/${index}`);
      }}
    >
      <div className={`${active ? " text-text" : " text-blue"}`}>{adres}</div>
      <div>+ {phon_namber}</div>
    </div>
  );
}

export default OrdersItemConfirmationOrders;
