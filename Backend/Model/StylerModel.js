const mongoose = require("mongoose");
const StylerSchema = mongoose.Schema(
  {
    email: String,
    Styler_name: String,
    mob_no: Number,
    city:String,
    shift:String
  }
);

const StylerModel = new mongoose.model("Styler_Details", StylerSchema);

module.exports = { StylerModel };
