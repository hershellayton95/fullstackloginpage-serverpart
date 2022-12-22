import express from "express";
import usersJson from "../profile.json"

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json(usersJson);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const user = usersJson.find(item=> item.id === id);

    res.status(200).json(user);
});

export default router;
