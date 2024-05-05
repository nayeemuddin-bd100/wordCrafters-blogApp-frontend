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
import Author1 from "../../../img/author/author1.jpg";
import Author2 from "../../../img/author/author2.jpg";
import Author3 from "../../../img/author/author3.jpg";

const AuthorSlide = ({ image, tag }) => (
  <div className="flex flex-col justify-center items-center gap-1 rounded-xl ">
    <div className="">
      <img
        src={image}
        alt={tag}
        className=" w-full h-36 rounded-lg object-contain"
      />
    </div>
    <div className="flex flex-col items-start justify-center ">
      <p className="text-lg">{tag}</p>
      <p className="font-inter text-sm text-gray-500">5 Article</p>
    </div>
  </div>
);

const FeaturedAuthor = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="bg-[rgba(220,241,255)] rounded-t-3xl">
      <div className="max-w-7xl container mx-auto p-10 my-10">
        <div className="flex justify-between gap-4 mb-8">
          <div className="flex items-center">
            <h2 className="text-3xl ">Featured Author</h2>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => swiperRef?.slidePrev()}
                className="text-indigo-500"
              >
                <ArrowCircleLeftIcon className="w-12 h-12w-12 inline-block hover:fill-neutral-100 duration-700" />
              </button>
              <button
                onClick={() => swiperRef?.slideNext()}
                className="text-indigo-500"
              >
                <ArrowCircleRightIcon className="w-12 h-12w-12 inline-block hover:fill-neutral-100 duration-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
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
              slidesPerView: 3,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 4,
            },
            //   when window width is >= 1024px
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          <SwiperSlide>
            <AuthorSlide image={Author1} tag="Javascript" />
          </SwiperSlide>
          <SwiperSlide>
            <AuthorSlide image={Author2} tag="Next Js" />
          </SwiperSlide>
          <SwiperSlide>
            <AuthorSlide image={Author3} tag="Node Js" />
          </SwiperSlide>
          <SwiperSlide>
            <AuthorSlide image={Author2} tag="MongoDB" />
          </SwiperSlide>
          <SwiperSlide>
            <AuthorSlide image={Author1} tag="Express" />
          </SwiperSlide>{" "}
          <SwiperSlide>
            <AuthorSlide image={Author1} tag="Express" />
          </SwiperSlide>{" "}
          <SwiperSlide>
            <AuthorSlide image={Author1} tag="Express" />
          </SwiperSlide>
          {/* Add more SwiperSlide components as needed */}
        </Swiper>

        {/* Become an author */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-32 md:px-15 lg:px-32 ">
          <p className="text-center md:text-left text-4xl font-bold md:w-2/3">
            Become <span className="text-indigo-500 italic">An Author</span> And
            Share Your Great Stories.
          </p>
          <div className="md:w-1/3">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 duration-700 text-xl ">
              Become An Author
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAuthor;
