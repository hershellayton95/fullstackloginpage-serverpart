import express from "express";
import "express-async-errors";
import userRouter from "./router/users";

const app = express();
app.use("/users", userRouter);

export default app;
