import { useState } from "react";
import Stores from "../Components/Stores.jsx"
import Preloader from "../Components/Preloader"
import { Link } from "react-router-dom"
import dataStores from "../DummyData/dataStores.js";
import Footer from "../Components/Footer.jsx";



export default function StoresList() {

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false); // Set isLoading to false after the delay
  }, 1500);

  return (
    <>
      {isLoading && <Preloader/>}
      <div className='flex flex-row justify-between'>
        <section className=" w-[800px] bg-white grow" >
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-center px-12 mt-10">
            {dataStores && dataStores.map((item, i) => (
              <Link to="/storefront" className="w-full" key={i}>
                <Stores data={item} />
                {console.log(item)}
              </Link>
            ))}
          </ul>
          <Footer/> 
        </section>
      </div>       
    </>
  );
}
