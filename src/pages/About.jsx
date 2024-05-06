/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import SmoothScroll from "../hooks/smoothScroll";
import AuthorDemo from "../img/about-author.png";
import DemoImg from "../img/about-demo.avif";
import TitleIcon from "../img/about-title-icon.svg";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SmoothScroll>
        {/* About Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 font-prompt">
          {/* About Heading title */}
          <div className="mt-32">
            <p className="text-5xl md:text-8xl font-bold text-gray-700 text-center md:text-left tracking-wide  ">
              Creative magazine, design{" "}
              <span className="">
                <img
                  src={TitleIcon}
                  alt="Title Icon"
                  className="inline-block "
                />{" "}
                <span className="text-red-500 italic font-inter">focused</span>
              </span>{" "}
              article solutions
            </p>
          </div>

          {/* Main Section */}
          <div className="flex flex-col gap-3 justify-center  mt-10">
            <p className="text-red-500 font-inter text-lg lg:text-xl font-semibold">
              <svg
                className="inline-block mr-2"
                width="11"
                height="14"
                viewBox="0 0 11 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M7.15888 13.1844C8.73336 10.6029 8.07416 7.35423 5.59136 5.46029C5.58991 5.45922 5.58846 5.45788 5.5873 5.45708L5.59803 5.48172L5.59629 5.5002C6.08003 6.68033 6.01217 7.97589 5.41793 9.08745L4.99915 9.87117L4.87068 9.00522C4.78338 8.41784 4.54354 7.85751 4.17407 7.3778H4.11578L4.08503 7.29744C4.08938 8.19499 3.88464 9.07915 3.48297 9.91322C2.95602 11.0047 3.03345 12.2633 3.69033 13.2806L4.14362 13.9829L3.3281 13.6647C1.98331 13.1399 0.908237 12.1291 0.378384 10.8914C-0.215271 9.50931 -0.105357 7.90679 0.672747 6.6056C1.07847 5.92875 1.36269 5.21012 1.51784 4.46926L1.66952 3.74314L2.0564 4.39079C2.24113 4.69961 2.37715 5.03388 2.46154 5.38503L2.47024 5.39333L2.47923 5.44958L2.48765 5.44717C3.64654 4.02518 4.34083 2.25579 4.44204 0.464176L4.46814 0L4.88982 0.253917C6.61075 1.28967 7.80589 2.95139 8.17508 4.81853L8.18349 4.85684L8.18784 4.86273L8.20669 4.83809C8.54398 4.42668 8.72204 3.93732 8.72204 3.42226V2.62461L9.2432 3.26048C10.4549 4.73845 11.0761 6.57185 10.9926 8.42319C10.8899 10.6024 9.6031 12.5151 7.5501 13.5514L6.66121 14L7.15888 13.1844Z"
                ></path>
              </svg>
              <span className="mt-1">Who We Are</span>
            </p>

            <p className="text-xl lg:text-2xl font-bold tracking-wide  ">
              Unleashing Creativity: A Glimpse of our work&apos;s in the World
            </p>

            <p className="text-lg font-inter text-gray-700">
              Welcome to our vibrant corner of the internet, where creativity
              meets information. Our blog page is your gateway to a world of
              insights, inspiration, and engaging content. Dive into
              thought-provoking articles, explore the latest trends, and
              discover expert opinions on a wide array of topics. Whether you're
              a seasoned enthusiast or a curious newcomer, there's something
              here for everyone. From tech tips to travel tales, from culinary
              adventures to cultural explorations, we're here to spark your
              imagination and fuel your curiosity. Join us on this journey of
              discovery, and let's explore the world together, one post at a
              time.
            </p>

            <img
              src={DemoImg}
              alt="About Image"
              className="w-full  mt-10 h-40  md:h-56 lg:h-80 object-cover"
            />

            <p className="text-lg font-inter text-gray-700">
              Step into a realm where knowledge intertwines with curiosity, and
              ideas flourish with every click. Here, on our blog page, we invite
              you to embark on a journey of enlightenment and enrichment.
              Immerse yourself in the captivating narratives, delve into
              insightful analyses, and uncover the hidden gems waiting to be
              discovered. Whether you seek inspiration, guidance, or simply a
              moment of reflection, our platform offers a sanctuary for minds
              hungry for exploration. From groundbreaking research to personal
              anecdotes, from philosophical musings to practical advice, there's
              a wealth of content to satisfy your intellectual appetite. Come,
              join us in unraveling the mysteries of the universe and expanding
              the horizons of your understanding.
            </p>
          </div>

          {/* Become an author */}

          <div className="block lg:flex  rounded-2xl bg-red-100 justify-between items-center mt-10 mx-10 ">
            <div className="flex flex-col lg:w-3/5 justify-center items-center gap-4 p-10">
              <p className="text-red-500 font-inter italic text-lg lg:text-xl font-semibold">
                <svg
                  className="inline-block mr-2"
                  width="11"
                  height="14"
                  viewBox="0 0 11 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M7.15888 13.1844C8.73336 10.6029 8.07416 7.35423 5.59136 5.46029C5.58991 5.45922 5.58846 5.45788 5.5873 5.45708L5.59803 5.48172L5.59629 5.5002C6.08003 6.68033 6.01217 7.97589 5.41793 9.08745L4.99915 9.87117L4.87068 9.00522C4.78338 8.41784 4.54354 7.85751 4.17407 7.3778H4.11578L4.08503 7.29744C4.08938 8.19499 3.88464 9.07915 3.48297 9.91322C2.95602 11.0047 3.03345 12.2633 3.69033 13.2806L4.14362 13.9829L3.3281 13.6647C1.98331 13.1399 0.908237 12.1291 0.378384 10.8914C-0.215271 9.50931 -0.105357 7.90679 0.672747 6.6056C1.07847 5.92875 1.36269 5.21012 1.51784 4.46926L1.66952 3.74314L2.0564 4.39079C2.24113 4.69961 2.37715 5.03388 2.46154 5.38503L2.47024 5.39333L2.47923 5.44958L2.48765 5.44717C3.64654 4.02518 4.34083 2.25579 4.44204 0.464176L4.46814 0L4.88982 0.253917C6.61075 1.28967 7.80589 2.95139 8.17508 4.81853L8.18349 4.85684L8.18784 4.86273L8.20669 4.83809C8.54398 4.42668 8.72204 3.93732 8.72204 3.42226V2.62461L9.2432 3.26048C10.4549 4.73845 11.0761 6.57185 10.9926 8.42319C10.8899 10.6024 9.6031 12.5151 7.5501 13.5514L6.66121 14L7.15888 13.1844Z"
                  ></path>
                </svg>
                <span className="font-inter">Get Every Update</span>
              </p>

              <p className="text-4xl text-center capitalize font-medium">
                Become an author and share your great stories
              </p>
              <Link className="bg-red-500 px-5 py-2 text-xl text-white rounded-md hover:bg-red-700 duration-300 transition-all">
                Become An Author
              </Link>
            </div>

            <img
              className="hidden lg:block lg:w-2/5"
              src={AuthorDemo}
              alt="Author demo"
            />
          </div>
        </div>
      </SmoothScroll>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
