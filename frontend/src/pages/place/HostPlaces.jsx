import { LoaderIcon } from "react-hot-toast";
import useGetPlacesByHost from "../../hooks/place/useGetPlacesByHost";
import { Link } from "react-router-dom";
import PlaceCard from "../../components/place/PlaceCard";

const HostPlaces = () => {
  const { loading, places } = useGetPlacesByHost();
  return (
    <div className="max-container">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Places</h1>

        <Link to={"/new-place"} className="bg-accent-purple py-2 px-5 rounded-lg text-primary hover:bg-accent-green duration-200">
          + Add Place
        </Link>
      </div>
      <div>
        {loading && <LoaderIcon />}
        {!loading && (!places || places.length === 0) && (
          <p className="mt-2 opacity-90">No places.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
          {!loading &&
            places &&
            places.map((place) => 
              <PlaceCard place={place} key={place.id}/>
          )}
        </div>

      </div>
    </div>
  );
};

export default HostPlaces;
