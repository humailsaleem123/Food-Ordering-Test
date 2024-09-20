import {
  handleChangeDropDown,
  setLocations,
} from "@/reduxStore/slices/createSlice";
import { setCurrentLocation } from "@/reduxStore/slices/mapSlice";
import { setRestaurants } from "@/reduxStore/slices/placeSlice";
import {
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import markerIcon from "../public/assets/images/marker.png";
import { Toast } from "primereact/toast";

export const GoogleMapContext = createContext<any | null>(null);
let autocompleteService: google.maps.places.AutocompleteService | null = null;

export function GoogleMapProvider({ children }: any) {
  const googleMapRef = useRef(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );
  const toastRef = useRef<Toast>(null);

  const [loadingState, setIsLoadingState] = useState<any>({
    isLoading: false,
    instanceId: "",
  });
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const dispatch = useDispatch();
  const formStore = useSelector((state: any) => state.CreateSlice);
  const mapState = useSelector((state: any) => state.Map);
  const { isLoaded, currentLocation, restaurantRadius } = mapState;

  const { dropdownValue, locations } = formStore;

  useEffect(() => {
    if (isLoaded && !autocompleteService) {
      autocompleteService = new window.google.maps.places.AutocompleteService();
      placesServiceRef.current = new google.maps.places.PlacesService(
        mapInstanceRef.current as google.maps.Map
      );
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

    const { latitude, longitude, heading } = userInput;
    if (latitude && longitude) {
      const latLng = { lat: latitude, lng: longitude };
      new google.maps.marker.AdvancedMarkerElement({
        position: latLng,
        map: mapInstanceRef.current,
        title: heading,
      });

      mapInstanceRef.current?.setCenter(latLng);
      mapInstanceRef.current?.setZoom(14);
    }

    dispatch(handleChangeDropDown(userInput));
  };

  const handleBullseyeClick = () => {
    try {
      setIsLoadingState({
        isLoading: true,
        instanceId: "1",
      });
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

                  const customIcon = document.createElement("img");
                  customIcon.src = markerIcon.src;
                  new google.maps.marker.AdvancedMarkerElement({
                    position: latLng,
                    map: mapInstanceRef.current,
                    title: heading,
                    content: customIcon,
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
            toastRef.current?.show({
              severity: "error",
              summary: "Error",
              detail: `${error.message}`,
            });
            dispatch(setCurrentLocation({ lat: 40.73061, lng: -73.935242 }));
          }
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoadingState({
          isLoading: false,
          instanceId: "1",
        });
      }, 1000);
    }
  };

  const findRestaurantsNearBy = () => {
    try {
      setIsLoadingState({
        isLoading: true,
        instanceId: "2",
      });
      if (placesServiceRef.current && currentLocation) {
        const request: any = {
          location: currentLocation,
          radius: restaurantRadius,
          type: ["restaurant"],
        };

        const restaurants: any[] = [];

        placesServiceRef.current.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            results.forEach((place: any) => {
              const placeLatLng = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              };

              // Create a div to hold the icon
              const customIconContainer = document.createElement("div");
              customIconContainer.style.backgroundColor = "#ffffff";
              customIconContainer.style.borderRadius = "50% 50% 50% 0";
              customIconContainer.style.boxShadow =
                "box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
              customIconContainer.style.padding = "5px";
              customIconContainer.style.display = "flex";
              customIconContainer.style.justifyContent = "center";
              customIconContainer.style.alignItems = "center";

              const customIcon = document.createElement("img");
              customIcon.src = place.icon;
              customIcon.style.borderRadius = "15px";
              customIcon.style.backgroundColor = place.icon_background_color;
              customIcon.style.width = "30px";
              customIcon.style.height = "30px";
              customIcon.style.padding = "5px";

              customIconContainer.appendChild(customIcon);

              new google.maps.marker.AdvancedMarkerElement({
                position: placeLatLng,
                map: mapInstanceRef.current,
                title: place.name,
                content: customIconContainer,
              });

              const obj = {
                title: place.name,
                icon: place.icon,
                icon_color: place.icon_background_color,
                place_id: place.place_id,
                rating: place.rating,
                user_ratings_total: place.user_ratings_total,
                type: place.types,
                position: placeLatLng,
              };
              restaurants.push(obj);
            });
            dispatch(setRestaurants(restaurants));
          } else {
            console.error("Failed to find restaurants:", status);
          }
        });
      } else {
        setIsLoadingState({
          isLoading: false,
          instanceId: "2",
        });
        toastRef.current?.show({
          severity: "error",
          summary: "Error",
          detail: `Enter Your Location`,
        });
      }
    } catch (err) {
      setIsLoadingState({
        isLoading: false,
        instanceId: "2",
      });
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoadingState({
          isLoading: false,
          instanceId: "2",
        });
      }, 1000);
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
        loadingState,
        findRestaurantsNearBy,
        toastRef,
      }}
    >
      <Toast ref={toastRef} />

      {children}
    </GoogleMapContext.Provider>
  );
}
