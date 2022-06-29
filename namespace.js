const http = require("http");
const express = require("express");
const app = express();
app.use(express.static("./"))
const server = http.createServer(app);
const socketIO = require("socket.io")
const io = socketIO(server, {
    cors: {
        origin: '*'
    },
    serverClient: true, 
})

io.on("connection", () => {
    io.emit("broadCast", "hello everyone")
})
io.of("/teachers").on("connection", (socket) => {
    socket.on("teacherClient", (data) => {
        console.log(data);
    })
    socket.emit("teacherServer", "hello teachers i'm yourServer")
})
io.of("/student").on("connection", (socket) => {
    socket.on("studentClient", (data) => {
        console.log(data);
    })
    socket.emit("studentServer", "hello student i'm your server")
})
server.listen(3000, () => console.log("run on port 3000"))

//client code 
const socket = io("http://localhost:3000");
socket.on("broadCast", data => {
    console.log(data);
})
const teacherSocket = io("http://localhost:3000/teachers");
teacherSocket.on("connect", data => {
    teacherSocket.emit("teacherClient", "message from teacher namespace")
    teacherSocket.on("teacherServer", data => {
        console.log(data );
    })
})
const strudentSocket = io("http://localhost:3000/student");
strudentSocket.on("connect", data => {
    strudentSocket.emit("studentClient", "message from student namespace")
    strudentSocket.on("studentServer", data => {
        console.log(data );
    })
})
