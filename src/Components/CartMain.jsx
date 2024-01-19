import React, { useContext } from "react";
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

  const { userDetails } = useContext(ShopContext);
  const { getCart } = apiService;

  const { data: cartItems, isLoading } = useQuery({
    queryFn: () => getCart(userDetails.id),
    queryKey: ["cart"]
  });

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
          {cartItems?.length}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        {" "}
        {/* the actual cart component which slides over on cick of cart icon */}
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({cartItems?.length})</SheetTitle>
        </SheetHeader>
        {itemCount == 0 ? (
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
              <div className="pt-10 flex w-full flex-col pr-6">
                {/* TODO : cart logic */}
                {cartItems?.map((item, index) => {
                  return <CartItem data={item} key={index} />;
                })}
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
            <h3 className="text-xl font-semibold">Your Cart is Empty</h3>
            <SheetTrigger asChild>
              <Link
                to="/products"
                // className={buttonVariants({
                //   variant: "link",
                //   size: "sm",
                //   className: "text-sm text-muted-foreground"
                // })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartMain;
