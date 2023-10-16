/* eslint-disable react/prop-types */
import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlices";

const CategoryDropdown = ({ onChange,onBlur,value,error }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCategoriesAction());
	}, [dispatch]);

	const category = useSelector((state) => state?.category);
	const { categoryList, loading, appErr, serverErr } = category;
	let categoryOption;
	if (categoryList) {
		categoryOption = categoryList.map((category) => {
			return {
				value: category?._id,
				label: category?.title,
			};
		});
	}

  const handleChange = value => {
    onChange("category",value)
  }

  const handleBlur = () => {
   onBlur("category",true);
  }
	return (
		<div>
			{loading ? (
				<h2> Loading...</h2>
			) : (
				<div>
					<Select
						options={categoryOption}
						onChange={handleChange}
						onBlur={handleBlur}
						value={value?.label}
						id="category"
					/>

					{error?.label && (
						<div className="text-red-500 mt-2 mb-2">{error.label}</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CategoryDropdown;
