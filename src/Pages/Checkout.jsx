import Account from "@/components/Account";
import CartMain from "@/components/CartMain";
import { ShopContext } from "@/context/shop-context";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { checkoutItems } = useContext(ShopContext);
  console.log('checkoutItems : ', checkoutItems);


  return (
    <main className="p-10">
      <h1>Store : {checkoutItems.storeName}</h1>
      <h1 className='font-semibold py-5'>
        Products : 
      </h1>
      {checkoutItems && checkoutItems.products.length > 0 && checkoutItems.products.map((c, i) => {
        return <h3>{c.title}</h3>
      })}
    </main>
  );
};

export default Checkout;
