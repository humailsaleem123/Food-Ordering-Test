import {
  handleChangeDropDown,
  setLocations,
} from "@/reduxStore/slices/createSlice";
import { setCurrentLocation } from "@/reduxStore/slices/mapSlice";
import {
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const GoogleMapContext = createContext<any | null>(null);
let autocompleteService: google.maps.places.AutocompleteService | null = null;

export function GoogleMapProvider({ children }: any) {
  const googleMapRef = useRef(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const dispatch = useDispatch();
  const formStore = useSelector((state: any) => state.CreateSlice);
  const mapState = useSelector((state: any) => state.Map);
  const { isLoaded } = mapState;

  const { dropdownValue, locations } = formStore;

  useEffect(() => {
    if (isLoaded && !autocompleteService) {
      autocompleteService = new window.google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);
  const completeMethod = (e: AutoCompleteCompleteEvent) => {
    const userInput: string = dropdownValue?.value || dropdownValue;

    if (userInput && autocompleteService) {
      autocompleteService.getPlacePredictions(
        { input: userInput, types: ["geocode"] },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const placeSuggestions: any[] = [];

            const placesService = new google.maps.places.PlacesService(
              document.createElement("div")
            );

            predictions.forEach((prediction) => {
              placesService.getDetails(
                { placeId: prediction.place_id },
                (place: any, status) => {
                  if (
                    status === google.maps.places.PlacesServiceStatus.OK &&
                    place.geometry
                  ) {
                    placeSuggestions.push({
                      value: prediction.description,
                      heading: prediction.structured_formatting.main_text,
                      subheading:
                        prediction.structured_formatting.secondary_text,
                      placeId: prediction.place_id,
                      latitude: place.geometry.location.lat(), // Latitude
                      longitude: place.geometry.location.lng(), // Longitude
                    });

                    if (placeSuggestions.length === predictions.length) {
                      dispatch(setLocations(placeSuggestions));
                    }
                  }
                }
              );
            });
          } else {
            dispatch(setLocations([]));
          }
        }
      );
    } else {
      dispatch(setLocations([]));
    }
  };
  const handleChangeAutoComplete = (e: AutoCompleteChangeEvent) => {
    const userInput = e.target.value;
    console.log("userInput", userInput);

    dispatch(handleChangeDropDown(userInput));
  };

  const handleBullseyeClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setCurrentLocation({ lat: latitude, lng: longitude }));

          const geoCoder = new window.google.maps.Geocoder();

          if (geoCoder) {
            const latLng = { lat: latitude, lng: longitude };
            geoCoder.geocode({ location: latLng }, (results: any, status) => {
              if (status === google.maps.GeocoderStatus.OK && results[0]) {
                const address = results[0].formatted_address;
                const placeId = results[0].place_id;

                const [heading, ...subHeadingParts] = address.split(",");
                const subHeading = subHeadingParts.join(",").trim();

                const locationData = {
                  value: address,
                  heading: heading,
                  subheading: subHeading,
                  placeId,
                  latitude,
                  longitude,
                };

                dispatch(handleChangeDropDown(locationData));
                // Add a marker & Navigate
                new google.maps.Marker({
                  position: latLng,
                  map: mapInstanceRef.current,
                  title: heading,
                });

                mapInstanceRef.current?.setCenter(latLng);
                mapInstanceRef.current?.setZoom(14);
              } else {
                console.error("Geocoding failed: ", status);
              }
            });
          }
        },
        (error) => {
          console.error("Error fetching current location:", error);
          dispatch(setCurrentLocation({ lat: 40.73061, lng: -73.935242 }));
        }
      );
    }
  };

  const clearDropDown = () => {
    dispatch(handleChangeDropDown(""));
  };
  return (
    <GoogleMapContext.Provider
      value={{
        googleMapRef,
        mapInstanceRef,
        currentPosition,
        setCurrentPosition,
        completeMethod,
        handleChangeAutoComplete,
        handleBullseyeClick,
        clearDropDown,
      }}
    >
      {children}
    </GoogleMapContext.Provider>
  );
}
