import React, {useContext} from 'react';
import { ShopContext } from "../context/shop-context";

export default function Cartcard({data}) {

  console.log('data : ', data);

  const {cartItems, addToCart, removeFromCart, totalItems, totalPrice} = useContext(ShopContext);

  return (
    <div className="bg-[#f5f5f5] flex gap-3 p-2 items-center w-full">
        {/* Left */}
        <div className="max-w-[3.5rem] relative">
          {/*<span className='absolute text-red-400 font-bold bg-[#000] rounded-[50%] px-1 py-1 text-center '></span>*/}
          <svg onClick={() => removeFromCart(data.eachitem.id)} xmlns="http://www.w3.org/2000/svg" className='absolute top-[-7px] left-[-6px] w-4 h-4 cursor-pointer' viewBox="0 0 24 24"><path fill="#FF0066" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6L8.4 17Zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/></svg>
          <img src={data.eachitem.image} alt="product alt" className='max-w-[100%] h-auto' />
        </div>

        {/* Right */}
        <div className="">
           <div className="text-xs">{data.eachitem.description}</div>
           <div className="flex gap-1 text-xs"><span className='font-bold'>{data.count}</span> <span className='text-xs self-center'>x</span> <span className='text-red-500 font-bold'>${data.eachitem.price * data.count}</span></div>
        </div>

   </div>
  )
}
