import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { FaCircleUser } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import Logout from "../auth/Logout";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoTicket } from "react-icons/io5";

const UserDropdown = () => {
  const { authUser } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="sm:py-2 p-1 sm:px-4 w-24 sm:w-48 rounded-lg border border-secondary/10">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <FaCircleUser />
          <p>
            {authUser.firstName.charAt(0)}
            {authUser.lastName.charAt(0)}
          </p>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="text-xs">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {isOpen && (
        <div className="text-sm sm:text-base">
          {authUser && authUser.role === "Host" && (
            <>
              <Link
                to={"/host-places"}
                className="flex items-start sm:items-center gap-1 hover:bg-secondary/5 sm:py-2 sm:px-5 hover:rounded-lg duration-200"
              >
                <FaHome className="hidden sm:block"/> Places
              </Link>
              <Link
                to={"/reservations"}
                className="flex items-start sm:items-center gap-1 hover:bg-secondary/5 sm:py-2 sm:px-5 hover:rounded-lg duration-200"
              >
                <IoTicket className="hidden sm:block"/> Reservations
              </Link>
            </>
          )}

          {authUser && authUser.role === "Guest" && (
            <>
            <Link
                to={"/reservations"}
                className="flex items-start sm:items-center gap-1 hover:bg-secondary/5 sm:py-2 sm:px-5 hover:rounded-lg duration-200"
              >
                <IoTicket className="hidden sm:block"/> Reservations
              </Link>
            </>
          )}
          <Logout />
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
