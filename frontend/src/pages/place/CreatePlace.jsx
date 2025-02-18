import { useState } from "react";
import CountryCitySelector from "../../components/place_form/CountryCitySelector";
import { placeTypes } from "../../data/placeTypes";
import NumericField from "../../components/place_form/NumericField";
import BooleanField from "../../components/place_form/BooleanField";
import { useNavigate } from "react-router-dom";
import useCreatePlace from "../../hooks/place/useCreatePlace";
import { LoaderIcon } from "react-hot-toast";
const CreatePlace = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [placeType, setPlaceType] = useState(0);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [maxGuestNumber, setMaxGuestNumber] = useState(1);
  const [bedroomNumber, setBedroomNumber] = useState(0);
  const [bathroomNumber, setBathroomNumber] = useState(0);
  const [isPetFriendly, setIsPetFriendly] = useState(false);
  const [hasWifi, setHasWifi] = useState(false);
  const [pricePerNight, setPricePerNight] = useState(1);
  const [image, setImage] = useState(null);

  const {loading, createPlace} = useCreatePlace();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async(ev) => {
    ev.preventDefault();
    const success = await createPlace(name, description,placeType,country,city,address,lat,lng,maxGuestNumber,bedroomNumber,bathroomNumber,isPetFriendly,hasWifi,pricePerNight,image);
    if(success)
      navigate("/host-places");
  }

  return (
    <div className="max-w-[700px] w-full mx-auto p-5">
      <h1 className="text-2xl font-semibold text-center">New Place</h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-secondary/20 pb-1 mb-5">
            Basic Info
          </h2>

          <label className="uppercase font-medium block">Name</label>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            type="text"
            placeholder="Give your place a name"
            className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
          />

          <label className="uppercase font-medium block">Description</label>
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="Describe what makes your place special"
            className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
          ></textarea>

          <label className="uppercase font-medium block">Type</label>
          <div className="grid grid-cols-5 gap-2 sm:gap-5 mt-2">
            {placeTypes.map((type) => (
              <button
                type="button"
                onClick={() => setPlaceType(type.id)}
                key={type.id}
                className={`${
                  placeType === type.id ? "bg-secondary/20" : "bg-transparent"
                } flex flex-col items-center justify-center text-sm border border-secondary/20 p-3 rounded-lg`}
              >
                {type.icon}
                {type.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-secondary/20 pb-1 mb-5">
            Location
          </h2>

          <CountryCitySelector
            setCountry={setCountry}
            setCity={setCity}
            setLat={setLat}
            setLng={setLng}
          />

          <label className="uppercase font-medium block">Address</label>
          <input
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            type="text"
            placeholder="Street, number, floor, apartment"
            className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
          />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-secondary/20 pb-1 mb-5">
            Capacity and Features
          </h2>

          <div className="flex items-center justify-between my-3">
            <label className="uppercase font-medium block">
              How many guests can stay?
            </label>
            <NumericField
              value={maxGuestNumber}
              setValue={setMaxGuestNumber}
              minValue={1}
              maxValue={20}
            />
          </div>

          <div className="flex items-center justify-between my-3">
            <label className="uppercase font-medium block">
              How many bedrooms?
            </label>
            <NumericField
              value={bedroomNumber}
              setValue={setBedroomNumber}
              minValue={0}
              maxValue={100}
            />
          </div>

          <div className="flex items-center justify-between my-3">
            <label className="uppercase font-medium block">
              How many bathrooms?
            </label>
            <NumericField
              value={bathroomNumber}
              setValue={setBathroomNumber}
              minValue={0}
              maxValue={100}
            />
          </div>

          <div className="flex items-center justify-between my-3">
            <label className="uppercase font-medium block">Pet Friendly?</label>
            <BooleanField value={isPetFriendly} setValue={setIsPetFriendly} />
          </div>

          <div className="flex items-center justify-between my-3">
            <label className="uppercase font-medium block">Wi-Fi?</label>
            <BooleanField value={hasWifi} setValue={setHasWifi} />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-secondary/20 pb-1 mb-5">
            Pricing
          </h2>

          <label className="uppercase font-medium block">Price per night ($)</label>
          <input
            value={pricePerNight}
            onChange={(ev) => setPricePerNight(ev.target.value)}
            min={1}
            max={10000}
            type="number"
            className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
          />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold border-b border-secondary/20 pb-1 mb-5">
            Media
          </h2>

          <label className="uppercase font-medium block">Upload Image</label>
          <input
            onChange={handleFileChange}
            required
            type="file"
            className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
          />
        </div>

        <button
        disabled={loading}
          type="submit"
          className="w-full rounded-lg text-lg uppercase bg-accent-purple text-primary py-2"
        >
          {loading ? <LoaderIcon/> : <span>Submit</span>}
        </button>
      </form>
    </div>
  );
};

export default CreatePlace;
