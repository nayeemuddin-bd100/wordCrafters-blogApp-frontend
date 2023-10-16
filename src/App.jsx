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
import Authors from './pages/Authors';
import CreatePost from './components/Posts/CreatePost';
import PostsList from "./components/Posts/PostsList";

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

				<Route element={<ProtectedRoute />}>
					<Route path="/users" element={<Authors />} />
					<Route path="/create-post" element={<CreatePost />} />
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
