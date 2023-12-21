import { useState } from "react";
import StoreSideBar from '../Components/StoreSideBar'
import Preloader from '../Components/Preloader'
import {Carousel} from '../Components/Carousel'
import Footer from "../Components/Footer";

export default function Store() {

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false); // Set isLoading to false after the delay
  }, 1500);


  return (
    
    <>
    {isLoading && <Preloader/>}
      <div className='flex flex-row justify-between'>
          <StoreSideBar/>
          
          <section className="py-10 w-1/2 bg-white grow" >
          <div className='px-8 py-4 w-full'>
            <h2 className="text-2xl font-bold ">Best Sellers</h2>
              <Carousel />
          </div>
          <div className='px-8 py-4 w-full'>
            <h2 className="text-2xl font-bold ">Fresh Fruit</h2>
              <Carousel />
          </div>
          <div className='px-8 py-4 w-full'>
            <h2 className="text-2xl font-bold ">Fresh Vegetables</h2>
              <Carousel />
          </div>
          <Footer/>  
          </section>
      </div>    
    </>
  );
}
