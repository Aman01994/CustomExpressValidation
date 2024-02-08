const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express()
require('dotenv').config()

app.use(express.json());

app.post("/emailid",body("Email").isLength({min:6})
    .withMessage("Must be more than 6 Characters")
    .matches(/\d/).withMessage("Must contain a number")
    ,body("Password").isLength({min:6}).withMessage("Password Must have 6 Characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i").withMessage("Not Valid Password")
    ,(rep,res)=>{ 
            const error = validationResult(rep)
            if(!error.isEmpty()){
                return res.status(200).json({
                    error : error
                })
            }else{
                res.status(200).json({
                Success : `Your Email ID & Password are valid`
               })
            } 
        //    console.log()
    });


let Port = process.env.PORT
app.listen(Port, ()=>{
    console.log(`This Server is runnig on ${Port}`)
})