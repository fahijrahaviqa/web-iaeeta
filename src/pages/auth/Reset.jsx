import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { FiLock, FiCheckCircle, FiAlertCircle, FiSave, FiEye, FiEyeOff } from 'react-icons/fi';
import logoIaeeta from '../../assets/logo_iaeeta.png';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validasi kecocokan sandi
    if (newPassword !== confirmPassword) {
      return setMessage({ type: 'error', text: 'Konfirmasi sandi tidak cocok!' });
    }

    setLoading(true);
    try {
      // Memperbarui sandi
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      // Hapus sesi sementara agar admin benar-benar harus login ulang secara manual
      await supabase.auth.signOut();

      // Ubah teks pesan sukses
      setMessage({ 
        type: 'success', 
        text: 'Kata sandi berhasil diperbarui! Mengalihkan ke halaman Login...' 
      });
      
      // Tunggu 2 detik, lalu arahkan kembali ke halaman Login
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      
    } catch (error) {
      setMessage({ type: 'error', text: `Gagal memperbarui: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-slate-50 overflow-hidden">
      
      {/* Ornamen Background (Estetika Blur) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ADE1FB] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#266CA9] rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>

      {/* Kartu Reset Sandi */}
      <div className="relative z-10 max-w-md w-full bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(4,29,86,0.15)] border border-white/60">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#ADE1FB] rounded-full blur-md opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
            <div className="relative w-20 h-20 rounded-full bg-white p-2 shadow-lg mb-5 border border-gray-100 transform transition-transform duration-500 group-hover:scale-105">
              <img src={logoIaeeta} alt="Logo IAEETA" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#01082D] to-[#266CA9]">Buat Sandi Baru</h2>
          <p className="text-sm font-medium text-gray-500 mt-3 text-center leading-relaxed">
            Masukkan kata sandi baru Anda untuk memulihkan akses ke Admin Panel.
          </p>
        </div>

        {/* Notifikasi Pesan */}
        {message.text && (
          <div className={`mb-6 px-4 py-3.5 rounded-2xl flex items-start gap-3 text-sm font-medium animate-in slide-in-from-top-2 fade-in duration-300 shadow-sm backdrop-blur-sm border ${
            message.type === 'error' 
              ? 'bg-red-50/80 text-red-600 border-red-200' 
              : 'bg-emerald-50/80 text-emerald-700 border-emerald-200'
          }`}>
            {message.type === 'error' ? (
              <FiAlertCircle className="text-xl shrink-0 mt-0.5 text-red-500" />
            ) : (
              <FiCheckCircle className="text-xl shrink-0 mt-0.5 text-emerald-500" />
            )}
            <span className="leading-relaxed">{message.text}</span>
          </div>
        )}

        {/* Form Reset Sandi */}
        <form onSubmit={handleResetPassword} className="space-y-5">
          
          {/* Input Sandi Baru */}
          <div className="group">
            <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-2 pl-2 transition-colors group-focus-within:text-[#266CA9]">
              Kata Sandi Baru
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#266CA9]">
                <FiLock className="text-gray-400 group-focus-within:text-[#266CA9] transition-colors" />
              </div>
              <input 
                type={showNew ? "text" : "password"} 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border-2 border-gray-200 focus:border-[#266CA9] focus:bg-white rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none focus:ring-4 focus:ring-[#ADE1FB]/30 transition-all duration-300" 
                placeholder="••••••••••••"
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowNew(!showNew)} 
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#266CA9] transition-colors focus:outline-none"
              >
                {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Input Konfirmasi Sandi */}
          <div className="group">
            <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-2 pl-2 transition-colors group-focus-within:text-[#266CA9]">
              Konfirmasi Sandi Baru
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#266CA9]">
                <FiLock className="text-gray-400 group-focus-within:text-[#266CA9] transition-colors" />
              </div>
              <input 
                type={showConfirm ? "text" : "password"} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="w-full pl-11 pr-12 py-3.5 bg-gray-50/50 border-2 border-gray-200 focus:border-[#266CA9] focus:bg-white rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none focus:ring-4 focus:ring-[#ADE1FB]/30 transition-all duration-300" 
                placeholder="••••••••••••"
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)} 
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#266CA9] transition-colors focus:outline-none"
              >
                {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit" 
            disabled={loading} 
            className="relative w-full mt-4 overflow-hidden group bg-gradient-to-r from-[#266CA9] to-[#0F2573] hover:from-[#0F2573] hover:to-[#01082D] text-white text-sm font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {/* Efek kilau putih saat hover pada tombol */}
            <div className="absolute inset-0 -translate-x-full bg-white/20 group-hover:animate-[shimmer_1s_ease-in-out] skew-x-12"></div>
            
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <FiSave size={18} /> Simpan & Kembali ke Login
                </>
              )}
            </span>
          </button>
        </form>
      </div>

      {/* CSS Khusus untuk animasi tombol */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(150%); }
        }
      `}</style>
    </div>
  );
}