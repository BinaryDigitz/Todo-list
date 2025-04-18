import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
   
    title:{
        type:String,
        required: true,
        maxLength: 50
    },
    description:{
        type:String,
        required: true,
        maxLength: 250
    },
    completed: {
        type:Boolean,
        defult: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamp: true})

const TasksModel = mongoose.model('Task', taskSchema)

export default TasksModel