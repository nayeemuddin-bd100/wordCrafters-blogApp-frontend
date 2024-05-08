import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNewCategory from "./components/Category/AddNewCategory";
import CategoryList from "./components/Category/CategoryList";
import UpdateCategory from "./components/Category/UpdateCategory";
import UpdateComment from "./components/Comments/UpdateComment";
import Navbar from "./components/Home/Navigation/Navbar";
import AdminRoute from "./components/Home/Navigation/ProtectedRoute/AdminRoute";
import ProtectedRoute from "./components/Home/Navigation/ProtectedRoute/ProtectedRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostDetails from "./components/Posts/PostDetails";
import PostsList from './components/Posts/PostsList';
import UpdatePost from "./components/Posts/UpdatePost";
import AccountVerified from "./components/Users/AccountVerified";
import Profile from "./components/Users/Profile";
import ResetPassword from "./components/Users/ResetPassword";
import ResetPasswordForm from "./components/Users/ResetPasswordForm";
import SendEmail from "./components/Users/SendEmail";
import UpdatePassword from "./components/Users/UpdatePassword";
import UpdateProfileForm from "./components/Users/UpdateProfileForm";
import About from "./pages/About";
import Author from "./pages/Author";
import Blog from './pages/Blog';
import BlogDetails from "./pages/BlogDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/author" element={<Author />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset-token" element={<ResetPasswordForm />} />
        <Route path="/set-new-pass/:token" element={<ResetPassword />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        {/* <Route path="/author/:id" element={<Profile />} /> */}

        <Route element={<ProtectedRoute />}>
          {/* <Route path="/users" element={<UsersList />} /> */}
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
          <Route path="/update-comment/:id" element={<UpdateComment />} />
          {/* user profile */}
          <Route path="/author/:id" element={<Profile />} />
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
