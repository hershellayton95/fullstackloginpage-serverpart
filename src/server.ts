import "dotenv/config";
import "express-async-errors";
import express from "express";
import { MongoClient } from 'mongodb';
let blogDB, articoliCollection : any;


const app = express();
const port = process.env.PORT;

const dbURI = 'mongodb://127.0.0.1:27017';


const mongoClient = new MongoClient(dbURI);

//Create
app.get("/nuovo-articolo", async(req, res)=>{

    const articolo ={
        titolo: "Titolo articolo 1",
        testo: "Testo articolo 1",
        autore: "Filippo",
        tag: ["node.js", "javascript", "mongodb"]
    }
    const ris = await articoliCollection.insertOne(articolo);

    if(!ris.acknowledged){
        res.status(200).send("qualsocsa è andato storto");
        return;
    }

    res.status(200).send("creato");
});

app.get("/articolo", async (req, res) =>{
    const articolo = await articoliCollection.findOne({ titolo: "Titolo articolo 1"})
    console.log(articolo);

    res.send(articolo);

});

app.get("/articoli", async (req, res) =>{
    const cursor = articoliCollection.find({ }) //ritorna un istanza

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any[] = [];

    // await cursor.forEach((articolo: any) => {
    //     json.push(articolo)
    // });

    // for await (const articolo of cursor) {
    //     json.push(articolo)
    // }

    while(await cursor.hasNext()){
        json.push(await cursor.next())
    }

    res.send(json)
});

// app.get("/modifica-articolo", (req, res) =>{

// });

// app.get("/leggi-articolo", (req, res) =>{

// });

const run = async () => {
    await mongoClient.connect();
    console.log(`Connected MongoDB: ${dbURI}`);

    app.listen(port,()=>{
        console.log(`[server] connect to http://localhost/${port}`);
    });

    blogDB = mongoClient.db('blog');
    articoliCollection = blogDB.collection('articoli')
}

run().catch(error => console.log(error));

