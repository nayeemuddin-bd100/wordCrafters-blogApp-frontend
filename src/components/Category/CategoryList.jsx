import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PencilAltIcon } from "@heroicons/react/outline";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlices";
import { Spinner } from "./../../utils/Spinner";
import dateFormatter from "./../../utils/dateFormatter";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const category = useSelector((state) => state.category);
  const loggedInUser = useSelector((state) => state.users?.userAuth);
  const { categoryList, loading, appErr, serverErr } = category;
  
  const handleCategory = (category) => {
    if (
      loggedInUser.email !== "nayeemuddin.bd100@gmail.com" &&
      (category?.title === "ExpressJS" ||
        category?.title === "Machine learning" ||
        category?.title === "Github" ||
        category?.title === "Next" ||
        category?.title === "Angular" ||
        category?.title === "NodeJS" ||
        category?.title === "Javascript" ||
        category?.title === "MongoDB")
    ) {
      toast.error("Only Super Admin can update and delete base category");
    } else {
      navigate(`/update-category/${category?._id}`);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : appErr || serverErr ? (
        <h2 className="text-center text-3xl text-red-600">
          {serverErr} {appErr}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800">
          No category Found
        </h2>
      ) : (
        <div className="flex flex-col max-w-7xl mx-auto">
          <div className=" overflow-x-auto  ">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList?.map((category) => (
                      <tr className="bg-gray-50" key={category?._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={category?.user?.profilePhoto}
                                alt="category profile"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {category?.user?.firstName}{" "}
                                {category?.user?.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {category?.user?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {/*  */}

                          {dateFormatter(category?.createdAt)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button onClick={() => handleCategory(category)}>
                            <PencilAltIcon className="h-5 text-indigo-500" />
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;
