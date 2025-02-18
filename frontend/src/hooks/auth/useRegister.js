import {useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {useAuthContext} from "../../context/AuthContext";

const useRegister = () => {
  const [loading, setLoading] = useState(false); 
  const {setAuthUser} = useAuthContext();

  const register = async(firstName, lastName, email, password, role) => {
    if(!validateInputs(firstName, lastName, email, password, role)) return;

    setLoading(true);
    try {
        
        const response = await axios.post("/api/auth/register", {firstName, lastName, email, password, role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()});

        if(response.status === 200) {
            localStorage.setItem("user", JSON.stringify(response.data));
            setAuthUser(response.data);
            return true;
        }


    } catch(error) {
        const errorMessage = error.response?.data || "Something went wrong";
        toast.error(errorMessage); 
    } finally {
        setLoading(false);
    }
  }

  return {loading, register};
}

const validateInputs = (firstName, lastName, email, password, role) => {
    if(!firstName || !lastName || !email || !password) {
        toast.error("All fields are required.");
        return false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(!emailRegex.test(email)) {
        toast.error("Invalid email format.");
        return false;
    }

    if(password.length < 7) {
        toast.error("Password must be at least 7 characters long.");
        return false;
    }

    if(role !== "guest" && role !== "host")
        return false;

    return true;
}

export default useRegister