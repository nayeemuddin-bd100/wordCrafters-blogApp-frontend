import { ArrowRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const RecentPostCard = () => {
  return (
    <div className="overflow-hidden font-prompt">
      <img
        className="rounded-t-xl object-cover"
        src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60"
        alt="img"
      />

      <div>
        <p className="text-xs text-gray-800 font-inter flex items-center gap-3">
          By Nayeem Uddin{" "}
          <span className="w-2 h-2 rounded-full bg-indigo-300 inline-block"></span>{" "}
          <span> TagName</span>
        </p>
        <p className="text-lg font-medium">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat,
          reiciendis.
        </p>

        <div className="flex justify-between mt-3">
          <Link className="text-sm text-indigo-800">
            View Details{" "}
            <span>
              <ArrowRightIcon className="w-4 h-4 inline-block" />
            </span>{" "}
          </Link>
          <p className="text-xs text-gray-800 font-inter"> 🔥 2 Days Read</p>
        </div>
      </div>
    </div>
  );
};

export default RecentPostCard;
