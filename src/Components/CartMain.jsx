import React, { useContext, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { ShopContext } from "../context/shop-context";
import Preloader from "./Preloader";
import apiService from "@/utils/apiService";
import { useQuery } from "@tanstack/react-query";
import CartItem from "./CartItem";

const CartMain = () => {
  const itemCount = 0;
  const fee = 1;

  const [storeProducts, setStoreProducts] = useState([]);

  const { userDetails } = useContext(ShopContext);
  const { getCart } = apiService;
  let userId = undefined;

  if (userDetails) {
    userId = userDetails.id;  
  }

  const {
    data: cartItems,
    isLoading,
    isFetching
  } = useQuery({
    queryFn: () => getCart(userId),
    queryKey: ["cart", userId]
  });

  useEffect(() => {
    async function separateProductsByStore() {
      const cartProductsByStore = (
        await Promise.all(
          cartItems.data &&
            cartItems.data.length > 0 &&
            cartItems.data.map(async (data) => {
              try {
                const storeDetails = await apiService.getSpecificStore(
                  data.product?.storeId
                );
                const storeId = data.product?.storeId;
                const storeName = storeDetails.name;
                const storeImage = storeDetails.avatar || "";
                const storeDescription = storeDetails.description || "";

                return {
                  [storeId]: {
                    products: data.product,
                    storeImage: storeImage,
                    storeName: storeName,
                    storeDescription: storeDescription
                  }
                };
              } catch (err) {
                console.error(err);
                return {
                  unknown_store: {
                    products: data.product,
                    storeImage: "",
                    storeName: "unknown_store",
                    storeDescription: "lorem upsem khuah"
                  }
                };
              }
            })
        )
      ).reduce((acc, product) => {
        const store = Object.keys(product)[0];
        const {
          products: productData,
          storeImage,
          storeName,
          storeDescription
        } = product[store];

        // Create an array for the store if it doesn't exist
        acc[store] = acc[store] || {
          products: [],
          storeImage,
          storeName,
          storeDescription
        };

        // Add the product to the store's array
        acc[store].products.push(productData);

        return acc;
      }, {});

      if (cartItems.status !== 200) {
        return setStoreProducts([]);
      } else {
        setStoreProducts(Object.values(cartProductsByStore));
        return cartProductsByStore;
      }
    }
    if (!isFetching) {
      separateProductsByStore();
    }
  }, [isFetching]);

  if (isLoading) {
    return <Preloader />;
  }


  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        {" "}
        {/* button that enables to view the cart */}
        <CiShoppingCart
          aria-hidden="true"
          className="h-9 w-9 flex-shrink-0 text-black group-hover:text-gray-900"
        />
        <span className="ml-2 text-[1.1rem] font- text-gray-900 group-hover:text-gray-800">
          {cartItems.data ? cartItems.data.length : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg overflow-y-scroll">
        {" "}
        {/* the actual cart component which slides over on cick of cart icon */}
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>
            Cart ({cartItems.data ? cartItems.data.length : 0})
          </SheetTitle>
        </SheetHeader>
        {storeProducts.length > 0 ? (
          <>
            <div className="space-y-4 pr-6">
              {/* <Separator /> */}
              <div className="space-y-1.5 pr-6">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>

                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{fee}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{fee}</span>
                </div>
              </div>
              <div className="pt-10 flex w-full flex-col gap-1 pr-6">
                {/* {cartItems.map((item, index) => {
                  return <CartItem data={item} key={index} />;
                })} */}
                {
                  storeProducts.map((store, i) => {
                    // const storeName = String(Object.keys(store)[i]);
                    // const products = store[Object.keys(store)[i]]?.products;
                    return (
                      <section
                        className="py-3 px-4 shadow-xl bg-gray-100  rounded-md border border-gray-100"
                        key={i}
                      >
                        <div className="flex flex-col space-y-4">
                          {/* store image & title */}
                          <div className="flex items-center space-x-4">
                            <img
                              src={"/empty-cart.png"}
                              className="rounded-full w-[80px] h-[80px] border border-gray-300"
                              alt="productImage"
                            />
                            <div className="flex flex-col items-start">
                              <h3 className="text-xl font-semibold text-gray-900">
                                {store.storeName}
                              </h3>
                              <span className="text-gray-700">
                                {" "}
                                {store.storeDescription}
                              </span>
                              <span className="text-green-800 font-medium">
                                Delivery by 7pm
                              </span>
                            </div>
                          </div>
                          {/* store product images */}
                          <div className="flex flex-grow w-full space-x-2">
                            {store.products.map((product, index) => (
                              // <img
                              //   src={product?.image}
                              //   className="rounded-full w-[70px] h-[70px] p-1 border object-contain"
                              //   alt="productImage"
                              // />
                              <p key={index}>{product.title}</p>
                            ))}
                          </div>
                          {/* down part */}
                          <div className="self-start flex gap-3 fonts font-medium whitespace-nowrap text-center">
                            <button className="bg-green-400 hover:bg-green-500 rounded-full px-4 py-2 w-full">
                              Continue Shopping
                            </button>
                            {}
                            <button
                              className="bg-red-400 hover:bg-red-500 rounded-full px-6 py-2 w-full"
                              // onClick={checkoutHandler}
                            >
                              CheckOut
                            </button>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                {/* <section className="bg-white border-b hover:bg-gray-50 w-full text-center py-3">
                  <div className="flex gap-3">
                    <img />
                  </div>
                </section> */}
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    // className={buttonVariants({
                    //   className: "w-full"
                    // })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <img
                src={"/empty-cart.png"}
                aria-hidden="true"
                fill
                alt="empty shopping cart"
              />
            </div>
            <h3 className="text-xl font-semibold">Please Login to View your cart</h3>
            <SheetTrigger asChild>
              <Link
                  to="/"
                  className='text-blue-500'
                // className={buttonVariants({
                //   variant: "link",
                //   size: "sm",
                //   className: "text-sm text-muted-foreground"
                // })}
              >
                {"back"}
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartMain;
