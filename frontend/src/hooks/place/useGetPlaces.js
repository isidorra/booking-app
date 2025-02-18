import { useEffect, useState } from "react";
import { usePlacesContext } from "../../context/PlacesContext";
import axios from "axios";
import toast from "react-hot-toast";

const useGetPlaces = () => {
  const [loading, setLoading] = useState(false);
  const { places, setPlaces, placeType, currentPage } = usePlacesContext();


  useEffect(() => {
    const getPlaces = async () => {
      setLoading(true);

      try {
        let url = "";
        if(placeType != -1)
          url = `/api/places/type/${placeType}?page=${currentPage}&size=20`;
        else 
          url = `/api/places?page=${currentPage}&size=20`;

        const response = await axios.get(url);
        if (response.status === 200) {
          setPlaces(response.data);
        }
      } catch (error) {
        const errorMessage = error.response?.data || "Something went wrong";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    getPlaces();
  }, [setPlaces, placeType, currentPage]);

  return { loading, places };
};

export default useGetPlaces;
