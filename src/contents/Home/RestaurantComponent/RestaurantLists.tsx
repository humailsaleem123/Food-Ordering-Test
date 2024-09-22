"use client";
import React from "react";
import bgBackgroundImage from "@/public/assets/images/background1.png";
import RestaurantGrid from "./RestaurantGrid";
import { useSelector } from "react-redux";

function RestaurantLists() {
  const placeState = useSelector((state: any) => state.PlaceSlice);
  const { restaurants } = placeState;
  return (
    <React.Fragment>
      {restaurants.length != 0 && (
        <div className="relative p-[4rem] md:p-[7rem] shadow-inner">
          <div
            className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center bg-no-repeat z-[-1] rounded-lg"
            style={{ backgroundImage: `url(${bgBackgroundImage.src})` }}
          ></div>

          <div className="w-full relative z-10 p-10 bg-slate-100 shadow-lg rounded-lg">
            <RestaurantGrid />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default RestaurantLists;
