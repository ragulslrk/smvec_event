const route=require('express').Router()


route.get('/upload',(req,res)=>{
    res.render('upload')
})

module.exports=route