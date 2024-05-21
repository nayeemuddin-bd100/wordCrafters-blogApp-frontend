import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FacebookIcon from "../../../img/social-icon/FacebookIcon";
import InstagramIcon from "../../../img/social-icon/InstagramIcon";
import LinkedinIcon from "../../../img/social-icon/LinkedinIcon";
import TwitterIcon from "../../../img/social-icon/TwitterIcon";
import MiniSpinner from '../../../utils/MiniSpinner';
import AnotherPostCard from "./AnotherPostCard";
import RecentPostCard from './RecentPostCard';

const SectionColumn = () => {
   const [recentPosts, setRecentPosts] = useState([]);
  const [anotherPosts, setAnotherPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  const dispatch = useDispatch();
  const posts = useSelector((state) => state?.posts);

  const { postLoading, postsList } = posts;
  // console.log(postsList?.data);
  const limit = 4;


  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     await dispatch(
  //       fetchAllPostsAction({
  //         limit,
  //       })
  //     );
  //   };
  //   fetchPosts();
  // }, [dispatch]);


  //  useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);

  //     const recentPostParams = {
  //       limit: 4,
  //       sortBy: 'createdAt',
  //       sortOrder: 'desc',
  //     };
  //     const recentPostsData = await fetchAllPostsAction(recentPostParams);

  //     setRecentPosts(recentPostsData);

  //     // const anotherPostsParams = {
  //     //   limit: 3,
  //     //   sortBy: 'createdAt',
  //     //   sortOrder: 'desc',
  //     // };
  //     // const anotherPostsData = await fetchAllPostsAction(anotherPostsParams);
  //     // setAnotherPosts(anotherPostsData.data);

  //     setLoading(false);
  //   };
  //   fetchData();
  // }, [recentPosts]);

  console.log(recentPosts);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4   ">
      {/* Left Panel */}

      <motion.div
        className="col-span-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
          hidden: {},
        }}
      >
        <div className="grid  grid-cols-1 sm:grid-cols-2 gap-3">
         { postLoading? <MiniSpinner /> :
           postsList?.data?.map((post) => (
             <RecentPostCard key={post?._id} post={post} />
          
        
        ))
         }
          {/* <motion.div
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0.8 },
            }}
            transition={{ duration: 0.5 }}
          >
            <RecentPostCard />
          </motion.div>{" "}
          <motion.div
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0.8 },
            }}
            transition={{ duration: 0.5 }}
          >
            <RecentPostCard />
          </motion.div>{" "}
          <motion.div
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0.8 },
            }}
            transition={{ duration: 0.5 }}
          >
            <RecentPostCard />
          </motion.div> */}
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="col-span-2 mt-4">
        <h2 className="text-2xl">Another Post</h2>

        {/* Another Post */}
        <div className="mt-3">
          <AnotherPostCard />
          <AnotherPostCard />
          <AnotherPostCard />
        </div>

        {/* Social icon */}
        <div className="flex flex-col gap-y-4 px-10 md:px-0">
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
