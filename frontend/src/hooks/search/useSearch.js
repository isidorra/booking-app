import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";

const useSearch = () => {
  const [loading, setLoading] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const search = async (city, country, guestNumber, pricePerNight, checkInDate, checkOutDate) => {
    if (!validateInputs(city, country, guestNumber, pricePerNight, checkInDate, checkOutDate)) return;
  
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (country) params.append("country", country);
      if (city) params.append("city", city);
      if (guestNumber) params.append("guestNumber", guestNumber);
      if (pricePerNight) params.append("pricePerNight", pricePerNight);
      if (checkInDate) params.append("checkIn", checkInDate.toISOString());
      if (checkOutDate) params.append("checkOut", checkOutDate.toISOString());
  
      const response = await axios.get(`/api/places/search?${params.toString()}`);
  
      if (response.status === 200) {
        setFilteredPlaces(response.data);
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return {loading, search, filteredPlaces};
}

const validateInputs = (city, country, guestNumber, pricePerNight, checkInDate, checkOutDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part for accurate comparison

    if (!city && !country && !guestNumber && !pricePerNight && !checkInDate && !checkOutDate) {
        toast.error("Please provide at least one filter.");
        return false;
    }
    
    if ((checkInDate && !checkOutDate) || (!checkInDate && checkOutDate)) {
        toast.error("Please provide both dates if you want to search by dates.");
        return false;
    }

    if (guestNumber && guestNumber < 1) {
        toast.error("Please provide a valid guest number.");
        return false;
    }

    if (pricePerNight && pricePerNight < 1) {
        toast.error("Please provide a valid price per night.");
        return false;
    }

    if (checkInDate) {
        const checkIn = new Date(checkInDate);
        if (checkIn < today) {
            toast.error("Check-in date cannot be in the past.");
            return false;
        }
    }

    if (checkOutDate) {
        const checkOut = new Date(checkOutDate);
        if (checkOut < today) {
            toast.error("Check-out date cannot be in the past.");
            return false;
        }
    }

    if (checkInDate && checkOutDate) {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkOut <= checkIn) {
            toast.error("Check-out date must be after the check-in date.");
            return false;
        }
    }

    return true;
};

export default useSearch