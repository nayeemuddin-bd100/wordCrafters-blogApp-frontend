/* eslint-disable react/prop-types */
import {
    ArrowCircleLeftIcon,
    ArrowCircleRightIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import slide from "../../../img/poster.png";

const TopicSlide = ({ tag }) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <img src={slide} alt={tag} className="w-1/3 h-auto" />
    </div>
    <div className="flex items-center justify-center">
      <span className="text-lg font-semibold">{tag}</span>
    </div>
  </div>
);

const Topics = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="max-w-7xl container mx-auto p-10 my-10">
      <div className="flex justify-between gap-4 mb-8">
        <div className="flex items-center">
          <h2 className="text-3xl ">Topics</h2>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => swiperRef?.slidePrev()}
              className="text-indigo-500"
            >
              <ArrowCircleLeftIcon className="w-12 h-12w-12 inline-block" />
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              className="text-indigo-500"
            >
              <ArrowCircleRightIcon className="w-12 h-12w-12 inline-block" />
            </button>
          </div>
        </div>
      </div>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500 }}
        loop={true}
        speed={1000}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper pt-5"
      >
        <SwiperSlide>
          <TopicSlide tag="Tag 1" />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide tag="Tag 2" />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide tag="Tag 3" />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide tag="Tag 4" />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide tag="Tag 5" />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide tag="Tag 6" />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide tag="Tag 7" />
        </SwiperSlide>
        {/* Add more SwiperSlide components as needed */}
      </Swiper>
    </div>
  );
};

export default Topics;
