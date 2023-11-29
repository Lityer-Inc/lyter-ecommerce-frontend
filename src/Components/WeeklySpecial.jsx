import React from "react";

export default function WeeklySpecial() {
  return (
    <div className="md:flex justify-center gap-[20px] md:gap-[12px] items-center px-5 md:px-20 py-2   ">

     {/* First container */}
     <div className="flex flex-col-reverse md:flex-row justify-center items-center md:gap-40">

        <div className="text-center md:text-left md:w-[22%] flex justify-between items-center">
            <h2 className="font-extrabold text-[60px] leading-[70px]">
              Fastest<br/> <span className="text-[#FF0066]">Delivary</span>& <br />
              Easy <span className="text-[#FF0066]" >Pickup</span>
            </h2>
          </div>


          <div className="weekly-special-container w-[45%] relative">
            {/* <div
                className="absolute top-0 left-[-70] w-full h-full z-[-99] "
                style={{
                  background: 'url(/blob.svg)',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div> */}
                <img
                className="w-full h-auto  z-[60]"
                src="/illustrations.png"
                alt="Image"
              />
            </div>

     </div>

        

        <div className="flex md:flex-grow w-full md:flex-col gap-7 justify-center md:justify-normal md:gap-8 p-10 md:p-14 rounded mt-12 md:mt-0">


            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
               <div className="rounded-[100%] shadow-lg w-14 h-14 flex justify-center items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M216 120a41 41 0 0 0-6.6.55l-5.82-15.14A55.64 55.64 0 0 1 216 104a8 8 0 0 0 0-16h-19.12l-13.41-34.87A8 8 0 0 0 176 48h-32a8 8 0 0 0 0 16h26.51l9.23 24H152c-18.5 0-33.5 4.31-43.37 12.46a16 16 0 0 1-16.76 2.07c-10.58-4.81-73.29-30.12-73.8-30.26a8 8 0 0 0-5 15.19s55.5 21.94 66.53 32.94A55.67 55.67 0 0 1 95.43 152H79.2a40 40 0 1 0 0 16h52.12a31.91 31.91 0 0 0 30.74-23.1a56 56 0 0 1 26.59-33.72l5.82 15.13A40 40 0 1 0 216 120ZM40 168h22.62a24 24 0 1 1 0-16H40a8 8 0 0 0 0 16Zm176 16a24 24 0 0 1-15.58-42.23l8.11 21.1a8 8 0 1 0 14.94-5.74L215.35 136h.65a24 24 0 0 1 0 48Z"/></svg>
                </div>

               <div className="text-center md:text-start">
                 <h3 className="font-bold text-gray-600 ">Fast delivery</h3>
                 <div className="font-light text-xs text-gray-400 ">
                   promise to deliver <br/>
                   in 30 mins
                 </div>
               </div>

            </div>



            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
               <div className="rounded-[100%] shadow-lg w-14 h-14 flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5.574 4.691c-.833.692-1.053 1.862-1.492 4.203l-.75 4c-.617 3.292-.925 4.938-.026 6.022C4.206 20 5.88 20 9.23 20h5.54c3.35 0 5.024 0 5.924-1.084c.9-1.084.59-2.73-.026-6.022l-.75-4c-.44-2.34-.659-3.511-1.492-4.203C17.593 4 16.402 4 14.02 4H9.98c-2.382 0-3.573 0-4.406.691Zm4.304 3.06a2.251 2.251 0 0 0 4.245 0a.75.75 0 0 1 1.414.499a3.751 3.751 0 0 1-7.073 0a.75.75 0 1 1 1.414-.5Z" clip-rule="evenodd"/></svg>
               </div>

               <div className="text-center md:text-start">
                 <h3 className="font-bold text-gray-600 ">Pick up</h3>
                 <div className="font-light text-xs text-gray-400">
                   pick your delivery <br/>
                   at your doorstep
                 </div>
               </div>

            </div>




            <div className="flex flex-col md:flex-row justify-center items-center gap-5">
               <div className="rounded-[100%] shadow-lg w-14 h-14 flex justify-center items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5.003 4.66c0-1.496 1.231-2.804 2.821-2.647A20.782 20.782 0 0 1 21.266 8.84c1.07 1.193.737 2.964-.479 3.845l-.423.307l-.363-.54l-.008-.011c-3.19-4.407-8.38-7.275-14.24-7.275h-.75V4.66Zm13.768 8.65l.378.563l-3.947 2.865l-.202.15v2.102a1 1 0 0 1-2 0v-.06a.5.5 0 0 0-.996.06v1.501a1 1 0 0 1-1.995.1l-1.44 1.04c-1.489 1.074-3.57.011-3.569-1.826l.003-13.14h.75c5.354 0 10.096 2.617 13.018 6.645Zm-9.767-2.32a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm4 2.998a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm-4 2.998a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"/></svg>
               </div>

               <div className="text-center md:text-start">
                 <h3 className="font-bold text-gray-600">Enjoy em</h3>
                 <div className="font-light text-xs text-gray-400">
                   Enjoy your product <br/>
                   fast
                 </div>
               </div>

            </div>



        </div>




        


    </div>

  );
}
