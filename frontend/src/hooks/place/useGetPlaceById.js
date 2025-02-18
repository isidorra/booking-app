import { useEffect, useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";

const useGetPlaceById = (id) => {
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const getPlaceById = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/places/${id}`);
            if (response.status === 200) {
                setPlace(response.data);
            }
        } catch (error) {
            console.error("Error fetching place:", error);
            const errorMessage = error.response?.data || "Something went wrong";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    

    getPlaceById();
  }, [id])

  return {loading, place};
}

export default useGetPlaceById