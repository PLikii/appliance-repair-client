import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { RxUpdate } from "react-icons/rx";

function CreateOrder() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      customer_name: "",
      customer_address: "",
      customer_namber: "",
      technic_type: "",
      description: "",
    },

    onSubmit: async (values) => {
      const data = {
        status: "Очікує підтвердження",
        technic_type: values.technic_type,
        customer_name: values.customer_name,
        customer_address: values.customer_address,
        customer_namber: values.customer_namber,
        description: values.description,
        date: "",
        time: "",
        id_worker: {
          $oid: "",
        },
        accessories: [
          {
            name: "Діагностика",
            "price ": "50",
          },
        ],
      };

      if (data.technic_type === "") {
        return toast.error("Виберіть тип техніки");
      }
      if (data.customer_name === "") {
        return toast.error("Ви не увели ім'я та прізфище");
      }
      if (data.customer_address === "") {
        return toast.error("Ви не увели адрес");
      }
      if (data.customer_namber === "") {
        return toast.error("Ви не увели мобільний номер");
      }
      if (data.customer_namber.length < 10) {
        return toast.error("Мобільний номер занадто короткий");
      }
      if (data.description === "")
        return toast.error("Ви не увели опис проблеми");

      setIsLoading(true);

      await axios
        .post("http://127.0.0.1:5000/order", {
          data,
        })
        .then((res) => {
          toast.success("Замовлення успішно створене", res.data);
          return navigate("/");
        })
        .catch((e) => {
          return toast.error(e);
        })
        .finally(() => {
          setIsLoading(false);
          toast.dismiss();
        });
    },
  });

  return (
    <div>
      {isLoading ? (
        <div className=" fixed w-full h-screen bg-dark/60  ">
          <div className=" flex justify-center mt-16">
            <div className=" space-y-4">
              <div className=" flex justify-center ">
                <RxUpdate size={30} className=" animate-spin" fill="white" />
              </div>
              <div>Замавлення створеється</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="py-7 px-10 lg:flex items-center justify-between space-y-10 lg:space-y-0">
        <div className="space-y-3 font-bold ">
          <div className="text-4xl">appliance repair</div>

          <div className=" text-h2 text-2xl text-right">тернопіль</div>
        </div>
      </div>

      <div className=" flex justify-center text-center  ">
        <div className=" space-y-10">
          <div>
            <div className="text-lg lg:text-4xl">Оформлення замовлення </div>
          </div>

          <form onSubmit={formik.handleSubmit} className=" space-y-10 ">
            <div className=" lg:flex lg:space-x-10 space-y-10 lg:space-y-0">
              <div className=" space-y-8">
                <div className=" text-left space-y-3">
                  <div>Адрес</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="customer_address"
                    name="customer_address"
                    type="text"
                    placeholder="Адрес"
                    onChange={formik.handleChange}
                    value={formik.values.customer_address}
                  />
                </div>

                <div className=" text-left space-y-3">
                  <div>Ім’я прізвище</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="customer_name"
                    name="customer_name"
                    type="text"
                    placeholder="Ім’я прізвище"
                    onChange={formik.handleChange}
                    value={formik.values.customer_name}
                  />
                </div>

                <div className=" text-left space-y-3">
                  <div>Мобільний номер</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="customer_namber"
                    name="customer_namber"
                    type="text"
                    placeholder="Мобільний номер"
                    onChange={formik.handleChange}
                    value={formik.values.customer_namber}
                  />
                </div>

                <div className=" text-left space-y-3">
                  <div>Тип техніки</div>

                  <select
                    id="technic_type"
                    name="technic_type"
                    className="  w-64  lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    onChange={formik.handleChange}
                    value={formik.values.technic_type}
                  >
                    <option defaultValue="" disabled selected hidden>
                      Тип техніки
                    </option>
                    <option value="Холодильник">Холодильник</option>
                    <option value="Духова піч">Духова піч</option>
                    <option value="Морозильная камера">
                      Морозильная камера
                    </option>
                    <option value="Газова плита">Газова плита</option>
                  </select>
                </div>
              </div>

              <div className=" text-left space-y-3">
                <div>Опис проблеми</div>
                <div>
                  <textarea
                    className=" w-64 lg:w-96 h-44 bg-dark p-3"
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Опишіть в данім полі проблему яка у вас виникла"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className={`${isLoading ? "hidden " : "inline"}`}>
                <button
                  className=" py-4 px-7 text-lg  border-4 border-blue border-double rounded-lg transition duration-300 hover:scale-105"
                  type="submit"
                >
                  Замовити
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
