import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";

function Layout({ child, sidebar }) {
  const { refreshProfile, isLoading } = useContext(AuthContext);

  if (localStorage.getItem("key") === null)
    return <Navigate to="/login" replace />;

  useEffect(() => {
    refreshProfile();
  }, []);

  if (isLoading) return <Loading text=" профіль завантажеється" />;
  return (
    <div className=" sm:flex   h-screen w-screen">
      <div className=" w-[400px]">{sidebar}</div>
      <div className=" w-full">{child}</div>
    </div>
  );
}

export default Layout;
