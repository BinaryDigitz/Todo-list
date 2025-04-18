import { useLocation } from "react-router-dom";
import { TaskForm } from "../components/exportComp";
import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

function AddTask() {
  const { user, navigate } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    function protectPath() {
      if (!user) {
        navigate("/login");
      }
    }
    protectPath();
    return () => {};
  }, [pathname === "/add-task"]);
  return (
    <div>
      <TaskForm />
    </div>
  );
}

export default AddTask;
