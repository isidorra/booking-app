import { useEffect, useState } from "react"
import axios from "axios";
import {useAuthContext} from "../../context/AuthContext";

const useGetReservedDaysByPlace = (placeId) => {
  const [loading, setLoading] = useState(false);
  const [reservedDays, setReservedDays] = useState([]);
  const {authUser} = useAuthContext();

  useEffect(() => {
    const getReservedDaysByPlace = async() => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/reservations/reserved-dates/${placeId}`, {
                headers: {
                    Authorization: `Bearer ${authUser.token}`
                }
            });

            if(response.status === 200) {
                setReservedDays(response.data);
            }
        } catch (error) {
            const errorMessage = error.response?.data || "Something went wrong";
            console.log(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    getReservedDaysByPlace();
  }, [placeId, authUser]);

  return {loading, reservedDays};
}

export default useGetReservedDaysByPlace