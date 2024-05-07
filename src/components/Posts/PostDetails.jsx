/* eslint-disable react/prop-types */
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { Spinner } from "../../utils/Spinner";
import AddComment from "../Comments/AddComment";
import Footer from "../Footer/Footer";
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

  const posts = useSelector((state) => state?.posts);
  const loggedInUser = useSelector((state) => state?.users);
  const comment = useSelector((state) => state?.comments);

  const { postDetails, loading, appErr, serverErr, deletedPost } = posts;
  const { createdComment, deletedComment } = comment;

  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [dispatch, id, createdComment, deletedComment]);

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

  return (
    <>
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
              <p className="text-red-500 italic text-lg underline font-medium">
                Tagname
              </p>

              <p className="text-4xl font-semibold">
                Title: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eum, cum.
              </p>
              <img
                className=" object-cover w-full h-96 mt-10"
                src={postDetails?.image}
                alt=""
              />
              <div className="max-w-2xl mx-auto text-center">
                {/* User */}
                {/* <div className="inline-flex pt-5 md:pt-14 mb-8 md:mb-14 items-center border-t border-gray-500">
                  <img
                    className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                    src={postDetails?.author?.profilePhoto}
                    alt=""
                  />
                  <div className="text-left">
                    <Link
                      to={`/profile/${postDetails?.author?._id}`}
                      className="mb-1 text-2xl font-bold text-gray-50"
                    >
                      <span className="text-xl lg:text-2xl font-bold text-yellow-400">
                        {postDetails?.author?.firstName}{" "}
                        {postDetails?.author?.lastName}{" "}
                      </span>
                    </Link>
                    <p className="text-green-500">
                      {dateFormatter(postDetails?.createdAt)}
                    </p>
                  </div>
                </div> */}
                {/* posts description */}
                <div className="max-w-xl mx-auto flex justify-center items-center">
                  <p className="mb-6 text-left  text-lg font-inter mt-10 text-gray-700">
                    {/* {postDetails?.description} */}

                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Fugiat illo vel voluptate alias accusamus non odio
                      voluptatibus minima aut, quasi sint neque quaerat, maxime
                      ullam culpa porro natus quae. Sunt eos iusto recusandae
                      est placeat adipisci consequuntur harum exercitationem. Ad
                      optio voluptas earum fugit eveniet quam beatae, voluptates
                      tenetur, fuga molestias repellendus at, similique sint
                      magnam libero tempore nam eos ratione quasi nemo explicabo
                      blanditiis! Mollitia cupiditate id, beatae pariatur
                      doloremque quod dignissimos. Praesentium officia ipsam
                      sapiente rerum aliquid explicabo, aliquam dolore cum quas
                      nihil expedita, quasi veniam optio quaerat enim nobis quia
                      voluptas quae dicta labore, consectetur ad culpa?
                    </p>

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
                        <button onClick={() => handleDelete()} className="ml-3">
                          <TrashIcon className="h-8 mt-3 text-red-600" />
                        </button>
                      </p>
                    ) : loggedInUser?.userAuth?.isAdmin ? (
                      <p className="flex">
                        <button onClick={() => handleDelete()} className="ml-3">
                          <TrashIcon className="h-8 mt-3 text-red-600" />
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
              Right Panel Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Molestias autem repellat debitis sint ab quae asperiores
              vitae, nam tenetur tempora, voluptatibus, esse nulla natus? Veniam
              ipsam fugiat id iusto culpa?
            </div>
          </div>
        </section>
      )}

      {/* Footer */}

      <Footer />
    </>
  );
};

export default PostDetails;
