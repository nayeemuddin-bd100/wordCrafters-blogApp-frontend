/* eslint-disable react/prop-types */
import { ArrowRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import demoImg from "../../../img/topicIcon/javascript.svg";

const TopicSlide = () => (
  <div className="flex flex-col items-center gap-4 bg-white p-5 rounded-xl">
    <img
      src={demoImg}
      alt="demo"
      className="w-36 h-36 rounded-lg object-contain"
    />
    <div className="flex flex-col items-center justify-center">
      <p className="font-inter text-sm text-gray-500"> 25 November 2022</p>
      <p className="text-lg text-center">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate,
        voluptatem.
      </p>
      <div className="flex justify-between mt-3">
        <Link className="text-sm text-indigo-800">
          View Details{" "}
          <span>
            <ArrowRightIcon className="w-4 h-4 inline-block" />
          </span>{" "}
        </Link>
        <p className="text-xs text-gray-800 font-inter"> 🔥 2 Min Read</p>
      </div>
    </div>
  </div>
);

const MostPopularCarousel = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="">
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500 }}
        loop={true}
        speed={1000}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper pt-5"
        // direction="vertical"
      >
        <SwiperSlide>
          <TopicSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide />
        </SwiperSlide>

        {/* Add more SwiperSlide components as needed */}
      </Swiper>
    </div>
  );
};

export default MostPopularCarousel;
