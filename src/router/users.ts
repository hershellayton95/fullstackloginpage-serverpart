import express from "express";
import usersJson from "../profile.json";
import fs from 'fs/promises';

type ObjectServer = {
    id: string;
    username: string;
    email: string;
    password: string;
};



async function example(content : ObjectServer[]) {
    try {
        await fs.writeFile('./src/profile.json', JSON.stringify(content));
    } catch (err) {
        console.log(err);
    }
}



const arrayList: ObjectServer[] = usersJson;

const router = express.Router();

router.get("/", (req, res) => {
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

    res.status(200).json(user);
});

router.get("/login", (req, res) => {
    const { username, password } = req.query;

    const user: ObjectServer | undefined = arrayList.find(
        (item: ObjectServer) =>
            item.username === username && item.password === password
    );

    if (!user) {
        res.status(401).json({
            success: false,
            note: "username o password sono errate",
        });
        return;
    }
    res.status(200).json(user);
});

router.post("/signin", (req, res) => {
    const { email, username, password } = req.query;

    if (
        usersJson.some(
            (item: ObjectServer) =>
                item.email === email &&
                item.username === username &&
                item.password === password
        )
    ) {
        res.status(200).send("user already exists");
        return;
    }

    arrayList.push({
        id: String(arrayList.length + 1) as string,
        username: username as string,
        email: email as string,
        password: password as string,
    });


    example(arrayList);

    res.status(200).json(arrayList);
});

export default router;
