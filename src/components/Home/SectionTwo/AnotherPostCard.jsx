import { Link } from 'react-router-dom';

const AnotherPostCard = () => {

  return (
    <div className="flex items-center content-center gap-5 lg:gap-2 justify-start my-2 group w-full">
   
     <div className="relative w-1/3 h-20 overflow-hidden rounded-lg">
        <img
          className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
          src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60"
          alt="another post image"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Link className="hover:text-red-500 transition-all duration-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Link>

        <p className="text-xs text-gray-800 font-inter flex items-center gap-3">
          Nov 10 2022
          <span className="w-2 h-2 rounded-full bg-indigo-300 inline-block"></span>{" "}
          <span> 5 comment</span>
        </p>
      </div>
    </div>
  );
};

export default AnotherPostCard;
