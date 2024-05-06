import { motion } from "framer-motion";
import AuthorCard from "../components/Author/AuthorCard";
import Footer from "../components/Footer/Footer";
import SmoothScroll from "../hooks/smoothScroll";

const Author = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SmoothScroll>
        <div className="max-w-7xl mx-auto  px-5 ">
          {/* Author card */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-40"
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
            <motion.div
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0.8 },
              }}
              transition={{ duration: 0.5 }}
            >
              <AuthorCard />
            </motion.div>
            <motion.div
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0.8 },
              }}
              transition={{ duration: 0.5 }}
            >
              <AuthorCard />
            </motion.div>{" "}
            <motion.div
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0.8 },
              }}
              transition={{ duration: 0.5 }}
            >
              <AuthorCard />
            </motion.div>{" "}
            <motion.div
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0.8 },
              }}
              transition={{ duration: 0.5 }}
            >
              <AuthorCard />
            </motion.div>{" "}
            <motion.div
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0.8 },
              }}
              transition={{ duration: 0.5 }}
            >
              <AuthorCard />
            </motion.div>{" "}
            <motion.div
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0.8 },
              }}
              transition={{ duration: 0.5 }}
            >
              <AuthorCard />
            </motion.div>{" "}
            <motion.div
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0.8 },
              }}
              transition={{ duration: 0.5 }}
            >
              <AuthorCard />
            </motion.div>
            {/* Repeat for additional AuthorCard components */}
          </motion.div>

          {/* Become an author */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-32 md:px-15 lg:px-32 ">
            <p className="text-center md:text-left text-4xl font-bold md:w-2/3">
              Become <span className="text-indigo-500 italic">An Author</span>{" "}
              And Share Your Great Stories.
            </p>
            <div className="md:w-1/3">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 duration-700 text-xl ">
                Become An Author
              </button>
            </div>
          </div>
        </div>
      </SmoothScroll>

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default Author;
