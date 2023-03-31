const mongoose = require("mongoose");
const BlockUserSchema = mongoose.Schema(
  {
   Email:String
  }
);

const BlockUserModel = new mongoose.model("Blocked_Users", BlockUserSchema);

module.exports = { BlockUserModel };
