import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthorCard from "../components/Author/AuthorCard";
import Footer from "../components/Footer/Footer";
import SmoothScroll from "../hooks/smoothScroll";
import { Spinner } from "../utils/Spinner";

import {
  fetchAllUserAction,
  userProfileAction,
} from "./../redux/slices/users/usersSlices";

const Author = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.users);
  const {
    fetchAllUserLoading,
    allUsers,
    appErr,
    serverErr,
    blockUser,
    unblockUser,
    deleteUser,
    userAuth,
  } = users;

  useEffect(() => {
    dispatch(fetchAllUserAction());
    dispatch(userProfileAction(userAuth?._id));
  }, [dispatch, blockUser, unblockUser, deleteUser, userAuth?._id]);

  return (
    <div className="flex flex-col min-h-screen font-prompt">
      <SmoothScroll>
        <div className="max-w-7xl mx-auto  px-5 ">
          <section className="">
            {appErr ||
              (serverErr && (
                <h2 className="text-red-500 text-center text-xl py-10">
                  {" "}
                  {appErr} {serverErr}
                </h2>
              ))}

            {allUsers && allUsers?.length <= 0 && (
              <h2 className="text-3xl text-white text-center py-10">
                No Author Found
              </h2>
            )}

            {fetchAllUserLoading ? (
              <Spinner />
            ) : (
              <div className="max-w-7xl mx-auto  px-5 ">
                {/* Author card */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-40"
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
                  {allUsers?.map((user) => {
                    return (
                      <motion.div
                        key={user?._id}
                        user={user}
                        variants={{
                          visible: { opacity: 1, scale: 1 },
                          hidden: { opacity: 0, scale: 0.8 },
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <AuthorCard author={user} />
                      </motion.div>
                    );
                  })}

                </motion.div>
              </div>
            )}
          </section>

          {/* Become an author */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-32 md:px-15 lg:px-32 ">
            <p className="text-center md:text-left text-4xl font-bold md:w-2/3 md:ml-9 lg:ml-0">
              Become <span className="text-indigo-500 italic">An Author</span>{" "}
              And Share Your Great Stories.
            </p>
            <div className="md:w-1/3">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 duration-700 text-xl ">
                Become An Author
              </button>
            </div>
          </div>
        </div>
      </SmoothScroll>

      <Footer />
    </div>
  );
};

export default Author;
