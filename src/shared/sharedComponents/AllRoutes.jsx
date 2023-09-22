
import { Route, Routes } from 'react-router-dom';
import NotFound from './../../components/NotFound/NotFound';
import Home from './../../components/Home/Home';

function AllRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default AllRoutes;
