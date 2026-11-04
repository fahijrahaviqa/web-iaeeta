import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiGrid, FiImage, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import logoIaeeta from '../assets/logo_iaeeta.png';
import { supabase } from '../supabaseClient'; 

export default function SidebarMenu() {
  const location = useLocation();
  const navigate = useNavigate(); 
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleOpenMenu = () => setIsMobileMenuOpen(true);
    window.addEventListener('openMobileMenu', handleOpenMenu);
    
    return () => {
      window.removeEventListener('openMobileMenu', handleOpenMenu);
    };
  }, []);

  const topMenus = [
    { path: '/admin/', icon: <FiGrid className="text-xl" />, label: 'Dashboard' },
    { path: '/admin/galeri', icon: <FiImage className="text-xl" />, label: 'Galeri Foto' },
    { path: '/admin/tim-kami', icon: <FiUsers className="text-xl" />, label: 'Tim Kami' },
  ];

  const activeTopIndex = topMenus.findIndex((menu) => {
    if (menu.path === '/admin/') {
      return location.pathname === '/admin/' || location.pathname === '/admin' || location.pathname === '/';
    }
    return location.pathname.startsWith(menu.path);
  });

  const confirmLogout = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Gagal logout:', error.message);
      alert('Terjadi kesalahan saat mencoba keluar.');
    }
  };

  const handleMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* OVERLAY GELAP */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-[#01082D]/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* KONTEN SIDEBAR */}
      <div className={`fixed md:relative z-[70] top-0 left-0 h-screen pt-6 pb-8 flex flex-col items-center justify-between shrink-0 bg-white md:bg-transparent shadow-2xl md:shadow-none transition-all duration-500 ease-[cubic-bezier(0.68,-0.15,0.27,1.15)] ${
        isMobileMenuOpen 
          ? 'translate-x-0 w-64 px-4 items-start' 
          : '-translate-x-full md:translate-x-0 md:w-24 md:px-0 md:items-center'
      }`}>
        
        {/* Bagian Atas: Logo Brand & Navigasi Utama */}
        <div className={`flex flex-col gap-6 w-full ${isMobileMenuOpen ? 'items-start' : 'md:items-center'}`}>
          
          {/* Logo di Sidebar (Sekarang bisa diklik untuk menutup sidebar di mobile) */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out mx-auto md:mx-0"
            title="Tutup Menu"
          >
            <img 
              src={logoIaeeta} 
              alt="Logo IAEETA" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className={`mt-0 relative bg-white p-2 flex flex-col gap-2 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] border border-gray-100 ${
            isMobileMenuOpen ? 'w-full rounded-2xl p-3' : 'rounded-full md:rounded-full'
          }`}>
            {activeTopIndex !== -1 && (
              <div 
                className={`absolute bg-[#0F2573] shadow-md transition-all duration-500 ease-[cubic-bezier(0.68,-0.15,0.27,1.15)] ${
                  isMobileMenuOpen 
                    ? 'top-3 left-3 right-3 h-12 rounded-xl' 
                    : 'top-2 left-2 w-12 h-12 rounded-full'
                }`}
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
                  onClick={handleMenuClick}
                  className={`relative z-10 flex items-center transition-colors duration-300 ${
                    isCurrentActive ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                  } ${
                    isMobileMenuOpen 
                      ? 'h-12 px-4 gap-4 justify-start rounded-xl' 
                      : 'justify-center w-12 h-12 rounded-full'
                  }`}
                  title={menu.label}
                >
                  <div className="shrink-0 text-xl">{menu.icon}</div>
                  <span className={`font-bold text-sm tracking-wide md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    {menu.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bagian Bawah: Pengaturan & Logout */}
        <div className={`bg-white p-2 flex flex-col gap-2 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] border border-gray-100 ${
          isMobileMenuOpen ? 'w-full rounded-2xl p-3' : 'rounded-full md:rounded-full'
        }`}>
          <NavLink 
            to="/admin/pengaturan" 
            onClick={handleMenuClick}
            className={({ isActive }) =>
              `flex items-center transition duration-300 ${
                isActive ? 'bg-[#0F2573] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              } ${
                isMobileMenuOpen 
                  ? 'h-12 px-4 gap-4 justify-start rounded-xl font-bold' 
                  : 'justify-center w-12 h-12 rounded-full'
              }`
            } 
            title="Pengaturan"
          >
            <div className="shrink-0 text-xl"><FiSettings /></div>
            <span className={`font-bold text-sm tracking-wide md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              Pengaturan
            </span>
          </NavLink>

          <button 
            onClick={() => {
              handleMenuClick();
              setShowLogoutModal(true);
            }}
            className={`flex items-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-300 ease-in-out ${
              isMobileMenuOpen 
                ? 'h-12 px-4 gap-4 justify-start rounded-xl font-bold' 
                : 'justify-center w-12 h-12 rounded-full'
            }`}
            title="Logout"
          >
            <div className="shrink-0 text-xl ml-0.5 md:ml-1"><FiLogOut /></div>
            <span className={`font-bold text-sm tracking-wide md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              Keluar Akun
            </span>
          </button>
        </div>
      </div>

      {/* POP-UP KONFIRMASI LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#01082D]/70 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowLogoutModal(false)}
          ></div>
          <div className="relative bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5 border border-red-100 shadow-inner">
              <FiLogOut className="text-4xl text-red-500 ml-1" />
            </div>
            <h3 className="font-extrabold text-[#01082D] text-2xl mb-2 tracking-tight">Keluar dari Admin?</h3>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Anda akan keluar dari mode admin IAEETA
            </p>
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