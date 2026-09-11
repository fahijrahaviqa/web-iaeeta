import { FaSearch, FaBell } from "react-icons/fa";

export default function Header() {
  return (
    <div id="header-container" className="flex justify-between items-center p-4 bg-white shadow-sm mb-6">
      <div id="search-bar" className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Cari sesuatu..."
          className="border border-gray-200 p-2 pr-10 w-full rounded-md outline-none"
        />
        <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div id="profile-container" className="flex items-center space-x-4">
        <span className="text-gray-700">Hello, <b>Admin</b></span>
        <img
          src="https://avatar.iran.liara.run/public/28"
          alt="Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
}