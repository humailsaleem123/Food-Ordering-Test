"use client";
import React, { useContext, useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import GoogleMapLoader from "@/components/GoogleMap/GoogleMapLoader";
import InfoComponent from "./InfoComponent/InfoComponent";
import titleImage from "@/public/assets/images/img1.png";
import locationImage from "@/public/assets/gifs/location.gif";
import RestaurantLists from "./RestaurantComponent/RestaurantLists";
import Loader from "@/components/Loader/Loader";
import { GoogleMapContext } from "@/contexts/GoogleMapContext";

function HomeComponent() {
  const { loadingState } = useContext(GoogleMapContext);
  const googleMapKey = "AIzaSyCcm7_Wd7uvmC9YnYLu2JHGWPt6z1MaL1E";

  return (
    <div className="relative">
      <Loader
        classes="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm"
        isShow={loadingState.isLoading}
        instanceId={loadingState.instanceId}
        loaderId="2"
        loadingText="Finding Restaurants Nearby, Please Wait..."
      />
      <GoogleMapLoader Google_Map_Key={googleMapKey}></GoogleMapLoader>
      <div className="absolute top-[30rem] flex justify-center items-center z-[100] w-full xl:w-[70rem] p-3 xl:p-0">
        <SearchBar />
      </div>

      <RestaurantLists />
      <div className="p-10">
        <InfoComponent
          title="Restaurants"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque,
            quidem excepturi. Expedita eligendi quibusdam earum doloribus a
            obcaecati minus quo, quis laudantium magnam. Culpa dolores fugit
            quisquam, enim eum quasi."
          img={titleImage.src}
          height={500}
          width={800}
          alt="img"
          imgPosition="right"
        />
        <InfoComponent
          title="Restaurants"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque,
            quidem excepturi. Expedita eligendi quibusdam earum doloribus a
            obcaecati minus quo, quis laudantium magnam. Culpa dolores fugit
            quisquam, enim eum quasi."
          img={locationImage.src}
          height={400}
          width={700}
          alt="img"
          imgPosition="left"
        />
      </div>
    </div>
  );
}

export default HomeComponent;
