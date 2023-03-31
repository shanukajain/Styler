const express = require("express");
require("dotenv").config();
const { UserModel } = require("../Model/UserModel");
const client=require("../config/redis");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
const fs=require("fs");
const { authenticate } = require("../Middleware/Authentication");
const { StylerModel } = require("../Model/StylerModel");
const { AppointmentModel } = require("../Model/AppointmentModel");
const app = express()
app.use(express.json())

// **************REGISTER*****************

UserRouter.post("/register", async (req, res) => {
    let payload = req.body;
    let check = await UserModel.find({ email: payload.email });
    if (check.length !== 0) {
        res.send({ "msg": "Email already registered" })
    } else {
        try {
            bcrypt.hash(payload.password, +2, async (err, hash) => {
                if (err) {
                    res.send({ message: err.message });
                } else {
                    payload.password = hash;
                    payload.role = `user`
                    const User = new UserModel(payload);
                    await User.save();
                    res.send({ "message": `User Register Sucessfull` });
                }
            });
        } catch (error) {
            console.log({ message: error.message });
            res.send({ message: error.message });
        }
    }

});


// **************LOGIN*****************

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let User = await UserModel.findOne({ email: email });
        if (User) {
            bcrypt.compare(password, User.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: User._id, role: User.role }, "9168");
                    //Store In Cookies

                    console.log("Login Sucessfull");
                    res.send({ message: "Login Sucessfull", token: token });
                } else {
                    res.send({ message: "Wrong Password" });
                }
            });
        } else {
            res.send({ message: "Sign Up First" });
        }
    } catch (error) {
        res.send({ message: error.message });
    }

});

UserRouter.use(authenticate)
//*******Check avalibility ***********/
UserRouter.get("/Check",async(req,res)=>{
    let {city,date,slot}=req.body;
    let data =await StylerModel.find({"city":city});
    let data1=await AppointmentModel.find({date,slot});
    console.log(data1);
   for(i=0;i<data1.length;i++){
    data=data.filter((el)=>{
        let id=String(el._id);
        console.log(id,data1[i].StylistID)
        if(id!==data1[i].StylistID){
            return el;
        }
    })
   }
    if(data.length==0){
        res.send({msg:"no slot avalibale"})
    }else {
    res.send(data);
    }
})
//********Book appointment**********/
UserRouter.get("/book",async(req,res)=>{
    let payload=req.body;
    console.log(typeof(payload.userID))
    payload.status="Pendding";
    console.log(payload)
    let data=new AppointmentModel(payload);
    await data.save();
    res.send({message:"Appointment booked"});
})
// **************LOGOUT*****************

UserRouter.get("/logout",async(req,res)=>{
    let token=req.headers.authorization;
    await client.SETEX(`${token}`,60*60,"true");
   res.status(200).send({"msg":"logout successfull"});
})


//**************AUTHENTICATE DEMO******************
UserRouter.use(authenticate)

module.exports = { UserRouter };







