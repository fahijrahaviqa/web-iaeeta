import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { FiMail, FiSend, FiAlertCircle } from 'react-icons/fi';
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
        text: 'Tautan pemulihan kata sandi telah dikirim ke email Anda. Silakan cek kotak masuk/spam.' 
      });
    } catch (error) {
      setMessage({ type: 'error', text: `Gagal mengirim: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#ADE1FB]/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-10px_rgba(4,29,86,0.1)] border border-gray-100">
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white p-2 shadow-md mb-4 border border-gray-50">
            <img src={logoIaeeta} alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#01082D]">Lupa Kata Sandi?</h2>
          <p className="text-sm text-gray-500 mt-2 text-center">Masukkan email organisasi Anda, kami akan mengirimkan tautan untuk mengatur ulang kata sandi.</p>
        </div>

        {message.text && (
          <div className={`mb-6 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
            <FiAlertCircle className="text-lg shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FiMail className="text-gray-400" /></div>
              <input type="email" placeholder="admin@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm" required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full mt-2 bg-[#266CA9] hover:bg-[#0F2573] text-white text-sm font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2">
            {loading ? 'Mengirim Tautan...' : <><FiSend size={18} /> Kirim Tautan Pemulihan</>}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-[#0F2573] font-bold">Kembali ke Halaman Login</Link>
        </div>
      </div>
    </div>
  );
}