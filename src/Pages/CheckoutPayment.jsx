import DeliveryRibbon from "../Components/DeliveryRibbon";
//import InputField from "../Components/InputField"; 
import React, { useState, useContext, useRef, forwardRef } from 'react';

import CartItem from "../Components/CartItem";

import { ShopContext } from '../context/shop-context'; 


  
   
const InputField = forwardRef((props, ref) => {
  const { field, value, onChange, ...otherProps } = props;

  return (
    <input
      type="text"
      placeholder={field} // Assuming 'field' is used as placeholder
      value={value}
      onChange={onChange}
      ref={ref}
      {...otherProps}
    />
  );
});
 
const CheckoutPayment = () => {

 

  const fullnameRef = useRef();
  const deliveryAddressRef = useRef();
  const deliveryInstructionRef = useRef();
  const countryRef = useRef();
  const streetAddressRef = useRef();
  const cityRef = useRef();
  const zipRef = useRef();
  const phoneRef = useRef();
 
   
 
  
  const { cartItems } =
    useContext(ShopContext);
   

const [fullname, setFullname] = useState('');
const [deliveryAddress, setDeliveryAddress] = useState(''); // New state for Delivery Address
const [deliveryInstruction, setDeliveryInstruction] = useState('');
const [country, setCountry] = useState('');
const [street_address, setStreetAddress] = useState('');
const [city, setCity] = useState('');
const [zip, setZip] = useState('');
const [phone, setPhone] = useState('');
 

   

 const handleSubmit = async () => { 
  
 alert("my order placed");    //for development/debug purposse
 
 const customerId = '1'.padStart(36, ' ');  // placeholder values
  const retailerId = '1'.padStart(36, ' ');   //placeholder but this may be deprecated also

  const orderData = {
    name: 'DEPRECATED ', //  placeholder dataq
    featuredImage: 'ALSO DEPRECATED',   
    amount: 100, // Total order amount
    customerId: customerId,
    retailerOrderId: retailerId
    // Add other fields as required
  };

 function generateRandomId() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < 36; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
 
 
cartItems.map(item => {
  const productId = item.eachitem.id.padStart(36, ' ');
  const price = item.eachitem.price;
  
  console.log('productId:', productId); 
  console.log('price:', price);          
});


  const orderItems = cartItems.map(item => ({
    productId: item.eachitem.id.padStart(36, ' '),
    price: item.eachitem.price  
  
  }));

const customerInfo = {
  id: generateRandomId(),
  fullname: fullname || 'Default Name', 
  email: 'default@example.com', 
  password: 'defaultPassword', 
  delivery_address: deliveryAddress || '', // Corrected to deliveryAddress
  delivery_instruction: deliveryInstruction || '', 
  country: country || 'Default Country', 
  street_address: street_address || 'Default Street', 
  city: city || 'Default City', 
  zip: zip || '00000', 
  phone: phone || '0000000000'
};




  try {
    const response = await fetch('http://localhost:8000/orders/add_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerInfo, orderData, orderItems }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Order processed.', responseData); 
    } else {
      console.error('Error with order.'); 
    }
  } catch (error) {
    console.error('Error...', error); 
  }
};


  return (
    // <main className='bg-[#F5F5F5] w-full h-full'>
    //   {/* left */}
    //   <section className='flex flex-col p-4 bg-gray-100'>
    //     {/* delivery address */}
    //     <div className=''>

    //     </div>
    //   </section>
    //   {/* right */}
    // </main>
    <section className="bg-[#F5F5F5] flex flex-col">
      {/* <h2 className="p-10 text-center text-3xl font-bold text-black">
      Checkout
    </h2> */}
      <main className="mx-auto flex sm:flex-row flex-col max-w-[8570px] items-start justify-between p-4">
        {/* billings details */}
        <div className="flex-1 bg-white w-full p-6 rounded-md flex flex-col gap-6">
          <h2 className="text-left text-2xl font-semibold text-black">
            Billing details
          </h2>
          {/* name field */}
          
           <div className="flex space-x-4">
             
             
             <InputField 
  field="Full Name" 
  value={fullname}  
  ref={fullnameRef}
  onChange={(e) => setFullname(e.target.value)} 
/>

</div>   

<InputField 
  field="Delivery Address" 
  value={deliveryAddress}  
  ref={deliveryAddressRef}
  onChange={(e) => setDeliveryAddress(e.target.value)} 
/>

<InputField 
  field="Delivery Instruction" 
  value={deliveryInstruction}  
  ref={deliveryInstructionRef}   
  onChange={(e) => setDeliveryInstruction(e.target.value)} 
/>

<InputField 
  field="Country/Region" 
  value={country}  
  ref={countryRef}  
  onChange={(e) => setCountry(e.target.value)} 
/>

<InputField 
  field="Street Address" 
  value={street_address} 
  ref={streetAddressRef}   
  onChange={(e) => setStreetAddress(e.target.value)} 
/>

<InputField 
  field="Town/City" 
  value={city}  
  ref={cityRef}  
  onChange={(e) => setCity(e.target.value)} 
/>

<InputField 
  field="Zip Code" 
  value={zip}  
  ref={zipRef}  
  onChange={(e) => setZip(e.target.value)} 
/>

<InputField 
  field="Phone" 
  value={phone}  
  ref={phoneRef}  
  onChange={(e) => setPhone(e.target.value)}
/>


          <p>Payment</p>
          {/* <InputField dropDown={false} field="Wallet address" /> */}
        </div>
        {/* product price details */}
        <div className="flex-[0.8] ml-8 flex max-w-[500px] flex-col gap-4">
          <div className="flex items-center justify-between text-xl font-semibold">
            <h2>Product</h2>
            <h2>Subtotal</h2>
          </div>
          <div className="text-md flex items-center justify-between text-xl text-gray-700">
            <h5>{"ItemsSubtotal"}</h5>
            <h5>{34234}</h5>
          </div>
          <div className="text-md flex items-center justify-between text-xl text-gray-700">
            <h5 className="text-gray-800">Delivery Charges</h5>
            <h5>{234234}</h5>
          </div>
          <div className="text-md flex items-center justify-between text-xl text-gray-700">
            <h5 className="text-gray-800">Service Fee</h5>
            <h5>{234234}</h5>
          </div>
          <div className="text-md flex items-center justify-between text-xl text-gray-800">
            <h5>Total</h5>
            <h5 className="text-2xl text-[#FF0066] font-semibold">$ {32423}</h5>
          </div>

          <section className="p-1 my-3 border-y borde-gray-400 flex justify-between items-center">
            <img
              src="https://www.instacart.com/image-server/48x48/www.instacart.com/assets/checkout/quality_guarantee/ribbon-a93eef7e76db2d7610608da27c5a9f5cb489ba37932c9624309ea1756817018e.png"
              alt="guarentted image"
            />
            <div className="text-blue-500  text-[1.1rem] font-medium">
              <h4>100% Satisfaction gurantee </h4>
              <span className="text-gray-900">
                Place your order with peace of mind{" "}
              </span>
            </div>
          </section>

          <p className="text-left text-sm text-gray-500">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <span className="text-blue-600 cursor-pointer">
              privacy policy.
            </span>
          </p>

          {/* place order button */}
          <div>
            <button type="submit"
              className="mt-6 rounded-md border border-gray-100 p-2 px-9 bg-[#FF0066]
          text-white font-semibold transition-all hover:scale-x-105 hover:border-gray-200 hover:bg-primary hover:text-gray-100"
          
          onClick={handleSubmit}
            >
              Place order
            </button>
          </div>
        </div>
      </main>
      {/* deliveryRibbon */}
      <DeliveryRibbon />
    </section>
  );
};

export default CheckoutPayment;
