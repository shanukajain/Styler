const mongoose = require("mongoose");
const StylesSchema = mongoose.Schema({
   name:String,
   image:String,
   category:String,
   price:Number,
   ForGender:String
  }
);

const StylesModel = new mongoose.model("Styles", StylesSchema);

module.exports = { StylesModel };
