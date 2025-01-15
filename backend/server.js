import express from "express"
import http from 'http'
import { Server } from "socket.io";



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }

  })


const PORT= 5000;

app.get("/",(req,res)=>res.send("Hi"))


io.on("connection", (socket) => {
    console.log("User connected:", socket.id);  // This should be printed when the client connects

    socket.on("new", (msg) => {
        console.log(`Message from ${socket.id}:`, msg);  // This should be printed when the client emits the 'new' event
    });
});





server.listen(PORT,()=> console.log(`Server Started at ${PORT}`))




// import express from "express"
// import 'dotenv/config'
// import mongoConnect from "./connection.js";
// import roomCreateJoin from "./routes/roomCreateJoin.js";

// const PORT= process.env.PORT || 503
// const app= express();

// mongoConnect(process.env.MONGO_URL)




// app.use('/',roomCreateJoin)


// app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))