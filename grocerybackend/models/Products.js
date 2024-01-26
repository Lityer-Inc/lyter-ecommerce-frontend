import mongoose from "mongoose";

export const productSchema=new mongoose.Schema({
  img: {
        type: String, // store images as Buffer data
        required: true,
},
 title: {
        type: String,
        required: true,
      },
description: {
        type: String,
        required: true,
      },
         price: {
        type: Number,
        required: true,
        default: 0.00,
      },
      weight: {
        type: String,
        default: 0.00,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      tags: {
        type: [],
      },
      storeId:{
        type:String,
        required:true,
      }

}

);
export const Product = mongoose.model("Product", productSchema);


// export const productModel=mongoose.Model("product",productSchema);

 // name: {
    //     type: String,
    //     required: true,
    //   },
    //   storeName: {
    //     type: String,
    //     required: true,
    //   },
    //   countInStock: {
    //     type: Number,
    //     required: true,
    //   },
    //   image: {
    //     type: String, // store images as Buffer data
    //     required: true,
    //   },
   
    //   rating: {
    //     type: Number,
    //     required: false,
    //     default: 10,
    //   },
    //   isFeatured: {
    //     type: Boolean,
    //     required: false,
    //     default:false,
    //   },
  
    //   barcode: {
    //     type: String,
    //     required: true,
    //   },
    //   status: {
    //     type: Boolean,
    //     required: true,
    //   },