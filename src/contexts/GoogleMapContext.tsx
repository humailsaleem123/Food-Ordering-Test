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
import { Toast } from "primereact/toast";
import { createRestaurantMarker } from "@/components/GoogleMap/Markers/RestaurantMarker";
import { createUserMarker } from "@/components/GoogleMap/Markers/UserMarker";
import { MoveCameraAnimation } from "@/components/GoogleMap/MoveCameraAnimation";
import { CheckboxChangeEvent } from "primereact/checkbox";

export const GoogleMapContext = createContext<any | null>(null);
let autocompleteService: google.maps.places.AutocompleteService | null = null;

export function GoogleMapProvider({ children }: any) {
  const googleMapRef = useRef(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(
    null
  );
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const toastRef = useRef<Toast>(null);

  const [loadingState, setIsLoadingState] = useState<any>({
    isLoading: false,
    instanceId: "",
  });
  const [animationLoader, setAnimationLoader] = useState(false);
  const [is3d, setIs3d] = useState<boolean>(false);
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

      createUserMarker(heading, latLng, mapInstanceRef.current as any);
      const targetLatLng = new google.maps.LatLng(latitude, longitude);

      const cameraOptions = {
        tilt: 0,
        heading: 0,
        zoom: 6,
        center: latLng,
      };
      MoveCameraAnimation(
        cameraOptions,
        targetLatLng,
        mapInstanceRef.current as any,
        12
      );

      dispatch(setCurrentLocation(latLng));
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

                  createUserMarker(
                    heading,
                    latLng,
                    mapInstanceRef.current as any
                  );
                  const targetLatLng = new google.maps.LatLng(
                    latitude,
                    longitude
                  );

                  const cameraOptions = {
                    tilt: 0,
                    heading: 0,
                    zoom: 10,
                    center: latLng,
                  };
                  MoveCameraAnimation(
                    cameraOptions,
                    targetLatLng,
                    mapInstanceRef.current as any,
                    14
                  );

                  // mapInstanceRef.current?.panTo(latLng);
                  // mapInstanceRef.current?.setZoom(14);
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
        const request: google.maps.places.PlaceSearchRequest = {
          location: currentLocation,
          radius: restaurantRadius,
          type: "restaurant",
        };

        const restaurants: any[] = [];

        placesServiceRef.current.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            results.forEach((place: any) => {
              const placeLatLng = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              };

              const marker = createRestaurantMarker(
                place,
                mapInstanceRef.current as any
              );

              markersRef.current.push(marker);

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
            toastRef.current?.show({
              severity: "error",
              summary: "Error",
              detail: `Failed to find restaurants: ${status}`,
            });
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

  const handleClickShowMap =
    (position: { lat: number; lng: number }) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      mapInstanceRef.current?.setCenter(position);
      mapInstanceRef.current?.setZoom(22);
      window.scrollTo({ top: 0, behavior: "smooth" });

      const targetMarker = markersRef.current.find(
        (marker) =>
          marker.position?.lat === position.lat &&
          marker.position?.lng === position.lng
      );

      if (targetMarker && targetMarker.element) {
        targetMarker.element.classList.add("animate-bounce");

        setTimeout(() => {
          targetMarker.element.classList.remove("animate-bounce");
        }, 5000);
      } else {
        console.log("Marker not found for the given position.");
      }
    };

  const handleChecked3D = (event: CheckboxChangeEvent) => {
    setIs3d(event.checked as any);
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
        handleClickShowMap,
        animationLoader,
        setAnimationLoader,
        is3d,
        handleChecked3D,
      }}
    >
      <Toast ref={toastRef} />

      {children}
    </GoogleMapContext.Provider>
  );
}
