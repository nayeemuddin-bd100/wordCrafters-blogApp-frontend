import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";
import {
	fetchAllUserAction,
	userProfileAction,
} from "./../../redux/slices/users/usersSlices";
import { Spinner } from "../../utils/Spinner";

const UsersList = () => {
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
		<>
			<section className=" bg-gray-900 min-h-screen">
				<UsersListHeader />

				{appErr ||
					(serverErr && (
						<h2 className="text-red-500 text-center text-xl py-10">
							{" "}
							{appErr} {serverErr}
						</h2>
					))}

				{allUsers && allUsers?.length <= 0 && (
					<h2 className="text-3xl text-white text-center py-10">
						No user found
					</h2>
				)}

				{fetchAllUserLoading ? (
					<Spinner />
				) : (
					allUsers?.map((user) => {
						return <UsersListItem key={user?._id} user={user} />;
					})
				)}
			</section>
		</>
	);
};

export default UsersList;
