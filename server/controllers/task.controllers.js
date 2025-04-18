import TasksModel from "../models/task.model.js";
import UserModel from "../models/user.model.js";
import asyncMiddleware from '../middlewares/asyncMiddleware.js'

// Create task: /api/tasks/add
export const createTask = asyncMiddleware ( async (req, res ) =>{
  const { userId } = req
  const { title, description } = req.body

  
  let task = await TasksModel.create({ title, description, completed:false, user: userId})
  await task.save()

//   update user model to also have the task ID
  await UserModel.findByIdAndUpdate(userId, { $push : { tasks: task._id}})
return  res.json({ success: true, message: 'Task created success fully', task})
})

// GET TASKS: /api/tasks
export const getTasks = asyncMiddleware( async (req, res) => {
  const { userId } = req
    const tasks = await TasksModel.find({user: userId})
    res.json({success: true, message:'', tasks})
})


// GET TASK: /api/tasks/taskId
export const getTask = asyncMiddleware( async (req, res) => {
    
})