/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchSingleCommentAction,
	resetCommentDetailsAction,
	updateCommentAction,
} from "./../../redux/slices/comments/commentSlices";
import { useParams } from "react-router-dom";
import { resetUpdatedCommentAction } from "./../../redux/slices/comments/commentSlices";
import { Navigate } from "react-router-dom";

//Form schema
const formSchema = Yup.object({
	description: Yup.string().required("Description is required"),
});

const UpdateComment = () => {
	const dispatch = useDispatch();
	let { id } = useParams();

	//fetch comment
	useEffect(() => {
		dispatch(fetchSingleCommentAction(id));
	}, [dispatch, id]);

	const comments = useSelector((state) => state?.comments);
	const { commentDetails, updatedComment } = comments;

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			description: commentDetails?.description,
		},
		onSubmit: (values) => {
			const data = {
				id,
				description: values?.description,
			};
			//dispatch action
			dispatch(updateCommentAction(data));
		},
		validationSchema: formSchema,
	});

	//redirect
	if (updatedComment) {
		dispatch(resetUpdatedCommentAction());
		return <Navigate to={`/posts/${commentDetails?.post}`} />;
	}

	return (
		<div className="h-80 flex justify-center items-center">
			<div className="flex flex-col justify-center items-center">
				<form
					onSubmit={formik.handleSubmit}
					className="mt-1 flex flex-col max-w-sm m-auto"
				>
					<textarea
						onBlur={formik.handleBlur("description")}
						value={formik.values.description}
						onChange={formik.handleChange("description")}
						type="text"
						name="text"
						id="text"
						className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 rounded-md"
						placeholder="Add New comment"
					/>

					<button
						type="submit"
						className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5 mx-auto text-center"
					>
						Submit
					</button>
				</form>
				<div className="text-red-400 mb-2 mt-2">
					{formik.touched.description && formik.errors.description}
				</div>
			</div>
		</div>
	);
};

export default UpdateComment;
