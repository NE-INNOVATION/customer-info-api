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
    type: String,
    required: true,
  },
  stAddr: {
    type: String,
    required: true,
  },
  apt: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
});

module.exports = Customer = mongoose.model(
  "col_lrqi_customers",
  CustomerSchema
);
