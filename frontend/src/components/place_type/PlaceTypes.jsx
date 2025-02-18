import PlaceType from "./PlaceType";
import { placeTypes } from "../../data/placeTypes";
import { usePlacesContext } from "../../context/PlacesContext";

const PlaceTypes = () => {
  const { placeType: type, setPlaceType } = usePlacesContext();

  return (
    <div className="w-fit grid grid-cols-5 sm:grid-cols-10 gap-1 sm:gap-2 mx-auto mt-5">
      {placeTypes.map((placeType) => (
        <button
          onClick={() => setPlaceType(type === placeType.id ? -1 : placeType.id)}
          key={placeType.id}
          className={`${type === placeType.id ? 'bg-secondary/10' : 'bg-transparent'} opacity-80 hover:opacity-100 duration-200 py-2 rounded-lg`}
        >
          <PlaceType placeType={placeType} />
        </button>
      ))}
    </div>
  );
};

export default PlaceTypes;
