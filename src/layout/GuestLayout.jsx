import { NavLink, Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import logoIaeeta from "../assets/logo_iaeeta.png";

// Komponen bantuan untuk merender Menu Kapsul dengan Animasi Dalam
const NavItem = ({ to, label }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-500 ease-out group active:scale-95 flex items-center justify-center ${
          isActive ? "text-[#ADE1FB]" : "text-gray-400 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Layer Animasi Background: Membesar & Muncul Halus saat diklik */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-[#ADE1FB]/20 to-[#266CA9]/30 rounded-full border border-[#ADE1FB]/30 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isActive 
                ? 'opacity-100 scale-100 shadow-[0_0_15px_rgba(173,225,251,0.2)]' 
                : 'opacity-0 scale-75 group-hover:opacity-50 group-hover:scale-100'
            }`}
          ></div>
          
          {/* Teks Menu */}
          <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#01082D] text-white w-full overflow-x-hidden flex flex-col">
      
      {/* Header Sticky dengan efek Kaca (Glassmorphism) */}
      <header className="sticky top-0 z-50 bg-[#01082D]/80 backdrop-blur-lg flex justify-between items-center px-8 py-4 border-b border-[#0F2573]/60 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-all duration-300">
        
        {/* Container Logo dan Judul */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <img 
            src={logoIaeeta} 
            alt="Logo IAEETA" 
            className="h-9 w-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
          />
          <div className="text-xl font-extrabold tracking-wide">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#ADE1FB]">
              IAEETA DPC PEKANBARU
            </span>
          </div>
        </div>
        
        {/* Container Navigasi Utama */}
        <div className="flex items-center gap-4">
          
          {/* Menu Kapsul (Pill Container) */}
          <nav className="flex items-center gap-1 bg-[#041D56]/40 p-1.5 rounded-full border border-[#0F2573]/80 shadow-inner backdrop-blur-md">
            <NavItem to="/" label="Menu" />
            <NavItem to="/About" label="Tentang Kami" />
            <NavItem to="/OurTim" label="Tim Kami" />
            <NavItem to="/Media" label="Media" />
            <NavItem to="/Contact" label="Kontak Kami" />
          </nav>
          
          {/* Tombol Login Terpisah (Gaya Solid) */}
          <div className="pl-2">
            <Link to="/Login">
              <button className="relative overflow-hidden group px-7 py-2.5 rounded-full text-[#01082D] bg-gradient-to-r from-[#ADE1FB] to-[#7CB9E8] font-black text-sm transition-all duration-300 ease-out active:scale-95 shadow-[0_0_20px_rgba(173,225,251,0.3)] hover:shadow-[0_0_30px_rgba(173,225,251,0.6)]">
                {/* Efek Kilau/Swipe Putih di dalam tombol saat di-hover */}
                <div className="absolute inset-0 -translate-x-full bg-white/40 group-hover:animate-[shimmer_0.75s_ease-in-out] skew-x-12"></div>
                <span className="relative z-10">Login</span>
              </button>
            </Link>
          </div>

        </div>
      </header>
      
      {/* Injeksi Keyframe khusus untuk efek kilau tombol Login */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(150%); }
        }
      `}</style>
      
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}