import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiGrid, FiImage, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import logoIaeeta from '../assets/logo_iaeeta.png';

export default function SidebarMenu() {
  const location = useLocation();

  // 1. Kita buat daftar menu atas dalam bentuk array agar mudah dihitung posisinya
  const topMenus = [
    { path: '/', icon: <FiGrid className="text-xl" />, label: 'Dashboard' },
    { path: '/galeri', icon: <FiImage className="text-xl" />, label: 'Galeri Foto' },
    { path: '/tim-kami', icon: <FiUsers className="text-xl" />, label: 'Tim Kami' },
  ];

  // 2. Mencari indeks menu yang sedang aktif (0, 1, atau 2)
  const activeTopIndex = topMenus.findIndex((menu) => location.pathname === menu.path);

  return (
    <div className="w-24 h-screen pt-6 pb-8 flex flex-col items-center justify-between">
      
      {/* Bagian Atas: Logo Brand & Navigasi Utama */}
      <div className="flex flex-col items-center gap-6">
        
        {/* Logo IAEETA */}
        <div className="w-19 h-19 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out">
          <img 
            src={logoIaeeta} 
            alt="Logo IAEETA" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* KAPSUL MENU NAVIGASI (Dengan efek bola meluncur) */}
        <div className="mt-0 relative bg-white rounded-full p-2 flex flex-col gap-2 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
          
          {/* Bola Hijau yang meluncur (Sliding Indicator) */}
          {activeTopIndex !== -1 && (
            <div 
              className="absolute top-2 left-2 w-12 h-12 bg-[#0f2573] rounded-full shadow-md transition-transform duration-500 ease-[cubic-bezier(0.68,-0.15,0.27,1.15)]"
              style={{
                // Menghitung pergeseran ke bawah: 48px (tinggi ikon) + 8px (jarak gap) = 56px per lompatan
                transform: `translateY(${activeTopIndex * 56}px)`
              }}
            />
          )}

          {/* Ikon Menu (Berada di atas bola hijau) */}
          {topMenus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                // Ikon tidak lagi punya background, hanya teksnya yang berubah menjadi putih jika aktif
                `relative z-10 flex justify-center items-center w-12 h-12 rounded-full transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                }`
              }
              title={menu.label}
            >
              {menu.icon}
            </NavLink>
          ))}
        </div>

      </div>

      {/* Bagian Bawah: Kapsul Pengaturan & Logout */}
      <div className="mt-10 bg-white rounded-full p-2 flex flex-col gap-2 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
        <NavLink 
          to="/pengaturan" 
          className={({ isActive }) =>
            `flex justify-center items-center w-12 h-12 rounded-full transition duration-300 ${
              isActive ? 'bg-[#0f2573] text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`
          } 
          title="Pengaturan"
        >
          <FiSettings className="text-xl" />
        </NavLink>

        <button 
          className="flex justify-center items-center w-12 h-12 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-300 ease-in-out"
          title="Logout"
        >
          <FiLogOut className="text-xl ml-1" />
        </button>
      </div>
      
    </div>
  );
}