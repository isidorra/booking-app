import { useState } from "react";
import { Country, City } from "country-state-city";

const CountryCitySelector = ({ setCountry, setCity, setLat, setLng }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countries = Country.getAllCountries();
  const cities = selectedCountry ? City.getCitiesOfCountry(selectedCountry) : [];

  return (
    <>
      {/* Country Selection */}
      <div className="w-full">
        <label className="uppercase font-medium block">Country</label>
        <select
          className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
          value={selectedCountry}
          onChange={(e) => {
            const countryCode = e.target.value;
            const country = countries.find((c) => c.isoCode === countryCode);

            if (country) {
              setSelectedCountry(countryCode);
              setCountry(country.name); // Store full country name
              setSelectedCity("");
              setCity(""); // Reset city in parent state
              setLat(0); // Reset coordinates
              setLng(0);
            }
          }}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {/* City Selection */}
      {selectedCountry && (
        <div>
          <label className="uppercase font-medium block">City</label>
          <select
            className="border border-secondary p-2 rounded-lg w-full focus:outline-2 focus:outline-accent-purple focus:outline-offset-2 mb-5"
            value={selectedCity}
            onChange={(e) => {
              const cityName = e.target.value;
              const city = cities.find((c) => c.name === cityName);
              setSelectedCity(cityName);
              setCity(cityName); // Update parent state
              if (city) {
                setLat(city.latitude);
                setLng(city.longitude);
              }
            }}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default CountryCitySelector;
