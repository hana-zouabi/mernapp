const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  work: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Person", personSchema);
