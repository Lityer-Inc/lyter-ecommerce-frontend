import express  from "express";
import userRouter from "./routes/user.js";
import bodyParser from "body-parser";
import cors from "cors";
import {handleErrors} from "./middleWare/error.js";
import {Logger} from "./middleWare/log.js";
import mongoose from "mongoose";
import storeRouter from "./routes/store.js";
import dotenv from 'dotenv';

const app = express(); 


dotenv.config();

//parse application/json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Logger middleware
app.use(Logger.logRequest);

//const EndpointHead = process.env.EndpointHead;
const EndpointHead = ""; // temporary...- JF
 mongoose.connect("mongodb+srv://lityer:123@cluster0.jla8m8u.mongodb.net/?retryWrites=true&w=majority").then(()=>{
  console.log("connected");
 }).catch((e)=>{console.log(e)});


// app.use(`${EndpointHead}/auth`, authRouter);
app.use(`${EndpointHead}/user`, userRouter);
app.use(`${EndpointHead}/stores`, storeRouter); 
app.use(`${EndpointHead}/stores`, storeRouter);

// Middleware to log incoming requests to the orders route

app.use(handleErrors);

app.listen(8000, function () {
  console.log("App is Listening http://localhost:8000");
});
