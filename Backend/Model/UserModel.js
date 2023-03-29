const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: String,
    name: String,
    mob_no: Number,
    gender:String,
    city:String,
    password: String,
    role: String
  }
);

const UserModel = new mongoose.model("Registered_User", UserSchema);
module.exports = { UserModel };
