import React, { useState, useEffect } from "react";

function OrdersList({ data, item, link, find }) {
  const [orders, setOrders] = useState(data);
  const [input, setInput] = useState();

  useEffect(() => {
    if (input) {
      const filteredOrders = data.filter((order) =>
        order.customer_adres.includes(input)
      );
      setOrders(filteredOrders);
    } else {
      setOrders(data);
    }
  }, [input, data]);

  return (
    <div className=" w-[340px] ">
      <div className=" mt-3 w-full flex justify-center  ">
        <a
          className="py-3 px-5 flex gap-2 items-center justify-center duration-300  rounded-lg  cursor-pointer bg-gray  hover:scale-105 active:bg-blue"
          href={link}
          target="_blank"
        >
          Додати
        </a>
      </div>

      {find ? (
        <div className=" flex justify-center py-2  ">
          <input
            value={input}
            onInput={(e) => setInput(e.target.value)}
            className="  bg-dark py-1 px-2 rounded-lg text-center "
            placeholder="Пошук по адресу"
          />
        </div>
      ) : (
        ""
      )}

      <div className="overflow-y-scroll max-h-[40rem]  min-h-[40rem]">
        {orders.map((e, key) => {
          return React.cloneElement(item, {
            data: e,
            key: key,
            index: key,
          });
        })}
      </div>
    </div>
  );
}

export default OrdersList;
