import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const useCreatePlace = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();

  const createPlace = async (
    name,
    description,
    placeType,
    country,
    city,
    address,
    lat,
    lng,
    maxGuestNumber,
    bedroomNumber,
    bathroomNumber,
    isPetFriendly,
    hasWifi,
    pricePerNight,
    image
  ) => {
    if (
      !validateInputs(
        name,
        description,
        placeType,
        country,
        city,
        address,
        lat,
        lng,
        maxGuestNumber,
        bedroomNumber,
        bathroomNumber,
        isPetFriendly,
        hasWifi,
        pricePerNight,
        image
      )
    )
      return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Description", description);
      formData.append("Type", placeType);
      formData.append("Country", country);
      formData.append("City", city);
      formData.append("Address", address);
      formData.append("Lat", lat);
      formData.append("Lng", lng);
      formData.append("MaxGuestNumber", maxGuestNumber);
      formData.append("BedroomNumber", bedroomNumber);
      formData.append("BathroomNumber", bathroomNumber);
      formData.append("PricePerNight", pricePerNight);
      formData.append("IsPetFriendly", isPetFriendly);
      formData.append("HasWifi", hasWifi);
      formData.append("Image", image); // Image file

      const response = await axios.post("/api/places", formData, {
        headers: {
          Authorization: `Bearer ${authUser.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if(response.status === 201){
        toast.success("Place created successfully!");
        return true;
      }
       
    } catch (error) {
      const errorMessage = error.response?.data || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createPlace, loading };
};

export default useCreatePlace;

// Validation function
const validateInputs = (
  name,
  description,
  placeType,
  country,
  city,
  address,
  lat,
  lng,
  maxGuestNumber,
  bedroomNumber,
  bathroomNumber,
  isPetFriendly,
  hasWifi,
  pricePerNight,
  image
) => {
  if (
    !name ||
    !description ||
    !placeType ||
    !country ||
    !city ||
    !address ||
    lat === null ||
    lng === null ||
    isPetFriendly === null ||
    hasWifi === null ||
    !maxGuestNumber ||
    !bedroomNumber ||
    !bathroomNumber ||
    !pricePerNight ||
    !image
  ) {
    toast.error("All fields are required.");
    return false;
  }

  return true;
};
