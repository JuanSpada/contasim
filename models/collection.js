const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collectionSchema = new Schema({
  amount: {
    type: Number,
    required: false,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  sale: {
    type: Schema.Types.ObjectId,
    ref: "Sale",
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Colecction", collectionSchema);
