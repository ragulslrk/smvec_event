const route=require("express").Router()
route.get("/dashboard",(req,res)=>{ 
    console.log("in das")
    res.send('this dashboard page')
})

module.exports=route