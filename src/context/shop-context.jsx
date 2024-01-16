import React, { createContext, useEffect, useState } from "react";
import data from "../DummyData/data";
import Cookies from "js-cookie"; // Import the js-cookie package
import axios from "axios";
import apiService from "../utils/apiService";

export const ShopContext = createContext("context");
/*
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < data.length; i++) {
    cart[i] = 0;
  }
  return cart;
};
*/

export const ShopContextProvider = (props) => {
  // Load cart data from cookies or use the default cart
  const [loginModal, setLoginModal] = useState(0); //0 means off 1 means login and 2 means signup
  //const [auth, setAuth] = useState();
  const [user, setUser] = useState(false);
  //state for alert icon, msg1, msg2, action
  const [alert, setAlert] = useState(false);
  // state for productDetails
  const [productSelected, setProductSelected] = useState({
    selected: false,
    id: null
  });
  const [userDetails, setUserDetails] = useState({
    id: null,
    email: null,
    name: null
  });

  let initialCart = JSON.parse(Cookies.get("cart") || "[]");

  const [cartItems, setCartItems] = useState(initialCart);

  console.log('initial Cart : ', initialCart);

  const [alertState, setAlertState] = useState();
  const [stores, setStores] = useState([]); // includes all the products and orders in a store
  /* ENDPOINT */
  //testing http://localhost:8000
  //production
  const endpointHead = "http://localhost:8000";

  /* CART */
  const addToCart = (itemToAdd, quanty) => {
    setCartItems((prev) => {
      // Create a copy of the cart array
      const updatedCart = [...prev];
      console.log(updatedCart, "update copy");
      console.log(prev, "prev");
      // Check if the item is already in the cart
      const existingItemIndex = updatedCart.findIndex(
        (item) => item.eachitem._id === itemToAdd._id
      );

      if (existingItemIndex !== -1) {
        // If the item is already in the cart, update its count
        updatedCart[existingItemIndex].count += quanty;
      } else {
        // If the item is not in the cart, add it with a count of 1
        updatedCart.push({
          eachitem: { ...itemToAdd },
          count: quanty
        });
      }

      // Save cart to cookies
      Cookies.set("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const removeFromCart = (itemToRemove) => {
    console.log(cartItems, itemToRemove, "inin");
    setCartItems((prev) => {
      const updatedCart = prev.filter(
        (item) => item.eachitem.id !== itemToRemove
      );
      console.log(updatedCart, "updatedCart Li");
      Cookies.set("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const addMini = (itemToAdd) => {
    console.log("hiiiiii ", itemToAdd);
    setCartItems((prev) => {
      const updatedCart = [...prev];
      const existingItemIndex = updatedCart.findIndex(
        (item) => item.eachitem.id === itemToAdd.id
      );

      if (existingItemIndex !== -1) {
        // If the item is already in the cart, update its count
        updatedCart[existingItemIndex].count += 1;
      }
      Cookies.set("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeMini = (itemToRemove) => {
    console.log(cartItems, itemToRemove, "inin");
    setCartItems((prev) => {
      const updatedCart = [...prev];
      const existingItemIndex = updatedCart.findIndex(
        (item) => item.eachitem.id === itemToRemove
      );
      console.log(existingItemIndex, "Hello");
      if (existingItemIndex !== -1) {
        // If the item is already in the cart, update its count
        updatedCart[existingItemIndex].count -= 1;
      }
      Cookies.set("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  /* CART */

  /* AUTHENTICATION */

  const token = Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null;

  const storeToken = (token) => {
    Cookies.set("token", JSON.stringify(token));
  };

  // const CheckToken = async () => {
  //   try {
  //     const response = await axios.post(`${endpointHead}/check`, null, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     console.log(response.data);

  //     if (response.status === 200) {
  //       setUser(response.data.user);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  /* AUTHENTICATION */

  //Calculate total items and total price
  let totalItems = 0;
  let totalPrice = 0;

  if (Array.isArray(cartItems)) {
    console.log("Calculating total items and price...");

    totalItems = cartItems.reduce((acc, item) => acc + item.count, 0);

    totalPrice = cartItems.reduce((acc, item) => {
      // console.log("Current item in totalPrice calculation:", item);
      // const dataItem = data.find((d) => d.id === item.eachitem.id);

      // if (!dataItem) {
      //   console.error("Data item not found for id:"); // TODO : fix this shitt
      //   return acc;
      // }

      // console.log("Adding to totalPrice:", item.count * dataItem.price);
      return 2023;
    }, 0);
  } else {
    console.log("cartItems is not an array");
  }

  const contextValue = {
    userDetails,
    setUserDetails,
    cartItems,
    addToCart,
    removeFromCart,
    setLoginModal,
    loginModal,
    totalItems,
    totalPrice,
    user,
    setUser,
    removeMini,
    addMini,
    token,
    storeToken,
    endpointHead,
    alert,
    setAlert,
    alertState,
    setAlertState,
    productSelected,
    setProductSelected,
    stores,
    setStores
  };

  // Save cart data to cookies whenever cartItems change
  useEffect(() => {
    // if (!token) {
    //   CheckToken();
    // }
  }, [cartItems, loginModal]);

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
