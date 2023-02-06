import { Router } from "express";
import prisma from "../middlewares/database/prisma.js";

const router = Router();

router.get("/", async (req, res) => {

    try {
        const users = await prisma.profile.findMany();

        res
            .header("Content-Type", "application/json")
            .status(200)
            .json({ status: 'success', data: users });
    } catch (error) {
        res
            .header("Content-Type", "application/json")
            .status(500)
            .json({ status: 'failure', message: `${error}` });
    }

});

router.post("/signup", async (req, res) => {

    const user = req.body;

    try {
        const users = await prisma.user.create({
            data: user
        });

        res
            .header("Content-Type", "application/json")
            .status(200)
            .json({ status: 'success', data: users });
    } catch (error) {
        res
            .header("Content-Type", "application/json")
            .status(500)
            .json({ status: 'failure', message: `${error}` });
    }

});

export default router;
