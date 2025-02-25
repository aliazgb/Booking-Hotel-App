import { useState, useEffect } from "react";
import axios from "axios";

const BASE_GEOCODING_URL = "https://us1.api-bdc.net/data/reverse-geocode-client";

export function useGeocode(lat, lng) {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [geoCodingError, setGeoCodingError] = useState(null);
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        setCityName(data.city);
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
        if (!data.countryCode) {
          throw new Error("✖ this location is not a city ! ✖");
        }
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  return { cityName, country, countryCode, isLoadingGeoCoding, geoCodingError };
}
