import express from "express";
import "express-async-errors";
import userRouter from "./router/users";
import cors from "cors";

const app = express();
app.use(cors());

app.use("/users", userRouter);

app.get("/", (req, res) => {
    res.send("<h1>Homepage</h1><a href='/users'>Users</a>");
});

export default app;
