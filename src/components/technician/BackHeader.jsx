import React from "react";
import { BiArrowBack } from "react-icons/bi";

function BackHeader({ link }) {
  return (
    <a href={link} className=" flex justify-between items-center pb-8">
      <BiArrowBack />
      <div>
        <div className="text-3xl text-h2">appliance repair</div>
      </div>
      <div></div>
    </a>
  );
}

export default BackHeader;
