import mongoose from "mongoose";
import { productSchema } from "./Products.js";


const storeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  store_email: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  revenue: {
    type: Number,
    required: false,
    default: 0,
  },
  sales: {
    type: Number,
    required: false,
    default: 0,
  },
  description: {
    type: String,
    required: false,
  },
  products: {
   type: [productSchema],
   default:[],
  },
  category: {
    type: [{ type: String }],
    default: ["Grocery", "Organic"]
  },
  tags: {
    type: [{type: String}],
    default: ["Accepts EBT", "In-store prices"]
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
});

export const storeModel = mongoose.model("Store", storeSchema);
