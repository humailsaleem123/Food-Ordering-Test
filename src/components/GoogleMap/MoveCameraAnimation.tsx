import { Easing, Tween, Group } from "@tweenjs/tween.js";
export const MoveCameraAnimation = (
  cameraOptions: CameraOptions,
  targetLatLng: google.maps.LatLng,
  mapInstance: google.maps.Map,
  zoom: number
) => {
  const tween = new Tween(cameraOptions)
    .to({ tilt: 65, heading: 90, zoom: zoom, center: targetLatLng }, 5000) // 5 sec
    .easing(Easing.Quadratic.Out)
    .onUpdate(() => {
      mapInstance?.moveCamera(cameraOptions);
    });

  const group = new Group();
  group.add(tween);
  tween.start();

  const animate = (time: number) => {
    requestAnimationFrame(animate);
    group.update(time);
  };

  requestAnimationFrame(animate);
};

export interface CameraOptions {
  tilt: number;
  heading: number;
  zoom: number;
  center: { lat: number; lng: number };
}
