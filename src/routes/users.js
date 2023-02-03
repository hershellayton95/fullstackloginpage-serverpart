import { Router } from "express";
import prisma from "../middlewares/database/prisma.js";

const router = Router();

router.get("/", async (req, res) => {

    const users = await prisma.user.findMany();

    res
        .header("Content-Type", "application/json")
        .status(200)
        .json(users);

});


export default router;
