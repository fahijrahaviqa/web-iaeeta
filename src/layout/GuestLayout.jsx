import { Link, Outlet } from "react-router-dom";
export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3a7e] to-[#26a136] text-white">
      <header className="flex justify-between items-center px-8 py-4 border-b border-white/20">
        <div className="text-2xl font-bold">
          <span className="text-white">IAE</span><span className="text-green-500">ETA</span>
        </div>
        <nav className="space-x-6 text-sm">
          <Link to="/">Menu</Link>
          <Link to="/About">Tentang Kami</Link>
          <Link to="/OurTim">Tim Kami</Link>
          <Link to="/Media">Media</Link>
          <Link to="/Contact">Kontak Kami</Link>
          <Link to="/Login">
            <button className="btn btn-outline btn-sm rounded-full text-white border-white hover:bg-white hover:text-black">
              Login
            </button>
          </Link>
        </nav>
      </header>
      <main><Outlet /></main>
    </div>
  );
}
