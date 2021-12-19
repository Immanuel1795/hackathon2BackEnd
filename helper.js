import { client } from "./index.js";
import { ObjectId } from "mongodb";

async function createUser(data) {
  return await client.db("learnMonge").collection("pizzausers").insertOne(data);
}

async function getUserByName(username) {
  return await client
    .db("learnMonge")
    .collection("pizzausers")
    .findOne({ username: username });
}

async function getUserByEmail(email) {
  return await client
    .db("learnMonge")
    .collection("pizzausers")
    .findOne({ email: email });
}

async function createAdmin(data) {
  return await client.db("learnMonge").collection("pizzadmin").insertOne(data);
}

async function getAdminByName(username) {
  return await client
    .db("learnMonge")
    .collection("pizzadmin")
    .findOne({ username: username });
}

async function getAdminByEmail(email) {
  return await client
    .db("learnMonge")
    .collection("pizzadmin")
    .findOne({ email: email });
}


async function getPizzas(pizzas) {
  return await client
    .db("learnMonge")
    .collection("pizzas")
    .find(pizzas)
    .toArray();
}

async function createPizzas(data) {
  return await client.db("learnMonge").collection("pizzas").insertMany(data);
}

async function addToCart(data) {
  return await client.db("learnMonge").collection(`${String(data.username)}_cart`).insertOne(data);
}

async function getCartItems(name, data) {
  return await client
    .db("learnMonge")
    .collection(`${String(name)}_cart`)
    .find(data)
    .toArray();
}

async function deleteFromCart(name, data) {
  return await client
    .db("learnMonge")
    .collection(`${String(data.username)}_cart`)
    .deleteOne({ _id: ObjectId(name) });
}

async function getPizzaName(data) {
  return await client.db("learnMonge").collection(`${String(data.username)}_cart`).findOne({name: data.name });
}


export {
  createUser,
  getUserByName,
  createAdmin,
  getAdminByName,
  getAdminByEmail,
  getUserByEmail,
  getPizzas,
  createPizzas,
  addToCart,
  getCartItems,
  deleteFromCart,
  getPizzaName

};
