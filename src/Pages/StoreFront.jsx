import { useContext, useEffect, useRef, useState } from "react";
import StoreSideBar from "../Components/StoreSideBar";
import Preloader from "../Components/Preloader";
import { Carousel } from "../Components/Carousel";
import Footer from "../Components/Footer";
import { ShopContext } from "../context/shop-context";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Store() {
  const { stores, endpointHead } = useContext(ShopContext);
  const [params] = useSearchParams();

  const storeId = useRef(params.get("id"));

  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState();

  // setTimeout(() => {
  //   setIsLoading(false); // Set isLoading to false after the delay
  // }, 1500);

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        // fetch stored data
        const response = await axios.get(`${endpointHead}/stores/${storeId.current}/products`)
        const productsData = response.data;
        console.log("data:", productsData)
        setStore(productsData)
        setIsLoading(false)

      }
      catch (error){
        console.log("error on fetch:", error)
      }
    };
    fetchData();
  },[])

  if (isLoading) {
    return <Preloader />
  }
  const menu = [
    { name: 'Vegetables', img: 'carrot.png', linkTo: '/vegetables' },
    { name: 'Fruits', img: 'pear.png', linkTo: '/fruits' },
    { name: 'Dairy', img: 'milk.png', linkTo: '/dairy' },
    { name: 'Meats', img: 'meat2.png', linkTo: '/meats' },
    { name: 'Bakery', img: 'bakery2.png', linkTo: '/bread' },
    { name: 'Frozen Foods', img: 'frozen-fish.png', linkTo: '/frozen-foods' },
    { name: 'Beverages', img: 'beverages.png', linkTo: '/beverages' },
    { name: 'Cleaning Supplies', img: 'cleaning-products2.png', linkTo: '/cleaning-supplies' },
    { name: 'Personal Care', img: 'facial-mask.png', linkTo: '/personal-care' },
    { name: 'Baby Care', img: 'baby.png', linkTo: '/baby-care' },
  ]

  return (
    <>
    <div
            className={`md:flex justify-evenly text-white px-2 pt-[8px] pb-[4px] shadow transition-all duration-500 bg-[#F5F5F5] w-full relative z-10 items-center
              "top-[-200px] opacity-0" : "top-0 opacity-100"`}
          >
            {menu?.map((data, index) => (
              <Link to={`${data?.linkTo}?id=${storeId.current}`} key={index}>
              <div className="flex gap-2 text-center items-center cursor-pointer hover:bg-black/10 transition-colors duration-500 hover:rounded p-3">
                <img className="category-img w-6 h-6 mb-1" src={data?.img} alt={data?.name} />
                <span className="text-xs text-black font-normal"> {data?.name} </span>
              </div>
            </Link>
            
            ))}
          </div>
      <div className="flex flex-row justify-between">
        <StoreSideBar store={store} />

        <section className="py-10 w-1/2 bg-white grow">
          <div className="px-8 py-4 w-full">
            <h2 className="text-2xl font-bold ">Best Sellers</h2>
            <Carousel products={store} />
          </div>
          {/* <div className="px-8 py-4 w-full">
            <h2 className="text-2xl font-bold ">Fresh Fruit</h2>
            <Carousel />
          </div>
          <div className="px-8 py-4 w-full">
            <h2 className="text-2xl font-bold ">Fresh Vegetables</h2>
            <Carousel />
          </div> */}
          <Footer />
        </section>
      </div>
    </>
  );
}
