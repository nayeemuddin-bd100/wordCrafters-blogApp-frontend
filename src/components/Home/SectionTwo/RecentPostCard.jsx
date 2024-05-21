/* eslint-disable react/prop-types */
import { ArrowRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import TextTruncate from 'react-text-truncate';

const RecentPostCard = ({ post }) => {
  const {_id, title, description, author, image, category } = post;
  return (
    <div className="font-prompt group w-full">
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          className="rounded-t-xl h-64 w-full object-cover group-hover:scale-105 transition-all duration-500 "
          src={image}
          alt="img"
        />
      </div>

      <div className="mt-5">
        <p className="text-xs text-gray-800 font-inter flex items-center gap-3">
          By {`${author.firstName} ${author.lastName}`}
          <span className="w-2 h-2 rounded-full bg-indigo-300 inline-block"></span>{" "}
          <span> {category}</span>
        </p>
        <Link className="text-lg font-medium hover:text-indigo-700 transition-all duration-300">
         <TextTruncate
            line={3}
            element="span"
            truncateText="..."
            text={title}
          />
        </Link>

        <div className="flex justify-between mt-3">
          <Link
            to={`/posts/${_id}`}
          className="text-sm text-indigo-800 hover:text-indigo-400 transition-all duration-500">
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
