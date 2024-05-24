/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import dateFormatter from "../../../utils/dateFormatter";

const AnotherPostCard = ({ post }) => {
  const { _id, title, image, createdAt, comments } = post;

  return (
    <div className="flex items-center gap-5 lg:gap-2 justify-start my-2 group w-full">
      <div className="relative w-1/3 h-20 overflow-hidden rounded-lg">
        <img
          className=" object-cover w-full  h-32 group-hover:scale-105 transition-all duration-500"
          src={image}
          alt="another post image"
        />
      </div>

      <div className="flex flex-col w-2/3 gap-1.5">
        <Link className="hover:text-red-500 transition-all duration-300">
          {" "}
          <TextTruncate
            line={3}
            element="span"
            truncateText="..."
            text={title}
          />
        </Link>

        <p className="text-xs text-gray-800 font-inter flex items-center gap-3">
          {dateFormatter(createdAt)}
          <span className="w-2 h-2 rounded-full bg-indigo-300 inline-block"></span>{" "}
          <span> {comments?.length} comment</span>
        </p>
      </div>
    </div>
  );
};

export default AnotherPostCard;
