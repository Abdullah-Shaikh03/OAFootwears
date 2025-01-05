import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
      validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
    },
    style: {
      type: [String],
      required: [true, 'Please enter Style'],

    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

function arrayLimit(val: string[]) {
  return val.length <= 5;
}

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
