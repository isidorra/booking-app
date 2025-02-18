import { useEffect, useState } from "react"
import {useAuthContext} from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
const useGetPlacesByHost = () => {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState(null);
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getPlacesByHost = async() => {
        setLoading(true);
        try {
            const response = await axios.get("/api/places/host", {
                headers: {
                    Authorization: `Bearer ${authUser.token}`
                }
            });
    
            if(response.status === 200) {
                setPlaces(response.data);
            }
        } catch(error) {
            const errorMessage = error.response?.data || "Something went wrong";
            toast.error(errorMessage); 
        } finally {
            setLoading(false);
        }
    }

    getPlacesByHost();
  }, [authUser])

  return {loading, places};
}

export default useGetPlacesByHost