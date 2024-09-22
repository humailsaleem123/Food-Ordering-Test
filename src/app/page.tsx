import HomeComponent from "@/contents/Home/HomeComponent";
import React from "react";

export const metadata = {
  title: "Home - Spot Delivery",
  description: "Spot Your Favorite Food NearBy",
};

export default function HomePage() {
  return (
    <React.Fragment>
      <HomeComponent />
    </React.Fragment>
  );
}
