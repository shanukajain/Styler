const express = require("express");
require("dotenv").config();
const { userRegisterModel } = require("../Model/user-SignUP-Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRouter = express.Router();

UserRouter.get("/allregisters", (req, res) => {
  let data=JSON.parse(userRegisterModel.find())

  res.send({"msg":data});
});

UserRouter.post("/register", async (req, res) => {
  const { email, name, password, mob_no, gender } = req.body;
  try {
    bcrypt.hash(password, + 2, async (err, hash) => {
      if (err) {
        // console.log({ message: err.message });
        res.send({ message: err.message });
      } else {
        const User = new userRegisterModel({
          email,
          name,
          password: hash,
          mob_no,
          gender
        });
        await User.save();
        res.send({"message":`Register Sucessfull`});
      }
    });
    // console.log(hash)
  } catch (error) {
    console.log({ message: error.message });
    res.send({ message: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let User = await userRegisterModel.findOne({ email:email });
    console.log(User);
    if (User) {
      bcrypt.compare(password, User.password,async(err, result) => {
        if (result) {
          console.log(User._id);
          const token = jwt.sign({ userID:User._id,userName:User.name},process.env.key); //{expiresIn:60}
          await client.SET(User.email,token);
          console.log("tokens are done");
          res.send({ message: "Login Sucessfull",email:User.email,username:User.name});
        } else {
          res.send({ message: "Login Again" });
        }
      });
    } else {
      res.send({ message: "Login Again" });
    }
  } catch (error) {
    // logger.log(`error`, `error :-${error.message}`);
    res.send({ message: error.message });
  }
  
});

module.exports = { UserRouter };




// UserRouter.get("/logout", async (req, res) => {
//   let token = req.cookies.token;
//   try {
//     if (token) {
//       await client.lPush("blackList", token);

//       res.send({ message: "Logout Sucesfull" });
//     } else {
//       res.send({ message: "Login Again" });
//     }
//   } catch (error) {
//     console.log({ message: error.message });
//     res.send({ message: error.message });
//   }
// });




