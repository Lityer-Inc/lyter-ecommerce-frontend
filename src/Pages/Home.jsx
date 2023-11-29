import React, { useContext, useEffect } from "react";
import WeeklySpecial from "../Components/WeeklySpecial";
import data from "../DummyData/data.js";
import Card from "../Components/Card";
import Ads from "../Components/Ads";
import Filter from "../Components/Filter";
import { ShopContext } from "../context/shop-context";
import ProductDetails from "../Components/ProductDetails.jsx";




export default function Home() {
  // const { cartItems, addToCart, removeFromCart, totalItems, totalPrice } =
  //   useContext(ShopContext);

  const { productDetails } = useContext(ShopContext);

  useEffect(() => {
    console.log("product Detais : ", productDetails);
  }, [productDetails]);

  const {cartItems, addToCart, removeFromCart, totalItems, totalPrice} = useContext(ShopContext);

  return (
    <div className="home-container flex flex-col">
        <WeeklySpecial />
        <Filter />
        {/*<Ads />*/}
        
        <div className="cards-container-text-container">
          <p className="cards-container-text text-center mt-4 mb-4 text-3xl">
            This Week's Best Deals:
          </p>
        </div>

        <ul className="grid sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4 gap-10 items-center px-16 mt-12">
          {data.map((item, i) => (
            <div className="w-full" key={i}>
              <Card data={item} />
            </div>
          ))}
        </ul>
        {productDetails.selected && <ProductDetails />}

      {/* <div className="home-page-list-container flex flex-wrap">
        <div className="item w-full basis-1/2">1</div>
        <div className="item w-full basis-1/2">2</div>
        <div className="item w-full basis-1/2">3</div>
        <div className="item w-full basis-1/2">4</div>
      </div> */}
    </div>
  );
}
