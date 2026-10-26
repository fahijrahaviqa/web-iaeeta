import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { FiMail, FiSend, FiAlertCircle, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import logoIaeeta from '../../assets/logo_iaeeta.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:5173/reset-password', // Arahkan kembali ke panel setelah klik link
      });

      if (error) throw error;

      setMessage({ 
        type: 'success', 
        text: 'Tautan pemulihan kata sandi telah dikirim ke email Anda. Silakan cek kotak masuk atau folder spam.' 
      });
    } catch (error) {
      setMessage({ type: 'error', text: `Gagal mengirim: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-slate-50 overflow-hidden">
      
      {/* Ornamen Background (Estetika Blur) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ADE1FB] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#266CA9] rounded-full mix-blend-multiply filter blur-[120px] opacity-20"></div>

      {/* Tombol Kembali ke Halaman Login */}
      <Link 
        to="/login" 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-white/50 rounded-full text-[#0F2573] font-bold text-sm shadow-sm hover:shadow-md hover:bg-white hover:-translate-x-1 transition-all duration-300"
      >
        <FiArrowLeft className="text-lg" />
        <span>Kembali ke Login</span>
      </Link>

      {/* Kartu Lupa Kata Sandi */}
      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(4,29,86,0.15)] border border-white/60">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#ADE1FB] rounded-full blur-md opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
            <div className="relative w-20 h-20 rounded-full bg-white p-2 shadow-lg mb-5 border border-gray-100 transform transition-transform duration-500 group-hover:scale-105">
              <img src={logoIaeeta} alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#01082D] to-[#266CA9]">Lupa Sandi?</h2>
          <p className="text-sm font-medium text-gray-500 mt-3 text-center leading-relaxed">
            Masukkan email organisasi Anda, kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
          </p>
        </div>

        {/* Notifikasi Pesan (Sukses / Error) */}
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

        {/* Form Lupa Kata Sandi */}
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="group">
            <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-2 pl-2 transition-colors group-focus-within:text-[#266CA9]">
              Email Organisasi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-[#266CA9]">
                <FiMail className="text-gray-400 group-focus-within:text-[#266CA9] transition-colors" />
              </div>
              <input 
                type="email" 
                placeholder="admin@email.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border-2 border-gray-200 focus:border-[#266CA9] focus:bg-white rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none focus:ring-4 focus:ring-[#ADE1FB]/30 transition-all duration-300" 
                required 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="relative w-full overflow-hidden group bg-gradient-to-r from-[#266CA9] to-[#0F2573] hover:from-[#0F2573] hover:to-[#01082D] text-white text-sm font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {/* Efek kilau putih saat hover pada tombol */}
            <div className="absolute inset-0 -translate-x-full bg-white/20 group-hover:animate-[shimmer_1s_ease-in-out] skew-x-12"></div>
            
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Mengirim Tautan...
                </>
              ) : (
                <>
                  <FiSend size={18} /> Kirim Tautan Pemulihan
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