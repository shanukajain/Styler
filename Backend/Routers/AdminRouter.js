const express = require("express");
require("dotenv").config();
const { AdminModel } = require("../Model/AdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminRouter = express.Router();
const app = express()
app.use(express.json())

AdminRouter.get("/allusers", async (req, res) => {
    let data = await AdminModel.find()
    res.send(data);
});

AdminRouter.post("/register", async (req, res) => {
    let payload = req.body;
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

AdminRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        let User = await AdminModel.findOne({ email: email });
        console.log(User);
        if (User) {
            bcrypt.compare(password, User.password, async (err, result) => {
                if (result) {
                    console.log(User._id);
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


module.exports = { AdminRouter };







