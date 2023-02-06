import express from "express";
import userRoute from "./routes/users.js";
import bodyParser from "body-parser";
import corsMiddleware from "./middlewares/cors/cors.js";
import sessionMiddlware from "./middlewares/session/session.js";

const app = express();

app.use([corsMiddleware(), bodyParser.json(), sessionMiddlware()]);

app.use('/users', userRoute);

app.get("/", function (req, res) {
    res.send("Hello");
});

app.get("/session", function (req, res) {
    req.session.visits = req.session.visits ? req.session.visits + 1 : 1;
    res.send("Visits: " + req.session.visits);
});


export default app;
