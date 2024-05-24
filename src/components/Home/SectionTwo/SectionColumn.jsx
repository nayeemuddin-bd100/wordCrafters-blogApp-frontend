import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FacebookIcon from "../../../img/social-icon/FacebookIcon";
import InstagramIcon from "../../../img/social-icon/InstagramIcon";
import LinkedinIcon from "../../../img/social-icon/LinkedinIcon";
import TwitterIcon from "../../../img/social-icon/TwitterIcon";
import { fetchAllPostsAction } from "../../../redux/slices/posts/postSlices";
import MiniSpinner from "../../../utils/MiniSpinner";
import AnotherPostCard from "./AnotherPostCard";
import RecentPostCard from "./RecentPostCard";

const SectionColumn = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [anotherPosts, setAnotherPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.posts);

  const { postLoading, postsList } = posts;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const recentPostParams = {
        limit: 4,
      };
      const anotherPostsParams = {
        limit: 3,
        sortOrder: "asc",
      };

      const recentPostsData = await dispatch(
        fetchAllPostsAction(recentPostParams)
      );

      setRecentPosts(recentPostsData?.payload?.data);

      const anotherPostsData = await dispatch(
        fetchAllPostsAction(anotherPostsParams)
      );

      setAnotherPosts(anotherPostsData?.payload?.data);

      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4   ">
      {/* Left Panel */}

      <div className="col-span-4">
        <div className="grid  grid-cols-1 sm:grid-cols-2 gap-3">
          {postLoading || loading ? (
            <MiniSpinner />
          ) : (
            recentPosts.map((post) => (
              <RecentPostCard key={post?._id} post={post} />
            ))
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="col-span-2 mt-4">
        <h2 className="text-2xl">Another Post</h2>

        {/* Another Post */}
        <div className="mt-3">
          {postLoading || loading ? (
            <MiniSpinner />
          ) : (
            anotherPosts.map((post) => (
              <AnotherPostCard key={post?._id} post={post} />
            ))
          )}
        </div>

        {/* Social icon */}
        <div className="flex flex-col gap-y-4 px-0  sm:px-10 md:px-0">
          <h2 className="text-2xl mt-10">Stay Connected</h2>

          {/* Facebook */}
          <Link className="flex justify-between my-3 hover:text-pink-500 transition-all duration-300">
            <div className="flex gap-3">
              <FacebookIcon className="w-8 h-8" />
              <span>Facebook</span>
            </div>
            <p className="font-inter">3.5k Likes</p>
          </Link>

          {/* Linkedin */}
          <Link className="flex justify-between my-3 hover:text-pink-500 transition-all duration-300">
            <div className="flex gap-3">
              <LinkedinIcon className="w-8 h-8" />
              <span>Linkedin</span>
            </div>
            <p className="font-inter">19K Follower</p>
          </Link>

          {/* Instagram */}
          <Link className="flex justify-between my-3 hover:text-pink-500 transition-all duration-300">
            <div className="flex gap-3">
              <InstagramIcon className="w-8 h-8" />
              <span>Instagram</span>
            </div>
            <p className="font-inter">80K Follower</p>
          </Link>

          {/* Twitter */}

          <Link className="flex justify-between my-3 hover:text-pink-500 transition-all duration-300">
            <div className="flex gap-3">
              <TwitterIcon className="w-8 h-8" />
              <span>Twitter</span>
            </div>
            <p className="font-inter">80K Follower</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionColumn;
