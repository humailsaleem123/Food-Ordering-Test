"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { isMapLoaded } from "@/reduxStore/slices/mapSlice";
import { GoogleMapContext } from "@/contexts/GoogleMapContext";
import Loader from "../Loader/Loader";

const libraries: any = ["places", "marker", "geometry", "maps3d", "drawing"];

const GoogleMapLoader = ({
  GoogleMapKey,
  GoogleMapId,
}: GoogleMapLoaderProps) => {
  const { googleMapRef, mapInstanceRef, toastRef } =
    useContext(GoogleMapContext);
  const dispatch = useDispatch();

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GoogleMapKey,
    libraries,
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
          toastRef.current?.show({
            severity: "error",
            summary: "Error",
            detail: `${error.message}`,
          });
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
        mapId: GoogleMapId,
      });

      dispatch(isMapLoaded(isLoaded));
    }
  }, [isLoaded, currentPosition]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return isLoaded ? (
    <div ref={googleMapRef} style={{ width: "100%", height: "700px" }} />
  ) : (
    <Loader
      classes="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm"
      isShow={true}
      instanceId="1"
      loaderId="1"
      loadingText="Loading Google Maps, Please Wait.."
    />
  );
};

export default GoogleMapLoader;

interface GoogleMapLoaderProps {
  GoogleMapKey: string;
  GoogleMapId: string;
}
