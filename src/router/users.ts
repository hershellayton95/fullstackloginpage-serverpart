import express from "express";
import "express-async-errors";
import usersJson from "../profile.json";
import fs from "fs/promises";
import { createHmac } from "node:crypto";

type ObjectServer = {
    id: string;
    username: string;
    email: string;
    password: string;
};

async function writeJson(content: ObjectServer[]) {
    try {
        await fs.writeFile("./src/profile.json", JSON.stringify(content));
    } catch (err) {
        console.log(err);
    }
}

function hash(secret: string): string {
    const secretWord = secret;
    const hash = createHmac("sha256", secretWord)
        .update("Quanto è stato difficile farlo")
        .digest("hex");
    return hash;
}

const arrayList: ObjectServer[] = usersJson;

const router = express.Router();

router.get("/", (req, res) => {
    const arrayToSent: Partial<ObjectServer>[] = [];

    arrayList.forEach((item) =>
        arrayToSent.push({
            id: item.id,
            username: item.username,
            email: item.email,
        })
    );

    res.status(200).json(arrayToSent);
});

router.get("/withpassword", (req, res) => {
    res.status(200).json(arrayList);
});

router.get("/user/:id", (req, res) => {
    const { id } = req.params;

    const user: ObjectServer | undefined = arrayList.find(
        (item) => item.id === id
    );

    if (typeof user === "undefined") {
        res.status(200).send("User not found");
        return;
    }

    const objectToSent: Partial<ObjectServer> = {
        id: user.id,
        username: user.username,
        email: user.email,
    };

    res.status(200).json(objectToSent);
});

router.get("/login", (req, res) => {
    const { username, password } = req.query;

    const user: ObjectServer | undefined = arrayList.find(
        (item: ObjectServer) =>
            item.username === username &&
            item.password === hash(String(password))
    );

    if (!user) {
        res.status(401).json({
            success: false,
            note: "username o password sono errate",
        });
        return;
    }
    res.status(200).json({ success: true, message: "you've logged" });
});

router.post("/signin", (req, res) => {
    const { email, username, password } = req.query;

    if (
        usersJson.some(
            (item: ObjectServer) =>
                item.email === email || item.username === username
        )
    ) {
        res.status(200).json({
            success: false,
            note: "email or username already used",
        });
        return;
    }

    arrayList.push({
        id: String(arrayList.length + 1) as string,
        username: username as string,
        email: email as string,
        password: hash(String(password)) as string,
    });

    writeJson(arrayList);

    res.status(200).json({ success: true, message: "user added" });
});

router.put("/user/:id", (req, res) => {
    const { id } = req.params;
    const { password, ...user } = req.body;

    if (!arrayList.some((item) => item.id === id)) {
        res.status(200).json({ success: false, message: "user doesn't exist" });
        return;
    }

    const index = arrayList.findIndex((item) => item.id === id);

    if (arrayList[index].id !== user.id) {
        res.status(200).json({
            success: false,
            message: "non puoi cambiare id",
        });
        return;
    }

    arrayList[index] = {
        ...arrayList[index],
        ...user,
        password: hash(String(password)),
    };

    writeJson(arrayList);

    res.status(200).json({ success: true, message: "user has been modified" });
});

router.delete("/user/:id", (req, res) => {
    const { id } = req.params;

    if (arrayList.some((item) => item.id === id)) {
        const index = arrayList.findIndex((item) => item.id === id);
        arrayList.splice(index, 1);
    } else {
        res.status(200).json({ success: false, message: "user doesn't exist" });
        return;
    }

    writeJson(arrayList);

    res.status(200).json({ success: true, message: "user has been deleted" });
});

export default router;
