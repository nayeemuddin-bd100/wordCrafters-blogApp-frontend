import { ArrowRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const RecentPostCard = () => {
  return (
    <div className="font-prompt group w-full">

      <div className="relative overflow-hidden rounded-t-xl">
      <img
        className="rounded-t-xl object-cover group-hover:scale-105 transition-all duration-500 "
        src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60"
        alt="img"
      />
      </div>

      <div className="mt-5">
        <p className="text-xs text-gray-800 font-inter flex items-center gap-3">
          By Nayeem Uddin{" "}
          <span className="w-2 h-2 rounded-full bg-indigo-300 inline-block"></span>{" "}
          <span> TagName</span>
        </p>
        <Link className="text-lg font-medium hover:text-indigo-700 transition-all duration-300">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
          reiciendis.
        </Link>

        <div className="flex justify-between mt-3">
          <Link className="text-sm text-indigo-800 hover:text-indigo-400 transition-all duration-500">
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
};

export default RecentPostCard;
