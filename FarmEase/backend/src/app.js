import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path,{dirname} from 'path'
import { fileURLToPath } from 'url'
import userRouter from './routes/user.route.js'
import { createServer } from 'http'
import {Server} from 'socket.io'
import messageRouter from './routes/message.route.js'
import chatSocket from './sockets/chatSocket.js'
import productRoutes from './routes/product.routes.js'
import chatRouter from './routes/chat.route.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.static(path.join(__dirname.split('\src')[0],'public')))

app.use(cookieParser())



//routes

app.use('/user',userRouter)

app.use('/message', messageRouter)

app.use('/product', productRoutes)

app.use('/chat', chatRouter)

app.use('/dashboard', dashboardRoutes)

app.get('/viraldobariya', (req,res) => {
    res.send(`${process.env.CORS_ORIGIN}`)
})


//creating server

const server = createServer(app)

//creating socket1.io server instance

const io = new Server(server, {
    'cors': {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
})


chatSocket(io)





export default server