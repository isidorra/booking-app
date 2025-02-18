import { useParams } from "react-router-dom";
import useGetPlaceById from "../../hooks/place/useGetPlaceById";
import { LoaderIcon } from "react-hot-toast";
import { IoLocationSharp } from "react-icons/io5";
import { FaBed } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";
import PlaceFeature from "../../components/place/PlaceFeature";
import PlaceType from "../../components/place_type/PlaceType";
import { placeTypes } from "../../data/placeTypes";
import CreateReservationCard from "../../components/reservation/CreateReservationCard";
import { useAuthContext } from "../../context/AuthContext";
import { format } from 'date-fns';
import PlaceLocation from "../../components/place/PlaceLocation";

const Place = () => {
  const { id } = useParams();
  const { loading, place } = useGetPlaceById(id);
  const { authUser } = useAuthContext();

  return (
    <div className="max-container">
      {loading && <LoaderIcon />}
      {!loading && !place && (
        <p className="mt-2 opacity-90">Place not found.</p>
      )}
      {!loading && place && (
        <div>
          <h1 className="font-semibold text-2xl">{place.name}</h1>
          <div className="flex items-center gap-1 mt-1 opacity-90 mb-5">
            <IoLocationSharp />
            <p>
              {place.city}, {place.country}
            </p>
          </div>
          <img
            src={`http://localhost:5065/uploads/${place.image}`}
            className="w-full h-[600px] object-cover rounded-2xl"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-24 mt-5">
            <div className="py-5">
              <div className="flex items-start gap-5">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <PlaceType
                    placeType={placeTypes.find((pt) => pt.id === place.type)}
                  />
                </div>

                <div>
                    <p className="text-sm opacity-80">Hosted by {place.host.firstName} {place.host.lastName} | Since {format(new Date(place.createdAt), 'MMMM dd, yyyy')}</p>
                    <p className="mt-1 font-medium">{place.description}</p>
                </div>
              </div>
              <div className="border-t border-secondary/10 py-5 mt-5">
                <PlaceFeature
                  icon={<FaUsers />}
                  name={"guest"}
                  number={place.maxGuestNumber}
                />
                <PlaceFeature
                  icon={<FaBed />}
                  name={"bedroom"}
                  number={place.bedroomNumber}
                />
                <PlaceFeature
                  icon={<FaBath />}
                  name={"bathroom"}
                  number={place.bathroomNumber}
                />
                <PlaceFeature
                  icon={<FaWifi />}
                  name={"Wi-Fi"}
                  boolean={place.hasWifi}
                />
                <PlaceFeature
                  icon={<MdOutlinePets />}
                  name={"Pet friendly"}
                  boolean={place.isPetFriendly}
                />
              </div>

              <PlaceLocation lat={place.lat} lng={place.lng}/>
            </div>

            <div>
            {authUser ? (
              authUser.role === "Guest" && (
                <CreateReservationCard
                  placeId={place.id}
                  pricePerNight={place.pricePerNight}
                  maxGuestNumber={place.maxGuestNumber}
                />
              )
            ) : (
              <CreateReservationCard
                placeId={place.id}
                pricePerNight={place.pricePerNight}
                maxGuestNumber={place.maxGuestNumber}
              />
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Place;
