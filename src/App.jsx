import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Home/Navigation/Navbar";
import AddNewCategory from "./components/Category/AddNewCategory";
import CategoryList from "./components/Category/CategoryList";
import UpdateCategory from "./components/Category/UpdateCategory";
import ProtectedRoute from "./components/Home/Navigation/ProtectedRoute/ProtectedRoute";
import AdminRoute from './components/Home/Navigation/ProtectedRoute/AdminRoute';
import CreatePost from './components/Posts/CreatePost';
import PostsList from "./components/Posts/PostsList";
import PostDetails from './components/Posts/PostDetails';
import UpdatePost from './components/Posts/UpdatePost';
import UpdateComment from './components/Comments/UpdateComment';
import Profile from './components/Users/Profile';
import UpdateProfileForm from './components/Users/UpdateProfileForm';
import SendEmail from './components/Users/SendEmail';
import AccountVerified from './components/Users/AccountVerified';
import UsersList from './components/UsersList/UsersList';
import UpdatePassword from './components/Users/UpdatePassword';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/posts" element={<PostsList />} />
				<Route path="/posts/:id" element={<PostDetails />} />

				<Route element={<ProtectedRoute />}>
					<Route path="/users" element={<UsersList />} />
					<Route path="/update-password" element={<UpdatePassword />} />
					<Route path="/create-post" element={<CreatePost />} />
					<Route path="/update-post/:id" element={<UpdatePost />} />
					<Route path="/update-comment/:id" element={<UpdateComment />} />
					{/* user profile */}
					<Route path="/profile/:id" element={<Profile />} />
					<Route path="/update-profile/:id" element={<UpdateProfileForm />} />
					<Route path="/send-email" element={<SendEmail />} />
					<Route path="/verify-token/:token" element={<AccountVerified />} />
				</Route>

				<Route element={<AdminRoute />}>
					<Route path="/add-category" element={<AddNewCategory />} />
					<Route path="/category-list" element={<CategoryList />} />
					<Route path="/update-category/:id" element={<UpdateCategory />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
