const http = require("http");
const express = require("express");
const app = express();
app.use(express.static("./"))
const server = http.createServer(app);
const socketIO = require("socket.io")
const io = socketIO(server, {
    cors: {
        origin: '*'
    }
})

io.on("connection", (socket) => {
    socket.on("clientMessage", data => {
        io.emit("serverMessage", data)
    })
})

server.listen(3000, () => console.log("run on port 3000"))