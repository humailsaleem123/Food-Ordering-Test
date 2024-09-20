import HomeComponent from "@/contents/Home/HomeComponent";
import React from "react";

export const metadata = {
  title: "Home - Food Ordering",
  description: "Order your favorite food online.",
};

export default function HomePage() {
  return (
    <React.Fragment>
      <HomeComponent />
    </React.Fragment>
  );
}
