const express = require("express");
const app = express()
const response = require("./respond")


app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
   res.setHeader("Access-Control-Allow-Headers","*");
   res.setHeader("Access-Control-Allow-Methods",["GET","POST"]);
   res.setHeader("Access-Control-Max-Age",36000);
   next();   
 })

app.get("/",(req,res)=>{
    res.send("hello")
})

const somefunc=()=>{
    console.log("Hello Im a function that can do some stuff in server side independently")
}

app.get("/get/simplereq",(req,res)=>{
    console.log(req.headers)
    if(req.headers.origin==="http://localhost:3000"){
        console.log("Its safe")
    somefunc();
    }
    else{
        console.log("Somethings fishy")
    }
    console.log("res is made")
    res.setHeader("Pragma","no-cache").setHeader("Cache-Control","no-store");
    response(res,200,"success",null,"Hello Mr Potter")
})

app.get("/get/preflight",(req,res)=>{
    console.log(req.header.Custom_Headre)
   res.status().send("This request required preflight")
})

  // console.log(req.headers)
    

app.listen(5000,()=>{
    console.log("Listening at 5000")
})
