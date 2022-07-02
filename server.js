//final t2t
const  express=require("express")
const mongoose=require("mongoose")  
const bcrypt=require("bcrypt")
const passport=require("passport")
const localstrategy=require("passport-local").Strategy
const  session=require("express-session")
const MongoStore=require("connect-mongo")
const  flash=require("connect-flash")
const app=express()
const crypto = require('crypto');
require("dotenv").config()
app.use(express.urlencoded({extended:true}));
app.use(flash())
app.set("view engine","ejs")
app.use(express.static('views'))
app.use(express.static('assets'))
app.use(express.static('vendors'))




//mongo db connection 


mongoose.connect( process.env.db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then((res)=>{
        app.listen(process.env.PORT ||3232,()=>{
        console.log("listening smvec")
    })
  
    console.log("success smvec")})
    .catch((err)=>{console.log(err)})


require("./passport/passport")()
    app.use(session({
        secret:process.env.name,
        resave:false,
        saveUninitialized:true,
        store: MongoStore.create({
            mongoUrl:process.env.db
        })
    })) 
    //passport 
    app.use(passport.initialize())
    app.use(passport.session())

app.get('/',(req,res)=>{
    res.render('index')
})
    //route  to signup  
    const signup=require("./controller/signup")
    app.use(signup)

  //route  to signup  
  const login=require("./controller/login")
  app.use(login)
  const upload= require("./controller/upload")
  app.use(upload)
