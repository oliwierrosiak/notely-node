import { io } from "../server/serverConfig.js" 

const users = new Map() 

function socketSetup(socket)
{
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
    socket.on('disconnect',(params)=>{
        const { noteId } = socket.data
        users.delete(socket.id)
        if(noteId)
        {
            const room = io.sockets.adapter.rooms.get(noteId)
            if(room)
            {
                const userList = [...room].map(socketId => users.get(socketId))
                io.to(noteId).emit('usersUpdate', userList)
            }
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
    socket.on('canvasUpdate',({canvas,noteId})=>{
        socket.to(noteId).emit("canvasUpdated",canvas)
    })
    socket.on('boardTemplateUpdate',({noteId,template})=>{
        socket.to(noteId).emit("boardTemplateUpdated",template)
    })
    socket.on('boardColorUpdate',({noteId,color})=>
    {
        socket.to(noteId).emit("boardColorUpdated",color)
    })
}

export default socketSetup