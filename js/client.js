const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const msgInp = document.getElementById("msgInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("tone.mp3");
const append = (message, position) => {
  const msgElement = document.createElement("div");
  msgElement.innerText = message;
  msgElement.classList.add("message");
  msgElement.classList.add(position);
  messageContainer.append(msgElement);
  if (position == "Left") {
    audio.play();
  }
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = msgInp.value;
  append(`You: ${message}`, "Right");
  socket.emit("send", message);
  msgInp.value = "";
});
const name = prompt("Enter your name to join. ");
socket.emit("new-user-joined", name);

socket.on("user-joined", (name) => {
  append(`${name} joined the Chat`, "Right");
});

socket.on("receive", (data, name) => {
  append(`${data.name} :${data.message}`, "Left");
});
socket.on("Left", (name) => {
  append(`${name} left the chat.`, "Left");
});
