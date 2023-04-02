const mongoose = require("mongoose");
const StylerSchema = mongoose.Schema(
  {
    Styler_name: String,
    mob_no: Number,
    city:String,
    salary:Number,
    email:String
  }
);

const StylerModel = new mongoose.model("Styler_Details", StylerSchema);

module.exports = { StylerModel };
