import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";


// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-2 mx-2 rounded-md ${
            i === currentPage
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 hover:bg-gray-300'
          } transition-colors duration-300`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
    return (
    <div className="flex justify-center items-center my-8">
      <button
        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>
      {renderPageNumbers()}
      <button
        className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};


export default Pagination;