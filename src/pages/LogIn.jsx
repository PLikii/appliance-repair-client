import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import useWindowDimensions from "../hooks/useWindowDimensions";

function LogIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { profile, refreshProfile } = useContext(AuthContext);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!profile) {
      navigate("/login");
    }
  }, [profile]);

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: async (values) => {
      const data = {
        login: values.login,
        password: values.password,
      };
      if (data.login === "") return alert("Увидіть логін");
      if (data.password === "") return alert("Увидіть пароль");
      setIsLoading(true);
      await axios
        .post("http://127.0.0.1:5000/login", {
          data,
        })
        .then((res) => {
          if (res.data == "error")
            return toast.error("Пароль або логін не вірний");
          localStorage.setItem("key", res.data.key);
          refreshProfile();
        })
        .catch((e) => {
          toast.error("Пароль або логін не вірний", e);
        })
        .finally(() => {
          setIsLoading(false);
          if (profile.job_title === "manager") {
            navigate("/manager/confirmOrders/0");
          } else if (profile.job_title === "technician") {
            if (width <= 640) {
              navigate("/technician/sidebar");
            } else {
              navigate("/technician/todayOrders/0");
            }
          }
        });
    },
  });
  return (
    <div>
      {isLoading ? <Loading text="Виконується вхід" /> : ""}
      <div className="py-7 px-10 sm:flex items-center justify-between space-y-10 sm:space-y-0">
        <div className="space-y-3 font-bold ">
          <div className="text-4xl">appliance repair</div>

          <div className=" text-h2 text-2xl text-right">тернопіль</div>
        </div>
      </div>

      <div className=" flex justify-center text-center  ">
        <form onSubmit={formik.handleSubmit} className="space-y-5 ">
          <div className=" text-2xl space-y-6">
            <div className=" space-y-3">
              <div>Логін</div>

              <input
                className="w-80 text-sm px-2 py-2  border-4 border-gray rounded-full bg-dark"
                id="login"
                name="login"
                type="password"
                placeholder="Логін"
                onChange={formik.handleChange}
                value={formik.values.login}
              ></input>
            </div>
            <div className=" space-y-3">
              <div>Пароль</div>
              <input
                className="w-80 text-sm px-2 py-2  border-4 border-gray rounded-full bg-dark"
                id="password"
                name="password"
                type="password"
                placeholder="Пароль"
                onChange={formik.handleChange}
                value={formik.values.password}
              ></input>
            </div>
          </div>

          <button
            type="submit"
            className=" py-3 px-5 text-xl border-4 border-gray rounded-lg hover:scale-105 active:bg-gray transition duration-400"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
