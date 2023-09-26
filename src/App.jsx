
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Navbar from "./components/Home/Navigation/Navbar";


function App() {
	return (
		<BrowserRouter>
		<Navbar/>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
