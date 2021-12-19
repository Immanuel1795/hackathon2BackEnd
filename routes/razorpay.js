import express from "express";
const router = express.Router();

import Razorpay from 'razorpay';


const razorInstance = new Razorpay({
  key_id : process.env.KEY_ID,
  key_secret : process.env.KEY_SECRET
})
router.get("/order",(req,res)=>{

  try{
    const options ={
      amount : 1000 * 100,
      currency : "INR",
      receipt: "receipt#1",
      payment_capture: 0, //1

    };
    razorInstance.orders.create(options,async function(err,order){
      if(err){
        return res.status(500).json({
          message: "Something error!s"
        })
      }
      return res.status(200).json(order)
    });
  }
  catch(err){
    return res.status(500).json({
      message: "Something error!s"
    })
  }
});

router.post("/capture/:paymentId",(req,res)=>{
  try{
    

      fetch(`https://${process.env.KEY_ID}:${process.env.KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,{
        method: "POST",
        form:{
            amount : 10 *100,
            currency: "INR"
          },
      })
      .then(data=>{
        if(err){
            return res.status(500).json({
              message: "Something error!s"
            })
          }
          return res.status(200).json(body)
      })
    }

  catch(err){
    return res.status(500).json({
      message: err.message
    })
  }
})

export const razorpayRouter = router;