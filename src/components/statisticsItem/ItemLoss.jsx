import React from "react";

function ItemLoss({ data }) {
  return (
    <div className=" w-[400px]">
      <div className=" space-y-3 border-2 border-gray p-3 rounded-lg">
        <div className=" text-center text-sm">Витрата</div>
        <div className=" flex space-x-10 justify-between">
          <div>{data.name}</div>

          <div className=" text-read">{data.loss} $</div>
        </div>
        <div>Опиис: {data.description}</div>
      </div>
    </div>
  );
}

export default ItemLoss;
