const mongoose = require("mongoose");
const StylerSchema = mongoose.Schema(
  {
    Styler_name: String,
    mob_no: Number,
    city:String,
    email:String,
    salary:Number,
    shift:Array
  }
);

const StylerModel = new mongoose.model("Styler_Details", StylerSchema);

module.exports = { StylerModel };
