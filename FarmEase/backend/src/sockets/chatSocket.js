
let usermap = new Map()

const chatSocket = (io) => {
    io.on("connection", (socket) => {
        console.log('socket is connected', socket.id)
        console.log(usermap)
        socket.on('join', ({room}) => {
            socket.join(room)
            console.log(`${socket.id} has joined room ${room}`)
        })

        socket.on('leave', ({room}) => {
            socket.leave(room)
            console.log(`${socket.id} has left room ${room}`)
        })
        
        socket.on('sendMessage', ({roomId, sender, message}) => {
            socket.to(roomId).emit('receiveMessage', {sender, message})
            console.log({sender, message, roomId})
        })

        socket.on('map', (username) => {
            usermap.set(username, socket.id)
        })

        socket.on('chatSend', ({chatId, to, text}) => {
            console.log({chatId, to, text})
            if (usermap.has(to)){
                const toSocketId = usermap.get(to)
                io.to(toSocketId).emit('chatSend', {chatId, text})
            }
        })
    })
}

export default chatSocket;