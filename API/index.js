const WebSocket = require('ws')
const server = new WebSocket.Server({
    port: 3001
})

const sockets = []
let socketId = 0

server.on('connection', function(socket){
    socketId++
    sockets.push({
        id: socketId,
        socket: socket
    })

    socket.on('message', function(msg){
        const msgString = msg.toString()
        
        const anotherUsers = sockets.filter(x => x.socket != socket)

        for(au of anotherUsers){
            au.socket.send(msgString)
        }
    })
    socket.on('close', function(){
        const socketIdx = sockets.findIndex(x => x.socket == socket)
        sockets.splice(socketIdx,1)
    })
})