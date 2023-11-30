import React from "react";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { FaBagShopping } from "react-icons/fa6";
import { IoReloadOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";

const StoreSidebar = () => {
  return (
      <main className="lg:block w-[300px] hidden ">
        {/* top part */}
        <div className="fixed top-auto bg-gray-100 w-[300px] overflow-y-scroll overflow-x-hidden border-r h-screen p-6">
        <div className="flex w-full flex-col sticky top-0 bg-gray-100/90 backdrop-blur-sm p-2 items-center gap-2">
          <img
            src="/logo-2.png"
            className="rounded-full w-[60px] h-[60px] border border-gray-300 p-3"
          />
          <h2 className="text-[1.2rem] font-semibold">Lityer</h2>
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
