import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const PlaceCard = ({place}) => {
    const imageUrl = `http://localhost:5065/uploads/${place.image}`;
  return (
    <Link to={`/place/${place.id}`} className="bg-primary drop-shadow-md rounded-xl hover:drop-shadow-xl duration-100">
        <img src={imageUrl} alt={place.name} className="rounded-xl h-56 w-full object-cover mx-auto"/>
        <div className="p-4">
            <h2 className="font-semibold">{place.name}</h2>
            <div className="flex items-center gap-1">
            <IoLocationSharp /> 
            <p>{place.city}, {place.country}</p>
            </div>
            <p className="opacity-90">${place.pricePerNight}</p>
        </div>
        
    </Link>
  )
}

export default PlaceCard