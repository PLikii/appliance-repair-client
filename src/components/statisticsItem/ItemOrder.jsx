import React from "react";
import {} from "react-router-dom";

function ItemOrder({ data }) {
  return (
    <a
      className=" w-[400px]"
      href={`http://localhost:5173/manager/activeOrders/${data._id.$oid}`}
    >
      <div className=" space-y-3 border-2 border-gray p-3 rounded-lg">
        <div className=" text-center text-sm">Замовлення</div>
        <div className=" flex space-x-10 justify-between">
          <div>{data.customer_name}</div>

          <div className=" w-[120px] truncate ">{data._id.$oid}</div>
        </div>

        <div className=" flex space-x-10 justify-between">
          <div className=" flex items-center">{data.customer_adres}</div>
          <div>
            <div className="">{data.time}</div>

            <div className=" text-sm text-center">{data["date"]}</div>
          </div>
        </div>

        <div className=" flex space-x-10 justify-between">
          <div className=" text-blue">{data.сost_work}</div>
          <div className=" text-h2">{data.status}</div>
        </div>
      </div>
    </a>
  );
}

export default ItemOrder;
