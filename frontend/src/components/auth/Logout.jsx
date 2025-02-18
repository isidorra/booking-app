import { useAuthContext } from "../../context/AuthContext";
import { TbLogout2 } from "react-icons/tb";

const Logout = () => {
    const {setAuthUser} = useAuthContext();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setAuthUser(null);
    }  
    return (
    <button onClick={handleLogout} className="flex items-start sm:items-center gap-1 hover:bg-secondary/5 sm:py-2 sm:px-5 hover:rounded-lg duration-200 w-full">
        <TbLogout2 className="hidden sm:block"/>
        <span>Logout</span>
    </button>
  )
}

export default Logout