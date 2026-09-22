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
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#ADE1FB]/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-10px_rgba(4,29,86,0.1)] border border-gray-100">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white p-2 shadow-md mb-4 border border-gray-50">
            <img src={logoIaeeta} alt="Logo IAEETA" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#01082D]">Buat Sandi Baru</h2>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Masukkan kata sandi baru Anda untuk memulihkan akses ke Admin Panel.
          </p>
        </div>

        {/* Notifikasi Pesan */}
        {message.text && (
          <div className={`mb-6 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium ${
            message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
          }`}>
            {message.type === 'error' ? <FiAlertCircle className="text-lg shrink-0" /> : <FiCheckCircle className="text-lg shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Form Reset Sandi */}
        <form onSubmit={handleResetPassword} className="space-y-4">
          
          {/* Input Sandi Baru */}
          <div>
            <label className="block text-xs font-extrabold text-[#041D56] uppercase mb-2 pl-1">Kata Sandi Baru</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input 
                type={showNew ? "text" : "password"} 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all" 
                placeholder="••••••••••••"
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowNew(!showNew)} 
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0F2573] transition-colors"
              >
                {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Input Konfirmasi Sandi */}
          <div>
            <label className="block text-xs font-extrabold text-[#041D56] uppercase mb-2 pl-1">Konfirmasi Sandi Baru</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input 
                type={showConfirm ? "text" : "password"} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all" 
                placeholder="••••••••••••"
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirm(!showConfirm)} 
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0F2573] transition-colors"
              >
                {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full mt-4 bg-[#266CA9] hover:bg-[#0F2573] text-white text-sm font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {/* Teks tombol disesuaikan */}
            {loading ? 'Menyimpan...' : <><FiSave size={18} /> Simpan & Kembali ke Login</>}
          </button>
        </form>
      </div>
    </div>
  );
}