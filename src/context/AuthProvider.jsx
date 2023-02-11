import React, { useState, createContext, useMemo } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function refreshProfile() {
    setIsLoading(true);
    if (!localStorage.getItem("key")) {
      setProfile(null);
    } else {
      try {
        const res = await axios.get("http://localhost:5000/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("key")}` },
        });
        setProfile(res.data);
      } catch (err) {
        setProfile(null);
        alert("Невдалось загрузити профіль. Обновіть сторінку!");
      }
    }
    setIsLoading(false);
  }

  async function logout() {
    localStorage.removeItem("key");
    setProfile(null);
    refreshProfile();
  }

  const data = useMemo(
    () => ({
      profile,
      isLoading,
      refreshProfile,
      logout,
    }),
    [profile, isLoading, refreshProfile, logout]
  );

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
