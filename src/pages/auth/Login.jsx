import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Path sudah diperbaiki
import { FiMail, FiLock, FiLogIn, FiAlertCircle } from 'react-icons/fi';
import logoIaeeta from '../../assets/logo_iaeeta.png'; // Path sudah diperbaiki

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Proses autentikasi ke Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw error;
      }

      // Jika sukses login, langsung arahkan ke Dashboard Admin
      navigate('/admin/');
      
    } catch (error) {
      setErrorMsg('Gagal login: Email atau kata sandi salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#ADE1FB]/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-10px_rgba(4,29,86,0.1)] border border-gray-100">
        
        {/* Header Login */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white p-2 shadow-md mb-4 border border-gray-50">
            <img src={logoIaeeta} alt="Logo IAEETA" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#01082D]">Admin Panel</h2>
          <p className="text-sm text-gray-500 mt-1">Masuk untuk mengelola sistem IAEETA</p>
        </div>

        {/* Notifikasi Error */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium animate-in fade-in">
            <FiAlertCircle className="text-lg shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Input Email */}
          <div>
            <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-2 pl-1">
              Email Organisasi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="admin@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-2 pl-1">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all"
                required
              />
            </div>
            
            {/* Tautan Lupa Kata Sandi */}
            <div className="flex justify-end mt-2">
              <Link to="/forgot-password" className="text-xs text-[#266CA9] font-bold hover:text-[#0F2573] hover:underline transition-colors">
                Lupa kata sandi?
              </Link>
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#266CA9] hover:bg-[#0F2573] text-white text-sm font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? 'Memverifikasi...' : <><FiLogIn size={18} /> Masuk ke Dashboard</>}
          </button>
        </form>
        
        {/* Tautan ke Halaman Registrasi (Bisa dihapus nanti jika tidak diperlukan publik) */}
        {/* <p className="mt-8 text-center text-sm text-gray-500">
          Belum mendaftarkan email?{' '}
          <Link to="/register" className="text-[#266CA9] font-bold hover:underline transition-colors">
            Daftar di sini
          </Link>
        </p> */}
        
      </div>
    </div>
  );
}