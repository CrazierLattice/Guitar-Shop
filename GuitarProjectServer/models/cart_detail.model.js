const { Schema, model } = require("mongoose");

const cartDetailSchema = new Schema(
  {
    guitar: { type: Schema.Types.ObjectId, ref: "guitar" },
    amount: { type: String, required: true },
    price: { type: String, required: true },
    cartID: { type: Schema.Types.ObjectId, ref: "cart" },
  },
  { versionKey: false }
);

const cartDetailModel = model("cartdetail", cartDetailSchema);

module.exports = { cartDetailModel };
