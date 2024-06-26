/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import Footer from "../components/Footer/Footer";
import SmoothScroll from "../hooks/smoothScroll";
import AdImage from "../img/ad-img.webp";
import FacebookIcon from "../img/social-icon/FacebookIcon";
import InstagramIcon from "../img/social-icon/InstagramIcon";
import LinkedinIcon from "../img/social-icon/LinkedinIcon";
import TwitterIcon from "../img/social-icon/TwitterIcon";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  fetchAllPostsAction,
  resetPostDetailsAction,
} from "../redux/slices/posts/postSlices";
import dateFormatter from "../utils/dateFormatter";

import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
import ProfileCard from "../components/Profile/ProfileCard";
import { fetchCategoriesAction } from "../redux/slices/category/categorySlices";
import MiniSpinner from "../utils/MiniSpinner";

const Blog = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.posts);

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const selectedCategory = searchParams.get("category");
  const { loading, postsList, like, dislike } = posts;

  useEffect(() => {
    const fetchPosts = async () => {
      await dispatch(
        fetchAllPostsAction({
          category: selectedCategory || null,
          page: currentPage,
          limit,
        })
      );
    };
    fetchPosts();
  }, [dispatch, like, dislike, selectedCategory, currentPage]);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetPostDetailsAction());
  }, [dispatch]);

  const category = useSelector((state) => state.category);
  const {
    categoryList,
    loading: categoryLoading,
    appErr: categoryErr,
    serverErr: categoryServerErr,
  } = category;

  const handleCategoryClick = (categoryTitle) => {
    setSearchParams({ category: categoryTitle });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ category: selectedCategory || "", page });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SmoothScroll>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10  font-prompt">
          {/* Main Section */}
          <div className="flex  lg:flex-row gap-8 my-20 mt-36 flex-col">
            {/* Left panel */}

            <div className="w-full lg:w-2/3">
              <motion.div
                className="w-full  px-4 mb-4 md:mb-0 flex flex-col gap-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                  hidden: {},
                }}
              >
                {loading ? (
                  <MiniSpinner />
                ) : postsList?.data?.length <= 0 ? (
                  <h2 className="text-center  text-2xl mt-28">No post found</h2>
                ) : (
                  postsList?.data?.map((post) => {
                    return (
                      <ProfileCard
                        key={post?._id}
                        id={post?._id}
                        image={post?.image}
                        title={post?.title}
                        category={post?.category}
                        date={dateFormatter(post?.createdAt)}
                        view={post?.numViews}
                        author={`${post?.author?.firstName} ${post?.author?.lastName} `}
                      />
                    );
                  })
                )}
              </motion.div>

              {/* Pagination */}
              {postsList?.data?.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={
                    postsList?.meta?.total
                      ? Math.ceil(postsList?.meta?.total / limit)
                      : 1
                  }
                  onPageChange={handlePageChange}
                />
              )}
            </div>

            {/* Right panel */}
            <div className="w-full lg:w-1/3 ">
              {/* Categories */}
              <div className="border rounded-md border-gray-200 py-10  flex flex-col gap-4 px-2 sm:px-10 md:px-20 lg:px-5">
                <p className="text-xl font-inter uppercase font-bold">
                  Categories
                </p>
                <button
                  onClick={() => {
                    dispatch(fetchAllPostsAction({ category: null }));
                    setSearchParams({});
                    setCurrentPage(1);
                  }}
                  className="text-lg text-gray-500 underline hover:text-red-500 transition-all duration-300 self-start"
                >
                  View All
                </button>
                <div className="flex flex-col gap-2">
                  {categoryLoading ? (
                    <MiniSpinner />
                  ) : categoryErr || categoryServerErr ? (
                    <div className="text-red-400 text-base">
                      {categoryServerErr} - {categoryErr}
                    </div>
                  ) : categoryList?.length <= 0 ? (
                    <div className="text-xl  text-center">No category</div>
                  ) : (
                    categoryList?.map((category) => {
                      return (
                        <button
                          onClick={() => handleCategoryClick(category?.title)}
                          key={category?._id}
                          className="flex text-lg justify-between items-center text-gray-600 hover:text-red-500 capitalize hover:scale-y-110 transition-all duration-500"
                        >
                          <p>{category?.title}</p>
                          <p>({category?.postCount})</p>
                        </button>
                      );
                    })
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

              {/* Ads */}
              <img
                src={AdImage}
                alt="ad"
                className="w-full mt-10 object-contain h-72 lg:h-96 "
              />
            </div>
          </div>
        </div>
      </SmoothScroll>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
