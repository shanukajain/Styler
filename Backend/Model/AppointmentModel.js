const mongoose = require("mongoose");
const AppointmentSchema = mongoose.Schema(
  {
    UserID:String,
    StylistID:String,
    Stylistname:String,
    date:String,
    slot:String,
    status:{type:String, enum:["Pendding","complete","Apporved","cancel"],default:"Pendding"},
  }
);

const AppointmentModel = new mongoose.model("Appointment_Details", AppointmentSchema);

module.exports = { AppointmentModel };
