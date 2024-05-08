/* eslint-disable react/prop-types */
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import SmoothScroll from "../../hooks/smoothScroll";
import FacebookIcon from "../../img/social-icon/FacebookIcon";
import InstagramIcon from "../../img/social-icon/InstagramIcon";
import LinkedinIcon from "../../img/social-icon/LinkedinIcon";
import TwitterIcon from "../../img/social-icon/TwitterIcon";
import MiniSpinner from "../../utils/MiniSpinner";
import { Spinner } from "../../utils/Spinner";
import dateFormatter from "../../utils/dateFormatter";
import AddComment from "../Comments/AddComment";
import Footer from "../Footer/Footer";
import { fetchCategoriesAction } from "./../../redux/slices/category/categorySlices";
import {
  deletePostAction,
  fetchPostDetailsAction,
  resetPostDeleteAction,
  resetPostDetailsAction,
} from "./../../redux/slices/posts/postSlices";
import CommentsList from "./../Comments/CommentList";

const PostDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((state) => state?.posts);
  const loggedInUser = useSelector((state) => state?.users);
  const comment = useSelector((state) => state?.comments);
  const category = useSelector((state) => state.category);

  const { postDetails, loading, appErr, serverErr, deletedPost } = posts;
  const { createdComment, deletedComment } = comment;
  const { categoryList, CatLoading } = category;

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [dispatch, id, createdComment, deletedComment]);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  // delete Post
  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (shouldDelete) {
      dispatch(deletePostAction(postDetails?._id));
    }
  };

  if (deletedPost) {
    dispatch(resetPostDeleteAction());
    dispatch(resetPostDetailsAction());

    return <Navigate to="/posts" />;
  }
  const handleCategory = (category) => {
    dispatch(fetchCategoriesAction(category?.title));
    navigate(`/posts?category=${category?.title}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SmoothScroll>
        {!postDetails ? (
          <div className="h-screen">
            <Spinner />
          </div>
        ) : appErr || serverErr ? (
          <h1 className="h-screen text-red-400 text-xl">
            {serverErr} {appErr}
          </h1>
        ) : (
          <section className="overflow-hidden max-w-7xl mx-auto px-4 md:px-6 lg:px-10  font-prompt">
            <div className="flex  lg:flex-row gap-8 my-20 mt-36 flex-col">
              {/* Left Panel */}
              <div className=" px-4 mx-auto flex flex-col gap-3 w-full lg:w-w/3">
                {/* posts Image */}
                <p className="text-red-500 text-lg font-medium">
                  {postDetails?.category}
                </p>

                <p className="text-4xl font-semibold">{postDetails?.title}</p>
                <p className="text-gray-500 py-5 font-inter text-lg  font-medium">
                  {dateFormatter(postDetails?.createdAt)}
                </p>
                <img
                  className=" object-cover w-full h-96 mt-10"
                  src={postDetails?.image}
                  alt=""
                />
                <div className="max-w-2xl mx-auto text-center">
                  {/* posts description */}
                  <div className="max-w-xl mx-auto flex justify-center items-center">
                    <p className="mb-6 text-left  text-lg font-inter mt-10 text-gray-700">
                      {postDetails?.description}

                      {/* Show delete and update btn if created user and admin can delete the post as well */}
                      {postDetails?.author?._id ===
                      loggedInUser?.userAuth?._id ? (
                        <p className="flex">
                          <Link
                            to={`/update-post/${postDetails?._id}`}
                            className="p-3"
                          >
                            <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                          </Link>
                          <button
                            onClick={() => handleDelete()}
                            className="ml-3"
                          >
                            <TrashIcon className="h-8 mt-3 text-red-600" />
                          </button>
                        </p>
                      ) : loggedInUser?.userAuth?.isAdmin ? (
                        <p className="flex justify-center mt-5">
                          <button
                            onClick={() => handleDelete()}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 duration-500 transition-all flex justify-center items-center gap-3 text-xl font-medium"
                          >
                            <TrashIcon className="h-8 inline-block" />{" "}
                            <span>Delete</span>
                          </button>
                        </p>
                      ) : null}
                    </p>
                  </div>
                </div>

                {/* Comment */}

                {loggedInUser?.userAuth ? (
                  <AddComment postId={postDetails?._id} />
                ) : (
                  <Link
                    to="/login"
                    className="text-blue-500 text-center text-2xl hover:text-blue-700 "
                  >
                    <p>Login first to comment this post</p>{" "}
                  </Link>
                )}

                <div className="flex justify-center  items-center">
                  <CommentsList comments={postDetails?.comments} />
                </div>
              </div>

              {/* Right Panel */}

              <div className="w-full lg:w-1/3">
                <div>
                  <div className=" flex flex-col justify-center items-center  lg:mt-32">
                    <img
                      className="w-52 h-52 object-cover rounded-full "
                      src={postDetails?.author?.profilePhoto}
                      // src="https://source.unsplash.com/featured/?profile"
                      alt=""
                    />
                    {/* Author Info */}
                    <div className="flex flex-col justify-center items-center gap-1">
                      <Link
                        to={`/author/${postDetails?.author?._id}`}
                        className="mb-1 text-2xl font-bold"
                      >
                        <span className="text-xl lg:text-3xl font-semibold py-3 hover:underline ">
                          {postDetails?.author?.firstName}{" "}
                          {postDetails?.author?.lastName}{" "}
                        </span>
                      </Link>

                      {/* Display if verified or not */}
                      {postDetails?.author?.isAccountVerified ? (
                        <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-white ">
                          Verified Account
                        </span>
                      ) : (
                        <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-white ">
                          Unverified Account
                        </span>
                      )}

                      <p className="text-gray-500 text-lg">
                        {" "}
                        {postDetails?.author?.viewedBy.length} View
                      </p>
                      <p className="text-gray-500  font-inter text-lg  font-medium">
                        {dateFormatter(postDetails?.author?.createdAt)}
                      </p>
                    </div>

                    {/* Categories */}
                    <div className=" w-full mt-0 lg:mt-10 py-10  flex flex-col gap-4">
                      <p className="text-xl font-inter uppercase font-bold">
                        Categories
                      </p>
                      <div className="flex flex-col gap-2">
                        {CatLoading ? (
                          <MiniSpinner />
                        ) : (
                          categoryList?.map((category) => (
                            <button
                              onClick={() => handleCategory(category)}
                              key={category?._id}
                              className="flex text-lg justify-between items-center text-gray-600 hover:text-red-500 capitalize hover:scale-y-110 transition-all duration-300"
                            >
                              {category?.title}
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Social Links */}

                    <div className="py-8 px-3 mt-10">
                      <p className="text-xl font-inter uppercase font-bold text-center">
                        Stay Connected
                      </p>
                      <div className="flex justify-center items-center gap-3">
                        <Link className="text-gray-700 hover:text-red-500 transition-all duration-300">
                          <FacebookIcon className="w-8 h-8" />
                        </Link>

                        <Link className="text-gray-700 hover:text-red-500 transition-all duration-300">
                          <InstagramIcon className="w-8 h-8" />
                        </Link>
                        <Link className="text-gray-700 hover:text-red-500 transition-all duration-300">
                          <TwitterIcon className="w-8 h-8" />
                        </Link>
                        <Link className="text-gray-700 hover:text-red-500 transition-all duration-300">
                          <LinkedinIcon className="w-8 h-8" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </SmoothScroll>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default PostDetails;
