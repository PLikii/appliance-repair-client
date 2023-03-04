import React from "react";
import { BiArrowBack } from "react-icons/bi";

function BackHeader({ link }) {
  return (
    <a
      href={link}
      className=" flex justify-between items-center fixed py-5 pl-4"
    >
      <BiArrowBack size={30} />

      <div></div>
    </a>
  );
}

export default BackHeader;
