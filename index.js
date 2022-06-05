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

  socket.on("message", (data) => {
    io.emit("message", socket.id + ": " + data)
  })

  console.log(players)

  socket.on('tankPosition', (data) => {
    console.log(JSON.parse(data))
    io.emit('tankPosition', JSON.parse(data))
  })

  socket.on('disconnected', (data) => {
    players = removeItemFromArray(players, socket.id)    
  })
});

io.on("disconnect", (socket) => {
  console.log("disconnected")
})

function removeItemFromArray(arr, value){
  var indexOfItem = arr.indexOf(value)

  if(indexOfItem > -1){
    arr.splice(indexOfItem, 1)
  }

  return arr
}