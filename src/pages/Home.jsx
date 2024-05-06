import React from "react";
import Footer from "../components/Footer/Footer";
import FeaturedAuthor from "../components/Home/FeaturedAuthor/FeaturedAuthor";
import HeroSection from "../components/Home/HeroSection";
import SectionTwo from "../components/Home/SectionTwo/SectionTwo";
import Topics from "../components/Home/Topics/Topics";
import TrendingArticle from "../components/Home/TrendingArticle/TrendingArticle";
import SmoothScroll from "../hooks/smoothScroll";

const Home = () => {
  return (
    <div className="bg-sky-200 font-prompt">
      <SmoothScroll>
        <HeroSection />
        <SectionTwo />
        <Topics />
        <TrendingArticle />
        <FeaturedAuthor />
      </SmoothScroll>
      <Footer />
    </div>
  );
};

export default Home;
