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
import ExpressIcon from "../../../img/topicIcon/express.svg";
import GithubIcon from "../../../img/topicIcon/github.svg";
import JavascriptIcon from "../../../img/topicIcon/javascript.svg";
import MongodbIcon from "../../../img/topicIcon/mongodb.svg";
import NextIcon from "../../../img/topicIcon/next-js.svg";
import NodeJsIcon from "../../../img/topicIcon/nodejs.svg";

const TopicSlide = ({ image, tag,article }) => (
  <div className="flex flex-col justify-center items-center gap-4 bg-white p-5 rounded-xl">
    <div className="">
      <img
        src={image}
        alt={tag}
        className=" w-full h-36 rounded-lg object-contain"
      />
    </div>
    <div className="flex flex-col items-start justify-center bg-white">
      <p className="text-lg">{tag}</p>
      <p className="font-inter text-sm text-gray-500">{article} Article</p>
    </div>
  </div>
);

const Topics = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="max-w-7xl container mx-auto p-10 my-10">
      <div className="flex justify-between gap-4 mb-8">
        <div className="flex items-center">
          <h2 className="text-3xl ">Top Topics</h2>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => swiperRef?.slidePrev()}
              className="text-indigo-500"
            >
              <ArrowCircleLeftIcon
                className="w-12 h-12w-12 inline-block hover:fill-neutral-100 duration-700"
                style={{ strokeWidth: "1" }}
              />
            </button>
            <button
              onClick={() => swiperRef?.slideNext()}
              className="text-indigo-500"
            >
              <ArrowCircleRightIcon
                className="w-12 h-12w-12 inline-block hover:fill-neutral-100 duration-700"
                style={{ strokeWidth: "1" }}
              />
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
        breakpoints={{
          // when window width is >= 0px
          0: {
            slidesPerView: 1,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          //   when window width is >= 1024px
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        <SwiperSlide>
          <TopicSlide image={JavascriptIcon} tag="Javascript" article={5} />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide image={NextIcon} tag="NextJS" article={3} />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide image={NodeJsIcon} tag="NodeJS" article={4} />
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide image={MongodbIcon} tag="MongoDB"  article={2}/>
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide image={ExpressIcon} tag="Express" article={3}/>
        </SwiperSlide>
        <SwiperSlide>
          <TopicSlide image={GithubIcon} tag="Github" article={1} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Topics;
