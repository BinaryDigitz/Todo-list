import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from 'axios'
import { Error, Loading } from "../components/exportComp";

function MyTasks() {
  const { tasks, baseUrl, navigate, setTasks } = useContext(AppContext);
 const [ isLoading, setLoading ] = useState(false)
 const [ error, setError ] = useState({ statusCode: '', message: ''})

  console.log(tasks);
  

  useEffect(() =>{
    async function fetchTasks(){
      setLoading(true)
      
      const token = localStorage.getItem('token')
      try{
        const { data } = await axios.get(baseUrl + '/api/tasks', { headers: { token : token}})
        if(!data.success){
          setLoading(false)
          setError({statusCode: data.statusCode, message: data.message})
          return
        }
        setError({ statusCode: '', message: ''})
        setTasks(data.tasks)
        setLoading(false)

      }
      catch(ex){
        console.log(ex);
        setLoading(false)
        
      }
    }
    fetchTasks()
    return () =>{}
  },[])
 
  if(isLoading){
    return <Loading />
  }
  if(error.message.length > 1){
    return <Error error={error} />
  }
  if(!tasks){
    return <div className="grid place-items-center h-[70dvh]">
     <div className="flex flex-col text-center">
      <p className="heading3">No Task Found</p>
      <p className="heading4 text-neutral-600">Please add a task to continue</p>
      <button onClick={() => navigate('/add-task')} className="px-4 w-32 mx-auto mt-6 cursor-pointer hover:bg-neutral-700 py-2 bg-neutral-800 text-white rounded shadow">Add task</button>
     </div>
    </div>
  }
  return (
    <div className="mt-5">
      <div className="text-center ">
        <h3 className="heading3">Your To-Do List</h3>
        <p className="paragraph2 text-neutral-800">
          Here’s everything you’ve got planned
        </p>
        <p className="paragraph2 text-neutral-800">
          Stay focused, stay productive — you’ve got this!
        </p>

        <table className=" bg-white h-62 w-sm md:w-md lg:w-xl xl:w-full mx-auto mt-10 ">
          <thead>
            <tr className="p-1 font-medium">
              <td className="p-4 ">SN</td>
              <td>TITLE</td>
              <td>DESCRIPTION</td>
              <td>COMPLETED</td>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks.map((task, index) => (
                <tr key={index} className={`text-gray-700 text-sm min-m-3 hover:bg-green-100 border border-green-100 ${task.completed ? 'bg-green-200' : ''}`}>
                  <td>{index + 1 }</td>
                  <td>{task.title}</td>
                  <td className="">{task.description}</td>
                  <td>{task.completed ? 'Yes' : 'No'}</td>
                  <td onClick={() => navigate(`/my-task/${task._id}`)} className="text-green-500 cursor-pointer hover:bg-green-200">View </td>
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
