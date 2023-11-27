import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = () => {
	const isAuthenticated = useSelector((state) => state?.users?.userAuth);
	const location = useLocation();

	if (isAuthenticated) {
		return <Outlet />;
	}
	return <Navigate to="/login" state={{ from: location.pathname }} />;
};

export default ProtectedRoute;
