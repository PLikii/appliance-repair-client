import React from "react";

function OrdersList({ orders, item }) {
  return (
    <div className=" space-y-5 py-2 overflow-y-scroll  h-screen scroll-pl-2	">
      <div className=" mt-3 w-[300px] flex justify-center">
        <a
          className="py-3 px-5 flex gap-2 items-center justify-center duration-300  rounded-lg  cursor-pointer bg-gray  hover:scale-105 active:bg-blue"
          href="http://localhost:5173/сreateOrder"
          target="_blank"
        >
          Створити замовлення
        </a>
      </div>

      {orders.map((e, key) => {
        return React.cloneElement(item, {
          order: e,
          key: e._id.$oid,
          index: key,
        });
      })}
    </div>
  );
}

export default OrdersList;
