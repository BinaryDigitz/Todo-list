import { Router } from "express";
import authUser from "../middlewares/authUser.js";
import { createTask, getTask, getTasks } from "../controllers/task.controllers.js";

const taskRouter = Router()

taskRouter.post('/add', authUser, createTask)

taskRouter.get('/', authUser, getTasks)

taskRouter.get('/:taskId', getTask)


export default taskRouter;