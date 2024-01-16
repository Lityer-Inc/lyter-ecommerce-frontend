import React, { useEffect, useContext } from "react";
import { ShopContext } from "../context/shop-context";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

const CartItem = ({ data }) => {
  //const { img, title, description, price, id } = props.data;
  const {
    cartItems,
    addToCart,
    removeFromCart,
    totalItems,
    totalPrice,
    removeMini,
    addMini
  } = useContext(ShopContext);

  const removeCom = (data) => {
    if (data.count === 1) {
      removeFromCart(data.product._id);
    } else {
      removeMini(data.product._id);
    }
  };

  console.log("data : ", data);

  useEffect(() => {}, [cartItems]);

  return (
    <tr class="bg-white border-b hover:bg-gray-50 w-full text-center">
      <td class="flex p-2 pb-3 ">
        <div className="flex justify-between space-x-6 items-center m-auto relative">
          <img
            src={data.product.image}
            alt=""
            className="max-w-[65px] h-auto"
          />

          <h2 className="font-semibold text-[1.3rem]">{data.product.title}</h2>
        </div>
      </td>
      {/* <td class="w-2 p-4 pl-0" colSpan="3">
        <div class="flex justify-evenly items-center">
        </div>
      </td> */}
      <td class="p-2 fonts font-medium md:px-2 md:py-4 whitespace-nowrap text-center">
        ${data.product.price}
      </td>
      <td class="p-2 fonts font-medium md:px-2 md:py-4 whitespace-nowrap text-center">
        <div className="flex gap-4 mx-auto max-w-max items-center">
          <CiSquarePlus onClick={() => removeCom(data)} />
          <span className="text-black text-semibold">{data.count}</span>
          <CiSquareMinus onClick={() => addMini(data.product)} />
        </div>
      </td>
      {/* <td class="flex flex-row gap-2 bg-black justify-center items-center h-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => removeCom(data)}
          className="cursor-pointer "
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="M16 5.268A2 2 0 0 1 17 7v6a4 4 0 0 1-4 4H7a2 2 0 0 1-1.732-1H13a3 3 0 0 0 3-3V5.268ZM15 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5Zm-3 4a.5.5 0 0 1-.5.5h-5a.5.5 0 1 1 0-1h5a.5.5 0 0 1 .5.5Z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => addMini(data.eachitem)}
          className="cursor-pointer "
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M14 14q.425 0 .713-.288T15 13v-2h2q.425 0 .713-.288T18 10q0-.425-.288-.713T17 9h-2V7q0-.425-.288-.713T14 6q-.425 0-.713.288T13 7v2h-2q-.425 0-.713.288T10 10q0 .425.288.713T11 11h2v2q0 .425.288.713T14 14Zm-6 4q-.825 0-1.413-.588T6 16V4q0-.825.588-1.413T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H8Zm-4 4q-.825 0-1.413-.588T2 20V7q0-.425.288-.713T3 6q.425 0 .713.288T4 7v13h13q.425 0 .713.288T18 21q0 .425-.288.713T17 22H4Z"
          />
        </svg>
      </td> */}
      <td class="p-2 fonts md:px-2 md:py-4 text-center">
        {/* ${data.eachitem.price * data.count} */} {/* COMMENTED */}
      </td>
    </tr>
  );
};

export default CartItem;
