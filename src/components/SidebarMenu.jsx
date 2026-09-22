import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiImage, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import logoIaeeta from '../assets/logo_iaeeta.png';
import { supabase } from '../supabaseClient'; // Pastikan path ini benar (naik 1 tingkat ke folder src)

export default function SidebarMenu() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook untuk mengarahkan halaman

  // 1. Daftar menu utama di kapsul atas
  const topMenus = [
    { path: '/admin/', icon: <FiGrid className="text-xl" />, label: 'Dashboard' },
    { path: '/admin/galeri', icon: <FiImage className="text-xl" />, label: 'Galeri Foto' },
    { path: '/admin/tim-kami', icon: <FiUsers className="text-xl" />, label: 'Tim Kami' },
  ];

  // 2. Pencarian indeks aktif untuk 3 menu atas
  const activeTopIndex = topMenus.findIndex((menu) => {
    if (menu.path === '/admin/') {
      return location.pathname === '/admin/' || location.pathname === '/admin' || location.pathname === '/';
    }
    return location.pathname.startsWith(menu.path);
  });

  // 3. FUNGSI LOGOUT (Terhubung ke Supabase & Navigasi)
  const handleLogout = async () => {
    // Munculkan pop-up konfirmasi
    const isConfirmed = window.confirm('Apakah Anda yakin ingin keluar dari mode Admin?');
    
    if (isConfirmed) {
      try {
        // Hapus sesi login di Supabase
        await supabase.auth.signOut();
        
        // Arahkan otomatis ke halaman Landing Page utama
        navigate('/');
      } catch (error) {
        console.error('Gagal logout:', error.message);
        alert('Terjadi kesalahan saat mencoba keluar.');
      }
    }
  };

  return (
    <div className="w-24 h-screen pt-6 pb-8 flex flex-col items-center justify-between">
      
      {/* Bagian Atas: Logo Brand & Navigasi Utama */}
      <div className="flex flex-col items-center gap-6">
        
        {/* Logo IAEETA */}
        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out">
          <img 
            src={logoIaeeta} 
            alt="Logo IAEETA" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* KAPSUL MENU NAVIGASI ATAS */}
        <div className="mt-0 relative bg-white rounded-full p-2 flex flex-col gap-2 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
          
          {/* Bola biru yang meluncur untuk menu atas */}
          {activeTopIndex !== -1 && (
            <div 
              className="absolute top-2 left-2 w-12 h-12 bg-[#0F2573] rounded-full shadow-md transition-transform duration-500 ease-[cubic-bezier(0.68,-0.15,0.27,1.15)]"
              style={{
                transform: `translateY(${activeTopIndex * 56}px)`
              }}
            />
          )}

          {/* Ikon Menu Atas */}
          {topMenus.map((menu) => {
            const isCurrentActive = 
              menu.path === '/admin/' 
                ? location.pathname === '/admin/' || location.pathname === '/admin' || location.pathname === '/' 
                : location.pathname.startsWith(menu.path);

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={`relative z-10 flex justify-center items-center w-12 h-12 rounded-full transition-colors duration-300 ${
                  isCurrentActive ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
                title={menu.label}
              >
                {menu.icon}
              </NavLink>
            );
          })}
        </div>

      </div>

      {/* Bagian Bawah: Kapsul Pengaturan & Logout */}
      <div className="mt-10 bg-white rounded-full p-2 flex flex-col gap-2 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
        
        {/* Tombol Pengaturan */}
        <NavLink 
          to="/admin/pengaturan" 
          className={({ isActive }) =>
            `flex justify-center items-center w-12 h-12 rounded-full transition duration-300 ${
              isActive ? 'bg-[#0F2573] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }`
          } 
          title="Pengaturan"
        >
          <FiSettings className="text-xl" />
        </NavLink>

        {/* Tombol Logout */}
        <button 
          onClick={handleLogout}
          className="flex justify-center items-center w-12 h-12 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300 ease-in-out"
          title="Logout"
        >
          <FiLogOut className="text-xl ml-1" />
        </button>
      </div>
      
    </div>
  );
}