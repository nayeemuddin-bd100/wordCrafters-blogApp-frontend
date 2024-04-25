import SectionColumn from './SectionColumn';
import SectionHeader from "./SectionHeader";

const SectionTwo = () => {
    return (
        <div className="bg-sky-100 rounded-t-3xl pb-20">
        <div className="max-w-7xl container mx-auto px-10 ">
           <SectionHeader />
           <SectionColumn />
        </div>
        </div>
    );
}

export default SectionTwo;