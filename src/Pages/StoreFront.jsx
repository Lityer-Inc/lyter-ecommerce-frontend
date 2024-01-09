import { useContext, useEffect, useRef, useState } from "react";
import StoreSideBar from "../Components/StoreSideBar";
import Preloader from "../Components/Preloader";
import { Carousel } from "../Components/Carousel";
import Footer from "../Components/Footer";
import { ShopContext } from "../context/shop-context";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Store() {
  const { stores, endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));

  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState();

  // setTimeout(() => {
  //   setIsLoading(false); // Set isLoading to false after the delay
  // }, 1500);

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        // fetch stored data
        const response = await axios.get(`${endpointHead}/stores/${storeId.current}/products`)
        const productsData = response.data;
        console.log("data:", productsData)
        setStore(productsData)
        setIsLoading(false)

      }
      catch (error){
        console.log("error on fetch:", error)
      }
    };
    fetchData();
  },[])

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <StoreSideBar store={store} />

        <section className="py-10 w-1/2 bg-white grow">
          <div className="px-8 py-4 w-full">
            <h2 className="text-2xl font-bold ">Best Sellers</h2>
            <Carousel products={store} />
          </div>
          {/* <div className="px-8 py-4 w-full">
            <h2 className="text-2xl font-bold ">Fresh Fruit</h2>
            <Carousel />
          </div>
          <div className="px-8 py-4 w-full">
            <h2 className="text-2xl font-bold ">Fresh Vegetables</h2>
            <Carousel />
          </div> */}
          <Footer />
        </section>
      </div>
    </>
  );
}
