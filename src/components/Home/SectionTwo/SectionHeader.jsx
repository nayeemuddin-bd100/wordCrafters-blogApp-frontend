import { ExternalLinkIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
const SectionHeader = () => {
  return (
    <div className="md:flex md:justify-between py-10">
      <h4 className="text-3xl text-black">Recent Post</h4>
      <Link to="/posts" className="text-indigo-700 text-lg">
        <span> View Post </span>

        <ExternalLinkIcon className="w-4 h-4 inline-block" />
      </Link>
    </div>
  );
};

export default SectionHeader;
