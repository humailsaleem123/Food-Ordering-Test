"use client";
import CardComponent from "@/components/Cards/Card";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";

function RestaurantGrid() {
  const { restaurants } = useSelector((state: any) => state.PlaceSlice);
  const [activeTab, setActiveTab] = useState<"topRated" | "remaining">(
    "topRated"
  );

  // Split the restaurants into top-rated and others
  const { topRatedRestaurants, remainingRestaurants } = restaurants.reduce(
    (acc: any, restaurant: RestaurantsItemProps) => {
      restaurant.rating >= 4
        ? acc.topRatedRestaurants.push(restaurant)
        : acc.remainingRestaurants.push(restaurant);
      return acc;
    },
    { topRatedRestaurants: [], remainingRestaurants: [] }
  );

  // Reusable rendering function for restaurant grid
  const renderRestaurantGrid = (restaurantList: RestaurantsItemProps[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12 p-5 justify-items-center">
      {restaurantList.map((restaurant: RestaurantsItemProps) => (
        <CardComponent
          key={restaurant.place_id}
          title={restaurant.title}
          icon={restaurant.icon}
          iconColor={restaurant.icon_color}
          placeId={restaurant.place_id}
          rating={restaurant.rating}
          userRating={restaurant.user_ratings_total}
          categories={restaurant.type.slice(0, 2)}
          position={restaurant.position}
        />
      ))}
    </div>
  );

  return (
    <div className="container-2xl md:container md:mx-auto mt-10 mb-10">
      {restaurants.length > 0 && (
        <React.Fragment>
          {/* Tab Buttons */}
          <div className="flex justify-center items-center flex-wrap md:space-x-4 space-y-4 md:space-y-0 mb-6">
            <Button
              icon="pi pi-star-fill"
              label="Top Rated Restaurants"
              className={`w-auto p-2 ${
                activeTab === "topRated"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("topRated")}
              severity="success"
            />
            <Button
              icon="pi pi-star-half-fill"
              label="Other Restaurants"
              className={`w-auto p-2 ${
                activeTab === "remaining"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("remaining")}
              severity="secondary"
            />
          </div>

          {/* Render the active tab content */}
          {activeTab === "topRated" ? (
            <React.Fragment>
              <h4 className="text-3xl text-center mb-5 underline decoration-solid underline-offset-[0.8rem] decoration-green-600">
                Top Rated Restaurants ({topRatedRestaurants.length})
              </h4>
              {renderRestaurantGrid(topRatedRestaurants)}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h4 className="text-3xl text-center mb-5 underline decoration-solid underline-offset-[0.8rem] decoration-green-600">
                Other Restaurants ({remainingRestaurants.length})
              </h4>
              {renderRestaurantGrid(remainingRestaurants)}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default RestaurantGrid;

interface RestaurantsItemProps {
  title: string;
  rating: number;
  icon: string;
  icon_color: string;
  place_id: string;
  type: string[];
  user_ratings_total: number;
  position: { lat: number; lng: number };
}
