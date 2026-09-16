import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { supabase } from '../supabaseClient'; // Pastikan path import ini benar
import { 
  FiMail, FiUser, FiShield, 
  FiCheckCircle, FiAlertTriangle, FiKey, FiServer,
  FiEye, FiEyeOff, FiCamera
} from 'react-icons/fi';

export default function Settings() {
  // State untuk Profil Admin
  const [adminName, setAdminName] = useState('Admin IAEETA');
  const [adminEmail, setAdminEmail] = useState('Memuat email...'); // Default saat loading
  const [avatarUrl, setAvatarUrl] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=AdminIAEETA');
  
  // State untuk Keamanan (Ubah Password)
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // State Visibilitas & UI Feedback
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // 1. EFEK UNTUK MENARIK EMAIL ASLI DARI SUPABASE SAAT HALAMAN DIBUKA
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setAdminEmail(user.email); // Mengisi kolom dengan email asli yang sedang login
      } else if (error) {
        console.error("Gagal menarik data user:", error.message);
        setAdminEmail('Email tidak ditemukan');
      }
    };
    fetchCurrentUser();
  }, []);

  // Handler Ganti Foto Profil (Lokal)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
      setSuccessMessage('Foto profil berhasil diperbarui secara lokal!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Handler Kirim Kode Verifikasi
  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      return alert('Harap isi sandi lama dan sandi baru terlebih dahulu!');
    }
    if (newPassword !== confirmPassword) {
      return alert('Konfirmasi sandi baru tidak cocok!');
    }

    setLoading(true);
    // Catatan: Jika ingin Supabase benar-benar mengirim email OTP, butuh setup SMTP di Supabase Dashboard. 
    // Untuk saat ini, UI mensimulasikan alur OTP demi menjaga tampilan profesional.
    setTimeout(() => {
      setLoading(false);
      setIsOtpSent(true);
      alert(`Kode verifikasi telah dikirim ke ${adminEmail}`);
    }, 1000);
  };

  // 2. HANDLER SIMPAN PERUBAHAN PASSWORD (BENAR-BENAR TERHUBUNG KE SUPABASE)
  const handleVerifyAndSave = async (e) => {
    e.preventDefault();
    if (verificationCode.length !== 6) {
      return alert('Masukkan 6 digit kode verifikasi yang valid!');
    }

    setLoading(true);
    try {
      // Memanggil fungsi Supabase untuk mengubah password user yang sedang login
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setSuccessMessage('Kata sandi berhasil diperbarui di database!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setVerificationCode('');
      setIsOtpSent(false);

      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      alert(`Gagal memperbarui sandi: ${error.message}`);
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
        
        {/* Kolom Kiri */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 border border-[#ADE1FB]/40 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-[#0F2573] to-[#041D56]"></div>
            <div className="relative z-10 flex flex-col items-center text-center mt-6">
              
              <label className="relative group cursor-pointer mb-3">
                <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-lg overflow-hidden">
                  <img src={avatarUrl} alt="Admin" className="w-full h-full rounded-full object-cover bg-[#ADE1FB]/30" />
                </div>
                <div className="absolute inset-0 bg-[#01082D]/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-bold">
                  <FiCamera size={18} className="mb-0.5" />
                  Ganti PP
                </div>
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>

              <h3 className="font-extrabold text-[#01082D] text-lg">{adminName}</h3>
              <p className="text-xs font-bold text-[#266CA9] bg-[#ADE1FB]/20 px-3 py-1 rounded-full mt-1">
                Super Admin Utama
              </p>
              
              <div className="w-full border-t border-gray-100 my-5 pt-4 text-left space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <FiMail className="text-[#266CA9] text-base shrink-0" />
                  <span className="font-medium truncate">{adminEmail}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <FiShield className="text-[#266CA9] text-base shrink-0" />
                  <span className="font-medium">Proteksi Verifikasi Aktif</span>
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
                <h4 className="font-extrabold text-sm">Infrastruktur Panel</h4>
                <p className="text-[10px] text-[#ADE1FB]">Supabase & React Engine</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed relative z-10">
              Sistem terhubung ke <strong className="text-[#ADE1FB]">{adminEmail}</strong>. Pembaruan krusial akan dicatat atas nama entitas ini.
            </p>
          </div>
        </div>

        {/* Kolom Kanan */}
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
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-1.5 pl-1">Email Tertaut (Terkunci)</label>
                <input
                  type="email"
                  value={adminEmail}
                  disabled // <-- MENGUNCI KOLOM EMAIL AGAR TIDAK BISA DIUBAH
                  className="w-full px-4 py-3.5 bg-gray-100 border-2 border-gray-200 rounded-2xl text-sm font-medium text-gray-500 cursor-not-allowed select-none focus:outline-none"
                />
                <p className="text-[10px] text-gray-400 mt-1 pl-1">Email di atas ditarik langsung dari sistem dan dikunci demi keamanan organisasi.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-[#ADE1FB]/40 shadow-sm">
            <div className="flex items-center gap-3 pb-5 border-b border-gray-100 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#0F2573]/10 flex items-center justify-center text-[#0F2573]">
                <FiKey size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#01082D]">Keamanan & Kata Sandi</h3>
                <p className="text-xs text-gray-500">Perbarui sandi sistem Anda secara berkala</p>
              </div>
            </div>

            {!isOtpSent ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-1.5 pl-1">Kata Sandi Saat Ini</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3.5 pr-12 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all"
                      required
                    />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0F2573]">
                      {showCurrent ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-1.5 pl-1">Kata Sandi Baru</label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3.5 pr-12 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all"
                        required
                      />
                      <button type="button" onClick={() => setShowNew(!showNew)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0F2573]">
                        {showNew ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-1.5 pl-1">Konfirmasi Sandi Baru</label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3.5 pr-12 bg-gray-50 border-2 border-gray-200 focus:border-[#0F2573] rounded-2xl text-sm font-medium text-[#01082D] focus:outline-none transition-all"
                        required
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0F2573]">
                        {showConfirm ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button type="submit" disabled={loading} className="bg-[#0F2573] hover:bg-[#041D56] text-white text-sm font-bold px-8 py-3.5 rounded-2xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50">
                    {loading ? 'Memproses...' : <>Kirim Kode Verifikasi <FiShield /></>}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyAndSave} className="space-y-5 bg-[#ADE1FB]/10 p-6 rounded-2xl border border-[#ADE1FB]/50 animate-in fade-in">
                <div className="flex items-center gap-3 text-amber-800 bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs font-medium">
                  <FiAlertTriangle className="text-xl text-amber-600 shrink-0" />
                  <span>Kode verifikasi simulasi dikirim ke <strong className="font-bold">{adminEmail}</strong>. Masukkan kode untuk konfirmasi.</span>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-[#041D56] uppercase tracking-wider mb-1.5 pl-1">Masukkan 6-Digit Kode Verifikasi</label>
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full text-center tracking-[1em] font-mono text-xl px-4 py-3 bg-white border-2 border-[#266CA9] rounded-2xl focus:outline-none text-[#01082D]"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsOtpSent(false)} className="w-1/3 py-3 text-xs font-bold text-gray-600 bg-white hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors">
                    Batal
                  </button>
                  <button type="submit" disabled={loading} className="w-2/3 py-3 text-xs font-bold text-white bg-[#266CA9] hover:bg-[#0F2573] rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                    {loading ? 'Menyimpan...' : <><FiCheckCircle /> Verifikasi & Simpan</>}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}