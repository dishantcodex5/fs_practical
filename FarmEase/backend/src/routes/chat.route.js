import { putChat, startChat } from "../controllers/chat.controller.js";
import {Router} from 'express'

const chatRouter = Router()

chatRouter.post('/start', startChat)

chatRouter.post('/put', putChat)


export default chatRouter