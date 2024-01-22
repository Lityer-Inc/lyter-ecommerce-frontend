import React, { useContext, useEffect, useRef } from "react";
import { ShopContext } from "../context/shop-context";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import apiService from "../utils/apiService";
import Preloader from "./Preloader";

export const CheckoutPage = ({ isCartOpen2, toggleMobileCart }) => {
  const {
    // cartItems,
    setProductSelected,
    addToCart,
    removeFromCart,
    totalItems,
    totalPrice,
    setLoginModal,
    setAlert,
    userDetails,
    setAlertState
  } = useContext(ShopContext);

  const { getCart } = apiService;
  const token = Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null;
  const navigate = useNavigate();

  console.log('workin g!');

  // const handleResize = () => {
  //   const width = window.innerWidth;
  //   if (isCartOpen2 && width < 766) {
  //     toggleMobileCart(false);
  //   }
  // };

  // const checkoutHandler = async () => {
  //   if (token != null) {
  //     // user is logged in
  //     navigate("/about", { replace: true });
  //     toggleMobileCart(false);
  //   } else {
  //     toggleMobileCart(false);
  //     setAlert(true);
  //     setAlertState({
  //       icon: (
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="32"
  //           height="32"
  //           viewBox="0 0 24 24"
  //         >
  //           <g fill="none" stroke="currentColor" strokeLinejoin="round">
  //             <path
  //               strokeWidth="2"
  //               d="M2 14.5A4.5 4.5 0 0 0 6.5 19h12a3.5 3.5 0 0 0 .5-6.965a7 7 0 0 0-13.76-1.857A4.502 4.502 0 0 0 2 14.5Z"
  //             />
  //             <path strokeWidth="3" d="M12 15.5h.01v.01H12z" />
  //             <path strokeLinecap="round" strokeWidth="2" d="M12 12V9" />
  //           </g>
  //         </svg>
  //       ),
  //       status: "Checkout Failed",
  //       msg1: "Please Login Before Checking Out the Products",
  //       // msg2: `Reason: ${res.error}`,
  //       action: "Retry"
  //     });
  //     setTimeout(() => {
  //       setLoginModal(true);
  //     }, 2000);
  //   }
  // };

  const { data: cartItems, isLoading } = useQuery({
    queryFn: () => getCart(userDetails.id),
    queryKey: ["cart"]
  });

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  console.log('cartTiems : ', cartItems);

  if (isLoading) {
    return <Preloader />
  }

  return (
    <main
      className={`fixed flex w-full h-full top-0 left-0 z-30 justify-center ${
        !isCartOpen2 ? "" : "hidden"
      }`}
    >
      <div
        className=" absolute bg-black/20 w-full h-full"
        onClick={() => {
          toggleMobileCart(false);
        }}
      />

      <div id="cart-items" className="z-40 self-center w-[90%] max-w-[1400px]">
        {cartItems && cartItems.length > 0 ? (
          <div className="bg-[#fff] rounded-lg overflow-x-auto md:overflow-x-hidden h-100 md:h-auto p-2 md:p-10 flex flex-col justify-center items-center gap-5 shadow-lg">
            <div className="w-[692px] overflow-x-scroll pl-[176px] md:w-full md:overflow-x-hidden md:pl-0 ">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs bg-slate-100 text-gray-700 px-5 fonts uppercase">
                  <tr>
                    <th
                      scope="col"
                      // colSpan="6"
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

                <tbody className="w-full overflow-y-auto overflow-x-auto">
                  {cartItems.map((item, index) => {
                    // if (index > 5) {
                    //   return;
                    // }
                    return <CartItem data={item} key={index} />;
                  })}
                </tbody>
              </table>
            </div>
            <div className=" w-full border-1 border-[#f5f5f5] flex justify-between p-5">
              <div className="">Total</div>

              <div className="">{totalPrice}</div>
            </div>
            <Link
              to={`${token != null ? "checkout-payment" : ""}`}
              // onClick={checkoutHandler}
              className="bg-[#FF0066] max-w-[200px] transition-all hover:bg-[#ff0f6f] text-center 
          py-3 mb-2 mr-2 self-end rounded-md font-bold text-white
          w-full h-12"
            >
              Checkout
            </Link>
          </div>
        ) : (
          <div className="bg-[#fff] rounded h-full w-[692px] md:w-full md:h-[60vh] p-10 flex flex-col justify-center items-center gap-[70px] shadow-lg">
            <div className="mx-auto w-[60%]">
              <img
                src="/empty-cart.png"
                className="m-auto
                         w-[90%] h-full"
                alt="empycart"
              />
            </div>

            <div
              className="bg-[#FF0066] button"
              onClick={() => toggleMobileCart(false)}
            >
              <div className="button-wrapper">
                <div className="text">Go Shopping</div>

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
    </main>
  );
};
