import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useLocation} from "react-router-dom";

function IsLoggedIn() {
  const { navigate, setToken } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    function handleAuth() {
      if (pathname === "/login") {
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token)
          navigate("/");
        }
        else{
            navigate('/login')
        }
      }
    }
    handleAuth();
    return () => {};
  }, [pathname]);
}

export default IsLoggedIn;
