import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#01082D] text-white">
      <header className="flex justify-between items-center px-8 py-4 border-b border-[#0F2573]">
        <div className="text-2xl font-bold">
          <span className="text-white">IAE</span><span className="text-[#ADE1FB]">ETA</span>
        </div>
        
        {/* Tambahkan flex dan items-center agar menu sejajar sempurna */}
        <nav className="space-x-6 text-sm flex items-center">
          {/* Tambahkan efek hover text-[#ADE1FB] pada link agar lebih interaktif */}
          <Link to="/" className="text-gray-300 hover:text-[#ADE1FB] transition-colors">Menu</Link>
          <Link to="/About" className="text-gray-300 hover:text-[#ADE1FB] transition-colors">Tentang Kami</Link>
          <Link to="/OurTim" className="text-gray-300 hover:text-[#ADE1FB] transition-colors">Tim Kami</Link>
          <Link to="/Media" className="text-gray-300 hover:text-[#ADE1FB] transition-colors">Media</Link>
          <Link to="/Contact" className="text-gray-300 hover:text-[#ADE1FB] transition-colors">Kontak Kami</Link>
          
          <Link to="/Login">
            {/* Sesuaikan warna tombol Login dengan palet biru terang */}
            <button className="px-5 py-1.5 rounded-full text-[#ADE1FB] border border-[#ADE1FB] hover:bg-[#ADE1FB] hover:text-[#01082D] transition-all font-semibold">
              Login
            </button>
          </Link>
        </nav>
      </header>
      
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}