import express from 'express'
import Router from '../routes/routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'
import socketSetup from '../socket/socketSetup.js'

const App = express()

export const server = http.createServer(App)

export const io = new Server(server,{
    cors:{
        origin:[
            `http://localhost:3000`
        ],
        methods:['GET','POST'],
        credentials:true
    }
})

io.on('connection',socketSetup)

App.use(express.json())

App.use(cookieParser())

App.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

App.use(Router)