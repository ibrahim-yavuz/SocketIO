import { Server } from "socket.io";

const io = new Server(3000, '207.154.197.220', {
  // options
});

var players = []
var playerCounter = 0

io.on("connection", (socket) => {
  console.log("Connection created!")

  players[playerCounter++] = socket.id
  
  io.emit("playerConnected", players)

  console.log(players)

  socket.on('tankPosition', (data) => {
    console.log(JSON.parse(data))
    io.emit('tankPosition', JSON.parse(data))
  })

  socket.on('disconnected', (data) => {
    const index = players.indexOf(socket.id);

    if (index > -1) {
      players.splice(index, 1);
    }
    
  })
});

io.on("disconnect", (socket) => {
  console.log("disconnected")
})