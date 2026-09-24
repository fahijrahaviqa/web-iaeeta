import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiImage, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import logoIaeeta from '../assets/logo_iaeeta.png';
import { supabase } from '../supabaseClient'; 

export default function SidebarMenu() {
  const location = useLocation();
  const navigate = useNavigate(); 
  
  // State untuk mengontrol muncul/hilangnya pop-up Logout
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  // 3. Fungsi untuk mengeksekusi Logout ke Supabase
  const confirmLogout = async () => {
    try {
      // Hapus sesi login di Supabase
      await supabase.auth.signOut();
      
      // Arahkan otomatis ke halaman Landing Page utama (pakai window.location untuk mencegah layar putih)
      window.location.href = '/';
    } catch (error) {
      console.error('Gagal logout:', error.message);
      alert('Terjadi kesalahan saat mencoba keluar.');
    }
  };

  return (
    <>
      {/* KONTEN SIDEBAR ASLI */}
      <div className="w-24 h-screen pt-6 pb-8 flex flex-col items-center justify-between">
        
        {/* Bagian Atas: Logo Brand & Navigasi Utama */}
        <div className="flex flex-col items-center gap-6">
          
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out">
            <img 
              src={logoIaeeta} 
              alt="Logo IAEETA" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="mt-0 relative bg-white rounded-full p-2 flex flex-col gap-2 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] border border-gray-100">
            {activeTopIndex !== -1 && (
              <div 
                className="absolute top-2 left-2 w-12 h-12 bg-[#0F2573] rounded-full shadow-md transition-transform duration-500 ease-[cubic-bezier(0.68,-0.15,0.27,1.15)]"
                style={{
                  transform: `translateY(${activeTopIndex * 56}px)`
                }}
              />
            )}

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

          {/* Tombol Logout HANYA mengubah state menjadi true */}
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="flex justify-center items-center w-12 h-12 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300 ease-in-out"
            title="Logout"
          >
            <FiLogOut className="text-xl ml-1" />
          </button>
        </div>
      </div>

      {/* POP-UP KONFIRMASI LOGOUT (MODAL) */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Latar Belakang Gelap Blur */}
          <div 
            className="absolute inset-0 bg-[#01082D]/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowLogoutModal(false)}
          ></div>
          
          {/* Kotak Putih Modal */}
          <div className="relative bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            
            {/* Ikon Bulat Merah */}
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5 border border-red-100 shadow-inner">
              <FiLogOut className="text-4xl text-red-500 ml-1" />
            </div>
            
            <h3 className="font-extrabold text-[#01082D] text-2xl mb-2 tracking-tight">Keluar dari Admin?</h3>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Anda akan keluar dari mode admin IAEETA
            </p>
            
            {/* Tombol Aksi */}
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-[#041D56] font-bold text-sm rounded-2xl transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmLogout}
                className="flex-1 py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold text-sm rounded-2xl shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <FiLogOut size={16} /> Ya, Keluar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}