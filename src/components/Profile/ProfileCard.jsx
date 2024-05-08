/* eslint-disable react/prop-types */

import { ArrowRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { DateMonth } from "../../utils/dateFormatter";

const ProfileCard = ({ id,image, title, category, date, view,author }) => {
    
 
  return (
    <div className="rounded-lg overflow-hidden ">
      {/* Mobile view (screens smaller than md) */}
      <div className="sm:hidden group">
        <div className="relative">
          <img
            className="w-full h-48 object-cover rounded-lg"
            src={image}
            alt="Card Image"
          />
          <div className="absolute top-2 left-2 bg-white px-3 rounded-full  flex justify-center items-center flex-col py-3 group-hover:bg-red-400 group-hover:text-white duration-300 transition-all group-hover:ring-1 ring-white">
            <p className="text-3xl">{DateMonth(date).split(" ")[0]}</p>
            <p className="text-xs text-gray-700  group-hover:text-white duration-300 transition-all">{DateMonth(date).split(" ")[1]}</p>
          </div>
        </div>
        <div className="p-4 bg-white flex flex-col justify-between">
          <div className="mb-4">
            <p className="text-sm text-gray-500 font-inter flex items-center gap-3">
              {author}
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>{" "}
              <span> {category}</span>
            </p>
            <Link to={`/posts/${id}`} className="text-lg font-bold hover:text-red-500 duration-300 transition-all ">{title}</Link>
          </div>
          <div className="flex items-center justify-between">
            <Link to={`/posts/${id}`} className="text-sm text-red-500 hover:text-red-400 transition-all duration-500">
              View Details{" "}
              <span>
                <ArrowRightIcon className="w-4 h-4 inline-block" />
              </span>{" "}
            </Link>
            <p className="text-gray-500 text-sm">🔥 {view} Views</p>
          </div>
        </div>
      </div>

      {/* Large screen view (screens md and larger) */}
      <div className="hidden sm:flex items-center justify-center flex-row group">

         <div className=" bg-white px-3 rounded-full  flex justify-center items-center flex-col py-3 group-hover:bg-red-400 group-hover:text-white duration-300 transition-all group-hover:ring-1 ring-white">
            <p className="text-3xl">{DateMonth(date).split(" ")[0]}</p>
            <p className="text-xs text-gray-700  group-hover:text-white duration-300 transition-all">{DateMonth(date).split(" ")[1]}</p>
          </div>
        
       
        <div className="p-6 w-1/2 bg-white flex flex-col justify-between">
          <div className="mb-4">
           <p className="text-sm text-gray-500 font-inter flex items-center gap-3">
              {author}
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>{" "}
              <span> {category}</span>
            </p>
              <Link to={`/posts/${id}`} className="text-lg font-bold hover:text-red-500 duration-300 transition-all ">{title}</Link>
          </div>
          <div className="flex items-center justify-between">
            <Link to={`/posts/${id}`} className="text-sm text-red-500 hover:text-red-400 transition-all duration-500">
              View Details{" "}
              <span>
                <ArrowRightIcon className="w-4 h-4 inline-block" />
              </span>{" "}
            </Link>
            <p className="text-gray-500 text-sm">🔥 {view} Views</p>
          </div>
        </div>

   
          <img
            className="object-cover h-36 w-40 rounded-lg"
            src={image}
            alt="Card Image"
          />
  
      </div>
    </div>
  );
};

export default ProfileCard;
