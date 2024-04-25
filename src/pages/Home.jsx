import React from "react";
import HeroSection from "../components/Home/HeroSection";
import SectionTwo from "../components/Home/SectionTwo/SectionTwo";
import Topics from "../components/Home/Topics/Topics";
import SmoothScroll from "../hooks/smoothScroll";

const Home = () => {
  return (
    <div className="bg-sky-200 font-prompt">
    <SmoothScroll >
      <HeroSection />
      <SectionTwo />
      <Topics/>
      
    </SmoothScroll>
    </div>
  );
};

export default Home;
