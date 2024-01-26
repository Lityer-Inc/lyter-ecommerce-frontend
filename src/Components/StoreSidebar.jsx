import React, { useCallback, useContext, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { FaBagShopping } from "react-icons/fa6";
import { IoReloadOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShopContext } from "@/context/shop-context";
import Preloader from "./Preloader";

const StoreSidebar = () => {

  const { endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();
  const storeId = useRef(params.get("id"));

  const getStores = useCallback(async () => {
    const response = await axios.get(`${endpointHead}/stores/${storeId.current}`)
    if (response.status == 200) {
      return response.data;
    } else {
      console.log('error while fetching stores data !');
      return;
    }
  }, [endpointHead, storeId]);
  
  const { data: store, isLoading } = useQuery({
    queryFn: getStores,
    queryKey: ["storeDetails"]
  });

  console.log('store : ', store);

  if (isLoading) {
    return <Preloader />
  }

  return (
    <main className="lg:block w-[280px] h-0 hidden ">
      {/* top part */}
      <div className="fixed top-auto bg-gray-100 w-[280px] overflow-y-scroll overflow-x-hidden border-r h-screen p-6">
        <div className="flex w-full flex-col sticky top-0 bg-gray-100/90 backdrop-blur-sm p-2 items-center gap-2">
          <img
            src={store.avatar}
            className="rounded-full w-[60px] h-[60px] border border-gray-300 p-1"
          />
          <h2 className="text-[1.2rem] text-2xl font-bold">{store.name}</h2>
          <p className="text-[0.8rem] -mt-1 text-center text-gray-700 font-semibold">{store.description}</p>
          <Link to={"/pricing-policy"}>View Pricing Policy {">"}</Link>
          <Link to="/">
            <span className="flex items-center">
              <img
                src="https://www.instacart.com/image-server/48x48/www.instacart.com/assets/checkout/quality_guarantee/ribbon-a93eef7e76db2d7610608da27c5a9f5cb489ba37932c9624309ea1756817018e.png"
                className="w-[30px] h-[30px]"
              />
              {/* <TiTick
                fontSize={100}
                className="text-blue-500 font-bold text-[10rem]"
              /> */}
              <p className="text-xs font-medium">100% Satisfaction Guarentee</p>
            </span>
          </Link>
          {/* <Link to='/earn'>
                </Link> */}
        </div>
        {/* middle buttons */}
        <section className="py-2 w-full border-y border-gray-300">
          <button
            className="w-full flex bg-gray-800 
          rounded-md px-3 py-2 text-gray-100 font-semibold"
          >
            <FaBagShopping className="" />
            <span className="ml-2">Shop</span>
          </button>
          <button
            className="text-gray-800 w-full flex hover:bg-gray-800 
          rounded-md px-3 py-2 hover:text-gray-100 font-semibold"
          >
            <IoReloadOutline />
            <span className="ml-2">Buy it again</span>
          </button>
          <button
            className="text-gray-800 w-full flex hover:bg-gray-800 
          rounded-md px-3 py-2 hover:text-gray-100 font-semibold"
          >
            <FaList />
            <span className="ml-2">List</span>
          </button>
        </section>
        {/* below part */}
        <section className="py-2 border-y border-gray-300 h-[400px]">
          <button
            className="text-gray-800 w-full flex hover:bg-gray-800 
          rounded-md px-3 py-2 hover:text-gray-100 font-semibold"
          >
            Recipes
          </button>
          <button
            className="text-gray-800 w-full flex hover:bg-gray-800 
          rounded-md px-3 py-2 hover:text-gray-100 font-semibold"
          >
            Dairy Products
          </button>
          <button
            className="text-gray-800 w-full flex hover:bg-gray-800 
          rounded-md px-3 py-2 hover:text-gray-100 font-semibold"
          >
            Halwai
          </button>
          <button
            className="text-gray-800 w-full flex hover:bg-gray-800 
          rounded-md px-3 py-2 hover:text-gray-100 font-semibold"
          >
            Khowa
          </button>
          <button
            className="text-gray-800 w-full flex hover:bg-gray-800 
          rounded-md px-3 py-2 hover:text-gray-100 font-semibold"
          >
            Frozon Ice
          </button>
        </section>
      </div>
    </main>
  );
};

export default StoreSidebar;
