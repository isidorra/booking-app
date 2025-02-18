import { useEffect, useState } from "react"
import {useAuthContext} from "../../context/AuthContext";
import toast from "react-hot-toast";
import {useReservationsContext} from "../../context/ReservationsContext";
import axios from "axios";

const useGetReservationsByRole = () => {
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuthContext(); 
  const {reservations, setReservations, currentPage} = useReservationsContext();

  useEffect(() => {
    const getReservationsByRole = async() => {
        setLoading(true);
        try {
            let url = ``;
            if(authUser && authUser.role === "Host")
                url = `/api/reservations/host?page=${currentPage}&size=20`;
            else 
                url = `/api/reservations/guest?page=${currentPage}&size=20`;
            
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${authUser.token}`
                }
            });

            if(response.status === 200) {
                setReservations(response.data);
            }
        } catch(error) {
            const errorMessage = error.response?.data || "Something went wrong";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    getReservationsByRole();
  }, [authUser, setReservations, currentPage]);

  return {loading, reservations};
}

export default useGetReservationsByRole