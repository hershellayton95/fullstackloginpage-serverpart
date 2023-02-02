import express from "express";
import userRoute from "./routes/users.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/users', userRoute);

export default app;
