import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BiLogOut } from "react-icons/bi";
import md5 from "md5";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { profile, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className=" py-3 px-4 flex gap-2 items-center justify-center duration-300  rounded-lg  cursor-pointer bg-blue">
      <div>
        <img
          src={
            profile?.email
              ? `https://www.gravatar.com/avatar/${md5(profile.email)}`
              : "https://www.gravatar.com/avatar/0"
          }
          alt="avatar"
          className="rounded-full w-10 h-10 mr-4  overflow-hidden"
        />
      </div>
      <div className=" text-lg">{profile.name_surname}</div>
      <div
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        <BiLogOut size={30} />
      </div>
    </div>
  );
}

export default Profile;
