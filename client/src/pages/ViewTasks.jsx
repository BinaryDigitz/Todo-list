import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";

function ViewTasks() {
  const { baseUrl } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState(null);
  const { taskId } = useParams();

  async function fetchTask() {
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(baseUrl + `/api/tasks/list/${taskId}`);
      const { success, message, task } = data;
      if (success) {
        toast.success(message);
        setTasks(task);
        setLoading(false);
        return;
      }
      setTasks(null);
      setError(message);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      setError(ex.message);
    }
  }
  useEffect(() => {
    fetchTask();
  }, [taskId]);
  
  return (
    <div>
      <div>
        <h1 className="heading3 text-center mt-5">Your TASK</h1>
      </div>
    </div>
  );
}

export default ViewTasks;
