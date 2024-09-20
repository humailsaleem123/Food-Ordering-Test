import markerIcon from "@/public/assets/images/marker.png";
export const createUserMarker = (
  title: string,
  latLng: { lat: number; lng: number },
  mapInstance: google.maps.Map
) => {
  const customIcon = document.createElement("img");
  customIcon.src = markerIcon.src;

  return new google.maps.marker.AdvancedMarkerElement({
    position: latLng,
    map: mapInstance,
    title: title,
    content: customIcon,
  });
};
