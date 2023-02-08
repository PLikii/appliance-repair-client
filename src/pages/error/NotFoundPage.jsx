import React from "react";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";

function NotFoundPage(props) {
  return (
    <div className=" h-screen flex text-center justify-center items-center pb-60">
      <div className=" space-y-10">
        <div className="flex justify-center animate-pulse">
          <BiError size={50} />
        </div>
        <div className=" text-4xl"> Схоже сталася помилка</div>
        <div className=" text-h2 ">Дана сторінка не існує</div>

        <div className="transition duration-300 hover:scale-105 ">
          <Link to="/" className=" py-3 px-5 border-2 border-blue rounded-lg ">
            Повернутися на головну сторінку
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
