import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import Author1 from "../../img/author/author1.jpg";

const AuthorCard = () => {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col justify-center items-center gap-1 rounded-xl border-gray-800 bg-rose-100 py-4 mx-10 sm:mx-0 group group-hover:bg-rose-200">
        <div className="">
          <img
            src={Author1}
            alt="author"
            className=" w-40 h-40 rounded-full object-cover group-hover:scale-105 transition-all duration-500 "
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 ">
          <p className="text-xl font-semibold ">Lionel Messi</p>
          <p className="font-inter text-sm text-gray-900 font-medium ">
            5 Article
          </p>
          <Link className=" bg-indigo-500 hover:bg-indigo-400 transition-all duration-500 text-white  px-3 py-1 rounded-lg">
            {" "}
            View Profile{" "}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorCard;
