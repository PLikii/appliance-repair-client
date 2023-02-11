import React, { useContext, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";

function Layout({ child }) {
  const { profile, refreshProfile, isLoading } = useContext(AuthContext);

  useEffect(() => {
    refreshProfile();
  }, []);

  if (isLoading) return <Loading text=" провіль завантажеється" />;
  return (
    <div className=" flex   h-screen w-screen">
      <div className="">
        <Sidebar />
      </div>
      <div>{child}</div>
    </div>
  );
}

export default Layout;
