import { ExternalLinkIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import MostPopularCarousel from "./MostPopularCarousel";
const MostPopular = () => {
  return (
    <div className="bg-sky-100 py-10 max-w-7xl mx-auto px-10 rounded-t-3xl">
      {/* Section Header */}
      <div className="md:flex md:justify-between py-10">
        <h4 className="text-3xl text-black">Most Popular</h4>
        <Link to="/posts" className="text-indigo-700 text-lg">
          <span> View Post </span>

          <ExternalLinkIcon className="w-4 h-4 inline-block" />
        </Link>
      </div>

      {/* Section Main */}
      <div className=" flex flex-col md:flex-row gap-5">
        {/* Left Side */}
        <div className="md:w-1/3">
          <div className="flex gap-5 my-4 ">
            <p className="text-gray-400 text-2xl">01</p>
            <p className="text-lg text-gray-800">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
              assumenda.
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="md:w-2/3">
          <MostPopularCarousel />
        </div>
      </div>
    </div>
  );
};

export default MostPopular;
