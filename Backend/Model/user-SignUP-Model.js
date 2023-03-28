const mongoose = require("mongoose");

const UserRegesterShema = mongoose.Schema(
  {
    email: String,
    name: String,
    mob_no: Number,
    gender:String,
    password: String,
  }
);

const userRegisterModel = new mongoose.model("Registered_User", UserRegesterShema);

module.exports = { userRegisterModel };
