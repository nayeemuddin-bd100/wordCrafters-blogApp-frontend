import React from "react";
import HeroSection from "../components/Home/HeroSection";
import SectionTwo from "../components/Home/SectionTwo/SectionTwo";
import SmoothScroll from "../hooks/smoothScroll";

const Home = () => {
  return (
    <div className="bg-sky-200 font-prompt">
    <SmoothScroll >
      <HeroSection />
      <SectionTwo />
      
    </SmoothScroll>
    </div>
  );
};

export default Home;
