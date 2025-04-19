import { Router } from "express";
import authUser from "../middlewares/authUser.js";
import { createTask, getTask, getTasks, deleteTask, updateTask } from "../controllers/task.controllers.js";

const taskRouter = Router()

taskRouter.post('/add', authUser, createTask)

taskRouter.get('/', authUser, getTasks)

taskRouter.get('/:taskId', authUser, getTask)

taskRouter.get('/remove/:taskId', authUser, deleteTask)

taskRouter.get('/update/:taskId', authUser, updateTask)


export default taskRouter;