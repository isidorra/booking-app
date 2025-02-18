import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
const Pagination = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="flex items-center gap-5 justify-center mt-10">
      <button
        onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}
        className="flex items-center gap-1"
      >
        <IoChevronBackOutline />
        Previous
      </button>
      <p>{currentPage}</p>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className="flex items-center gap-1"
      >
        Next
        <IoChevronForwardOutline />
      </button>
    </div>
  );
};

export default Pagination;
