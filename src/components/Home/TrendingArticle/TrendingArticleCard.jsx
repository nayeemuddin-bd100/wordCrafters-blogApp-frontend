/* eslint-disable react/prop-types */

const TrendingArticleCard = () => {
    return (
        <div className={`flex items-center justify-start gap-3 bg-sky-50 rounded-lg` }>
            <img className=" w-40 h-44 object-cover rounded-l-lg " src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60" alt="" />

            <div className="flex flex-col justify-start gap-3">
                <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, architecto!</p>
                <p className="font-inter text-sm text-indigo-600 ">30 November 2022</p>
            </div>
           </div>
    );
}

export default TrendingArticleCard;