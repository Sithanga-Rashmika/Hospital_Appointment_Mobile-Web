import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";


const app = express();
app.use(bodyParser.json());
dotenv.config();

app.use(cors());

const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log("=================================");
  console.log(`** Server is running on ${port} **`);
});

const url = process.env.MONGODB_URL;
mongoose.connect(url, {});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("***** MongoDB connected *****");
  console.log("=================================");
});


import userRouter from "./routes/userRoutes.js";
app.use("/user", userRouter);

import appointmentRouter from "./routes/appointmentRoutes.js";
app.use("/appointment", appointmentRouter);

import addRouter from "./routes/addRoutes.js";
app.use("/adds", addRouter);