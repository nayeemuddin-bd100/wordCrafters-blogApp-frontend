import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useDispatch } from 'react-redux';
import { addCategoryAction } from './../../redux/slices/category/categorySlices';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
})

const AddNewCategory = () => {
 
 const storeData = useSelector((state) => state?.category);

 const {  appErr, serverErr, loading } = storeData;

  const dispatch = useDispatch()

  
  const formik = useFormik({
		initialValues: {
			title: "",
		},
		onSubmit: (value) => {
			dispatch(addCategoryAction(value));
			toast.success("Category added successfully");
		},
		validationSchema: formSchema,
	});

	if (storeData.category) {
		return <Navigate to="/category-list" />;
	}
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<BookOpenIcon className="mx-auto h-12 w-auto" />
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Add New Category
						</h2>
						<div className="mt-2 text-center text-sm text-gray-600">
							<p className="font-medium text-indigo-600">
								These are the categories user will select when creating a post
							</p>

							{appErr || serverErr ? (
								<h2 className="text-red-500 text-center">{appErr} </h2>
							) : null}
						</div>
					</div>
					{/* Form */}
					<form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Name
								</label>
								{/* Title */}
								<input
									onChange={formik.handleChange("title")}
									onBlur={formik.handleBlur("title")}
									type="text"
									autoComplete="text"
									value={formik.values.title}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
									placeholder="New Category"
								/>
								<div className="text-red-400 mb-2">
									{formik.touched.title && formik.errors.title}
								</div>
							</div>
						</div>

						<div>
							<div>
								{/* Submit */}

								{loading ? (
									<button
										type="submit"
										className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										<span className="absolute left-0 inset-y-0 flex items-center pl-3">
											<PlusCircleIcon
												className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
												aria-hidden="true"
											/>
										</span>
										Loading ...
									</button>
								) : (
									<button
										type="submit"
										className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									>
										<span className="absolute left-0 inset-y-0 flex items-center pl-3">
											<PlusCircleIcon
												className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
												aria-hidden="true"
											/>
										</span>
										Add new Category
									</button>
								)}
							</div>
						</div>
					</form>
				</div>
			</div>
		);
};

export default AddNewCategory;
