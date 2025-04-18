import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/AppContext";
import { Error, Loading } from "../components/exportComp";
import { toast } from "react-toastify";

function ViewTasks() {
  const { baseUrl } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({statusCode:'', message:''});
  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  //mark task as complete
 async function completeTask(){

 }

  //Delete task
async function deleteTask(){
  setLoading(true)
 try{
  const { data } = await axios.get(baseUrl + `/api/tasks/${taskId}`)
  if(!data.success){
    setLoading(false)
    setError({statusCode: data.statusCode, message: data.message})
    return;
  }
  toast.success(data.message)
  setLoading(false)
 return fetchTask()
 }
 catch(ex){
  setError({ statusCode: 400, message:ex.message})
  setLoading(false)
 }
}

  // fetch task
  async function fetchTask() {
    const token = localStorage.getItem('token')
    setError({statusCode:'', message:''});
    setLoading(true);
    try {
      const { data } = await axios.get(baseUrl + `/api/tasks/${taskId}`, { headers: { token}});
      const { success, statusCode, message, task } = data;
      console.log(task.title);
      
      if (success) {
        toast.success(message);
        setTask(task);
        setLoading(false);
        return;
      }
      setTask(null);
      setError({statusCode, message: message});
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      setError({statusCode:'400', message:ex.message});
    }
  }
  useEffect(() => {
    fetchTask();
  }, []);
  
  if(!task){
    return <Loading />
  }
  if(error.message.length > 1){
    return <Error error={error} />
  }
  return (
    <div>
      <div className="grid place-items-center ">
        <h1 className="heading3 text-center mt-5">Your TASK</h1>
        <div className="p-6 bg-white shadow-sm w-sm lg:w-lg rounded-sm mt-5">
          <h3 className=" text-gray-700 flex gap-18">TITLE: <span className="text-black font-medium">{task.title}</span></h3>
          <p className=" text-gray-700 flex gap-4 my-5" >DESCRIPTION: <span className="text-black">{task.description}</span></p>
          <p className=" text-gray-700 flex gap-4">COMPLETED: <span className={`${task.complete ? 'text-green-500' : 'text-red-500'} font-medium`}>{task.complete ? 'Yes' : 'No'}</span></p>
          <div className="flex justify-around items-center my-5 mt-10">
            <button className="bg-gray-400 px-5 py-1.5 rounded shadow hover:bg-gray-300 cursor-pointer">Edit task</button>
            <button className="bg-green-400 px-5 py-1.5 rounded shadow hover:bg-green-300 text-green-950  cursor-pointer">Mark as complete</button>
            <button className="bg-red-400 px-5 py-1.5 rounded shadow hover:bg-red-300 text-red-950 cursor-pointer">Delete task</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTasks;
