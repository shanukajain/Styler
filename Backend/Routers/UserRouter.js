 const express = require("express");
require("dotenv").config();
const { UserModel } = require("../Model/UserModel");
const client=require("../config/redis");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();
const { authenticate } = require("../Middleware/Authentication");
const { StylerModel } = require("../Model/StylerModel");
const { AppointmentModel } = require("../Model/AppointmentModel");
const {BlockUserModel}=require("../Model/BlockUserModel")
const otpvalidator = require("../config/OTP");


const app = express()
app.use(express.json())

// **************REGISTER*****************
//******OPT */
UserRouter.get("/OTP",async(req,res)=>{
    let payload = req.query;
    let check = await UserModel.find({ email: payload.email });
    if (check.length !== 0) {
        res.send({ "msg": "Email already registered" })
    }else {
      let OTP= otpvalidator(payload.email);
      res.send({"OTP":OTP})
    }
})
UserRouter.post("/register", async (req, res) => {
    let payload = req.body;
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

});


// **************LOGIN*****************

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let blockmails=await BlockUserModel.find();
    // console.log(blockmails);
    let flag=true;
    for( let k=0;k<blockmails.length;k++){
        if(email==blockmails[k].Email){
           flag=false;
        }
    };
    if(flag==true){
        try {
            let User = await UserModel.findOne({ email: email });
            if (User) {
                bcrypt.compare(password, User.password, async (err, result) => {
                    if (result) {
                        const token = jwt.sign({ userID: User._id, role: User.role }, "9168");
                        //Store In Cookies
                        // client.set("token", token);
                        console.log("Login Sucessfull");
                        res.send({ message: "Login Sucessfull", token: token ,username:User.name});
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
    }else{
        res.send({message:"Email is Blocked"})
    }
    

});
UserRouter.get("/userInfo", async (req, res) => {
    let search = req.query
    let data = await UserModel.find(search)
    res.send(data);
});
UserRouter.use(authenticate)
//*******Check avalibility ***********/
UserRouter.post("/Check",async(req,res)=>{
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
        res.send({msg:"no slot avalibale"});
    }else {
    res.send(data);
    }
})
//********Book appointment**********/
UserRouter.post("/book",async(req,res)=>{
    let payload=req.body;
    payload.status="Pendding";
    payload.slot.toLocaleLowerCase();
    let data=new AppointmentModel(payload);
    await data.save();
    res.send({message:"Appointment booked"});
})
// **************LOGOUT*****************
UserRouter.get("/logout",(req,res)=>{
    const token =req.headers.authorization
    const blacklist=JSON.parse(fs.readFileSync("./blacklisted.json",{encoding:"utf-8"}));
    blacklist.push(token);
    fs.writeFileSync("./blacklist.json",JSON.stringify(blacklist));
    res.send("you are logged out")
})
// ***********Appointments*************




module.exports = { UserRouter };







