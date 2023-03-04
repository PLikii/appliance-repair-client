import React from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import BackHeader from "../../components/technician/BackHeader";
import StatisticsTechnician from "../../components/technician/StatisticsTechnician";

function TechnicianStatistics({ sidebar }) {
  const { width } = useWindowDimensions();

  return (
    <div className=" w-screen flex">
      <div>{width > 1037 ? <div className=" w-96">{sidebar}</div> : ""}</div>
      <div className=" h-screen "></div>
      <div className=" w-full">
        <div className=" ">
          {width < 1037 ? <BackHeader link="/technician/sidebar" /> : ""}
        </div>
        <div className=" py-14">
          <StatisticsTechnician />
        </div>
      </div>
    </div>
  );
}

export default TechnicianStatistics;
