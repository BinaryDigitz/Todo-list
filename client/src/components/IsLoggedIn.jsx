import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useLocation} from "react-router-dom";

function IsLoggedIn({ path }) {
   const { user } = useContext(AppContext)
  const { navigate, setToken } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    function handleAuth() {
      if (pathname === "/is-logged-in" || pathname === '/login') {
        const token = localStorage.getItem("user");
        if (token) {
            setToken(token)
          navigate("/");
          return
        }
        else if( !user){
            navigate('/login')
        }
        navigate(path)
      }
    }
    handleAuth();
    return () => {};
  }, [pathname]);
}

export default IsLoggedIn;
