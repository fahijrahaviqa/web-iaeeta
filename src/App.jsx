import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";


//layout import
const GuestLayout = React.lazy(() => import("./layout/GuestLayout"));

//pages import
const About = React.lazy(() => import("./pages/guest/About"));

//component import
const Loading = React.lazy(() => import("./components/Loading"));
const HeroSection = React.lazy(() => import("./components/HeroSection"))

export default function App(){
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/About" element={<About />} />
        </Route>
      </Routes>
    </Suspense>
  )
}