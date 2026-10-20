import { Link, Outlet } from "react-router-dom";

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#01082D] text-white w-full overflow-x-hidden flex flex-col">
      <header className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 border-b border-[#0F2573] w-full">
        
        <div className="text-2xl font-bold mb-4 md:mb-0">
          <span className="text-white">IAE</span><span className="text-[#ADE1FB]">ETA</span>
        </div>
        
        <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 text-sm">
          <Link to="/" className="text-gray-300 hover:text-[#ADE1FB] transition-colors">Menu</Link>
          <Link to="/About" className="text-gray-300 hover:text-[#ADE1FB] transition-colors">Tentang Kami</Link>
          <Link to="/OurTim" className="text-gray-300 hover:text-[#ADE1FB] transition-colors">Tim Kami</Link>
          <Link to="/Media" className="text-gray-300 hover:text-[#ADE1FB] transition-colors">Media</Link>
          <Link to="/Contact" className="text-gray-300 hover:text-[#ADE1FB] transition-colors">Kontak Kami</Link>
          
          <Link to="/Login" className="ml-2">
            <button className="px-5 py-1.5 rounded-full text-[#ADE1FB] border border-[#ADE1FB] hover:bg-[#ADE1FB] hover:text-[#01082D] transition-all font-semibold">
              Login
            </button>
          </Link>
        </nav>
      </header>
      
      <main className="w-full flex-grow"><Outlet /></main>
    </div>
  );
}