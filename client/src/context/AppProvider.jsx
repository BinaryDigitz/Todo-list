import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { useNavigate } from "react-router-dom";
import { todos } from "../assets/assets";

function AppProvider({ children }) {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:4300";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tasks, setTasks] = useState(null);

  function resetApp(message) {
    if ( message && message.includes('UNAUTHORIZED') || message.includes('FORBIDDEN')) {
      localStorage.clear();
      setUser(null)
      navigate("/login");
    }
  }
  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setTimeout(navigate("/login", 1000));
  }
  const values = {
    baseUrl,
    resetApp,
    logout,
    navigate,
    user,
    setUser,
    token,
    setToken,
    tasks,
    setTasks,
  };

  useEffect(() => {
    setTasks(todos);
    setToken(localStorage.getItem("token"));
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export default AppProvider;
