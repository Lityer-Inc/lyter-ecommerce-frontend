import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    }],
    total: {
      type: Number,
      required: true,
    },
   
  
  }, { timestamps: true });
  
  export const orderModel = mongoose.model("Order", orderSchema);