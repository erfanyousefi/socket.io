
function initializeChatBox(){
    const localstorageValue = localStorage.getItem("messages")
    const messages = (localstorageValue? localstorageValue.split("#") : []).map(item => {
        if(item) return item
    })
    messages?.forEach(item => {
        const paragraphElement = document.createElement("p");
        paragraphElement.innerText = item;
        const chatBox = document.querySelector(".chatBox");
        chatBox.appendChild(paragraphElement)
    })
}
initializeChatBox()
const socket = io("http://localhost:3000");
socket.on("connect", data => {
   const sendBtn = document.getElementById("sendBtn");
   sendBtn.addEventListener("click", (e) => {
    const textBox = document.getElementById("text");
    const message = textBox.value;
    if(!message) return alert("textbox cannot be empty")
    socket.emit("clientMessage", message)
    textBox.value = ""
   })
})
socket.on("serverMessage", message => {
    let localstorageValue = localStorage.getItem("messages")? localStorage.getItem("messages")+ "#" + message : message   
    localStorage.setItem("messages", localstorageValue )
    const paragraphElement = document.createElement("p");
    paragraphElement.innerText = message;
    const chatBox = document.querySelector(".chatBox");
    chatBox.appendChild(paragraphElement)
})
