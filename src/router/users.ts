import express from "express";
import usersJson from "../profile.json"

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(usersJson);
});

router.get("/user/:id", (req, res) => {
    const { id } = req.params;

    const user = usersJson.find(item=> item.id === id);

    res.status(200).json(user);
});

router.get("/search", (req, res) => {
    const { username , password } = req.query;

    const user = usersJson.find(item=> item.username === username && item.password === password);

    if(!user) res.status(401).json({success: false, note: "username o password sono errate"})

    res.status(200).json(user)
});

export default router;
