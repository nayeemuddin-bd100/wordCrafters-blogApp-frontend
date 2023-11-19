import React from "react";
import PublicNavbar from "./Public/PublicNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import AdminNavbar from "./Admin/AdminNavbar";
import { useSelector } from "react-redux";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./Alerts/AccountVerificationSuccessAlert";
import MiniSpinner from "../../../utils/MiniSpinner";

const Navbar = () => {
	const state = useSelector((state) => state?.users);
	const verifyEmail = useSelector((state) => state?.verifyEmail);
	const { userAuth } = state;
	let isAdmin;
	if (userAuth) {
		isAdmin = userAuth.isAdmin;
	}

	return (
		<div>
			{isAdmin ? (
				<AdminNavbar />
			) : userAuth ? (
				<PrivateNavbar />
			) : (
				<PublicNavbar />
			)}

			{userAuth && !userAuth?.isVerified && <AccountVerificationAlertWarning />}
			{verifyEmail.verify && <AccountVerificationSuccessAlert />}
			{verifyEmail?.verifyEmailLoading && (
				<div className="h-10 flex justify-center items-center">
					<MiniSpinner />
				</div>
			)}
		</div>
	);
};

export default Navbar;
