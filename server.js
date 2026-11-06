const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("Foydalanuvchi ulandi:", socket.id);

  socket.on("join", (name) => {
    socket.data.name = name;
    socket.broadcast.emit("notice", name + " tizimga kirdi");
  });

  socket.on("message", (message) => {
    io.emit("message", {
      name: socket.data.name || "Noma'lum",
      text: message
    });
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Uz Telegram serveri 3000-portda ishlayapti");
});
