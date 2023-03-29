const express = require("express");
require("dotenv").config();
const { AdminModel } = require("../Model/AdminModel");
const { UserModel } = require("../Model/UserModel");
const { StylerModel } = require("../Model/StylerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminRouter = express.Router();
const app = express()
app.use(express.json())


// ************ALL REGISTER USER***************

AdminRouter.get("/allusers", async (req, res) => {
    let data = await UserModel.find()
    res.send(data);
});

// ************REGISTER ADMIN***************

AdminRouter.post("/register", async (req, res) => {
    let payload = req.body;
    let check = await AdminModel.find({ email: payload.email });
    if (check.length !== 0) {
        res.send({ "msg": "Email already registered" })
    } else {
        try {
            bcrypt.hash(payload.password, +2, async (err, hash) => {
                if (err) {
                    res.send({ message: err.message });
                } else {
                    payload.password = hash;
                    payload.role = `admin`
                    const User = new AdminModel(payload);
                    await User.save();
                    res.send({ "message": `Admin Register Sucessfull` });
                }
            });
        } catch (error) {
            console.log({ message: error.message });
            res.send({ message: error.message });
        }
    }

});

// ************LOGIN***************

AdminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let User = await AdminModel.findOne({ email: email });
        if (User) {
            bcrypt.compare(password, User.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: User._id, role: User.role }, "9168");
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


// ****************ALL STYLER ******************


AdminRouter.get("/All/Stylers", async (req, res) => {

    let data = await  StylerModel.find()
    res.send(data);
});

// ****************ADD STYLER ******************


AdminRouter.post("/create/styler", async (req, res) => {
    let payload=req.body;
    let data = await new StylerModel(payload);
    data.save();
    res.send({"msg": "Style Added"});
});


// ***********UPDATE SYLER************
AdminRouter.patch("/update/styler/:id", async (req, res) => {
    let ID=req.params.id;
    let payload=req.body
    // console.log(ID);
    await StylerModel.updateOne({"_id":ID},payload)
    res.send({"msg": "Style Updated"});
});

// ***********DELETE SYLER************

AdminRouter.delete("/delete/styler/:id", async (req, res) => {
    let ID=req.params.id;
    let payload=req.body
     await  StylerModel.deleteOne({"_id":ID})
    res.send({"msg": "Style Deleted"});
});

module.exports = { AdminRouter };







