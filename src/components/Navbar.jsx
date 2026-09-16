import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import logoIaeeta from "../assets/logo_iaeeta.png";

export default function Navbar() {
  const location = useLocation();

  // Daftar menu sesuaikan dengan path rute admin (/admin/...)
  const menus = [
    { path: '/admin/', label: 'Dashboard' },
    { path: '/admin/galeri', label: 'Galeri' },
    { path: '/admin/tim-kami', label: 'Tim Kami' },
  ];

  // Mencari indeks menu aktif
  const activeIndex = menus.findIndex((menu) => {
    if (menu.path === '/admin/') {
      return location.pathname === '/admin/' || location.pathname === '/admin' || location.pathname === '/';
    }
    return location.pathname.startsWith(menu.path);
  });

  return (
    <div className="w-full px-6 pt-4 pb-2">
      
      <div className="bg-white rounded-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 px-4 py-2.5 flex items-center justify-between">
        
        {/* Bagian Kiri: Logo & Nama Brand */}
        <div className="flex items-center gap-2 pl-2 cursor-pointer">
          <img  
            src={logoIaeeta} 
            alt="Logo IAEETA" 
            className="w-8 h-8 rounded-full object-cover" 
          />
          <span className="text-black font-bold text-lg tracking-tight">
            IAEETA-PEKANBARU
          </span>
        </div>

        {/* Bagian Tengah: Menu Navigasi (Kapsul Biru & Teks Putih saat Aktif) */}
        <div className="relative hidden md:flex items-center bg-gray-100 rounded-full p-1 border border-gray-200/50">
          
          {/* Kapsul Biru yang meluncur */}
          {activeIndex !== -1 && (
            <div 
              className="absolute top-1 left-1 bottom-1 w-28 bg-[#0f2573] rounded-full shadow-md transition-transform duration-500 ease-[cubic-bezier(0.68,-0.15,0.27,1.15)]"
              style={{
                transform: `translateX(${activeIndex * 100}%)`
              }}
            />
          )}

          {/* Teks Menu */}
          {menus.map((menu) => {
            const isCurrentActive = 
              menu.path === '/admin/' 
                ? location.pathname === '/admin/' || location.pathname === '/admin' || location.pathname === '/' 
                : location.pathname.startsWith(menu.path);

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={`relative z-10 flex justify-center items-center w-28 py-1.5 text-sm font-medium transition-colors duration-300 ${
                  // Jika aktif menjadi PUTIH, jika tidak aktif menjadi abu-abu gelap
                  isCurrentActive ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {menu.label}
              </NavLink>
            );
          })}
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