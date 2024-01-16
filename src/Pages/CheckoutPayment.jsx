import DeliveryRibbon from "../Components/DeliveryRibbon";
import InputField from "../Components/InputField";
import Footer from "../Components/Footer";
import { useContext } from "react";
import { ShopContext } from "../context/shop-context";

const CheckoutPayment = () => {
  
const {totalPrice, userDetails} = useContext(ShopContext)
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
      <main className="mx-auto flex sm:flex-row flex-col max-w-[8570px] items-start justify-between p-4 pt-8">
        {/* billings details */}
        <div className="flex-1 bg-white w-full p-6 rounded-md flex flex-col gap-6">
          <h2 className="text-left text-2xl font-semibold text-black">
            Billing details
          </h2>
          {/* name field */}
          <div className="flex space-x-4">
            <InputField dropDown={false} field="Full Name" defaultValue={userDetails.name}/>
            {/* <InputField dropDown={false} field="Second Name" /> */}
          </div>
          <InputField dropDown={false} field="Delivery Address" />
          <InputField dropDown={false} field="Delivery Instruction" />
          <InputField dropDown={true} field="Country/Region" />
          <InputField dropDown={false} field="Street address" />
          <InputField dropDown={false} field="Town/City" />
          <InputField dropDown={false} field="Zip Code" />
          <InputField dropDown={false} field="Phone"  defaultValue={userDetails.contactNumber}/>
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
            <h5>{totalPrice}</h5>
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
            <button
              className="mt-6 rounded-md border border-gray-100 p-2 px-9 bg-[#FF0066]
          text-white font-semibold transition-all hover:scale-x-105 hover:border-gray-200 hover:bg-primary hover:text-gray-100"
            >
              Place order
            </button>
          </div>
        </div>
      </main>
      {/* deliveryRibbon */}
      <DeliveryRibbon />
      <Footer />
    </section>
  );
};

export default CheckoutPayment;
