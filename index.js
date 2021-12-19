import express from "express";
const app = express();
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { usersRouter } from "./routes/users.js";
import { adminsRouter } from "./routes/admins.js";
import { pizzasRouter } from "./routes/pizzas.js";
import { razorpayRouter } from "./routes/razorpay.js";

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

app.use("/users", usersRouter);
app.use("/admins", adminsRouter);
app.use("/pizzas", pizzasRouter);
app.use(`/razorpay`, razorpayRouter)


app.listen(PORT, () => console.log("app started"));



