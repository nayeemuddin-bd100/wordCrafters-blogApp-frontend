/* eslint-disable react/no-unknown-property */
import {
  EmojiSadIcon,
  HeartIcon,
  UploadIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { EyeIcon, MailIcon } from "@heroicons/react/solid";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import SmoothScroll from "../../hooks/smoothScroll";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlices";
import {
  followUserAction,
  userProfileAction,
} from "../../redux/slices/users/usersSlices";
import MiniSpinner from "../../utils/MiniSpinner";
import { Spinner } from "../../utils/Spinner";
import Footer from "../Footer/Footer";
import ProfileCard from "../Profile/ProfileCard";
import {
  UnFollowUserAction,
  changeUserProfilePhotoAction,
} from "./../../redux/slices/users/usersSlices";
import dateFormatter from "./../../utils/dateFormatter";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Manage profile photo upload
  const users = useSelector((state) => state?.users);
  const category = useSelector((state) => state.category);

  const {
    userAuth,
    blockedUserState,
    profile,
    profilePhoto,
    loading,
    unFollowUser,
    followUser,
    followerLoading,
    profilePhotoLoading,
  } = users;

  const { categoryList, CatLoading } = category;

  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch, profilePhoto, followUser, unFollowUser]);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCategory = (category) => {
    dispatch(fetchCategoriesAction(category?.title));
    navigate(`/posts?category=${category?.title}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      dispatch(changeUserProfilePhotoAction(selectedFile));
    }
    setSelectedFile(null);
  };

  const isBlocked = blockedUserState?.includes(profile?._id);
  const handleMessage = () => {
    if (isBlocked) {
      return toast.error("User is Blocked");
    }
    navigate(`/send-email?email=${profile?.email}`);
  };

  return (
    <div className="flex flex-col min-h-screen font-prompt">
      <SmoothScroll>
        {!profile ? (
          <Spinner />
        ) : (
          <div className=" max-w-7xl mx-auto  px-5  bg-white  mt-40">
            {/* Static sidebar for desktop */}

            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
              <div className="flex-1 relative z-0 flex overflow-hidden">
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
                  <article>
                    {/* Profile header */}

                    <div className="flex flex-col justify-center items-center gap-3 sm:flex sm:flex-row sm:items-center lg:flex lg:justify-center lg:content-around">
                      <img
                        className="h-48 w-48 rounded-full  ring-4 ring-white md:h-40 md:w-40 lg:h-56 lg:w-56"
                        src={profile?.profilePhoto}
                        alt={profile?.firstName}
                      />

                      <div className="">
                        <div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                          <div className=" flex flex-col text-4xl font-semibold ">
                            <h1>
                              {profile?.firstName} {profile?.lastName}
                            </h1>
                            <div>
                              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-500 text-black">
                                {profile?.accountType}
                              </span>
                              {/* Display if verified or not */}
                              {profile?.isAccountVerified ? (
                                <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                                  Account Verified
                                </span>
                              ) : (
                                <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                                  Unverified Account
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="mt-1 text-lg">
                            Date Joined:
                            {` ${dateFormatter(profile?.createdAt)}`}
                          </p>
                          <p className="text-green-700 mt-2 mb-2">
                            {profile?.posts?.length} posts{" "}
                            {profile?.followers?.length} followers{" "}
                            {profile?.following?.length} following
                          </p>
                          {/* Who view my profile */}
                          <div className="flex items-center  mb-2">
                            <EyeIcon className="h-5 w-5 " />
                            <div className="pl-2">
                              {profile?.viewedBy?.length}{" "}
                              <span className="text-indigo-500">
                                Users viewed this profile
                              </span>
                            </div>
                          </div>

                          {/* is login user */}
                          {/* Upload profile photo */}

                          {userAuth?._id === id && (
                            <form
                              onSubmit={handleSubmit}
                              className="flex flex-col flex-wrap items-center justify-center gap-4 md:items-start  "
                            >
                              <label className="cursor-pointer inline-flex w-full justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                                <input
                                  type="file"
                                  onChange={handleFileChange}
                                  className="hidden"
                                />
                                <UploadIcon
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />

                                <span>Change Profile Picture</span>
                              </label>
                              {profilePhotoLoading ? (
                                <button
                                  disabled
                                  className="cursor-pointer justify-center w-48 px-4 py-2 border text-sm text-yellow-400 font-medium rounded-md  bg-indigo-800 "
                                >
                                  <MiniSpinner />
                                </button>
                              ) : selectedFile && !profilePhotoLoading ? (
                                <button
                                  type="submit"
                                  className="cursor-pointer w-full xl:w-2/3  justify-center  px-4 py-2 border text-sm text-yellow-400 font-medium rounded-md  bg-indigo-800 "
                                >
                                  Upload Photo
                                </button>
                              ) : null}
                            </form>
                          )}
                        </div>
                      </div>

                      <div className=" flex flex-col justify-center items-center gap-2">
                        {/* Follow/Unfollow user */}
                        <div className="w-full">
                          {users?.userAuth?._id ===
                          id ? null : followerLoading ? (
                            <button
                              disabled
                              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 w-full"
                            >
                              <HeartIcon
                                className=" opacity-0 -ml-1 mr-2 h-5 w-5 text-gray-400 "
                                aria-hidden="true"
                              />
                              <MiniSpinner />
                            </button>
                          ) : profile?.isFollowing ? (
                            <button
                              onClick={() =>
                                dispatch(UnFollowUserAction(profile?._id))
                              }
                              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 w-full"
                            >
                              <EmojiSadIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Unfollow</span>
                            </button>
                          ) : !profile?.isFollowing ? (
                            <button
                              onClick={() =>
                                dispatch(followUserAction(profile?._id))
                              }
                              type="button"
                              className=" w-full inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                              <HeartIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Follow {profile?.followers?.length} </span>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                dispatch(followUserAction(profile?._id))
                              }
                              type="button"
                              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                              <HeartIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Follow {profile?.followers?.length} </span>
                            </button>
                          )}
                        </div>

                        {/* Update Profile */}

                        <>
                          {userAuth?._id === id && (
                            <Link
                              to={`/update-profile/${id}`}
                              className="flex w-full justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                              <UserIcon
                                className=" -ml-1 mr-2 h-5 w-5 text-white sm:hidden md:inline-block "
                                aria-hidden="true"
                              />
                              <span className="">Update Profile</span>
                            </Link>
                          )}
                        </>
                        {/* Send Mail */}
                        <button
                          type="button"
                          onClick={handleMessage}
                          className=" w-full flex justify-center items-center bg-indigo-900 px-4 py-2 text-sm font-medium rounded-md text-gray-700  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          <MailIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                            aria-hidden="true"
                          />
                          <span className="text-base mr-2  text-bold text-white">
                            Message
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Main Section */}

                    <div className="flex justify-center place-items-start flex-wrap  mt-10 ">
                      {/* All my Post */}
                      <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0 flex flex-col gap-10">
                        {profile?.posts?.length <= 0 ? (
                          <h2 className="text-center  text-2xl mt-28">
                            No post found
                          </h2>
                        ) : (
                          profile?.posts?.map((post) => {
                            return (
                              <ProfileCard
                                key={post?._id}
                                id={post?._id}
                                image={post?.image}
                                title={post?.title}
                                category={post?.category}
                                date={dateFormatter(post?.createdAt)}
                                view={post?.numViews}
                                author={`${profile?.firstName} ${profile?.lastName} `}
                              />
                            );
                          })
                        )}
                      </div>

                      <div></div>

                      <div className="flex flex-col gap-y-3 w-full md:w-1/3 px-4 mb-4 md:mb-0">
                        {/* Who viewed Profile */}
                        <div>
                          <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                            Who viewed this profile :{" "}
                            {profile?.viewedBy?.length}
                          </h1>

                          {/* Who view my profile */}
                          <ul className="">
                            {profile?.viewedBy?.length <= 0 ? (
                              <h1>No Viewer</h1>
                            ) : (
                              profile?.viewedBy?.map((user) => (
                                <li key={user?._id}>
                                  <Link>
                                    <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                                      <img
                                        className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                                        src={user?.profilePhoto}
                                        alt={user?.firstName}
                                      />
                                      <div className="font-medium text-lg leading-6 space-y-1">
                                        <h3>
                                          {user?.firstName} {user?.lastName}
                                        </h3>
                                        <p className="text-indigo-600">
                                          {user?.accountType}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </li>
                              ))
                            )}
                          </ul>
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
                                  <p>({category.postCount})</p>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </div>
        )}
      </SmoothScroll>

      <Footer />
    </div>
  );
};

export default Profile;
