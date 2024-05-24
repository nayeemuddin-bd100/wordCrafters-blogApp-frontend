/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import dateFormatter from "../../../utils/dateFormatter";

const TrendingArticleCard = ({ post }) => {
  const { _id, title, image, createdAt } = post;
  return (
    <div
      className={`flex items-center justify-start gap-3 bg-sky-50 rounded-lg w-full`}
    >
      <img
        className=" w-40 h-44 object-cover rounded-l-lg "
        src={image}
        alt=""
      />

      <div className="flex flex-col justify-start gap-3">
        <Link to={`/posts/${_id}`} className="text-lg">
          {" "}
          <TextTruncate
            line={3}
            element="span"
            truncateText="..."
            text={title}
          />
        </Link>
        <p className="font-inter text-sm text-indigo-600 ">
          {" "}
          {dateFormatter(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default TrendingArticleCard;
