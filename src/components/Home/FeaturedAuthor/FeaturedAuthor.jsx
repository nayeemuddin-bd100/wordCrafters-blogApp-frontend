/* eslint-disable react/prop-types */
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Author1 from "../../../img/author/author1.jpg";
import Author2 from "../../../img/author/author2.jpg";
import Author3 from "../../../img/author/author3.jpg";
import Author4 from "../../../img/author/author4.jpg";
import Author5 from "../../../img/author/author5.jpg";
import Author6 from "../../../img/author/author6.jpg";
import Author7 from "../../../img/author/author7.jpg";

const AuthorSlide = ({ image, name, article }) => (
  <div className="flex flex-col justify-center items-center gap-1 rounded-xl ">
    <div className="relative">
      <img
        src={image}
        alt={name}
        className=" w-full h-36 rounded-lg object-cover"
      />
    </div>
    <div className="flex flex-col items-center justify-center ">
      <p className="text-lg">{name}</p>
      <p className="font-inter text-sm text-center text-gray-500">
        {article} Article
      </p>
    </div>
  </div>
);

const FeaturedAuthor = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <div className="bg-[rgba(220,241,255)] rounded-3xl">
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

        {/* Slider */}
        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={4}
          // spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 2500 }}
          loop={true}
          speed={1000}
          modules={[Navigation, Pagination, Autoplay]}
          className="mySwiper pt-5"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          <SwiperSlide>
            <AuthorSlide image={Author1} name="Nayeem Uddin" article={5} />
          </SwiperSlide>
          <SwiperSlide>
            <AuthorSlide image={Author2} name="Rakib Hossain" article={3} />
          </SwiperSlide>
          <SwiperSlide>
            <AuthorSlide image={Author3} name="James Bond" article={5} />
          </SwiperSlide>
          <SwiperSlide>
            <AuthorSlide image={Author4} name="Farhan Uddin" article={3} />
          </SwiperSlide>
          <SwiperSlide>
            <AuthorSlide image={Author5} name="kevin Hart" article={2} />
          </SwiperSlide>
          <SwiperSlide>
            <AuthorSlide image={Author6} name="Nelson Paul" article={4} />
          </SwiperSlide><SwiperSlide>
            <AuthorSlide image={Author7} name="Sami khan" article={1} />
          </SwiperSlide>
        </Swiper>

        {/* Become an author */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-32 md:px-15 lg:px-32 ">
          <p className="text-center md:text-left text-4xl font-bold md:w-2/3">
            Become <span className="text-indigo-500 italic">An Author</span> And
            Share Your Great Stories.
          </p>
          <div className="md:w-1/3">
            <Link to="/create-post" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 duration-700 text-xl ">
              Become An Author
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAuthor;
