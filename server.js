const http = require("http");
const server = http.createServer();
const socketIO = require("socket.io")
const io = socketIO(server, {
    cors: {
        origin: '*'
    }
})
io.on("connection", (socket) => {
    socket.on("welcome-client", (data) => {
        console.log(data);
    })
    socket.emit("welcome-server", "hello client i'm backend developer")
})
server.listen(3000, () => console.log("run on port 3000"))