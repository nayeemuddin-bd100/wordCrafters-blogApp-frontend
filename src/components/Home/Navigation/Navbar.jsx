import { useSelector } from "react-redux";
import MiniSpinner from "../../../utils/MiniSpinner";
import AdminNavbar from "./Admin/AdminNavbar";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./Alerts/AccountVerificationSuccessAlert";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";



const Navbar = () => {
  const state = useSelector((state) => state?.users);
  const verifyEmail = useSelector((state) => state?.verifyEmail);
  const { userAuth } = state;
  let isAdmin;
  if (userAuth) {
    isAdmin = userAuth.isAdmin;
  }
  

  return (
    <div className="sticky top-0 z-50 border border-b-1 border-yellow-500">
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
