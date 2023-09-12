import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ address }: { address: string }) {
  const mapRef = useRef(null);
  const [googleMaps, setGoogleMaps] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      setGoogleMaps(window.google); // Устанавливаем объект google
    });
  }, []);

  useEffect(() => {
    if (googleMaps) {
      const geocoder = new googleMaps.maps.Geocoder(); // Используем googleMaps
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const map = new googleMaps.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 8,
          });
          const marker = new googleMaps.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(
            `Geocode was not successful for the following reason: ${status}`
          );
        }
      });
    }
  }, [address, googleMaps]);

  return <div style={{ height: "400px" }} ref={mapRef} />;
}

export default Map;
