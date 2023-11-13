import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	toggleLikePostAction,
	toggleDislikePostAction,
	fetchAllPostsAction,
	resetPostDetailsAction,
} from "../../redux/slices/posts/postSlices";

import dateFormatter from "./../../utils/dateFormatter";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlices";
import MiniSpinner from "./../../utils/MiniSpinner";
import { Spinner } from "./../../utils/Spinner";

const PostsList = () => {
	const dispatch = useDispatch();
	const posts = useSelector((state) => state?.posts);

	const { loading, postsList, like, dislike } = posts;
	useEffect(() => {
		dispatch(fetchAllPostsAction(""));
	}, [dispatch, like, dislike]);

	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, [dispatch]);

	useEffect(() => {
			dispatch(resetPostDetailsAction());
	}, []);

	const category = useSelector((state) => state.category);
	const {
		categoryList,
		loading: categoryLoading,
		appErr: categoryErr,
		serverErr: categoryServerErr,
	} = category;

	
	return (
		<>
			<section>
				<div className="py-20 bg-gray-900 min-h-screen radius-for-skewed">
					<div className="container mx-auto px-4">
						<div className="mb-16 flex flex-wrap items-center">
							<div className="w-full lg:w-1/2">
								<span className="text-green-600 font-bold">
									Latest Posts from our awesome authors
								</span>
								<h2 className="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
									Latest Post
								</h2>
							</div>
							<div className=" block lg:text-right w-1/2 mt-2 lg:mt-0">
								{/* View All */}
								<button
									onClick={() => dispatch(fetchAllPostsAction(""))}
									className="inline-block py-2 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-gray-50 font-semibold leading-loose transition duration-200"
								>
									View All Posts
								</button>
							</div>
						</div>
						<div className="flex flex-wrap -mx-3">
							<div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
								<div className="py-4 px-6 bg-gray-600 shadow rounded">
									<h4 className="mb-4 text-gray-500 font-bold uppercase">
										Categories
									</h4>

									<ul className="flex flex-wrap place-content-evenly lg:block  ">
										{categoryLoading ? (
											<MiniSpinner />
										) : categoryErr || categoryServerErr ? (
											<div className="text-red-400 text-base">
												{categoryServerErr} - {categoryErr}
											</div>
										) : categoryList?.length <= 0 ? (
											<div className="text-xl text-gray-100 text-center">
												No category
											</div>
										) : (
											categoryList?.map((category) => {
												return (
													<li key={category._id}>
														<p
															onClick={() =>
																dispatch(fetchAllPostsAction(category?.title))
															}
															className="block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500"
														>
															{category?.title}
														</p>
													</li>
												);
											})
										)}
									</ul>
								</div>
							</div>
							<div className="w-full lg:w-3/4 px-3">
								{ postsList.length > 0 ? (
									postsList.map((post) => {
										return (
											<div
												key={post._id}
												className="flex flex-wrap bg-gray-900 -mx-3 my-5  lg:mb-6"
											>
												<div className="w-full md:w-1/3 px-3">
													<Link className="flex justify-center md:block">
														<img
															className="w-52 object-fill rounded"
															src={post?.image}
															alt=""
														/>
													</Link>
												</div>
												<div className="w-full md:w-2/3 px-3 flex justify-center items-center flex-col md:block">
													<Link
														to={`/posts/${post._id}`}
														className="hover:underline"
													>
														<h3 className="mb-2 text-2xl text-green-400 font-bold font-heading">
															{post?.title}
														</h3>
													</Link>

													<div className="mt-4 flex items-center">
														<div className="flex-shrink-0">
															<Link>
																<img
																	className="h-10 w-10 rounded-full"
																	src={post?.author?.profilePhoto}
																	alt=""
																/>
															</Link>
														</div>
														<div className="ml-3">
															<p className="text-sm font-medium text-gray-900">
																<Link className="text-yellow-400 hover:underline">
																	{post?.author?.firstName}{" "}
																	{post?.author?.lastName}
																</Link>
															</p>
															<div className="flex space-x-1 text-sm text-green-500">
																<time>{dateFormatter(post?.createdAt)}</time>
																<span aria-hidden="true">&middot;</span>
															</div>
														</div>
													</div>
													<div className="mt-4 flex space-x-4">
														<div className="flex items-center">
															<ThumbUpIcon
																onClick={() =>
																	dispatch(toggleLikePostAction(post._id))
																}
																className={`${
																	post?.isLiked
																		? `text-indigo-600`
																		: `text-gray-200`
																} h-7 w-7  cursor-pointer`}
															/>
															<span className="pl-2 text-gray-200">
																{" "}
																{post?.likes?.length}{" "}
															</span>
														</div>
														<div className="flex items-center">
															<ThumbDownIcon
																onClick={() =>
																	dispatch(toggleDislikePostAction(post._id))
																}
																className={`${
																	post?.isDisLiked
																		? `text-indigo-600`
																		: `text-gray-200`
																} h-7 w-7  cursor-pointer`}
															/>
															<span className="pl-2 text-gray-200">
																{post?.disLikes?.length}
															</span>
														</div>
														<div className="flex items-center">
															<EyeIcon className="h-7 w-7 text-gray-400" />
															<span className="pl-2 text-gray-600">
																{post?.numViews}
															</span>
														</div>
													</div>
												</div>
											</div>
										);
									})
								) : (
									<h2 className="text-center text-white text-2xl">
										No post found
									</h2>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-900">
					<div className="skew bg-green-500 skew-bottom mr-for-radius">
						<svg
							className="h-8 md:h-12 lg:h-10 w-full text-gray-900"
							viewBox="0 0 10 10"
							preserveAspectRatio="none"
						>
							<polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
						</svg>
					</div>
					<div className="skew bg-gray-500  skew-bottom ml-for-radius">
						<svg
							className="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
							viewBox="0 0 10 10"
							preserveAspectRatio="none"
						>
							<polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
						</svg>
					</div>
				</div>
			</section>
		</>
	);
};

export default PostsList;
