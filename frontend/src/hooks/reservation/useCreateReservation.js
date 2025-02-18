import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const useCreateReservation = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const createReservation = async (
    placeId,
    startDate,
    endDate,
    guestNumber,
    maxGuestNumber
  ) => {
    if (
      !validateInputs(placeId, startDate, endDate, guestNumber, maxGuestNumber)
    )
      return;
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/reservations",
        { placeId, checkInDate: startDate, checkOutDate: endDate, guestNumber },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );

      if(response.status === 201) {
        toast.success("You have successfully made a reservation!");
        return true;
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {loading, createReservation};
};

const validateInputs = (
  placeId,
  startDate,
  endDate,
  guestNumber,
  maxGuestNumber
) => {
  if (!placeId || !startDate || !endDate || !guestNumber) {
    toast.error("All fields are required.");
    return false;
  }

  if (guestNumber > maxGuestNumber) {
    toast.error("You must enter the valid number of guests.");
    return false;
  }

  return true;
};

export default useCreateReservation;
