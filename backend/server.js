import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const PORT = 5000;

const userSocketMap = {};

function getAllClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    // by defaul it return map so to convert it to an array we use Array.from()

    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  socket.on("join", ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;

    socket.join(roomId);

    const clients = getAllClients(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        joinedUserName: userName,
        socketId: socket.id,
      });
    });
  });

  socket.on("disconnecting", () => {
    const room = [...socket.rooms];

    room.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        LeavingUserName: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
    socket.leave();
  });
});

server.listen(PORT, () => console.log(`Server Started at ${PORT}`));

// import express from "express"
// import 'dotenv/config'
// import mongoConnect from "./connection.js";
// import roomCreateJoin from "./routes/roomCreateJoin.js";

// const PORT= process.env.PORT || 503
// const app= express();

// mongoConnect(process.env.MONGO_URL)

// app.use('/',roomCreateJoin)

// app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))
