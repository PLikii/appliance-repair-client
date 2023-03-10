import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function SidebarItem({ icon, title, route }) {
  const { id } = useParams();
  const active = window.location.pathname === `${route}/${id}`;
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-row gap-2 items-center duration-300 w-full rounded-lg py-3 px-4 cursor-pointer border  hover:bg-gray border-b-4 border-gray ${
        active ? "  bg-blue" : " bg-border_button"
      }`}
      onClick={() => {
        if (window.location.pathname !== `${route}/${id}`)
          navigate(`${route}/0`);
      }}
    >
      <div className="text-xl">{icon || ""}</div>
      <div className="text-lg">{title || "Noname element"}</div>
    </div>
  );
}

export default SidebarItem;
