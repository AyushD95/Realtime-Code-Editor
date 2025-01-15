import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "https://qbj2grf1-5173.inc1.devtunnels.ms/", methods: ["GET", "POST"] },
});

const PORT = 5000;

const userSocketMap = {};

function getAllClients(roomId) {
     
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(         // by defaul it return map so to convert it to an array we use Array.from()
    
    (socktId)=>{      


    return {
        socktId,
        userName: userSocketMap[socktId]
    }
  }) 

}



io.on("connection", (socket) => {
  socket.on("join", ({ roomId, userName }) => {

    userSocketMap[socket.id] = userName;

    socket.join(roomId);

    const clients = getAllClients(roomId);


    clients.forEach(({ socktId })=>{
        
        io.to(socktId).emit("joined",{
            clients,
            joinedUserName:userName,
            socktId:socket.id
        })


    })


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
