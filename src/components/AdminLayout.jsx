import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar statis di samping kiri */}
      <Sidebar />

      {/* Konten sebelah kanan (Navbar + Halaman Utama) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar di atas */}
        <Navbar />

        {/* Tempat halaman-halaman dirender (Dashboard, Galeri, dll) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}