"use client";
import React, { useContext, useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import GoogleMapLoader from "@/components/GoogleMap/GoogleMap";
import InfoComponent from "./InfoComponent/InfoComponent";
import titleImage from "@/public/assets/images/img1.png";
import locationImage from "@/public/assets/gifs/location.gif";
import RestaurantLists from "./RestaurantComponent/RestaurantLists";
import Loader from "@/components/Loader/Loader";
import { GoogleMapContext } from "@/contexts/GoogleMapContext";

function HomeComponent() {
  const { loadingState } = useContext(GoogleMapContext);
  const googleMapKey: any | undefined = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
  const googleMapId: any | undefined = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;
  const googleMapLibraries: any | undefined =
    process.env.NEXT_PUBLIC_GOOGLE_MAP_LIBRARIES;

  return (
    <div className="relative">
      <Loader
        classes="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm"
        isShow={loadingState.isLoading}
        instanceId={loadingState.instanceId}
        loaderId="2"
        loadingText="Finding Restaurants Nearby, Please Wait..."
      />
      <GoogleMapLoader
        GoogleMapKey={googleMapKey}
        GoogleMapId={googleMapId}
        libraries={googleMapLibraries.split(",")}
      ></GoogleMapLoader>
      <div className="absolute top-[30rem] flex justify-center items-center z-[100] w-full xl:w-[70rem] p-3 xl:p-0">
        <SearchBar />
      </div>

      <RestaurantLists />
      <div className="p-10">
        <InfoComponent
          title="Discover Nearby Restaurants with Spot Delivery!"
          description="Finding delicious food has never been easier. With our new way of online ordering, you can explore top-rated restaurants near your location in just a few taps. Check out user reviews and ratings to pick the best dining option, and enjoy quick, hassle-free delivery directly to your doorstep. Your next meal is just a pin away!"
          img={titleImage.src}
          height={500}
          width={800}
          alt="img"
          imgPosition="right"
        />
        <InfoComponent
          title="A Smarter Way to Order!"
          description="With our easy-to-use platform, ordering your favorite meals has never been more convenient. From browsing restaurants nearby to choosing your dish, placing an order is just a tap away. Our real-time tracking ensures you know exactly when your food will arrive, delivered right to your location. Fast, reliable, and seamless a smarter way to enjoy food at your fingertips!"
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
