const route=require("express").Router()
route.get("/dashboard",(req,res)=>{ 
    console.log("in das")
    if(req.isAuthenticated())
    {
        res.render('upload',{message:req.flash('info')})
    }
    else
    {    req.flash('error', 'Please Login Or signup to Upload');
        res.redirect('/login')
    }
   
})

module.exports=route