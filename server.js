//final t2t
const  express=require("express")
const mongoose=require("mongoose")  
const bcrypt = require('bcryptjs');
const passport=require("passport")
const localstrategy=require("passport-local").Strategy
const  session=require("express-session")
const MongoStore=require("connect-mongo")
const  flash=require("connect-flash")
const up_stu=require('./model/upload')
const multer=require('multer')
const path= require('path')
const app=express()
const crypto = require('crypto');

require("dotenv").config()
app.use(express.urlencoded({extended:true}));
app.use(flash())
app.set("view engine","ejs")
app.use(express.static('views'))
app.use(express.static('assets'))
app.use(express.static('vendors'))
app.use('/uploads', express.static(__dirname +'/uploads'))




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
        secret:'smvec',
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
  const das= require("./controller/dashboard")
  app.use(das)

//multer 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  var upload = multer({ storage: storage })


app.post('/uploads', upload.single('file'), async(req, res, next) => {   
    if(req.isAuthenticated()) 
    {   console.log(req.file)
        const file = req.file    
        if (!file) {      
        const error = new Error('Please upload a file')     
                
        return next("hey error")    
        }                  
        const insert_student=new up_stu({
         username:req.user.username,
         enrollno:req.user.enrollno,
         filepath:file.path,
         message:"sucessfully uploaded"
        })
              
         await insert_student.save() 
       
        req.flash('info', 'Your project has been uploaded successfully')  
        console.log("UPLOADS")   
        return res.redirect("/dashboard")
    }
     else{
        req.flash('error',"invalid login")
       return  res.redirect("/login")
     }
    })
