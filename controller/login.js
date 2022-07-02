const route=require('express').Router()
const passport=require("passport")

route.get('/login',(req,res)=>{
    res.render('login', {message: req.flash('error'),info:req.flash('info')})
})
//login post request 
route.post('/login', passport.authenticate('local-login', {
    successRedirect : '/dashboard',
    failureRedirect : '/login',
    failureFlash : true
}));
module.exports=route