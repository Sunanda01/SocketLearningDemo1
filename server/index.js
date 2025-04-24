const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const PORT = 8000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

//server listen for single time on connection
io.on("connection", (socket) => {
  console.log(`User Connected -${socket.id}`);
  //listen to client
  socket.on("sendMessage", (msg) => {
    console.log(msg);
    //send from server to client
    io.emit("receiveMessage", msg);
  });
  socket.on("disconnect", () => {
    console.log(`User Disconnected -${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Connected @ PORT ${PORT}`);
});
