import { CiTrash } from "react-icons/ci";
import { FiEdit3, FiCheck } from "react-icons/fi";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/AppContext";
import { Error, Loading } from "../components/exportComp";
import { toast } from "react-toastify";

function ViewTasks() {
  const { baseUrl, token, navigate } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ statusCode: "", message: "" });
  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  //mark task as complete
  async function completeTask() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        baseUrl + `/api/tasks/update/${taskId}`,{ headers: { token }});
      console.log(token);
      
      if (!data.success) {
        setLoading(false);
        setError({ statusCode: data.statusCode, message: data.message });
        return;
      }
      toast.success(data.message);
      setLoading(false);
     fetchTask()
    } catch (ex) {
      setError({ statusCode: 400, message: ex.message });
      setLoading(false);
    }
  }

  //Delete task
  async function deleteTask() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        baseUrl + `/api/tasks/remove/${taskId}`,
        {
          headers: { token },
        }
      );
      if (!data.success) {
        setLoading(false);
        setError({ statusCode: data.statusCode, message: data.message });
        return;
      }
      toast.success(data.message);
      setLoading(false);
      navigate("/my-task");
    } catch (ex) {
      setError({ statusCode: 400, message: ex.message });
      setLoading(false);
    }
  }

  // fetch task
  async function fetchTask() {
    const token = localStorage.getItem("token");
    setError({ statusCode: "", message: "" });
    setLoading(true);
    try {
      const { data } = await axios.get(baseUrl + `/api/tasks/${taskId}`, {
        headers: { token },
      });
      const { success, statusCode, message, task } = data;
     

      if (success) {
        setTask(task);
        setLoading(false);
        return;
      }
      setTask(null);
      setError({ statusCode, message: message });
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      setError({ statusCode: "400", message: ex.message });
    }
  }
  useEffect(() => {
    fetchTask();
  }, []);

 
  if (!task || isLoading) {
    return <Loading />;
  }
  if (error.message.length > 1) {
    return <Error error={error} />;
  }
 
  return (
    <div>
      <div className="grid place-items-center ">
        <h1 className="heading3 text-center mt-5">Your TASK</h1>
        <div className="p-6 bg-white shadow-sm w-sm lg:w-lg rounded-sm mt-5">
          <h3 className=" text-gray-700 flex gap-18">
            TITLE: <span className="text-black font-medium">{task.title}</span>
          </h3>
          <p className=" text-gray-700 flex gap-4 my-5">
            DESCRIPTION: <span className="text-black">{task.description}</span>
          </p>
          <p className=" text-gray-700 flex gap-4">
            COMPLETED:{" "}
            <span
              className={`${
                task.completed ? "text-green-500" : "text-red-500"
              } font-medium`}
            >
              {task.completed ? "Yes" : "No"}
            </span>
          </p>
          <div className="flex justify-around items-center my-5 mt-10">
            <button 
            disabled={ task && task.completed}
            className="bg-gray-400 px-5 py-1.5 rounded shadow disabled:opacity-50 hover:bg-gray-300 cursor-pointer flex items-center gap-1">
              <FiEdit3 />
              Edit task
            </button>
            <button
            disabled={ task && task.completed}
              onClick={completeTask}
              className="bg-green-400 px-5 py-1.5 rounded shadow  disabled:opacity-50 text-green-950 hover:bg-green-300  cursor-pointer flex items-center gap-1"
            >
              <FiCheck />
              Mark as complete
            </button>
            <button
            
              onClick={deleteTask}
              className="bg-red-400 px-5 py-1.5 rounded shadow hover:bg-red-300 text-red-950 cursor-pointer flex items-center gap-1"
            >
              <CiTrash fontWeight={600} />
              Delete task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTasks;
