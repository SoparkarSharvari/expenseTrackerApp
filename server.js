const express =require('express');
const app=express()

app.get("/",(req,res)=>{
    res.send({status:"started"})
})
app.listen(5001,()=>{
    console.log("server is running");
})

