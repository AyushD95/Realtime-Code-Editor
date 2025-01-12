import express from "express"
import 'dotenv/config'
import mongoConnect from "./connection.js";
import roomCreateJoin from "./routes/roomCreateJoin.js";

const PORT= process.env.PORT || 503
const app= express();

mongoConnect(process.env.MONGO_URL)




app.use('/',roomCreateJoin)


app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))