import React from "react";

function OrdersList({ data, item, link }) {
  return (
    <div className=" space-y-5 py-2 overflow-y-scroll  h-screen scroll-pl-2	">
      {link === "" ? (
        ""
      ) : (
        <div className=" mt-3 w-[300px] flex justify-center">
          <a
            className="py-3 px-5 flex gap-2 items-center justify-center duration-300  rounded-lg  cursor-pointer bg-gray  hover:scale-105 active:bg-blue"
            href={link}
            target="_blank"
          >
            Додати
          </a>
        </div>
      )}

      {data.map((e, key) => {
        return React.cloneElement(item, {
          data: e,
          key: key,
          index: key,
        });
      })}
    </div>
  );
}

export default OrdersList;
