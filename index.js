const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(process.env.PORT, () => console.log(`Server Started at PORT:8000`));
