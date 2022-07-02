const route=require('express').Router()
const user=require('../model/user')
const bcrypt=require('bcrypt')

route.get('/signup',(req,res)=>{
    res.render('signup')
})

route.post('/signup',(req,res)=>{
    console.log(req.body)
    user.findOne({username:req.body.username})
    .then((result)=>{
        if(result)
        {   
           
             res.status(400).send('already exists')
        }
        else
        {
            const  salt=bcrypt.genSalt(10)
        const pass=req.body.password.toString();
        bcrypt.hash(pass,parseInt(salt))
        .then((hash)=>{
        const user_new=new user( {
           username:req.body.username,
           password:hash,
           name:req.body.name,
           enrollno:req.body.enrollno,
           email:req.body.email
       })
        user_new.save()
        console.log("inserted sucessfully")
        res.redirect('/login')
    })
        }
    })
})
module.exports=route