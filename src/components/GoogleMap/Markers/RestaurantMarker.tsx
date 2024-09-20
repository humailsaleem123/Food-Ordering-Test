export const createRestaurantMarker = (
  place: any,
  mapInstance: google.maps.Map
) => {
  const placeLatLng = {
    lat: place.geometry?.location?.lat() ?? 0,
    lng: place.geometry?.location?.lng() ?? 0,
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

  return new google.maps.marker.AdvancedMarkerElement({
    position: placeLatLng,
    map: mapInstance,
    title: place.name,
    content: customIconContainer,
  });
};
