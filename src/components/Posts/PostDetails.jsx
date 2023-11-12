/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../utils/Spinner";
import {
	fetchPostDetailsAction,
	resetPostDetailsAction,
} from "./../../redux/slices/posts/postSlices";
import { useParams } from "react-router-dom";
import dateFormatter from "./../../utils/dateFormatter";
import { deletePostAction } from "./../../redux/slices/posts/postSlices";
import { resetPostDeleteAction } from "./../../redux/slices/posts/postSlices";
import { Navigate } from "react-router-dom";
import AddComment from "../Comments/AddComment";
import CommentsList from './../Comments/CommentList';

const PostDetails = () => {
	let { id } = useParams();
	const dispatch = useDispatch();

		const posts = useSelector((state) => state?.posts);
		const loggedInUser = useSelector((state) => state?.users);
		const comment = useSelector((state) => state?.comments);
		const { postDetails, loading, appErr, serverErr, deletedPost } = posts;
		const { createdComment} = comment;

	useEffect(() => {
		dispatch(fetchPostDetailsAction(id));
	}, [dispatch, id, createdComment]);


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
			{
				
			// 	loading ? (
			// 	<div className="h-screen">
			// 		<Spinner />
			// 	</div>
			// ) :
				
				appErr || serverErr ? (
				<h1 className="h-screen text-red-400 text-xl">
					{serverErr} {appErr}
				</h1>
			) : (
				<section className="py-10 2xl:py-40 bg-gray-800 overflow-hidden">
					<div className="container px-4 mx-auto">
						{/* posts Image */}
						<img
							className="mb-10 w-full h-48 md:h-60 lg:h-72 xl:h-96 object-cover"
							src={postDetails?.image}
							alt=""
						/>
						<div className="max-w-2xl mx-auto text-center">
							<h2 className="mt-2 md:mt-7 mb-5 lg:mb-10 text-3xl md:text-5xl lg:text-6xl 2xl:text-7xl text-green-400 font-bold font-heading">
								{postDetails?.title}
							</h2>

							{/* User */}
							<div className="inline-flex pt-5 md:pt-14 mb-8 md:mb-14 items-center border-t border-gray-500">
								<img
									className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
									src={postDetails?.author?.profilePhoto}
									alt=""
								/>
								<div className="text-left">
									<h4 className="mb-1 text-2xl font-bold text-gray-50">
										<span className="text-xl lg:text-2xl font-bold text-yellow-400">
											{postDetails?.author?.firstName}{" "}
											{postDetails?.author?.lastName}{" "}
										</span>
									</h4>
									<p className="text-green-500">
										{dateFormatter(postDetails?.createdAt)}
									</p>
								</div>
							</div>
							{/* posts description */}
							<div className="max-w-xl mx-auto flex justify-center items-center">
								<p className="mb-6 text-left  text-xl text-gray-200">
									{postDetails?.description}

									{/* Show delete and update btn if created user and admin can delete the post as well */}
									{postDetails?.author?._id === loggedInUser?.userAuth?._id ? (
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
					</div>
					<AddComment postId={postDetails?._id} />

					<div className="flex justify-center  items-center">
						{/* <CommentsList comments={posts?.comments} postId={posts?._id} /> */}
						<CommentsList comments={postDetails?.comments} />
					</div>
				</section>
			)}
		</>
	);
};

export default PostDetails;
