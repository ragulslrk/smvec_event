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


route.get('/logout', (req, res) => {
    if(req.isAuthenticated())
    {
        req.logout(function(err) {
            if (err) { return next(err); }
            req.session.destroy();
            res.redirect('/');
          });
    }
    else{
        res.redirect('/');
    }
    })
module.exports=route