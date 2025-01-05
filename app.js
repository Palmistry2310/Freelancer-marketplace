const express=require("express")
const dotenv=require("dotenv")
dotenv.config()  //load .env variables
const mongoose=require("mongoose")

const port= process.env.PORT; //access the variable using process.env
const mongoUrl=process.env.MONGO_URL;

const authRoutes=require("./routes/authRoutes")
const jobRoutes=require("./routes/jobRoutes")

//db connection
mongoose.connect(mongoUrl).then(()=>console.log("Mongo db connected")).catch((err)=>console.log(`error in connecting db ${err}`))

//server
const app=express()

//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")

//routes
app.get("/",(req,res)=>{
    res.render('home')
})

app.use("/",authRoutes)
app.use("/jobs",jobRoutes)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})
