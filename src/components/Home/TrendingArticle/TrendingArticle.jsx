import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPostsAction } from "../../../redux/slices/posts/postSlices";
import MiniSpinner from '../../../utils/MiniSpinner';
import TrendingArticleCard from "./TrendingArticleCard";

const TrendingArticle = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.posts);

  const { postLoading, postsList } = posts;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const postsParams = {
        limit: 2,
        sortOrder: "asc",
      };

      const data = await dispatch(fetchAllPostsAction(postsParams));
      setRecentPosts(data?.payload?.data);

      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="py-5 max-w-7xl mx-auto px-10">
      <p className="text-center text-2xl py-3 ">Article of the Month</p>

      {/* Article Card */}
      <div className="flex flex-col lg:flex-row gap-3 py-5">

          {postLoading || loading ? (
            <MiniSpinner />
          ) : (
            recentPosts.map((post) => (
              <TrendingArticleCard key={post?._id} post={post} />
            ))
          )}
  
      </div>
    </div>
  );
};

export default TrendingArticle;
