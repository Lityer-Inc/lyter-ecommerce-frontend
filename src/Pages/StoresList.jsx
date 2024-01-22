import { useContext, useEffect, useState } from "react";
import Stores from "../components/Stores.jsx";
import Preloader from "../components/Preloader.jsx";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { ShopContext } from "../context/shop-context.jsx";
import { useQuery } from "@tanstack/react-query";
import apiService from "../utils/apiService.jsx";

export default function StoresList() {
  // const [storesData, setStoresData] = useEffect();
  const { getStores } = apiService;

  // if (stores) {
  //   setIsLoading(false);
  // } else {
  //   return;
  // }

  // console.log("stores : ", stores);

  const { data: stores, isLoading } = useQuery({
    queryFn: () => getStores(),
    queryKey: ["stores"],
  });


  if (isLoading) {
    <Preloader />;
  }

  return (
    <>
<<<<<<< alpha
      <div className="flex flex-row justify-between mb-8">
=======
    
      <div className="flex flex-row justify-between">
>>>>>>> local
        <section className=" w-[800px] bg-white grow">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-center px-12 mt-10">
          {stores &&
              stores
                .filter((store) => store.products.length > 0) // Filter out stores with zero products
                .map((item, i) => (
                  <Link to={`/storefront?id=${item._id}`} className="w-full" key={i}>
                    <Stores data={item} />
                  </Link>
                ))}
          </ul>
          {/* <Footer /> */}
        </section>
      </div>
    </>
  );
}
