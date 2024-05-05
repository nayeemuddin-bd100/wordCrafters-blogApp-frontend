import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import poster from "../../img/poster.png";

const HeroSection = () => {
  return (
    <>
      <section className=" bg-sky-200">
        <div className="relative container px-4 mx-auto max-w-7xl ">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14 pt-20 lg:pt-9 xl:pt-5 h-[100vh] ">
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 px-4 mb-5 lg:mb-0  flex flex-col items-center lg:block"
            >
             
              <h2 className="max-w-2xl mt-8 mb-12 text-4xl lg:text-6xl  text-black font-bold font-heading  lg:text-left text-center ">
                Pen down your ideas{" "}
                <span className="text-purple-800">By creating a post</span>
              </h2>
              <Link
                className="inline-block px-12 py-3 text-lg text-white font-bold bg-pink-500 hover:bg-pink-700 hover:text-gray-300 rounded-lg transition duration-200"
                to="/posts"
              >
                Explore the feed
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 px-4"
            >
              <img className="w-full mb-0 mx-auto lg:mx-0 lg:w-full sm:w-2/3" src={poster} alt={poster} />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
