import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiChevronDown, FiMail, FiShield } from 'react-icons/fi';
import logoIaeeta from "../assets/logo_iaeeta.png";
import { supabase } from '../supabaseClient'; 

export default function Navbar() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('Memuat...');

  // State untuk Foto dan Nama yang terhubung ke localStorage
  const [avatarUrl, setAvatarUrl] = useState(() => {
    return localStorage.getItem('adminAvatar') || 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminIAEETA';
  });
  const [adminName, setAdminName] = useState(() => {
    return localStorage.getItem('adminName') || 'Admin IAEETA';
  });

  useEffect(() => {
    // Ambil Email dari Supabase
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setAdminEmail(user.email);
    };
    fetchUser();

    // Dengarkan "alarm" dari Settings.jsx untuk Avatar
    const syncAvatar = () => {
      const savedAvatar = localStorage.getItem('adminAvatar');
      if (savedAvatar) setAvatarUrl(savedAvatar);
    };
    window.addEventListener('avatarUpdated', syncAvatar);
    
    // Dengarkan "alarm" dari Settings.jsx untuk Nama
    const syncName = () => {
      const savedName = localStorage.getItem('adminName');
      if (savedName) setAdminName(savedName);
    };
    window.addEventListener('nameUpdated', syncName);
    
    // Bersihkan listener saat komponen dilepas
    return () => {
      window.removeEventListener('avatarUpdated', syncAvatar);
      window.removeEventListener('nameUpdated', syncName);
    };
  }, []);

  const menus = [
    { path: '/admin/', label: 'Dashboard' },
    { path: '/admin/galeri', label: 'Galeri' },
    { path: '/admin/tim-kami', label: 'Tim Kami' },
  ];

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
          <img src={logoIaeeta} alt="Logo IAEETA" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-black font-bold text-lg tracking-tight">IAEETA-PEKANBARU</span>
        </div>

        {/* Bagian Tengah: Menu Navigasi */}
        <div className="relative hidden md:flex items-center bg-gray-100 rounded-full p-1 border border-gray-200/50">
          {activeIndex !== -1 && (
            <div 
              className="absolute top-1 left-1 bottom-1 w-28 bg-[#0f2573] rounded-full shadow-md transition-transform duration-500 ease-[cubic-bezier(0.68,-0.15,0.27,1.15)]"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />
          )}
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
                  isCurrentActive ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {menu.label}
              </NavLink>
            );
          })}
        </div>

        {/* Bagian Kanan: Ikon Profil */}
        <div className="relative flex items-center">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} 
            className="flex items-center gap-1.5 bg-white rounded-full p-0.5 hover:bg-gray-50 transition border border-transparent hover:border-gray-200 focus:outline-none"
          >
            <img 
              src={avatarUrl} 
              alt="Profil Admin" 
              className="w-8 h-8 rounded-full object-cover border border-gray-200 bg-[#ADE1FB]/30"
            />
            <FiChevronDown className={`text-gray-400 text-sm mr-1 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-12 right-0 w-64 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(4,29,86,0.15)] border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col items-center text-center">
                
                <div className="w-16 h-16 rounded-full bg-white p-1 shadow-sm border border-gray-100 mb-2 overflow-hidden flex justify-center items-center">
                  <img 
                    src={avatarUrl} 
                    alt="Admin Avatar" 
                    className="w-full h-full rounded-full object-cover bg-[#ADE1FB]/30"
                  />
                </div>
                
                {/* Gunakan state adminName di sini */}
                <h4 className="font-extrabold text-[#01082D] text-[15px] truncate w-full px-2">{adminName}</h4>
                <div className="flex items-center justify-center gap-1 mt-1 mb-4 bg-[#ADE1FB]/20 px-2.5 py-0.5 rounded-full">
                  <FiShield className="text-[#266CA9] text-[10px]" />
                  <span className="text-[10px] font-bold text-[#266CA9]">Super Admin</span>
                </div>

                <div className="w-full bg-gray-50 rounded-xl p-3 flex items-center gap-3 border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[#0F2573]">
                    <FiMail size={14} />
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email Organisasi</p>
                    <p className="text-xs font-medium text-gray-700 truncate">{adminEmail}</p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}