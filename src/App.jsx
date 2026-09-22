import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

// --- RIZAL ---
const GuestLayout = React.lazy(() => import("./layout/GuestLayout"));
const HeroSection = React.lazy(() => import("./components/HeroSection"));
const About = React.lazy(() => import("./pages/guest/About"));
const Login = React.lazy(() => import("./pages/auth/Login")); 
// const Register = React.lazy(() => import("./pages/auth/Register")); 
const ResetPassword = React.lazy(() => import("./pages/auth/Reset"));
const ForgotPassword = React.lazy(() => import("./pages/auth/Forgot"));

// --- PIKA ---
const SidebarMenu = React.lazy(() => import("./components/SidebarMenu"));
const Navbar = React.lazy(() => import("./components/Navbar")); 
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Gallery = React.lazy(() => import("./pages/Gallery"));
const Team = React.lazy(() => import("./pages/Team"));
const Settings = React.lazy(() => import("./pages/Settings"));

// --- Komponen Loading ---
const Loading = React.lazy(() => import("./components/Loading"));

// Layout halaman admin
function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">
      <SidebarMenu />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="" element={<Dashboard />} />
              <Route path="galeri" element={<Gallery />} />
              <Route path="tim-kami" element={<Team />} />
              <Route path="pengaturan" element={<Settings />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<GuestLayout />}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Suspense>
  );
}