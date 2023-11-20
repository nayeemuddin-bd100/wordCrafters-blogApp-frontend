/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import {
	blockUserAction,
	UnBlockUserAction,
} from "./../../redux/slices/users/usersSlices";

const UsersListItem = ({ user }) => {
	const dispatch = useDispatch();
	return (
		<>
			<div className="p-3 mb-3 bg-white shadow rounded">
				<div className="flex flex-wrap items-center justify-center  ">
					<div className="w-full lg:w-3/12 flex px-4 mb-3 lg:mb-0 justify-center ">
						<img
							className="w-10 h-10 mr-3 object-cover rounded-full"
							src={user?.profilePhoto}
							alt="profile "
						/>
						<div>
							<p className="text-sm font-medium">
								{user?.firstName} {user?.lastName}
							</p>
							<p className="text-xs text-gray-500">{user?.email}</p>
						</div>
					</div>
					<div className="w-1/3 lg:w-2/12 px-4 mb-3 lg:mb-0 justify-center ">
						<p className="py-1 px-2 text-xs text-purple-500 bg-purple-50 rounded-full">
							{user?.accountType}
						</p>
					</div>
					<div className="w-1/3 lg:w-1/12 px-4 mb-3 lg:mb-0 flex justify-end ">
						<p className="text-sm font-medium">
							<span className="text-base mr-2  text-bold text-yellow-500">
								{user?.followers?.length}
							</span>
							followers
						</p>
					</div>
					<div className=" w-full flex lg:justify-end lg:w-6/12  px-4  mb-3 lg:mb-0 justify-center ">
						<div className="inline-block py-1 px-3 mr-2 mb-1 lg:mb-0 text-xs border-indigo-700 border-2 rounded">
							{user?.posts?.length} Posts
						</div>
						<Link
							to={`/profile/${user?._id}`}
							className=" text-black inline-block py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-yellow-600 rounded hover:bg-green-600 hover:text-white"
						>
							Profile
						</Link>

						{/* user blocked/unblocked */}
						{user?.isBlocked ? (
							<button
								onClick={() => dispatch(UnBlockUserAction(user?._id))}
								className="inline-block px-2 text-center bg-gray-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
							>
								Unblock
							</button>
						) : (
							<button
								onClick={() => dispatch(blockUserAction(user?._id))}
								className="inline-block py-1 px-4 text-center bg-red-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
							>
								Block
							</button>
						)}

						<Link
							to={`/send-email?email=${user?.email}`}
							className="inline-flex  justify-center items-center bg-green-700 px-2   border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-green-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
						>
							<MailIcon
								className="-ml-1 mr-2 h-5 w-5 text-gray-200"
								aria-hidden="true"
							/>
							<span className="text-base mr-2  text-bold text-yellow-500 ">
								Message
							</span>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default UsersListItem;
