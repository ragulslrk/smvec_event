const route=require('express').Router()
const user=require('../model/user')
const bcrypt = require('bcryptjs');


route.get('/signup',(req,res)=>{
    res.render('signup',{message: req.flash('error')})
})

route.post('/signup',(req,res)=>{
    console.log(req.body)
    user.findOne({username:req.body.username})
    .then((result)=>{
        if(result)
        {   
           
            req.flash('error', 'Username Already Exist')
            res.redirect('/signup')
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
        req.flash('info', 'Account Created Successfully,Please Login')
        res.redirect('/login')
    })
        }
    })
})
module.exports=route