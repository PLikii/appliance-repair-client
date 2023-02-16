import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect, useContext } from "react";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";

function CreateWorker() {
  const [isLoading, setIsLoading] = useState(false);
  const { profile, refreshProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("key")) navigate("/");
  }, []);

  const formik = useFormik({
    initialValues: {
      name_surname: "",
      adres: "",
      phon_namber: "",
      job_title: "",
      login: "",
      password: "",
      email: "",
      solary: "",
    },

    onSubmit: async (values) => {
      const data = {
        name_surname: values.name_surname,
        adres: values.adres,
        phon_namber: values.phon_namber,
        job_title: values.job_title,
        login: values.login,
        password: values.password,
        email: values.email,
        solary: values.solary,
      };

      if (!data.name_surname) return toast.error("Увидіть ім'я та прізвище");
      if (!data.adres) return toast.error("Увидіть адрес");
      if (!data.phon_namber) return toast.error("Увидіть мобільний номер");
      if (!data.job_title) return toast.error("Оберіть посаду");
      if (!data.login) return toast.error("Увидіть логін");
      if (!data.password) return toast.error("Увидіть пароль");
      if (!data.email) return toast.error("Увидіть емейл");
      if (!data.solary) return toast.error("Увидіть заробітн плату");
      setIsLoading(true);

      await axios
        .post("http://127.0.0.1:5000/workers", data, {
          headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
        })
        .then((res) => {
          toast.success("Працівник успішно доданий", res.data);
          window.location.reload(false);
          window.close();
        })
        .catch((e) => {
          return toast.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <div>
      {isLoading ? <Loading text="Працівник додається..." /> : ""}

      <div className="py-7 px-10 sm:flex items-center justify-between space-y-10 lg:space-y-0">
        <div className=" font-bold ">
          <div className="space-y-3 font-bold ">
            <div className="text-4xl">appliance repair</div>

            <div className=" text-h2 text-2xl text-right">тернопіль</div>
          </div>
        </div>
      </div>

      <div className=" flex justify-center text-center  ">
        <div className=" space-y-6">
          <div>
            <div className="text-lg lg:text-4xl">Додати працівника </div>
          </div>

          <form onSubmit={formik.handleSubmit} className=" space-y-8 ">
            <div className=" lg:flex lg:space-x-10 space-y-10 lg:space-y-0">
              <div className=" space-y-6">
                <div className=" text-left space-y-3">
                  <div>Ім'я прізвище</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="name_surname"
                    name="name_surname"
                    type="text"
                    placeholder="Ім’я прізвище"
                    onChange={formik.handleChange}
                    value={formik.values.name_surname}
                  />
                </div>

                <div className=" text-left space-y-3">
                  <div>Адрес</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="adres"
                    name="adres"
                    type="text"
                    placeholder="Адрес"
                    onChange={formik.handleChange}
                    value={formik.values.adres}
                  />
                </div>

                <div className=" text-left space-y-3">
                  <div>Номер телефону</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="phon_namber"
                    name="phon_namber"
                    type="text"
                    placeholder="Номер телефону"
                    onChange={formik.handleChange}
                    value={formik.values.phon_namber}
                  />
                </div>

                <div className=" text-left space-y-3">
                  <div>Заробітна плата</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="solary"
                    name="solary"
                    type="text"
                    placeholder="Заробітна плата"
                    onChange={formik.handleChange}
                    value={formik.values.solary}
                  />
                </div>
              </div>

              <div className=" space-y-6">
                <div className=" text-left space-y-3">
                  <div>Логен</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="login"
                    name="login"
                    type="text"
                    placeholder="Логін"
                    onChange={formik.handleChange}
                    value={formik.values.login}
                  />
                </div>

                <div className=" text-left space-y-3">
                  <div>Пароль</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Пароль"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </div>
                <div className=" text-left space-y-3">
                  <div>Емейл</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Емейл"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>

                <div className=" text-left space-y-3">
                  <div>Посада</div>
                  <select
                    id="job_title"
                    name="job_title"
                    className="w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg"
                    onChange={formik.handleChange}
                    value={formik.values.job_title}
                  >
                    <option value="" disabled selected hidden>
                      Обиріть посаду
                    </option>
                    <option value="manager">Менеджер</option>
                    <option value="technician">Технік</option>
                  </select>
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

export default CreateWorker;
