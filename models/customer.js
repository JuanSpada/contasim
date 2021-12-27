const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  source: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  sales: [
    {
      type: Schema.Types.ObjectId,
      ref: "Sale",
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Customer", customerSchema);