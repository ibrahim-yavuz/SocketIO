import { Server } from "socket.io";

const io = new Server(3000, {
  // options
});

var players = []
var playerCounter = 0

io.on("connection", (socket) => {
  console.log("Connection created!")

  players[playerCounter++] = socket.id
  //socket.emit("yourUserId", players[playerCounter++])
  io.emit("playerConnected", players)

  console.log(players)

  socket.on('tankPosition', (data) => {
    console.log(JSON.parse(data))
    io.emit('tankPosition', JSON.parse(data))
  })
});

io.on("disconnect", (socket) => {
  console.log("disconnected")
})