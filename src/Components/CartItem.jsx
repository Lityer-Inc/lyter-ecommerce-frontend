import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context.jsx";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Toaster, toast } from "sonner";
import apiService from "../utils/apiService.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CartItem = ({ data }) => {
  //const { img, title, description, price, id } = props.data;
  const {
    cartItems,
    addToCart,
    removeFromCart,
    totalItems,
    totalPrice,
    removeMini,
    addMini,
    userDetails,
    product,
    productSelected,
    setProductSelected,
    isCartOpen,
    setIsCheckoutOpen
  } = useContext(ShopContext);

  const queryClient = useQueryClient();

  const removeCom = (data) => {
    if (data.count === 1) {
      removeFromCart(data.product._id);
    } else {
      removeMini(data.product._id);
    }
  };
 
  const checkoutHandler = () => {
    setIsCheckoutOpen(true);
  }

  const deleteHandler = async (productId) => {
    try {
      const res = await apiService.deleteCart(userDetails.id, productId);
      if (res.status === 200) {
        console.log("deleteHnadler response : ", res);
        toast("Product Succesfully Removed !");
      } else {
        toast("Error while deleting the item from cart !");
      }
    } catch (e) {
      console.log("error");
      toast("Server Error !");
    }
    // useFetchAndAddToCart(userDetails);
  };

  // useEffect(() => {
  // }, [cartItems]);

  const { mutateAsync: deleteCartItem } = useMutation({
    mutationFn: deleteHandler,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"], {
        refetchInactive: true,
        refetchOnWindowFocus: true
      });
    }
  });

  return (
    <section className="bg-white border-b hover:bg-gray-50 w-full text-center py-3">
      <div className="flex p-2 pb-3 justify-between items-center">
        <div className="flex justify-between space-x-6 items-center m-auto relative">
          <img
            src={data.product.image}
            alt=""
            className="max-w-[65px] h-auto"
          />
        </div>
        {/* <td class="w-2 p-4 pl-0" colSpan="3">
        <div class="flex justify-evenly items-center">
        </div>
      </td> */}
        <div className="flex flex-col flex-[0.1] space-y-4">
          <div className="flex items-center justify-between pr-5">
            {/* product name and details */}
            <div className="flex flex-col text-start">
              <h2 className="font-semibold text-[1.3rem]">
                {data.product.title}
              </h2>
              <span className="self-start">{data.product.description}</span>
            </div>

            <span className="fonts font-semibold text-xl text-blue-500 md:px-2 md:py-4 whitespace-nowrap text-center">
              ${data.product.price}
            </span>
          </div>

          <div className="self-start flex gap-4 max-w-max items-center">
            <div
              className="flex px-4 items-center py-1 border-gray-700 border
               rounded-full gap-3"
            >
              <CiSquareMinus onClick={() => addMini(data.product)} />
              <span className="text-black text-bold text-[1.1rem]">{data?.quantity}</span>
              <CiSquarePlus
                className="text-[5rem] "
                onClick={() => removeCom(data)}
              />
            </div>
            <button
              onClick={async () => {
                try {
                  await deleteCartItem(data.product._id);
                } catch (e) {
                  console.log("error in deleting cart item");
                }
              }}
              className="flex items-center gap-4 p-1 px-4 border-b border-red-300 rounde-full"
            >
              Remove <MdDelete className="text-2xl text-black cursor-pointer" />
            </button>
          </div>

          {/* down part */}
          <div className="self-start flex gap-3 fonts font-medium whitespace-nowrap text-center">
            <button className="bg-green-400 hover:bg-green-500 rounded-full px-4 py-2 w-full">
              Continue Shopping
            </button>
            {}
            <button className="bg-red-400 hover:bg-red-500 rounded-full px-6 py-2 w-full" onClick={checkoutHandler} >
              CheckOut
            </button>
          </div>
        </div>
        <Toaster />
      </div>
    </section>
  );
};

export default CartItem;
