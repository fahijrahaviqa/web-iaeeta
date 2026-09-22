import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { supabase } from '../supabaseClient';
import { 
  FiMail, FiUser, FiShield, 
  FiCheckCircle, FiKey, FiServer,
  FiEye, FiEyeOff, FiCamera, FiSave
} from 'react-icons/fi';

export default function Settings() {
  // 1. Ambil nama dari localStorage (jika tidak ada, pakai "Admin IAEETA")
  const [adminName, setAdminName] = useState(() => {
    return localStorage.getItem('adminName') || 'Admin IAEETA';
  });
  
  const [adminEmail, setAdminEmail] = useState('Memuat email...');
  
  const [avatarUrl, setAvatarUrl] = useState(() => {
    return localStorage.getItem('adminAvatar') || 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminIAEETA';
  });
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setAdminEmail(user.email);
    };
    fetchCurrentUser();
  }, []);

  // 2. Fungsi simpan nama seketika saat diketik
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setAdminName(newName); // Update di layar saat ini
    localStorage.setItem('adminName', newName); // Simpan ke browser
    window.dispatchEvent(new Event('nameUpdated')); // Bunyikan alarm ke Navbar
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatarUrl(base64String);
        localStorage.setItem('adminAvatar', base64String);
        window.dispatchEvent(new Event('avatarUpdated'));
        
        setSuccessMessage('Foto profil berhasil diperbarui!');
        setTimeout(() => setSuccessMessage(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return alert('Konfirmasi sandi baru tidak cocok!');
    }

    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: currentPassword,
      });

      if (signInError) throw new Error('Kata sandi saat ini salah!');

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      setSuccessMessage('Kata sandi berhasil diperbarui secara permanen!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      alert(`Gagal: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <PageHeader title="Pengaturan Sistem & Keamanan" breadcrumb={["Admin", "Pengaturan"]} />

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm animate-in fade-in duration-300">
          <FiCheckCircle className="text-xl text-emerald-600 shrink-0" />
          <span className="text-sm font-bold">{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 border border-[#ADE1FB]/40 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-[#0F2573] to-[#041D56]"></div>
            <div className="relative z-10 flex flex-col items-center text-center mt-6">
              <label className="relative group cursor-pointer mb-3">
                <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-lg overflow-hidden flex items-center justify-center">
                  <img src={avatarUrl} alt="Admin" className="w-full h-full rounded-full object-cover bg-[#ADE1FB]/30" />
                </div>
                <div className="absolute inset-0 bg-[#01082D]/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-bold">
                  <FiCamera size={18} className="mb-0.5" />
                  Ganti PP
                </div>
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>

              {/* Tampilkan Nama yang Dinamis */}
              <h3 className="font-extrabold text-[#01082D] text-lg">{adminName}</h3>
              <p className="text-xs font-bold text-[#266CA9] bg-[#ADE1FB]/20 px-3 py-1 rounded-full mt-1">Super Admin Utama</p>
              
              <div className="w-full border-t border-gray-100 my-5 pt-4 text-left space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <FiMail className="text-[#266CA9] text-base shrink-0" />
                  <span className="font-medium truncate">{adminEmail}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <FiShield className="text-[#266CA9] text-base shrink-0" />
                  <span className="font-medium">Proteksi Sandi Ganda Aktif</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#041D56] to-[#01082D] text-white rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#ADE1FB] opacity-10 rounded-full blur-xl"></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                <FiServer className="text-[#ADE1FB] text-lg" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm">Sistem Real-Time</h4>
                <p className="text-[10px] text-[#ADE1FB]">Supabase Auth</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed relative z-10">
              Pembaruan kata sandi diverifikasi langsung ke database utama.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#ADE1FB]/40 shadow-sm">
            <div className="flex items-center gap-3 pb-5 border-b border-gray-100 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#0F2573]/10 flex items-center justify-center text-[#0F2573]">
                <FiUser size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#01082D]">Identitas Pengelola</h3>
                <p className="text-xs text-gray-500">Nama panggilan dan email aktif pengelola</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-1.5 pl-1">Nama Administrator</label>
                {/* 3. Gunakan handleNameChange di input nama */}
                <input 
                  type="text" 
                  value={adminName} 
                  onChange={handleNameChange} 
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-1.5 pl-1">Email Tertaut (Terkunci)</label>
                <input type="email" value={adminEmail} disabled className="w-full px-4 py-3.5 bg-gray-100 border-2 border-gray-200 rounded-2xl text-sm font-medium text-gray-500 cursor-not-allowed select-none focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-[#ADE1FB]/40 shadow-sm">
            <div className="flex items-center gap-3 pb-5 border-b border-gray-100 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#0F2573]/10 flex items-center justify-center text-[#0F2573]">
                <FiKey size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#01082D]">Ubah Kata Sandi</h3>
                <p className="text-xs text-gray-500">Masukkan sandi lama untuk membuat sandi baru</p>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-1.5 pl-1">Kata Sandi Saat Ini</label>
                <div className="relative">
                  <input type={showCurrent ? "text" : "password"} placeholder="••••••••••••" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-3.5 pr-12 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all" required />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0F2573] transition-colors">
                    {showCurrent ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                <div className="flex justify-end mt-2 pr-1">
                  <Link to="/forgot-password" className="text-[11px] text-[#266CA9] font-bold hover:text-[#0F2573] hover:underline transition-colors">Lupa sandi saat ini?</Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-1.5 pl-1">Kata Sandi Baru</label>
                  <div className="relative">
                    <input type={showNew ? "text" : "password"} placeholder="••••••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-3.5 pr-12 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all" required />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0F2573]">
                      {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-1.5 pl-1">Konfirmasi Sandi Baru</label>
                  <div className="relative">
                    <input type={showConfirm ? "text" : "password"} placeholder="••••••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3.5 pr-12 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all" required />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0F2573]">
                      {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button type="submit" disabled={loading} className="bg-[#0F2573] hover:bg-[#041D56] text-white text-sm font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50">
                  {loading ? 'Menyimpan...' : <><FiSave size={18}/> Simpan Kata Sandi</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}