/* eslint-disable react/no-unknown-property */
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	HeartIcon,
	EmojiSadIcon,
	UploadIcon,
	UserIcon,
} from "@heroicons/react/outline";

import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import {
	followUserAction,
	userProfileAction,
} from "../../redux/slices/users/usersSlices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import dateFormatter from "./../../utils/dateFormatter";
import { Spinner } from "../../utils/Spinner";
import { useState } from "react";
import { changeUserProfilePhotoAction } from "./../../redux/slices/users/usersSlices";
import MiniSpinner from "../../utils/MiniSpinner";
import { UnFollowUserAction } from "./../../redux/slices/users/usersSlices";
import toast from "react-hot-toast";

const Profile = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Manage profile photo upload
	const users = useSelector((state) => state?.users);

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

	useEffect(() => {
		dispatch(userProfileAction(id));
	}, [id, dispatch, profilePhoto, followUser, unFollowUser]);

	const [selectedFile, setSelectedFile] = useState(null);
	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
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
		<>
			{!profile ? (
				<Spinner />
			) : (
				<div className="h-screen flex overflow-hidden bg-white">
					{/* Static sidebar for desktop */}

					<div className="flex flex-col min-w-0 flex-1 overflow-hidden">
						<div className="flex-1 relative z-0 flex overflow-hidden">
							<main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
								<article>
									{/* Profile header */}
									<div>
										<div>
											<img
												className="h-32 w-full object-cover lg:h-48"
												src={profile?.profilePhoto}
												alt={profile?.firstName}
											/>
										</div>
										<div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
											<div className="-mt-12 md:-mt-16 md:flex md:items-end sm:space-x-5">
												<div className="flex -mt-20">
													<img
														className="h-24 w-24 rounded-full  ring-4 ring-white md:h-32 md:w-32"
														src={profile?.profilePhoto}
														alt={profile?.firstName}
													/>
												</div>
												<div className="mt-6 md:flex-1 md:min-w-0 md:flex md:items-center md:justify-end md:space-x-6 md:pb-1">
													<div className=" flex flex-col 2xl:block mt-10 min-w-0 flex-1">
														<div className=" flex flex-col text-2xl font-bold text-gray-900 ">
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
															{dateFormatter(profile?.createdAt)}
														</p>
														<p className="text-green-700 mt-2 mb-2">
															{profile?.posts.length} posts{" "}
															{profile?.followers.length} followers{" "}
															{profile?.following.length} following
														</p>
														{/* Who view my profile */}
														<div className="flex items-center  mb-2">
															<EyeIcon className="h-5 w-5 " />
															<div className="pl-2">
																{profile?.viewedBy?.length}{" "}
																<span className="text-indigo-500 cursor-pointer hover:underline">
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
																<label className="cursor-pointer inline-flex w-full xl:w-2/3 justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
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

													<div className="mt-6 flex flex-col justify-stretch space-y-3 md:flex-row md:space-y-0 md:space-x-4">
														{/* Follow/Unfollow user */}
														<div>
															{users?.userAuth?._id ===
															id ? null : followerLoading ? (
																<button
																	disabled
																	className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
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
																	className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
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
																	className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
																>
																	<HeartIcon
																		className="-ml-1 mr-2 h-5 w-5 text-gray-400"
																		aria-hidden="true"
																	/>
																	<span>
																		Follow {profile?.followers?.length}{" "}
																	</span>
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
																	<span>
																		Follow {profile?.followers?.length}{" "}
																	</span>
																</button>
															)}
														</div>

														{/* Update Profile */}

														<>
															{userAuth?._id === id && (
																<Link
																	to={`/update-profile/${id}`}
																	className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
																>
																	<UserIcon
																		className="-ml-1 mr-2 h-5 w-5 text-white"
																		aria-hidden="true"
																	/>
																	<span>Update Profile</span>
																</Link>
															)}
														</>
														{/* Send Mail */}
														<button
															type="button"
															onClick={handleMessage}
															className="flex justify-center items-center bg-indigo-900 px-4 py-2 text-sm font-medium rounded-md text-gray-700  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
														>
															<MailIcon
																className="-ml-1 mr-2 h-5 w-5 text-gray-200"
																aria-hidden="true"
															/>
															<span className="text-base mr-2  text-bold text-white">
																Send Message
															</span>
														</button>
													</div>
												</div>
											</div>
											<div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
												<h1 className="text-2xl font-bold text-gray-900 truncate">
													{profile?.firstName} {profile?.lastName}
												</h1>
											</div>
										</div>
									</div>
									{/* Tabs */}
									<div className="mt-6 sm:mt-2 2xl:mt-5">
										<div className="border-b border-red-900">
											<div className="max-w-5xl mx-auto "></div>
										</div>
									</div>
									<div className="flex justify-center place-items-start flex-wrap  md:mb-0">
										<div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
											<h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
												Who viewed this profile : {profile?.viewedBy?.length}
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
										{/* All my Post */}
										<div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
											<h1 className=" text-center text-xl border-gray-500 mb-2 border-b-2">
												Author Post
											</h1>

											{profile?.posts?.length <= 0 ? (
												<h2 className="text-center text-indigo-600 text-lg">
													No post found
												</h2>
											) : (
												profile?.posts?.map((post) => {
													return (
														<div
															key={post?.id}
															className="flex flex-wrap  -mx-3 mt-3  lg:mb-6"
														>
															<div className="mb-2   w-full lg:w-1/4 px-3">
																<Link>
																	<img
																		className="object-cover h-40 rounded"
																		src={post?.image}
																		alt="poster"
																	/>
																</Link>
															</div>
															<div className="w-full lg:w-3/4 px-3">
																<Link
																	to={`/posts/${post?._id}`}
																	className="hover:underline"
																>
																	<h3 className="mb-1 text-2xl text-green-600 font-bold font-heading">
																		{post?.title}
																	</h3>
																</Link>
																<p className="text-gray-700 font-normal truncate">
																	{post?.description}
																</p>

																<Link
																	className="text-indigo-600 hover:underline"
																	to={`/posts/${post?._id}`}
																>
																	{" "}
																	Read more
																</Link>
															</div>
														</div>
													);
												})
											)}
										</div>
									</div>
								</article>
							</main>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Profile;
