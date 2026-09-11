import SidebarMenu from "../components/SidebarMenu";

export default function Sidebar() {
  return (
    <div id="sidebar" className="flex min-h-screen w-80 flex-col bg-white p-6 shadow-lg">
      <div id="sidebar-logo" className="flex flex-col">
        <span className="font-bold text-[36px] text-gray-900">
          IAEETA <b className="text-green-600">.</b>
        </span>
        <span className="font-semibold text-gray-400">Admin Dashboard</span>
      </div>

      <SidebarMenu />

      <div id="sidebar-footer" className="mt-auto pt-6">
        <p className="font-light text-gray-400 text-sm">&copy; 2026 Web Organisasi</p>
      </div>
    </div>
  );
}