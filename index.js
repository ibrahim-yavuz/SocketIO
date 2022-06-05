import { Server } from "socket.io";

const io = new Server(3000, '207.154.197.220', {
  // options
});

var players = []
var playerCounter = 0


var array = [1,2,3,4,5,6,7,8]

array = removeItemFromArray(array, 2)
console.log(array)

io.on("connection", (socket) => {
  console.log("Connection created!")

  players[playerCounter++] = socket.id
  
  io.emit("playerConnected", players.filter(String))

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