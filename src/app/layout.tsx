"use client";

import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore } from "@/reduxStore/store";
import { GoogleMapProvider } from "@/contexts/GoogleMapContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider store={makeStore}>
          <GoogleMapProvider>
            <PrimeReactProvider>{children}</PrimeReactProvider>
          </GoogleMapProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
