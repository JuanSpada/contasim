const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const saleSchema = new Schema({
  description: {
    type: String,
    required: false,
  },
  discount: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: false,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  collections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
  ],
});
module.exports = mongoose.model("Sale", saleSchema);
