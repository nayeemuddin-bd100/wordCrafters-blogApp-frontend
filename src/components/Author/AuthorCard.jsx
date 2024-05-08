/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteUserAction } from "../../redux/slices/users/usersSlices";

const AuthorCard = ({ author }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = useSelector((state) => state?.users?.profile);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (shouldDelete) {
      if (!loggedInUser?.isAdmin) {
        return toast.error("Only Admin can delete author");
      } else if (author.email === "nayeemuddin.bd100@gmail.com") {
        return toast.error("Demo Admin cannot delete Super Admin");
      } else if (author.email === "wordcrafters@admin.com") {
        return toast.error("Demo Admin cannot delete Own Account");
      } else if (author.email === "wordcrafters@user.com") {
        return toast.error("Demo Admin cannot delete Demo User Account");
      }

      dispatch(deleteUserAction(id));
      toast.success("User deleted successfully");
    }
  };

   const handleViewProfile = () => {
    if (!loggedInUser?.id) {
      toast.error("Please login first to view author info");
    } else {
      navigate(`/author/${author?._id}`);
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col justify-center items-center gap-1 rounded-xl border-gray-800 bg-rose-100 py-4  group group-hover:bg-rose-200">
        <div className="">
          <img
            src={author?.profilePhoto}
            alt="author"
            className=" w-40 h-40 rounded-full object-cover group-hover:scale-105 transition-all duration-500 "
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 ">
          <p className="text-xl font-semibold ">
            {author?.firstName} {author?.lastName}
          </p>

          <p className=" text-purple-500 font-inter font-semibold">
            {author?.email === "nayeemuddin.bd100@gmail.com"
              ? "Super Admin"
              : author?.email === "wordcrafters@admin.com"
              ? "Demo Admin"
              : author?.email === "wordcrafters@user.com"
              ? "Demo User"
              : author?.accountType}
          </p>

          <p className="font-inter text-sm text-gray-900 font-medium ">
            {author?.posts?.length} Article
          </p>
          <button
            // to={`/author/${author?._id}`}
            onClick={() => handleViewProfile()}
            className=" bg-indigo-500 hover:bg-indigo-400 transition-all duration-500 text-white  px-3 py-1 rounded-lg"
          >
            {" "}
            View Profile{" "}
          </button>

          {loggedInUser?.id && (
            <button
              onClick={() => handleDelete(author?._id)}
              className=" bg-red-500 hover:bg-red-400 transition-all duration-500 text-white  px-3 py-1 rounded-lg"
            >
              {" "}
              Delete
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AuthorCard;
