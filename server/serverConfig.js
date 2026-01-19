import express from 'express'
import Router from '../routes/routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'

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

export const sockets = {}

const users = new Map() 

io.on('connection',(socket)=>{
    socket.on('login',(params)=>{
        socket.join(params.noteId)
        socket.data.userEmail = params.user.email
        socket.data.noteId = params.noteId
        users.set(socket.id, { email: params.user.email,name:params.user.name, img: params.user.img })
        const room = io.sockets.adapter.rooms.get(params.noteId)
        const userList = [...room].map(socketId => users.get(socketId))
        io.to(params.noteId).emit('usersUpdate',userList)
    })
    socket.on("logout", ({ noteId }) => {
        socket.leave(noteId)
        users.delete(socket.id)
        const room = io.sockets.adapter.rooms.get(noteId)
        if(room)
        {
            const userList = [...room].map(socketId => users.get(socketId))
            io.to(noteId).emit('usersUpdate',userList)

        }
    })
    socket.on('textAdd',({noteId})=>{
        socket.to(noteId).emit('textAdded')
    })
    socket.on('titleUpdate',({noteId,title})=>{
        socket.to(noteId).emit('titleUpdated',title)
    })
    socket.on('elementUpdate',({noteId,element})=>{
        socket.to(noteId).emit('elementUpdated',element)
    })
    socket.on('elementDelete',({noteId,id})=>{
        socket.to(noteId).emit('elementDeleted',id)
    })
})

App.use(express.json())

App.use(cookieParser())

App.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

App.use(Router)