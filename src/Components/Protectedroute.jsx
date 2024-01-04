import React, { useContext } from "react";
import Dashbard from "../Pages/Dashbardlayout";
import { ShopContext } from "../context/shop-context";
import { Route, Navigate } from "react-router-dom";
import Dashbardlayout from "../Pages/Dashbardlayout";

function Protectedroute({ children }) {
  const { token } = useContext(ShopContext);

  console.log(token, "getting token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Dashbardlayout>{children}</Dashbardlayout>;
}

export default Protectedroute;
