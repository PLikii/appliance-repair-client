import React from "react";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="space-y-10 h-screen">
      <div className="py-7 px-10 lg:flex items-center justify-between space-y-10 lg:space-y-0">
        <div className="space-y-3 font-bold ">
          <div className="text-4xl">appliance repair</div>

          <div className=" text-h2 text-2xl text-right">тернопіль</div>
        </div>

        <div className=" flex space-x-4 justify-center">
          <div>
            <AiFillInstagram size={30} />
          </div>
          <div>
            <AiFillTwitterCircle size={30} />
          </div>
        </div>
      </div>

      <div className=" flex justify-center text-center">
        <div className=" space-y-10">
          <div className=" text-xl lg:text-4xl ">
            Вирішимо усі ваші проблеми
          </div>

          <div className=" lg:text-2xl  text-h2">
            Наша компанія надає послеги з ремонту побутової техніки у місті
            Тернополі.
          </div>

          <div className=" lg:text-left space-y-4">
            <div className=" text-lg ">
              Для опримання наших послух вам потрібно:
            </div>
            <div> Оформити замовлення.</div>
            <div>Дочикатися дзвінка від нашого менеджера і узгодити дату.</div>
          </div>

          <div className=" pt-10 transition duration-300 hover:scale-105 ">
            <Link
              to="/сreateOrder"
              className=" py-3 px-5 border-4 border-blue border-double rounded-lg "
            >
              Оформити замовлення.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
