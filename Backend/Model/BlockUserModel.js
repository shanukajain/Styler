const mongoose = require("mongoose");
const BlockUserSchema = mongoose.Schema(
  {
   Email:String
  }
);

const BlockUserModel = new mongoose.model("Appointment_Details", BlockUserSchema);

module.exports = { BlockUserModel };
