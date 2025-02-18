import PlaceTypes from "../../components/place_type/PlaceTypes";
import useGetPlaces from "../../hooks/place/useGetPlaces";
import { LoaderIcon } from "react-hot-toast";
import PlaceCard from "../../components/place/PlaceCard";
import Pagination from "../../components/layout/Pagination";
import { usePlacesContext } from "../../context/PlacesContext";

const Places = () => {
  const { loading, places } = useGetPlaces();
  const {currentPage, setCurrentPage} = usePlacesContext();

  return (
    <div className="max-container">
      <h1 className="text-xl sm:text-2xl font-semibold text-center">Places</h1>
      <div className="bg-accent-purple h-1 w-10 mx-auto mt-2 sm:mt-5 rounded-lg"></div>
      <PlaceTypes />

      <div className="mt-2 sm:mt-10">
        {loading && <LoaderIcon />}
        {!loading && (!places || places.length === 0) && (
          <p className="mt-2 opacity-90 text-center">No places.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-5">
          {!loading &&
            places &&
            places.map((place) => <PlaceCard place={place} key={place.id} />)}
        </div>
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
};

export default Places;
