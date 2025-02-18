import { useState } from "react";
import CountryCitySelector from "../../components/place_form/CountryCitySelector";
import { IoIosSearch } from "react-icons/io";
import useSearch from "../../hooks/search/useSearch";
import { LoaderIcon } from "react-hot-toast";
import PlaceCard from "../../components/place/PlaceCard";

const Search = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [guestNumber, setGuestNumber] = useState(1);
  const [pricePerNight, setPricePerNight] = useState(50);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const {loading, search, filteredPlaces} = useSearch();

  const handleSubmit = async(ev) => {
    ev.preventDefault();
    await search(city, country, guestNumber, pricePerNight, checkInDate, checkOutDate);
  }

  return (
    <div className="max-container">
      <form onSubmit={handleSubmit} className="bg-primary px-5 py-5 sm:py-10 rounded-2xl w-full mx-auto">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 justify-center">
          <span className="text-accent-dark-purple"><IoIosSearch /></span> Looking for a place to stay?
          </h1>
          <p>Use our search filters to find the perfect match.</p>
        </div>

        <div className="bg-accent-purple h-1 w-10 mx-auto mt-5 rounded-lg"></div>

        <div className="flex flex-col md:flex-row items-end mt-5 gap-2 justify-center">
          <CountryCitySelector setCountry={setCountry} setCity={setCity} />

          <div className="w-full">
            <label className="uppercase font-medium block">Guest Number</label>
            <input
              value={guestNumber}
              onChange={(ev) => setGuestNumber(parseInt(ev.target.value) || 1)}
              type="number"
              min={1}
              max={20}
              className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
            />
          </div>
          <div className="w-full">
            <label className="uppercase font-medium block">
              Price per night ($)
            </label>
            <input
              value={pricePerNight}
              onChange={(ev) => setPricePerNight(parseFloat(ev.target.value) || 1)}
              type="number"
              min={1}
              max={10000}
              className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
            />
          </div>

          <div className="w-full">
            <label className="uppercase font-medium block">Check in</label>
            <input
              value={checkInDate ? checkInDate.toISOString().split("T")[0] : ""}
              onChange={(ev) => setCheckInDate(new Date(ev.target.value))} 
              type="date"
              className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
            />
          </div>

          <div className="w-full">
            <label className="uppercase font-medium block">Check out</label>
            <input
              value={checkOutDate ? checkOutDate.toISOString().split("T")[0] : ""}
              onChange={(ev) => setCheckOutDate(new Date(ev.target.value))}
              type="date"
              className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
            />
          </div>
        </div>
        <button disabled={loading} className="bg-accent-purple text-primary py-2 px-20 mx-auto flex items-center gap-1 justify-center text-lg rounded-lg hover:bg-accent-green duration-200"> <IoIosSearch /> Search</button>
      </form>

      <div className="mt-2 sm:mt-10">
        {loading && <LoaderIcon />}
        {!loading && (filteredPlaces.length === 0) && (
          <p className="mt-2 opacity-90 text-center">No results.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-5">
          {!loading &&
            filteredPlaces &&
            filteredPlaces.map((place) => <PlaceCard place={place} key={place.id} />)}
        </div>
      </div>

    </div>
  );
};

export default Search;
