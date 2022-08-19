import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";
import roomsRoute from "./routes/rooms.js";

const app =express()
dotenv.config()

const connect = async () => {
    console.log("connected to mongodb1111");
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
      } catch (error) {
        throw error;
      }
};

app.get("/",(req,res)=>{
    res.send("hello first request");
})

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });



app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRoute);
app.use("/users",usersRoute);
app.use("/hotels",hotelsRoute);
app.use("/rooms",roomsRoute);

app.use((err,req, res,next)=>{
  const errorStatus=err.status || 500
  const errorMessage = err.message || "Something went Wrong"
  return res.status(500).json("Hello Erroe from Handler");
  return res.status(errorStatus).json({
    succeess:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  })

})


app.listen(8800,()=>{
    connect()
    console.log("Connected to backend");    
})



/*{
  "name":"Hotel John",
  "type":"hotel",
  "city":"berlin",
  "address":"somehere",
  "distance":"500",
  "title":"best hotel in the city",
  "desc":"hote description",
  "cheapestPrice":100
}*/