
import { Route, Routes } from 'react-router-dom';
import Home from './../../pages/Home';
import NotFound from './../../pages/NotFound';
import Register from './../../pages/Register';
import Login from './../../pages/Login';


function AllRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default AllRoutes;
