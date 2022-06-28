const socket = io("http://localhost:3000");
socket.on("connect", data => {
    socket.emit("welcome-client", "hello server i'm front-end developer")
    socket.on("welcome-server", data => {
        console.log(data );
    })
})
