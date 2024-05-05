import TrendingArticleCard from "./TrendingArticleCard";


const TrendingArticle = () => {
    return (
        <div className="py-5 max-w-7xl mx-auto px-10">
           <p className="text-center text-2xl py-3 ">Article of the week</p>

           {/* Article Card */}
           <div className="flex flex-col lg:flex-row gap-3 py-5">
          <TrendingArticleCard />
          <TrendingArticleCard />
          </div>
        </div>
    );
}

export default TrendingArticle;