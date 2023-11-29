import React, { useEffect, useRef, useState } from 'react'
import data from "../DummyData/data.js";
import Card from "./Card.jsx";
import "../index.css"

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/bundle';

export const Carousel = ({ filter, productDetails }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isProduct = (item) => {
        // Check if the item category matches the filter and is not the currently viewed product
        return (item.category === filter && item.id !== productDetails);
    };

    return (
        <>
            {screenWidth <= 766 ? (
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    spaceBetween={80}
                    navigation
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    className="mySwiper w-full relative"
                >
                    {filter ? (
                        // Filter items based on the provided filter
                        data.filter(isProduct).map((item, i) => (
                            <SwiperSlide key={i}>
                                <Card data={item} />
                            </SwiperSlide>
                        ))
                    ) : (
                        // Show all items if no filter is provided
                        data.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Card data={item} />
                            </SwiperSlide>
                        ))
                    )}
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
                    onSlideChange={() => console.log('slide change')}
                    className="mySwiper w-full relative"
                >
                    {filter ? (
                        // Filter items based on the provided filter
                        data.filter(isProduct).map((item, i) => (
                            <SwiperSlide key={i}>
                                <Card data={item} />
                            </SwiperSlide>
                        ))
                    ) : (
                        // Show all items if no filter is provided
                        data.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Card data={item} />
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            )}
        </>
    );
};