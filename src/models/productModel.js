import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: {
    type: _id,
  },
  brand: {
    type: String,
    require: [true, "Brand Name is required"],
  },
  article: {
    type: String,
    require: [true, "Article number is required"],
    unique: true,
  },
  price: {
    type: Number,
    require: [true, "Please Enter Price"],
  },
  availableSizes:{
    type:String,
    required:[true, 'Please Enter all the available sizes']
  },
  availableColors:{
    type:String,
    required:[true, 'Please enter the available colors']
  },
  image:{
    type:String,
    require:[true]
  },
  date:{
    date: {
        type: Date,
        default: Date.now
    }
  }
});

const productModel = mongoose.model("Product", productSchema) || mongoose.models.Product;

export default productModel;
