import React, { useContext, useEffect, useState } from "react";
import WeeklySpecial from "../Components/WeeklySpecial";
import Card from "../Components/Card";
import Ads from "../Components/Ads";
import Filter from "../Components/Filter";
import { ShopContext } from "../context/shop-context";
import StoreSidebar from "../Components/StoreSidebar";
import ProductDetails from "../Components/ProductDetails.jsx";
import apiService from '../Components/apiService'; 
import Cookies from "js-cookie";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { productDetails, setUserDetails } = useContext(ShopContext);

  const token = Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null;

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await apiService.getProducts();
      if (fetchedProducts && fetchedProducts.products) {
        const productsWithImages = fetchedProducts.products.map(product => {
          if (product.image && product.image.data) {
            const imageBlob = new Blob([Uint8Array.from(product.image.data)], { type: 'image/png' });
            const imageUrl = URL.createObjectURL(imageBlob);
            return { ...product, imageUrl };
          }
          return product;
        });
        setProducts(productsWithImages);
      }
    };

    const getUserData = async () => {
      console.log('hiiiiiiii');
      const response = await apiService.decodeJwt();
      setUserDetails({
        email: response.userDetails.email,
        name: response.userDetails.name
      });
    }

    fetchProducts();
    getUserData();
  }, [token]);

  console.log('products : ', products);

  return (
    <div className="home-container relative z-0 flex flex-row">
      <StoreSidebar />
      <div className="flex flex-col ">
        <WeeklySpecial />
        <Filter />
        <Ads />

        <div className="cards-container-text-container">
          <p className="cards-container-text text-center mt-4 mb-4 text-3xl">
            This Week's Best Deals:
          </p>
        </div>

        <ul className="grid sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4 gap-10 items-center px-16 mt-12">
          {products.map((item, i) => (
            <div className="w-full" key={i}>
              <Card data={{...item, img: item.imageUrl || item.img}} />
            </div>
          ))}
        </ul>
        {productDetails.selected && <ProductDetails />}
      </div>
    </div>
  );
}

