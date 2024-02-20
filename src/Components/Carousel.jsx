import { useEffect, useState } from "react";
import "../index.css";
import Card from "./Card.jsx";

import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";

export const Carousel = ({ filter, products }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isProduct = (item) => {
    // Check if the item category matches the filter and is not the currently viewed product
    return item.category === filter && item.id !== productDetails;
  };

  return (
    <>
      {screenWidth <= 766 ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={80}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="mySwiper w-full relative"
        >
          {filter
            ? // Filter items based on the provided filter
              products.filter(isProduct).map((item, i) => (
                <SwiperSlide key={i}>
                  <Card data={item} />
                </SwiperSlide>
              ))
            : // Show all items if no filter is provided
              products.map((item) => (
                <SwiperSlide key={item._id}>
                  <Card data={item} />
                </SwiperSlide>
              ))}
        </Swiper>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={5}
          freeMode={true}
          navigation
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          className="mySwiper w-full relative"
        >
          {filter ? (
            // Filter items based on the provided filter
            products.filter(isProduct).map((item, i) => (
              <SwiperSlide key={i}>
                <Card data={item} />
              </SwiperSlide>
            ))
          ) : // Show all items if no filter is provided
          products ? (
            products.length > 0 &&
            products.map((item) => (
              <SwiperSlide key={item._id}>
                <Card data={item} />
              </SwiperSlide>
            ))
          ) : (
            <h1 className='text-center py-12 text-[1.7rem] text-red-500 font-semibold'>Products not yet listed on the store !</h1>
          )}
        </Swiper>
      )}
    </>
  );
};
