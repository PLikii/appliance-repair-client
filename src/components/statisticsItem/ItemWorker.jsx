import React from "react";

function ItemWorker({ data }) {
  return (
    <a
      className=" w-[400px]"
      href={`http://localhost:5173/manager/workers/${data._id.$oid}`}
    >
      <div className=" space-y-3 border-2 border-gray p-3 rounded-lg">
        <div className=" text-center text-sm">Заробітня плата</div>

        <div className=" flex space-x-10 justify-between">
          <div>{data.name_surname}</div>

          <div className=" text-read ">{data.solary} $</div>
        </div>

        <div className=" flex space-x-10 justify-between">
          <div className=" w-[120px] truncate text-right "></div>
        </div>
      </div>
    </a>
  );
}

export default ItemWorker;
