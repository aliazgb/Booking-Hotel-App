import React, { useState } from "react";

function useUserLocation() {
  const [isloading, setIsloading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    navigator.geolocation.getCurrentPosition(
      (suc) => {
        setIsloading(true);
        setPosition({
          lng: suc.coords.longitude,
          lat: suc.coords.latitude,
        });
        setIsloading(false);
      },
      (err) => {
        setError(err.message)
        setIsloading(true);
      }
    );
  }
  return {isloading ,position ,error , getPosition}
}

export default useUserLocation;
