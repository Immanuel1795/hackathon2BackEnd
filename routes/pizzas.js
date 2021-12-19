import express from "express";



const router = express.Router();
import {
    getPizzas,
  createPizzas,
  addToCart,
  getCartItems,
  deleteFromCart,
  getPizzaName
} from "../helper.js";

import { auth } from "../middleware/auth.js";



router
  .route("/")
  .get(auth, async (request, response) => {
  const data = request.query;

  const pizzas = await getPizzas(data);

  response.send(pizzas);
  })
  .post(async (request, response) => {
    const data = request.body;
  
    const result = await createPizzas(data);
  
    response.send(result);
    });
 
router
.route("/cart/:name")
.get(auth, async (request, response) => {
   
    const { name } = request.params;
    const data = request.query;


    const cartItem = await getCartItems(name, data);
  
    response.send(cartItem);
    })
.post(auth, async (request, response) => {
    const data = request.body;
  
  const isPizzaExist  = await getPizzaName(data);

  console.log(data)

  if(isPizzaExist){
    response.status(400).send({message: "Pizza already added"});
    return
  }

  const result = await addToCart(data);
  
  response.send(result);

    })
    .delete(auth,async (request, response) => {
      const { name } = request.params;
      const data = request.body;
      const result = await deleteFromCart(name, data);
    
      response.send(result);
    });



  
  






export const pizzasRouter = router;
