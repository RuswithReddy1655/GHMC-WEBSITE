const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  complaintId:String,
  name:String,
  mobile:String,
  address:String,
  type:String,

  beforeImage:String,
  afterImage:String,

  status:{
    type:String,
    default:"Pending"
  }

},{timestamps:true});

module.exports = mongoose.model("Complaint", complaintSchema);
