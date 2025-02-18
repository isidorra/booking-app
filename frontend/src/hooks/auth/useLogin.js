import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (email, password) => {
    if (!validateInputs(email, password)) return;

    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setAuthUser(response.data);
        return true;
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {loading, login};
};

const validateInputs = (email, password) => {
  if (!email || !password) {
    toast.error("All fields are required.");
    return false;
  }

  return true;
};

export default useLogin;
