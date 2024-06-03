import dotenv from 'dotenv';
dotenv.config();

import mongoose  from "mongoose";

mongoose.connect(process.env.ConnectionString);

import express, { json } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js"

const app = express();
app.use(json());
app.use(
    cors({
        origin: "*"
    })
);

//authentication
app.use("/api/users", authRoutes);

app.listen(8000);

export default app;