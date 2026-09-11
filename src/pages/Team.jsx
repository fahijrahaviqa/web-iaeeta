import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { 
  getTeamMembers, 
  addTeamMember, 
  updateTeamMember, 
  deleteTeamMember,
  uploadTeamPhoto 
} from '../teamService';
import { 
  FiUserPlus, FiEdit2, FiTrash2, FiUser, 
  FiBriefcase, FiAlignLeft, FiCamera, FiX, FiCheck, FiPhone
} from 'react-icons/fi';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State (Ditambah noHp)
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [noHp, setNoHp] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  // Konfirmasi hapus inline
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const data = await getTeamMembers();
      setMembers(data || []);
    } catch (err) {
      console.error('Gagal memuat data tim:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleOpenAddModal = () => {
    setEditId(null);
    setNama('');
    setJabatan('');
    setNoHp('');
    setDeskripsi('');
    setImageFile(null);
    setCurrentImageUrl('');
    setShowModal(true);
  };

  const handleOpenEditModal = (member) => {
    setEditId(member.id);
    setNama(member.nama || member.name || '');
    setJabatan(member.jabatan || member.role || '');
    setNoHp(member.no_hp || member.phone || '');
    setDeskripsi(member.deskripsi || member.bio || '');
    setImageFile(null);
    setCurrentImageUrl(member.image_url || member.foto || '');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama.trim()) return alert('Nama anggota wajib diisi!');
    try {
      setSaving(true);
      let photoUrl = currentImageUrl;
      if (imageFile) photoUrl = await uploadTeamPhoto(imageFile);
      
      // Payload dikirim beserta no_hp
      const payload = { nama, jabatan, no_hp: noHp, deskripsi, image_url: photoUrl };
      
      if (editId) await updateTeamMember(editId, payload);
      else await addTeamMember(payload);
      
      setShowModal(false);
      fetchTeam();
    } catch (err) {
      alert(`Gagal menyimpan data: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteTeamMember(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      alert(`Gagal menghapus: ${err.message}`);
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Struktur Anggota Tim" breadcrumb={["Admin", "Tim Kami"]}>
        <div className="flex flex-wrap items-center gap-4 mt-4 sm:mt-0">
          <div className="inline-flex items-center gap-3 bg-white border border-[#ADE1FB]/50 px-5 py-2.5 rounded-2xl shadow-sm">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#266CA9] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0F2573]"></span>
            </div>
            <span className="text-sm font-extrabold text-[#041D56]">
              <span className="text-[#266CA9] mr-1">{members.length}</span> Personel
            </span>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="group relative overflow-hidden bg-gradient-to-r from-[#85cef3] to-[#0F2573] text-white font-bold text-sm px-6 py-3 rounded-2xl transition-all shadow-lg hover:shadow-[#0F2573]/30 hover:-translate-y-1 flex items-center gap-2"
          >
            <div className="absolute inset-0 w-full h-full bg-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            <FiUserPlus className="text-lg relative z-10" />
            <span className="relative z-10">Tambah Anggota</span>
          </button>
        </div>
      </PageHeader>

      <div className="w-full">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] h-80 border border-gray-100 shadow-sm animate-pulse flex flex-col overflow-hidden">
                <div className="h-28 bg-[#ADE1FB]/30 w-full"></div>
                <div className="px-6 flex flex-col items-center -mt-10">
                  <div className="w-20 h-20 rounded-full bg-white p-1 mb-4">
                    <div className="w-full h-full rounded-full bg-[#ADE1FB]/50"></div>
                  </div>
                  <div className="w-3/4 h-5 bg-[#ADE1FB]/40 rounded-full mb-3"></div>
                  <div className="w-1/2 h-4 bg-[#ADE1FB]/20 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="relative bg-white rounded-[2rem] border-2 border-dashed border-[#ADE1FB] p-20 text-center flex flex-col items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ADE1FB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative w-28 h-28 bg-[#ADE1FB]/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FiUserPlus className="text-6xl text-[#266CA9]" />
            </div>
            <h3 className="text-[#041D56] font-black text-2xl mb-2 relative z-10">Tim Masih Kosong</h3>
            <p className="text-[#266CA9] max-w-md leading-relaxed mb-8 relative z-10">
              Belum ada data anggota yang terdaftar. Tambahkan anggota pertama untuk mulai membangun struktur organisasi Anda.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="bg-[#266CA9] hover:bg-[#041D56] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 relative z-10 flex items-center gap-3"
            >
              <FiUserPlus size={20} /> Daftarkan Anggota
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                className="group relative bg-white rounded-[2rem] border border-[#ADE1FB]/30 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(4,29,86,0.15)] transition-all duration-500 flex flex-col items-center text-center overflow-hidden"
              >
                {/* Latar Belakang Top-Card Premium */}
                <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-br from-[#266CA9] via-[#041D56] to-[#01082D] transition-all duration-500 group-hover:h-32">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-[#ADE1FB] opacity-10 rounded-full blur-xl"></div>
                </div>

                {/* Tombol Aksi Mengambang (Muncul saat hover) */}
                <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 transform -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <button
                    onClick={() => handleOpenEditModal(member)}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#266CA9] transition-all"
                    title="Edit Profil"
                  >
                    <FiEdit2 size={15} />
                  </button>
                  <button
                    onClick={() => setConfirmId(member.id)}
                    className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-red-300 border border-white/30 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
                    title="Hapus"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>

                {/* Foto Avatar */}
                <div className="relative z-10 flex justify-center mt-12 mb-5">
                  <div className="w-28 h-28 rounded-full p-1.5 bg-white shadow-xl group-hover:scale-110 transition-transform duration-500 ease-out">
                    <img
                      src={
                        member.image_url || member.foto ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(member.nama || member.name || 'User')}&background=ADE1FB&color=0F2573`
                      }
                      alt={member.nama || member.name}
                      className="w-full h-full rounded-full object-cover border-2 border-[#ADE1FB]/30"
                    />
                  </div>
                </div>

                {/* Info Konten */}
                <div className="px-6 pb-8 w-full flex flex-col items-center flex-1">
                  <h3 className="font-bold text-[#01082D] text-xl leading-tight mb-2 line-clamp-1 w-full">
                    {member.nama || member.name || 'Tanpa Nama'}
                  </h3>
                  
                  {/* Jabatan & No HP */}
                  <div className="flex flex-col items-center gap-2 mb-4">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#ADE1FB]/20 border border-[#ADE1FB]/50">
                      <span className="text-xs font-bold tracking-wide text-[#266CA9] uppercase">
                        {member.jabatan || member.role || 'Anggota Tim'}
                      </span>
                    </div>
                    {(member.no_hp || member.phone) && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#266CA9]">
                        <FiPhone />
                        <span>{member.no_hp || member.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-[#266CA9] line-clamp-3 leading-relaxed">
                    {member.deskripsi || member.bio || 'Tidak ada deskripsi profil untuk anggota ini.'}
                  </p>
                </div>

                {/* Overlay Konfirmasi Hapus */}
                {confirmId === member.id && (
                  <div className="absolute inset-0 z-30 bg-[#01082D]/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-white animate-in fade-in duration-300">
                    <FiTrash2 className="text-4xl text-red-400 mb-3" />
                    <h4 className="font-bold text-lg mb-1">Hapus Anggota?</h4>
                    <p className="text-xs text-gray-300 text-center mb-6">Tindakan ini tidak dapat dibatalkan.</p>
                    <div className="flex gap-3 w-full">
                      <button
                        onClick={() => setConfirmId(null)}
                        className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-sm transition-colors border border-white/20"
                      >
                        Batal
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        disabled={deletingId === member.id}
                        className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 font-bold text-sm transition-colors shadow-lg flex items-center justify-center"
                      >
                        {deletingId === member.id ? 'Menghapus...' : 'Ya, Hapus'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Popup Ultra Modern */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#01082D]/70 backdrop-blur-md" onClick={() => !saving && setShowModal(false)}></div>
          
          <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-[#266CA9] to-[#266CA9] px-8 py-6 flex justify-between items-center relative">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#ADE1FB] opacity-10 rounded-full blur-2xl"></div>
              <div>
                <h3 className="font-black text-2xl text-white relative z-10 tracking-tight">
                  {editId ? 'Perbarui Profil' : 'Anggota Baru'}
                </h3>
                <p className="text-[#ADE1FB] text-xs font-medium mt-1 relative z-10">Lengkapi informasi profil di bawah ini</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors relative z-10"
              >
                <FiX size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              
              <div className="space-y-5">
                {/* Baris 1: Nama Lengkap */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#041D56] uppercase tracking-wider pl-1">Nama Lengkap</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="text-[#266CA9] group-focus-within:text-[#0F2573] transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Cth: Ahmad Subagja"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#ADE1FB]/5 border-2 border-[#ADE1FB]/50 rounded-2xl text-sm focus:outline-none focus:ring-0 focus:border-[#0F2573] text-[#01082D] font-medium transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Baris 2: Jabatan & No Handphone (2 Kolom) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#041D56] uppercase tracking-wider pl-1">Jabatan</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiBriefcase className="text-[#266CA9] group-focus-within:text-[#0F2573] transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={jabatan}
                        onChange={(e) => setJabatan(e.target.value)}
                        placeholder="Cth: Ketua Umum"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#ADE1FB]/5 border-2 border-[#ADE1FB]/50 rounded-2xl text-sm focus:outline-none focus:ring-0 focus:border-[#0F2573] text-[#01082D] font-medium transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#041D56] uppercase tracking-wider pl-1">No Handphone</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiPhone className="text-[#266CA9] group-focus-within:text-[#0F2573] transition-colors" />
                      </div>
                      <input
                        type="tel"
                        value={noHp}
                        onChange={(e) => setNoHp(e.target.value)}
                        placeholder="Cth: 081234567890"
                        className="w-full pl-11 pr-4 py-3.5 bg-[#ADE1FB]/5 border-2 border-[#ADE1FB]/50 rounded-2xl text-sm focus:outline-none focus:ring-0 focus:border-[#0F2573] text-[#01082D] font-medium transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Baris 3: Deskripsi */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#041D56] uppercase tracking-wider pl-1">Deskripsi Singkat</label>
                  <div className="relative group">
                    <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                      <FiAlignLeft className="text-[#266CA9] group-focus-within:text-[#0F2573] transition-colors" />
                    </div>
                    <textarea
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      placeholder="Tuliskan latar belakang, pencapaian, atau moto..."
                      rows="3"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#ADE1FB]/5 border-2 border-[#ADE1FB]/50 rounded-2xl text-sm focus:outline-none focus:ring-0 focus:border-[#0F2573] text-[#01082D] font-medium transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Baris 4: Foto Profil */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#041D56] uppercase tracking-wider pl-1">Foto Profil</label>
                  <div className="flex items-center gap-5 p-4 bg-[#ADE1FB]/10 border-2 border-[#ADE1FB]/50 rounded-2xl border-dashed">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm overflow-hidden shrink-0 flex items-center justify-center border-2 border-[#266CA9]">
                      {imageFile ? (
                        <img src={URL.createObjectURL(imageFile)} alt="New" className="w-full h-full object-cover" />
                      ) : currentImageUrl ? (
                        <img src={currentImageUrl} alt="Current" className="w-full h-full object-cover" />
                      ) : (
                        <FiCamera className="text-[#266CA9] text-2xl" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full text-sm text-[#041D56] file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#0F2573] file:text-white hover:file:bg-[#041D56] cursor-pointer transition-all"
                      />
                      <p className="text-[10px] text-[#266CA9] mt-2 ml-1">Format: JPG, PNG. Maks: 2MB.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/3 py-4 text-sm font-bold text-[#041D56] bg-gray-100 hover:bg-gray-200 rounded-2xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-2/3 py-4 text-sm font-bold text-white bg-gradient-to-r from-[#266CA9] to-[#266CA9] hover:from-[#1c4b74] hover:to-[#1c4b74] rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <span className="animate-pulse">Menyimpan Data...</span>
                  ) : (
                    <>
                      <FiCheck size={18} />
                      {editId ? 'Simpan Perubahan' : 'Registrasi Anggota'}
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}