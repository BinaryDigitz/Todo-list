import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AppContext from "../context/AppContext";

function TasksForm() {
   const {baseUrl, setTasks, resetApp } = useContext(AppContext)
  const [task, setTask] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const disableBTN = task.title.length < 6 || task.description.length < 6;

  async function handleFormSubmit(event) {
    const token = localStorage.getItem('token')
    event.preventDefault();
    setLoading(true);
    setError("");
    try{
        const { data } = await axios.post(baseUrl + '/api/tasks/add', task, 
          { headers: {token}}
        )
        const { success, message, tasks } = data
        console.log(data);
        
       resetApp(message)
        if(success){
            setLoading(false)
            toast.success(message)
            setTasks(tasks)
            setTask({title:'', description:''})
            return;
        }
        setError(message)
        setLoading(false)
        setTask({title:'', description:''})
    }
    catch(ex){
        toast.error(ex.message)
        setError(ex.message)
        setTask({title:'', description:''})
        setLoading(false)
    }
  }
  return (
    <div>
      <div>
        <h2 className="heading4 text-neutral-900 text-center mt-5">
          Stay organized and keep track of what needs to be done.
        </h2>
        <form
          onSubmit={handleFormSubmit}
          className=" w-sm mx-auto mt-10 rounded-sm shadow-md bg-white p-6"
        >
          <h3 className="text-center subheading text-gray-700 mb-5">
            Enter your task below
          </h3>
          <div className="border border-neutral-300 py-1.5 px-3 flex items-center gap-2 mb-3">
            <label className="sr-only" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="bg-transparent outline-none"
              placeholder="Title"
              required
            />
          </div>
          <div className="border border-neutral-300 py-1.5 px-3 flex items-center gap-2 mb-3">
            <label className="sr-only" htmlFor="title">
              Title
            </label>
            <textarea
              type="text"
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              className="bg-transparent outline-none w-full"
              rows={5}
              placeholder="Description"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={disableBTN}
            className="bg-neutral-800 disabled:bg-neutral-400 text-white py-1.5 w-full rounded my-3 hover:bg-neutral-700 cursor-pointer"
          >
            {isLoading ? "Loading..." : "Add task"}
          </button>
          <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
        </form>
      </div>
    </div>
  );
}

export default TasksForm;
