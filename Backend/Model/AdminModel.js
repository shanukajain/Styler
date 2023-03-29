const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema(
  {
    email: String,
    name: String,
    mob_no: Number,
    gender:String,
    password: String,
    role: String
  }
);

const AdminModel = new mongoose.model("Registered_Admin", AdminSchema);

module.exports = { AdminModel };
