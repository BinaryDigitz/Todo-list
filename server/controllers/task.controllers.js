import TasksModel from "../models/task.model.js";
import UserModel from "../models/user.model.js";
import asyncMiddleware from "../middlewares/asyncMiddleware.js";

// Create task: /api/tasks/add
export const createTask = asyncMiddleware(async (req, res) => {
  const { userId } = req;
  const { title, description } = req.body;

  let task = await TasksModel.create({
    title,
    description,
    completed: false,
    user: userId,
  });
  await task.save();

  //   update user model to also have the task ID
  await UserModel.findByIdAndUpdate(userId, { $push: { tasks: task._id } });
  return res.json({
    success: true,
    message: "Task created success fully",
    task,
  });
});

// GET TASKS: /api/tasks
export const getTasks = asyncMiddleware(async (req, res) => {
  const { userId } = req;
  const tasks = await TasksModel.find({ user: userId });
  res.json({ success: true, message: "", tasks });
});

// GET TASK: /api/tasks/taskId
export const getTask = asyncMiddleware(async (req, res) => {
  const { userId } = req;
  const { taskId } = req.params;
  if (!taskId)
    return res.json({
      success: false,
      statusCode: 400,
      message: "Invalid Task ID",
    });

  const task = await TasksModel.findOne({ _id: taskId, user: userId });
  if (!task)
    return res.json({
      success: false,
      statusCode: 400,
      message: "Invalid Task ID",
    });

  return res.json({ success: true, message: "success", task });
});

// GET TASK: /api/tasks/taskId
export const deleteTask = asyncMiddleware(async (req, res) => {
  const { userId } = req;
  const { taskId } = req.params;

  if (!taskId)
    return res.json({
      success: false,
      statusCode: 400,
      message: "Invalid Task ID",
    });
  const availableTask = await TasksModel.findById(taskId);

  // check availabilty of task and belongs to the user
  if (!availableTask || availableTask.user.toString() !== userId) {
    return res.json({
      success: false,
      message: "NOT FOUND / FORBIDDEN",
      statusCode: 403,
    });
  }
  // Delete task from the database
  await TasksModel.findByIdAndDelete({ _id: taskId, user: userId });
// Remove deleted taskId from the user array or task
await UserModel.findByIdAndUpdate(userId, { $pull: { tasks: taskId}})

// Send Remaining task to client to update the UI
  const tasks = await TasksModel.find({ user: userId });
  return res.json({ success: true, message: "Deleted successfully", tasks });
});

// UPDATE TASK: /api/tasks/update/taskId
export const updateTask = asyncMiddleware(async (req, res) => {
  const { userId } = req;
  const { taskId } = req.params;
  if (!taskId)
    return res.json({
      success: false,
      statusCode: 400,
      message: "Invalid Task ID",
    });

  const task = await TasksModel.findByIdAndUpdate(
    { _id: taskId, user: userId },
    { completed: true }
  );
  if (!task)
    return res.json({
      success: false,
      statusCode: 400,
      message: "Invalid Task ID",
    });
  const tasks = await TasksModel.find({ _id: taskId, user: userId });

  return res.json({ success: true, message: "Updated successfully", tasks });
});
