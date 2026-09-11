import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import logoIaeeta from "../assets/logo_iaeeta.png";

export default function Navbar() {
  const location = useLocation();

  // 1. Daftar menu navbar
  const menus = [
    { path: '/', label: 'Dashboard' },
    { path: '/galeri', label: 'Galeri' },
    { path: '/tim-kami', label: 'Tim Kami' },
  ];

  // 2. Mencari indeks menu aktif (0, 1, atau 2)
  const activeIndex = menus.findIndex((menu) => location.pathname === menu.path);

  return (
    <div className="w-full px-6 pt-4 pb-2">
      
      <div className="bg-white rounded-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 px-4 py-2.5 flex items-center justify-between">
        
        {/* Bagian Kiri: Logo & Nama Brand */}
        <div className="flex items-center gap-2 pl-2 cursor-pointer">
          <img  
            src={logoIaeeta} 
            alt="Logo IAEETA" 
            className="w-9 h-9 rounded-full object-cover" 
          />
          <span className="text-black-300 font-bold text-lg tracking-tight">
            IAEETA-PEKANBARU
          </span>
        </div>

        {/* Bagian Tengah: Menu Navigasi (Dengan Sliding Kapsul Hijau) */}
        <div className="relative hidden md:flex items-center bg-gray-100/80 rounded-full p-1 border border-gray-200">
          
          {/* Kapsul Hijau yang meluncur (Sliding Indicator) */}
          {activeIndex !== -1 && (
            <div 
              // Lebar w-28 disamakan dengan lebar masing-masing menu teks
              className="absolute top-1 left-1 bottom-1 w-28 bg-[#0f2573] rounded-full shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.68,-0.15,0.27,1.15)]"
              style={{
                // Bergeser ke kanan 100% dari lebarnya sendiri setiap pindah indeks
                transform: `translateX(${activeIndex * 100}%)`
              }}
            />
          )}

          {/* Teks Menu */}
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                // z-10 agar teks berada di atas kapsul hijau, w-28 (112px) agar lebar semua tombol seragam
                `relative z-10 flex justify-center items-center w-28 py-1.5 text-sm font-semibold transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-700 hover:text-gray-900'
                }`
              }
            >
              {menu.label}
            </NavLink>
          ))}
        </div>

        {/* Bagian Kanan: Ikon Aksi & Profil User */}
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition">
            <FiSearch size={18} />
          </button>
          
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition mr-2">
            <FiBell size={18} />
          </button>
          
          <div className="flex items-center gap-1.5 cursor-pointer bg-white rounded-full p-0.5 hover:bg-gray-50 transition">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
              alt="Profil Admin" 
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
            <FiChevronDown className="text-gray-400 text-sm mr-1" />
          </div>
        </div>

      </div>
    </div>
  );
}