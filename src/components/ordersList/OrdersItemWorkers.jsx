import React from "react";
import { useNavigate } from "react-router-dom";
import md5 from "md5";

function OrdersItemWorkers({ data }) {
  const navigate = useNavigate();
  const active =
    window.location.pathname === `/manager/workers/${data._id.$oid}`;

  return (
    <div
      className={` w-[300px] h-16 flex flex-colduration-300 items-center  rounded-lg py-3 px-4 cursor-pointer border-b-2 border-gray hover:bg-gray ${
        active ? "  bg-blue" : " bg-border_button"
      }`}
      onClick={() => {
        if (window.location.pathname !== `/manager/workers/${data._id.$oid}`)
          navigate(`/manager/workers/${data._id.$oid}`);
      }}
    >
      <div className=" flex justify-between">
        <div>
          <img
            src={
              data?.email
                ? `https://www.gravatar.com/avatar/${md5(data.email)}`
                : "https://www.gravatar.com/avatar/0"
            }
            alt="avatar"
            className="rounded-full w-10 h-10 mr-4  overflow-hidden "
          />
        </div>

        <div className={` w-40 ${active ? " text-white" : " text-h2"}`}>
          {data.name_surname}
        </div>

        <div className={` ml-5  ${active ? " text-white" : " text-h2"}`}>
          {data.job_title === "technician" ? "Технік" : "Менеджер"}
        </div>
      </div>
    </div>
  );
}

export default OrdersItemWorkers;
