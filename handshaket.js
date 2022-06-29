//server
io.on("connection", (socket) => {
    console.log(socket.handshake.query);
    console.log(socket.handshake.headers['authorization']);
})

//client
const socket = io("http://localhost:3000", {
    query: {
        field1: "value1",
        field2: "value2"
    },
    transportOptions: {
        polling:{
            extraHeaders: {
                Authorization: "Bearer <token>"
            }
        }
    }
});