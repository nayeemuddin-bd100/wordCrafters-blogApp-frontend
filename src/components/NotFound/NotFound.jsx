import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 min-h-screen flex items-center justify-center">
			<div className="text-center text-white">
				<h1 className="text-6xl font-extrabold mb-4">404</h1>
				<p className="text-2xl">Page not found</p>
				<p className="mt-4 text-lg">
					The page you are looking for does not exist.
				</p>
				<div className="mt-8">
					<Link
						to="/"
						className=" px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition duration-300"
					>
						Go Home
					</Link>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
