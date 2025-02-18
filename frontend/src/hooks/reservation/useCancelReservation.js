import { useState } from "react"
import {useAuthContext} from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useReservationsContext } from "../../context/ReservationsContext";

const useCancelReservation = () => {
  const [loading, setLoading] = useState(false);
  const {authUser} = useAuthContext();
  const {setReservations} = useReservationsContext();

  const deleteReservation = async(reservationId) => {
    setLoading(true);

    try {
        const response = await axios.delete(`/api/reservations/${reservationId}`, {
            headers: {
                Authorization: `Bearer ${authUser.token}`
            }
        });

        if(response.status === 200) {
            setReservations((prevReservations) =>
                prevReservations.filter((reservation) => reservation.id !== reservationId)
              );
              toast.success("Reservation canceled successfully!");
        }
    } catch(error) {
        const errorMessage = error.response?.data || "Something went wrong";
        toast.error(errorMessage);
    } finally {
        setLoading(false);
    }
  }

  return {loading, deleteReservation};
}

export default useCancelReservation