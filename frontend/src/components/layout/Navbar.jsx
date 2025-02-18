import { useAuthContext } from "../../context/AuthContext";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="max-container flex items-start justify-between">
      <Logo />

      <div className="flex items-center gap-2 sm:gap-5 text-sm sm:text-base">
        <Link to={"/"} className="hover:opacity-80 duration-200">
          Places
        </Link>
        <div className="bg-accent-purple rounded-full p-[3px]"></div>
        <Link to={"/search"} className="hover:opacity-80 duration-200">
          Search
        </Link>
      </div>

      {authUser && (
          <UserDropdown />
      )}

      {!authUser && (
        <div className="flex items-center gap-1 sm:gap-3 text-sm sm:base">
          <Link
            to={"/login"}
            className="hover:bg-secondary/5 py-2 px-2 sm:px-5 hover:rounded-lg duration-200"
          >
            Log in
          </Link>
          <Link
            to={"/choose-registration-type"}
            className="bg-accent-purple py-2 px-5 sm:px-5 rounded-lg text-primary hover:bg-accent-green duration-200"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
