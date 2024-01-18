import React, { useContext, useState } from "react";
import data from "../DummyData/data";
import { ShopContext } from "../context/shop-context";
import CartItem from "../Components/CartItem";
import { Link, useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
  const { productSelected, cartItems, addToCart, removeFromCart, totalItems, totalPrice } =
    useContext(ShopContext);
  
  const navigate = useNavigate();


  return (
    <div className="flex justify-center items-start md:w-full min-h-[85dvh]">
      {cartItems.length !== 0 ? (
        <div className="bg-[#fff] rounded w-[95%] 
        overflow-x-auto  md:overflow-x-hidden h-100 md:w-[80vw]
        md:h-auto p-2 md:p-10 flex flex-col justify-center items-center gap-[20px] shadow-lg">
          <div className=" w-[692px] overflow-x-scroll pl-[176px] md:w-full md:overflow-x-hidden md:pl-0 ">
            <table className="w-full text-sm text-left  text-gray-500 w-100">
              <thead className="text-xs bg-slate-100 text-gray-700 px-5 fonts uppercase ">
                <tr>
                  <th
                    scope="col"
                    colSpan="3"
                    className="px-2 py-4 fonts uppercase text-center"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 fonts uppercase text-center"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 fonts uppercase text-center"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-4 fonts uppercase  text-center"
                  >
                    Subtotal
                  </th>
                </tr>
              </thead>

              <tbody className="w-full md:w-[400px]">
                {cartItems.map((item, index) => (
                  <CartItem data={item} key={index} />
                ))}
              </tbody>
            </table>
          </div>

          <div className=" w-full border-1 border-[#f5f5f5] flex justify-between p-5">
            <div className="">Total</div>

            <div className="">{totalPrice}</div>
          </div>
          <Link
            to={"/checkout-payment"}
            className="bg-[#FF0066] max-w-[500px] transition-all hover:bg-[#ff0f6f] text-center 
          py-3 self-end rounded-md font-bold text-white
          w-full h-[50px]"
          >
            Checkout
          </Link>
        </div>
      ) : (
        <div className="bg-[#fff] rounded w-full h-full md:w-[60vw] md:h-[60vh] p-10 flex flex-col justify-center items-center gap-[20px] shadow-lg">
          <div className="bg-[#f5f5f5] rounded-[100%] p-[50px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[70px] h-[70px]"
              viewBox="0 0 24 24"
            >
              {" "}
              <path
                fill="#FF0066"
                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zM1 3c0 .55.45 1 1 1h1l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 20.01 4H5.21l-.67-1.43a.993.993 0 0 0-.9-.57H2c-.55 0-1 .45-1 1zm16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2z"
              />
            </svg>
          </div>

          <div className="">Your Cart Is Empty</div>

            <div className="button cursor-pointer"
            onClick={()=> navigate('/')}
            >
            <div className="button-wrapper">
              <div className="text ">Go Shopping</div>

              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M20.005 22h-16a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Zm-11-16h-2v2a5 5 0 0 0 10 0V6h-2v2a3 3 0 0 1-6 0V6Z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
