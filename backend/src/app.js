import express from 'express';
import { createServer } from 'node:http';

import {Server} from 'socket.io';

import mongoose from "mongoose";
import { connectToSocket } from './controllers/socketManager.js';

import cors from 'cors';
import userRoutes from "./routes/users.routs.js"

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))
app.use(cors());
// app.use(cors({
//     origin: "*",
//       methods: ["GET", "POST"],
//       allowedHeaders: ["*"],
//       credentials: true
// }));
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}))

app.use("/api/v1/users", userRoutes)

const start = async () => {
    app.set("mongo_user");
    //const connectionDb = await mongoose.connect("mongodb+srv://nooruddinansary7:UlL7SjSBljE8SubK@cluster0.hl5z6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    const connectionDb = await mongoose.connect("mongodb+srv://nooruddinansary7:UlL7SjSBljE8SubK@cluster0.hl5z6.mongodb.net/")

    console.log("MongoDb Connected");
    server.listen(app.get("port"), () =>{
        console.log("Listening...")
    });
}
start();