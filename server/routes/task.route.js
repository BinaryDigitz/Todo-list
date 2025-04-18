import { Router } from "express";
import authUser from "../middlewares/authUser.js";
import { createTask } from "../controllers/task.controllers.js";

const taskRouter = Router()

taskRouter.post('/add', authUser, createTask)


export default taskRouter;