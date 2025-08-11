const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockEnquirySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: { type: String, required: true },
  company: {
    type: String,
  },
  service: {
    type: String,
  },
  message: {
    type: String,
  },
  path: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const StockEnquiry = mongoose.model("StockEnquiry", stockEnquirySchema);
module.exports = StockEnquiry;
