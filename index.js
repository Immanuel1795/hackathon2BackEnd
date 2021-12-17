import express from "express";
const app = express();
import { MongoClient } from "mongodb";
import dotenv from "dotenv";


dotenv.config();
import cors from 'cors';


const PORT = process.env.PORT || 9000;

const MONGO_URL = process.env.MONGO_URL;



app.use(express.json());
app.use(cors());

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("mongo db connected");

  return client;
}

export const client = await createConnection();

app.get("/", (request, response) => {
  response.send("hello worldzz!!!");
});


app.listen(PORT, () => console.log("app started"));



