import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiImage, FiUsers, FiArrowRight, FiActivity, FiStar, FiAlertCircle } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';

import { getGalleryItems } from '../galleryService';
import { getTeamMembers } from '../teamService';

export default function Dashboard() {
  const [stats, setStats] = useState({ gallery: 0, team: 0 });
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState('online');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [galleryData, teamData] = await Promise.all([
          getGalleryItems(),
          getTeamMembers()
        ]);

        setStats({ 
          gallery: galleryData ? galleryData.length : 0, 
          team: teamData ? teamData.length : 0 
        });
        
        setSystemStatus('online');
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
        setSystemStatus('error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    // Tambahkan gap yang sedikit lebih kecil untuk mobile
    <div className="space-y-6 md:space-y-8">
      <PageHeader title="Dashboard Admin" breadcrumb={["Admin", "Dashboard"]} />

      {/* Banner Selamat Datang */}
      {/* Padding disesuaikan: p-6 untuk HP, p-10 untuk PC */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0F2573] to-[#041D56] rounded-3xl p-6 md:p-10 shadow-xl border border-[#041D56]">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ADE1FB] rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse hidden md:block"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#266CA9] rounded-full mix-blend-overlay filter blur-3xl opacity-30 hidden md:block"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ADE1FB]/20 border border-[#ADE1FB]/30 backdrop-blur-sm mb-4">
            <FiStar className="text-[#ADE1FB] text-xs md:text-sm" />
            <span className="text-[10px] md:text-xs font-bold text-[#ADE1FB] uppercase tracking-wider">Panel Utama</span>
          </div>
          {/* Ukuran font diperkecil di mobile (text-2xl) agar tidak memakan ruang */}
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-md">
            Selamat Datang di Admin Panel
          </h2>
          <p className="text-[#ADE1FB] max-w-xl leading-relaxed font-medium text-sm md:text-base">
            Kelola konten Galeri Foto dan daftar Anggota Tim Anda dengan mudah melalui dashboard ini. Pantau aktivitas dan perbarui informasi secara real-time.
          </p>
        </div>
      </div>

      {/* Grid Statistik & Menu Cepat */}
      {/* Diubah gap-nya agar lebih rapat di mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        
        {/* Card Galeri */}
        <div className="group relative bg-white rounded-3xl p-6 md:p-8 border border-[#ADE1FB] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ADE1FB]/40 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
          
          <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#266CA9] to-[#0F2573] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300 shrink-0">
              <FiImage className="text-2xl md:text-3xl text-white" />
            </div>
            <div className="text-right">
              <p className="text-[11px] md:text-sm font-bold text-[#266CA9] uppercase tracking-wide">Total Foto</p>
              {loading ? (
                <div className="h-8 w-14 bg-[#ADE1FB]/30 animate-pulse rounded mt-1 ml-auto"></div>
              ) : (
                <h3 className="text-3xl md:text-4xl font-black text-[#01082D] mt-1">{stats.gallery}</h3>
              )}
            </div>
          </div>

          <div className="relative z-10">
            <h4 className="text-lg md:text-xl font-bold text-[#041D56] mb-1 md:mb-2">Galeri Foto</h4>
            <p className="text-xs md:text-sm text-[#266CA9] mb-5 md:mb-6">
              Kelola dokumentasi, tambah foto kegiatan terbaru, atau hapus foto yang sudah usang.
            </p>
            <NavLink 
              to="/admin/galeri" 
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-[#0F2573] hover:bg-[#041D56] px-4 md:px-5 py-2 md:py-2.5 rounded-xl transition-colors shadow-md w-max group-hover:bg-[#266CA9]"
            >
              Kelola Galeri <FiArrowRight />
            </NavLink>
          </div>
        </div>

        {/* Card Tim Kami */}
        <div className="group relative bg-white rounded-3xl p-6 md:p-8 border border-[#ADE1FB] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ADE1FB]/40 to-transparent rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
          
          <div className="flex justify-between items-start mb-6 md:mb-8 relative z-10">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#266CA9] to-[#0F2573] flex items-center justify-center shadow-lg group-hover:-rotate-6 transition-transform duration-300 shrink-0">
              <FiUsers className="text-2xl md:text-3xl text-white" />
            </div>
            <div className="text-right">
              <p className="text-[11px] md:text-sm font-bold text-[#266CA9] uppercase tracking-wide">Total Anggota</p>
              {loading ? (
                <div className="h-8 w-14 bg-[#ADE1FB]/30 animate-pulse rounded mt-1 ml-auto"></div>
              ) : (
                <h3 className="text-3xl md:text-4xl font-black text-[#01082D] mt-1">{stats.team}</h3>
              )}
            </div>
          </div>

          <div className="relative z-10">
            <h4 className="text-lg md:text-xl font-bold text-[#041D56] mb-1 md:mb-2">Anggota Tim</h4>
            <p className="text-xs md:text-sm text-[#266CA9] mb-5 md:mb-6">
              Perbarui struktur organisasi, tambah anggota baru, atau ubah jabatan pengurus saat ini.
            </p>
            <NavLink 
              to="/admin/tim-kami" 
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-[#0F2573] hover:bg-[#041D56] px-4 md:px-5 py-2 md:py-2.5 rounded-xl transition-colors shadow-md w-max group-hover:bg-[#266CA9]"
            >
              Kelola Tim <FiArrowRight />
            </NavLink>
          </div>
        </div>

      </div>

      {/* Bagian Status Sistem Dinamis */}
      {/* Menggunakan flex-col untuk HP, dan flex-row untuk Desktop */}
      <div className={`rounded-2xl p-5 md:p-6 border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300 ${
        systemStatus === 'online' ? 'bg-white border-[#ADE1FB]' : 'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 ${
            systemStatus === 'online' ? 'bg-[#ADE1FB]/30 text-[#266CA9]' : 'bg-red-100 text-red-600'
          }`}>
            {systemStatus === 'online' ? <FiActivity className="text-lg md:text-xl" /> : <FiAlertCircle className="text-lg md:text-xl" />}
          </div>
          <div>
            <h4 className={`text-sm md:text-base font-bold ${systemStatus === 'online' ? 'text-[#041D56]' : 'text-red-800'}`}>
              Status Koneksi Database
            </h4>
            <p className={`text-[11px] md:text-xs font-medium mt-0.5 ${systemStatus === 'online' ? 'text-[#266CA9]' : 'text-red-600'}`}>
              {systemStatus === 'online' 
                ? 'Semua layanan dan koneksi data berjalan dengan normal.' 
                : 'Gagal memuat data. Periksa koneksi internet atau server Anda.'}
            </p>
          </div>
        </div>
        
        {/* Indikator Titik Menyala (Disesuaikan agar rapi di kiri bawah saat mode HP) */}
        <div className={`self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-lg ${
          systemStatus === 'online' ? 'bg-[#ADE1FB]/20' : 'bg-red-100'
        }`}>
          <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full animate-pulse ${
            systemStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className={`text-[11px] md:text-xs font-bold ${
            systemStatus === 'online' ? 'text-[#0F2573]' : 'text-red-700'
          }`}>
            {systemStatus === 'online' ? 'Online' : 'Gangguan'}
          </span>
        </div>
      </div>

    </div>
  );
}