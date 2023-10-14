/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "./../../redux/slices/posts/postSlices";
import CategoryDropdown from "./../Category/CategoryDropdown";
import Dropzone, { useDropzone } from "react-dropzone";

const formSchema = Yup.object({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
	category: Yup.object().shape({
		label: Yup.string().required("Category is required"),
	}),
	image:Yup.string().required("Image is required"),
});

const CreatePost = () => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			category: "",
			image:""
		},
		onSubmit: (value) => {
			console.log(value);
			dispatch(
				createPostAction({
					title: value?.title,
					description: value?.description,
					category: value?.category?.label,
					image:value?.image
				})
			);
		},
		validationSchema: formSchema,
	});

	const storeData = useSelector((state) => state?.posts);
	const { appErr } = storeData;

	return (
		<>
			<div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
						Create Post
					</h2>

					<p className="mt-2 text-center text-sm text-gray-600">
						<p className="font-medium text-green-600 hover:text-indigo-500">
							Share your ideas to the word.
						</p>
					</p>
				</div>
				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form onSubmit={formik.handleSubmit} className="space-y-6">
							<div>
								{appErr ? (
									<div className="text-red-500 mb-2 text-center">{appErr}</div>
								) : null}
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Title
								</label>
								<div className="mt-1">
									{/* Title */}
									<input
										onChange={formik.handleChange("title")}
										onBlur={formik.handleBlur("title")}
										value={formik.values.title}
										type="text"
										id="title"
										name="title"
										autoComplete="title"
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
								{/* Err msg */}
								<div className="text-red-500">
									{formik.touched.title && formik.errors.title}
								</div>
							</div>

							<CategoryDropdown
								onChange={formik.setFieldValue}
								onBlur={formik.setFieldTouched}
								value={formik?.values?.category?.label}
								error={formik.errors.category}
								touched={formik.touched.category}
							/>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Description
								</label>
								{/* Description */}
								<textarea
									onChange={formik.handleChange("description")}
									onBlur={formik.handleBlur("description")}
									type="text"
									value={formik.values.description}
									rows="5"
									cols="10"
									className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
								></textarea>

								{/* Err msg */}
								<div className="text-red-500">
									{formik.touched.description && formik.errors.description}
								</div>
							</div>

							<div className="p-4 border-dashed border-2 border-gray-300 rounded-lg mt-2">
								<Dropzone
									onDrop={(acceptedFiles) => {
										formik.setFieldValue("image", acceptedFiles[0]);
									}}
									accept="image/jpeg, image/png"
									onBlur={formik.handleBlur("image")}
								>
									{({ getRootProps, getInputProps }) => (
										<section>
											<div
												{...getRootProps({
													onDrop: (event) => event.stopPropagation(),
												})}
											>
												<input {...getInputProps()} type="file" name="image" />
												<p className="text-center">
													Drag 'n' drop your image here, or click to select
													files
												</p>
											</div>
										</section>
									)}
								</Dropzone>
							</div>
							{/* Err msg */}
							<div className="text-red-500">
								{formik.touched.image && formik.errors.image}
							</div>
							<div>
								{/* Submit btn */}
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Create
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreatePost;
