import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByName, getUserByEmail } from "../helper.js";
import jwt from 'jsonwebtoken'
const router = express.Router();


router.route("/signup").post(async (request, response) => {
  const {username, password, email} = request.body;

  const hashedPassword = await genPassword(password); 
  console.log(hashedPassword)

  const isUserExist  = await getUserByName(username);
  const isEmailExist  = await getUserByEmail(email);

  if(isUserExist){
    response.status(400).send({message: "Users already exist"});
    return
  }

  if(isEmailExist){
    response.status(400).send({message: "Email already exist"});
    return
  }

  if(password.length < 8){
    response.status(404).send({message: "Provide a longer password"});
    return
  }

  if(!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)
  ){
    response.status(404).send({message: "Password pattern dosent match"});
    return
  }

  const result = await createUser({username, password: hashedPassword, email})
  response.send(result);
  });


  router.route("/signin").post(async (request, response) => {
    const {email, password} = request.body;  
    const userFromDB  = await getUserByEmail(email);

    if(!userFromDB){
      response.send({message: "Invalid Credentials", status: 404})
      return;
    }

    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);

    if(isPasswordMatch){
      const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY)
      response.send({message: "Successful login", token: token, username:userFromDB.username, type:"user"})
     
    } else {
      response.send({message: "Invalid Credentials", status: 404})
      
    }

   });


export const usersRouter = router;

async function genPassword(password) {
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
