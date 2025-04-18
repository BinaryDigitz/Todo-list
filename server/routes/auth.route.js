import { Router } from "express";
import { loginUser, registerUser } from '../controllers/auth.controllers.js'

const userRouter = Router()

userRouter.post('/sign-up', registerUser)

userRouter.post('/sign-in', loginUser)


export default userRouter;