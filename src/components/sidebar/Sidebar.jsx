import React from "react";
import SidebarItem from "./SidebarItem";
import { GiConfirmed } from "react-icons/gi";
import { AiFillContainer } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { FcStatistics } from "react-icons/fc";
import Profile from "../Profile";

function Sidebar() {
  return (
    <div className=" py-3 px-4 flex flex-col h-screen justify-between border-2 border-gray/30">
      <div className=" space-y-10">
        <div className="space-y-3 font-bold cursor-default	">
          <div className="text-4xl">appliance repair</div>

          <div className=" text-h2 text-2xl text-right">тернопіль</div>
        </div>

        <div className=" space-y-5">
          <SidebarItem
            icon={<GiConfirmed />}
            title="Підтвердження замовлень"
            route="/manager/confirmOrders"
          />
          <SidebarItem
            icon={<AiFillContainer />}
            title="Замовлення"
            route="/manager/activeOrders"
          />
          <SidebarItem
            icon={<BsPeople />}
            title="Пріцівники"
            route="/manager/workers"
          />
          <SidebarItem
            icon={<FcStatistics />}
            title="Статистика"
            route="/manager/statistics"
          />
        </div>
      </div>

      <div>
        <Profile />
      </div>
    </div>
  );
}

export default Sidebar;
