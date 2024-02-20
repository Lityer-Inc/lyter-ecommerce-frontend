import { ShopContext } from "@/context/shop-context";
import CheckoutItem from "@/components/CheckoutItem";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const token = Cookies.get("token");
  const { store: checkoutItems } = JSON.parse(localStorage.getItem("checkout"));
  console.log("c : ", checkoutItems);

  return (
    <main
      className={`flex flex-col w-[90%] max-md:w-[100%] mx-auto max-w-[1400px] h-full justify-start p-1`}
    >
      <h1 className="text-2xl font-bold text-[#FF0F6F] pt-4">Checkout </h1>
      <main>
        <div className="flex mx-auto py-2 flex-row border-b  backdrop-blur-sm items-center justify-center space-x-4">
          {checkoutItems?.storeImage && (
            <img
              src={checkoutItems?.storeImage}
              className="rounded-full  w-[80px] h-[80px] border border-gray-300 p-1"
            />
          )}

          <h2 className="text-[1.2rem] text-3xl font-semibold">
            {checkoutItems?.storeName
              ? checkoutItems?.storeName
              : "All Cart Products"}
          </h2>
          {/* <p className="text-[0.8rem] -mt-1 text-center text-gray-700 font-semibold">
            {checkoutItems?.storeDescription}
          </p> */}
          {/* <Link to='/earn'>
                </Link> */}
        </div>
      </main>
      <div className="w-full py-5 px-4">
        {checkoutItems && checkoutItems?.products?.length > 0 ? (
          <div className="bg-[#fff] rounded-lg overflow-x-auto md:overflow-x-hidden flex flex-col justify-center items-center gap-5">
            <div className="w-full overflow-scroll max-w-[1050px] max-h-[510px] md:w-full md:overflow-x-hidden md:pl-0 ">
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
                  {checkoutItems?.products?.map((item, index) => {
                    // if (index > 5) {
                    //   return;
                    // }
                    return <CheckoutItem data={item} key={index} />;
                  })}
                </tbody>
              </table>
            </div>
            <div className=" w-full border-1 border-[#f5f5f5] flex justify-between p-5">
              <div className="">Total</div>

              <div className="">{"393"}</div>
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

export default Checkout;
