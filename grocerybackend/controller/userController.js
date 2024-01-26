import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminModel from "../models/admin.js";
import { storeModel } from "../models/Store.js";
import mongoose from "mongoose";
import { productSchema } from "../models/Products.js";

// userRegisterController
export const userRegisterController = async (req, res) => {
  console.log("Received request data:", req.body);
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    // Check if a user with the same email already exists
    const existingUserWithEmail = await userModel.findOne({
      email: req.body.email,
    });
    if (existingUserWithEmail) {
      return res
        .status(400)
        .json({ error: "User with the same email already exists." });
    }

    // Check if a user with the same contactNumber already exists
    if (req.body.contactNumber) {
      const existingUserWithContactNumber = await userModel.findOne({
        contactNumber: req.body.contactNumber,
      });
      if (existingUserWithContactNumber) {
        return res
          .status(400)
          .json({ error: "User with the same contact number already exists." });
      }
    }
    // Secure password using bcrypt: To do
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      contactNumber: req.body.contactNumber || null,
      city: req.body.city || null,
      address: req.body.address || null,
      account_status: req.body.account_status || true,
    });

    const newUser = await user.save();
    //  JWT
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "4d" }
    );

    // Send both newUser and token in the response
    return res.status(200).json({ newUser, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const userGetController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.userId });

    // Check if the user with the specified ID exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// userLoginController
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //  Find user using email
    const user = await userModel.findOne({ email });

    // Check if the user exist with condition
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare Secured (hashed) Password with provided password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // check is the provided password match with user password
    if (!passwordMatch) {
      return res.status(404).json({ error: "Invalid password" });
    }
    //  JWT
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "4d" }
    );

    // Send token in the response
    return res.status(200).json({ token, message: "Login Successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
// userLogoutController
export const userLogoutController = (req, res) => {
  try {
    // after log out successfully
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.error;
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const adminRegisterController = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const existingAdminWithEmail = await adminModel.findOne({
      email: req.body.email,
    });

    if (existingAdminWithEmail) {
      return res
        .status(400)
        .json({ error: "Admin with the same email already exists." });
    }

    const { name, email, password } = req.body;

    const admin = new adminModel({
      name: name,
      email: email,
      password: password,
    });

    const newAdmin = await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { email: newAdmin.email, id: newAdmin._id },
      process.env.ACCESS_TOKEN,
      { expiresIn: "4d" }
    );

    // Send both newAdmin and token in the response
    return res.status(201).json({ newAdmin, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getAdminsController = async (req, res) => {
  try {
    const admins = await adminModel.find();

    if (admins.length === 0) {
      return res.status(404).json({ message: "No Admins exist" });
    }

    res.json(admins);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSpecificAdminController = async (req, res) => {
  try {
    const admin = await adminModel.findOne({ _id: req.params.adminId });

    if (admin.length === 0) {
      return res.status(404).json({ message: "Admin Does not Exist" });
    }

    res.json(admin);
  } catch (error) {
    console.error("Error fetching Admin: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addToCartController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;
    const storeId = req.body.storeId;
    const store = await storeModel.findById(storeId);

    const strr = store.products.filter((itm) => itm._id == productId);
    const product = strr[0];

    // res.json(product)
    // Add product to the user's cart
    const usr= await userModel.findById(userId);
    const usrr = usr.cart.filter((itm) => itm.product._id == productId);
    var productIndex=-1;
    if(usrr.length>=1){
       productIndex = usr.cart.findIndex(
        (item) => item.product._id.toString() == productId
      );
  
     
  
      // Update the quantity of the specified product
      usr.cart[productIndex].quantity +=1;
  
      // Save the updated user document
      await usr.save();
  
      res.status(200).json({ message: "Cart item +1 successfully" });
    }else{
    await userModel.findByIdAndUpdate(
      userId,
      { $push: { cart: { product } } },
      { new: true }
    );
    res.status(200).json({ message: "Product added to cart successfully" });
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to update the quantity of a product in the user's cart
export const updateCartItemController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the product in the cart array
    const productIndex = user.cart.findIndex(
      (item) => item.product._id.toString() == productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in the user's cart" });
    }

    // Update the quantity of the specified product
    user.cart[productIndex].quantity = quantity;

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get the user's cart
export const getCartController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the user's cart
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to delete a product from the user's cart
export const deleteCartItemController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;

    // Find the user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the product in the cart array
    const productIndex = user.cart.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in the user's cart" });
    }

    // Remove the specified product from the cart array
    user.cart.splice(productIndex, 1);

    // Save the updated user document
    const updatedUser = await user.save();

    res.json(updatedUser.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
