import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiImage, FiUsers, FiArrowRight, FiActivity, FiStar, FiAlertCircle } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';

// Import fungsi dari service Anda untuk mengambil data asli
import { getGalleryItems } from '../galleryService';
import { getTeamMembers } from '../teamService';

export default function Dashboard() {
  const [stats, setStats] = useState({ gallery: 0, team: 0 });
  const [loading, setLoading] = useState(true);
  
  // State baru untuk status sistem ('online' atau 'error')
  const [systemStatus, setSystemStatus] = useState('online');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Menarik data galeri dan tim secara bersamaan
        const [galleryData, teamData] = await Promise.all([
          getGalleryItems(),
          getTeamMembers()
        ]);

        // Menghitung total panjang array data dari database
        setStats({ 
          gallery: galleryData ? galleryData.length : 0, 
          team: teamData ? teamData.length : 0 
        });
        
        // Jika berhasil, status sistem menjadi online (Hijau)
        setSystemStatus('online');
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        // Jika gagal/error, status sistem menjadi error (Merah)
        setSystemStatus('error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard Admin" breadcrumb={["Admin", "Dashboard"]} />

      {/* Banner Selamat Datang */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0F2573] to-[#041D56] rounded-3xl p-8 md:p-10 shadow-xl border border-[#041D56]">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ADE1FB] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#266CA9] rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ADE1FB]/20 border border-[#ADE1FB]/30 backdrop-blur-sm mb-4">
            <FiStar className="text-[#ADE1FB] text-sm" />
            <span className="text-xs font-bold text-[#ADE1FB] uppercase tracking-wider">Panel Utama</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-md">
            Selamat Datang di Admin Panel
          </h2>
          <p className="text-[#ADE1FB] max-w-xl leading-relaxed font-medium">
            Kelola konten Galeri Foto dan daftar Anggota Tim Anda dengan mudah melalui dashboard ini. Pantau aktivitas dan perbarui informasi secara real-time.
          </p>
        </div>
      </div>

      {/* Grid Statistik & Menu Cepat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card Galeri */}
        <div className="group relative bg-white rounded-3xl p-8 border border-[#ADE1FB] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ADE1FB]/40 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#266CA9] to-[#0F2573] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
              <FiImage className="text-3xl text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#266CA9] uppercase tracking-wide">Total Foto</p>
              {loading ? (
                <div className="h-10 w-16 bg-[#ADE1FB]/30 animate-pulse rounded mt-1 ml-auto"></div>
              ) : (
                <h3 className="text-4xl font-black text-[#01082D] mt-1">{stats.gallery}</h3>
              )}
            </div>
          </div>

          <div className="relative z-10">
            <h4 className="text-xl font-bold text-[#041D56] mb-2">Galeri Foto</h4>
            <p className="text-sm text-[#266CA9] mb-6">
              Kelola dokumentasi, tambah foto kegiatan terbaru, atau hapus foto yang sudah usang.
            </p>
            <NavLink 
              to="/galeri" 
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#0F2573] hover:bg-[#041D56] px-5 py-2.5 rounded-xl transition-colors shadow-md w-max group-hover:bg-[#266CA9]"
            >
              Kelola Galeri <FiArrowRight />
            </NavLink>
          </div>
        </div>

        {/* Card Tim Kami */}
        <div className="group relative bg-white rounded-3xl p-8 border border-[#ADE1FB] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ADE1FB]/40 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#041D56] to-[#01082D] flex items-center justify-center shadow-lg group-hover:-rotate-6 transition-transform duration-300">
              <FiUsers className="text-3xl text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#266CA9] uppercase tracking-wide">Total Anggota</p>
              {loading ? (
                <div className="h-10 w-16 bg-[#ADE1FB]/30 animate-pulse rounded mt-1 ml-auto"></div>
              ) : (
                <h3 className="text-4xl font-black text-[#01082D] mt-1">{stats.team}</h3>
              )}
            </div>
          </div>

          <div className="relative z-10">
            <h4 className="text-xl font-bold text-[#041D56] mb-2">Anggota Tim</h4>
            <p className="text-sm text-[#266CA9] mb-6">
              Perbarui struktur organisasi, tambah anggota baru, atau ubah jabatan pengurus saat ini.
            </p>
            <NavLink 
              to="/tim-kami" 
              className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#0F2573] hover:bg-[#041D56] px-5 py-2.5 rounded-xl transition-colors shadow-md w-max group-hover:bg-[#266CA9]"
            >
              Kelola Tim <FiArrowRight />
            </NavLink>
          </div>
        </div>

      </div>

      {/* Bagian Status Sistem Dinamis */}
      <div className={`rounded-2xl p-6 border shadow-sm flex items-center justify-between transition-colors duration-300 ${
        systemStatus === 'online' ? 'bg-white border-[#ADE1FB]' : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            systemStatus === 'online' ? 'bg-[#ADE1FB]/30 text-[#266CA9]' : 'bg-red-100 text-red-600'
          }`}>
            {systemStatus === 'online' ? <FiActivity className="text-xl" /> : <FiAlertCircle className="text-xl" />}
          </div>
          <div>
            <h4 className={`font-bold ${systemStatus === 'online' ? 'text-[#041D56]' : 'text-red-800'}`}>
              Status Koneksi Database
            </h4>
            <p className={`text-xs font-medium mt-0.5 ${systemStatus === 'online' ? 'text-[#266CA9]' : 'text-red-600'}`}>
              {systemStatus === 'online' 
                ? 'Semua layanan dan koneksi data berjalan dengan normal.' 
                : 'Gagal memuat data. Periksa koneksi internet atau server Anda.'}
            </p>
          </div>
        </div>
        
        {/* Indikator Titik Menyala */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
          systemStatus === 'online' ? 'bg-[#ADE1FB]/20' : 'bg-red-100'
        }`}>
          <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
            systemStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className={`text-xs font-bold ${
            systemStatus === 'online' ? 'text-[#0F2573]' : 'text-red-700'
          }`}>
            {systemStatus === 'online' ? 'Online' : 'Gangguan'}
          </span>
        </div>
      </div>

    </div>
  );
}