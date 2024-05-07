/* eslint-disable react/prop-types */
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import moment from "moment";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCommentAction } from "../../redux/slices/comments/commentSlices";
import MiniSpinner from "./../../utils/MiniSpinner";

const CommentsList = ({ comments }) => {
  const dispatch = useDispatch();
  const formatTimeAgo = (comment) => {
    return moment(comment).fromNow();
  };

  const author = useSelector((state) => state?.users);

  const comment = useSelector((state) => state?.comments);
  const { loading } = comment;

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this Comment?"
    );
    if (shouldDelete) {
      dispatch(deleteCommentAction(id));
      toast.success("Comment deleted successfully");
    }
  };
  return (
    <div>
      <ul className="divide-y divide-gray-200 p-3 lg:px-16 mt-5">
        <div className="text-3xl font-semibold "> {comments?.length} Comment</div>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-3xl font-semibold">No Comment</h1>
          ) : loading ? (
            <div className="py-10">
              <MiniSpinner />
            </div>
          ) : (
            comments?.map((comment) => (
              <li key={comment?._id} className="py-4  w-full">
                <div className="flex flex-col md:flex-row items-start md:items-center space-x-3">
                  <img
                    className="h-36 w-36 rounded-full"
                    src={comment?.author?.profilePhoto}
                    alt=""
                  />
                  <div className="flex-1 w-full space-y-1 break-all">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                      <Link
                        to={`/profile/${comment?.author?._id}`}
                        className="text-2xl font-semibold"
                      >
                        {comment?.author?.firstName} {comment?.author?.lastName}
                      </Link>
                      <p className="text-bold text-gray-800">
                        {formatTimeAgo(comment?.createdAt)}
                      </p>
                    </div>
                    <p className="font-inter text-lg text-gray-800">
                      {comment?.description}
                    </p>

                    {/*only created comment user can edit and delete comment and admin can delete comment as well*/}

                    {author?.userAuth?._id === comment?.author?._id ? (
                      <p className="flex">
                        <Link
                          to={`/update-comment/${comment?._id}`}
                          className="p-3"
                        >
                          <PencilAltIcon className="h-5 mt-3 text-indigo-500" />
                        </Link>
                        <button
                          onClick={() => handleDelete(comment?._id)}
                          className="ml-3"
                        >
                          <TrashIcon className="h-5 mt-3 text-red-600" />
                        </button>
                      </p>
                    ) : author?.userAuth?.isAdmin ? (
                      <p className="flex">
                        <button
                          onClick={() => handleDelete(comment?._id)}
                          className="ml-3"
                        >
                          <TrashIcon className="h-5 mt-3 text-red-600" />
                        </button>
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))
          )}
        </>
      </ul>
    </div>
  );
};

export default CommentsList;
