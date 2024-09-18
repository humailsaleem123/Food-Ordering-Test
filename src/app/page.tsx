import SearchBar from "@/components/SearchBar/SearchBar";
import dynamic from "next/dynamic";
import React from "react";

export const metadata = {
  title: "Home - Food Ordering",
  description: "Order your favorite food online.",
};

const GoogleMapLoader = dynamic(
  () => import("../components/GoogleMap/GoogleMapLoader"),
  {
    ssr: false,
  }
);

export default function Home() {
  const googleMapKey = "AIzaSyCcm7_Wd7uvmC9YnYLu2JHGWPt6z1MaL1E";

  return (
    <div className="relative">
      <GoogleMapLoader Google_Map_Key={googleMapKey}></GoogleMapLoader>
      <div className="fixed top-[18rem] left-[7rem] flex justify-center items-center z-[100]">
        <SearchBar />
      </div>
    </div>
  );
}
