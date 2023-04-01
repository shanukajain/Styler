const mongoose = require("mongoose");
const StylesSchema = mongoose.Schema({
   name:String,
   image:String,
   price:Number
  }
);

const StylesModel = new mongoose.model("Styles", StylesSchema);

module.exports = { StylesModel };
