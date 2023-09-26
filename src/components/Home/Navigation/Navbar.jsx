import React from 'react'
import PublicNavbar from './Public/PublicNavbar';
import PrivateNavbar from './Private/PrivateNavbar';
import AdminNavbar from './Admin/AdminNavbar';
import { useSelector } from 'react-redux';


const Navbar = () => {

  const state = useSelector(state => state?.users)
  const { userAuth } = state;
  let isAdmin;
  if (userAuth) {
    isAdmin = userAuth.isAdmin
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
		</div>
	);
}

export default Navbar