const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  quoteId: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  stAddress: {
    type: String,
    required: true,
  },
  apt: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
});

module.exports = Customer = mongoose.model("customer", CustomerSchema);
