"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentLocation,
  setMapMarker,
  isMapLoaded,
} from "@/reduxStore/slices/mapSlice";
import { GoogleMapContext } from "@/contexts/GoogleMapContext";

const GoogleMapLoader = ({ Google_Map_Key }: any) => {
  const { googleMapRef, mapInstanceRef } = useContext(GoogleMapContext);
  const dispatch = useDispatch();
  const mapState = useSelector((state: any) => state.map);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: Google_Map_Key,
    libraries: ["places"],
  });

  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error fetching current location:", error);
          setCurrentPosition({ lat: 40.73061, lng: -73.935242 });
        }
      );
    } else {
      setCurrentPosition({ lat: 40.73061, lng: -73.935242 });
    }
  }, []);

  useEffect(() => {
    if (isLoaded && googleMapRef.current && currentPosition) {
      mapInstanceRef.current = new google.maps.Map(googleMapRef.current, {
        center: currentPosition,
        zoom: 10,
      });

      dispatch(isMapLoaded(isLoaded));
    }
  }, [isLoaded, currentPosition]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return isLoaded ? (
    <div ref={googleMapRef} style={{ width: "100%", height: "500px" }} />
  ) : (
    <div>Loading Google Maps...</div>
  );
};

export default GoogleMapLoader;
