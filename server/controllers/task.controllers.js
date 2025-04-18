import TasksModel from "../models/task.model.js";
import UserModel from "../models/user.model.js";
import asyncMiddleware from '../middlewares/asyncMiddleware.js'

// Create task: /api/tasks/add
export const createTask = asyncMiddleware ( async (req, res ) =>{
  const { userId, title, description } = req.body
  console.log(userId);
  
  let task = await TasksModel.create({ title, description, user: userId})
  await task.save()

//   update user model to also have the task ID
  await UserModel.findByIdAndUpdate(userId, { $push : { tasks: task._id}})
  res.json({ success: true, message: 'Task created success fully', task})
})