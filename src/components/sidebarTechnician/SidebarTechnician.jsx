import React, { useEffect } from "react";
import SidebarItem from "../sidebar/SidebarItem";
import { GiConfirmed } from "react-icons/gi";
import { AiFillContainer } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import Profile from "../Profile";

function SidebarTechnician() {
  return (
    <div className=" py-3 px-4 flex flex-col h-screen  justify-between border-2 border-gray/30">
      <div className=" space-y-10">
        <div className="space-y-3 font-bold cursor-default	">
          <div className="text-4xl">appliance repair</div>

          <div className=" text-h2 text-2xl text-right">тернопіль</div>
        </div>

        <div className=" space-y-14 sm:space-y-5">
          <SidebarItem
            icon={<GiConfirmed />}
            title="Сьогоднішні замовлення"
            route="/technician/todayOrders"
          />
          <SidebarItem
            icon={<AiFillContainer />}
            title="Майбутні замовлення"
            route="/technician/future/orders"
          />
          <SidebarItem
            icon={<FcStatistics />}
            title="Моя статистика"
            route="/technician/statistics"
          />
        </div>
      </div>

      <div>
        <Profile />
      </div>
    </div>
  );
}

export default SidebarTechnician;
