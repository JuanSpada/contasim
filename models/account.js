const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const accountSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  type: {
    type: Number,
    required: false,
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
module.exports = mongoose.model("Account", accountSchema);
