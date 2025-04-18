import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useLocation } from "react-router-dom";

function MyTasks() {
  const { tasks, navigate, user } = useContext(AppContext);
 
  const { pathname } = useLocation();

  useEffect(() => {
    function protectPath() {
      if (!user) {
        navigate("/login");
      }
    }
    protectPath();
    return () => {};
  }, [pathname === "/my-task"]);

  return (
    <div className="mt-5">
      <div className="text-center ">
        <h3 className="heading3">Your To-Do List</h3>
        <p className="paragraph1 text-neutral-800">
          Here’s everything you’ve got planned
        </p>
        <p className="paragraph1 text-neutral-800">
          Stay focused, stay productive — you’ve got this!
        </p>

        <table className=" bg-white h-62 w-sm md:w-md lg:w-xl xl:w-full mx-auto mt-10 ">
          <thead>
            <tr className="p-5">
              <td className="p-4 ">SN</td>
              <td>TITLE</td>
              <td>START TIME</td>
              <td>STATUS</td>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks.map((task, index) => (
                <tr key={task.id} className=" text-gray-700 text-sm hover:bg-green-50">
                  <td>{index + 1 }</td>
                  <td>{task.title}</td>
                  <td>{task.title}</td>
                  <td>{task.title}</td>
                  <td onClick={() => navigate(`/my-task/${task.id}`)} className="text-green-500 cursor-pointer hover:bg-green-100">View </td>
                </tr>
              ))}
          </tbody>

          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default MyTasks;
