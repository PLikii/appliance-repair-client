import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useContext, useEffect } from "react";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";

function CreateLoss() {
  const [isLoading, setIsLoading] = useState(false);
  const { profile, refreshProfile } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      loss: "",
      description: "",
    },

    onSubmit: async (values) => {
      refreshProfile();
      const data = {
        id_worker: profile._id,
        loss: values.loss,
        description: values.description,
        date: moment().format("YYYY-MM-DD"),
        name: profile.name_surname,
      };

      if (!data.loss) return toast.error("Увидіть суму витрати");
      if (!data.description) return toast.error("Увидіть опис витрати");

      setIsLoading(true);

      await axios
        .post("http://127.0.0.1:5000/loss", data, {
          headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
        })
        .then((res) => {
          toast.success("Працівник успішно доданий", res.data);
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
                  <div>Ватрата</div>
                  <input
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg "
                    id="loss"
                    name="loss"
                    type="text"
                    placeholder="Увидіть розмір витрати"
                    onChange={formik.handleChange}
                    value={formik.values.loss}
                  />
                </div>

                <div className=" text-left space-y-3">
                  <div>Опис витрати</div>
                  <textarea
                    className=" w-64 lg:w-96 bg-dark py-2 px-3 rounded-lg  max-h-40"
                    maxLength={60}
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Опис витрати"
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

export default CreateLoss;
