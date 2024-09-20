"use client";

import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import React, { useEffect, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore } from "@/reduxStore/store";
import { GoogleMapProvider } from "@/contexts/GoogleMapContext";
import AppBar from "@/components/Layouts/appBar";
import Footer from "@/components/Layouts/Footer";
import AnimationLoader from "@/components/Loader/AnimationLoader";
import { motion } from "framer-motion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [animationLoader, setAnimationLoader] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setAnimationLoader(false), 500);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>
        <ReduxProvider store={makeStore}>
          <GoogleMapProvider>
            {animationLoader && (
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : "-100vh" }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[#7aa582] z-[10000]"
                onAnimationComplete={() => {
                  if (!isVisible) setAnimationLoader(false);
                }}
              >
                <AnimationLoader />
              </motion.div>
            )}
            {!animationLoader && (
              <React.Fragment>
                <AppBar />
                <PrimeReactProvider>{children}</PrimeReactProvider>
                <Footer />
              </React.Fragment>
            )}
          </GoogleMapProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
