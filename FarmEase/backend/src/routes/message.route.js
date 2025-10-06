import { Router } from "express";
import { putMessage, getMessage } from "../controllers/message.controller.js";


const messageRouter = Router()


messageRouter.post('/put', putMessage)

messageRouter.post('/get', getMessage)



export default messageRouter