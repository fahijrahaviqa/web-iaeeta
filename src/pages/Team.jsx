import React, { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';
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
  FiBriefcase, FiCamera, FiX, FiCheck,
  FiGrid, FiGitMerge, FiZoomIn, FiCrop
} from 'react-icons/fi';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('tree'); 

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [saving, setSaving] = useState(false);
  
  // State untuk menyimpan index posisi penyisipan
  const [insertAfterIndex, setInsertAfterIndex] = useState(null);

  // State Crop Foto
  const [tempImageSrc, setTempImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  // Konfirmasi hapus
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

  const handleOpenAddModal = (defaultJabatan = '', afterMemberId = null) => {
    setEditId(null);
    setNama('');
    setJabatan(defaultJabatan);
    setImageFile(null);
    setCurrentImageUrl('');
    setTempImageSrc(null);

    // Cari index profil yang diklik agar data baru berada tepat di bawahnya
    if (afterMemberId) {
      const idx = members.findIndex(m => m.id === afterMemberId);
      setInsertAfterIndex(idx);
    } else {
      setInsertAfterIndex(null);
    }

    setShowModal(true);
  };

  const handleOpenEditModal = (member) => {
    setEditId(member.id);
    setNama(member.nama || member.name || '');
    setJabatan(member.jabatan || member.role || '');
    setImageFile(null);
    setCurrentImageUrl(member.image_url || member.foto || '');
    setTempImageSrc(null);
    setShowModal(true);
  };

  const handleRemovePhoto = () => {
    setImageFile(null);
    setCurrentImageUrl('');
    setTempImageSrc(null);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setTempImageSrc(reader.result);
        setShowCropModal(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCroppedImage = async () => {
    try {
      const croppedBlob = await getCroppedImg(tempImageSrc, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], 'avatar.jpg', { type: 'image/jpeg' });
      setImageFile(croppedFile);
      setShowCropModal(false);
    } catch (e) {
      console.error('Gagal memotong gambar:', e);
      alert('Gagal memotong gambar!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama.trim()) return alert('Nama anggota wajib diisi!');
    if (!jabatan.trim()) return alert('Jabatan anggota wajib diisi!');
    
    try {
      setSaving(true);
      let photoUrl = currentImageUrl;
      
      if (imageFile) {
        photoUrl = await uploadTeamPhoto(imageFile);
      }
      
      const payload = { nama, jabatan, image_url: photoUrl };
      
      if (editId) {
        await updateTeamMember(editId, payload);
      } else {
        // Tambah ke Supabase
        const newMember = await addTeamMember(payload);
        
        // Sisipkan posisi di state lokal agar berada tepat di bawah profil yang diklik
        if (newMember && insertAfterIndex !== null) {
          const updated = [...members];
          updated.splice(insertAfterIndex + 1, 0, newMember);
          setMembers(updated);
        }
      }
      
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

  // --- LOGIKA FILTER JABATAN (PERSIS KODE HALAMAN DEPAN) ---
  const ketua = members.filter(m => (m.jabatan || '').toLowerCase().includes('ketua') && !(m.jabatan || '').toLowerCase().includes('wakil'));
  const sekretaris = members.filter(m => (m.jabatan || '').toLowerCase().includes('sekretaris'));
  const bendahara = members.filter(m => (m.jabatan || '').toLowerCase().includes('bendahara'));

  const waka1 = members.filter(m => (m.jabatan || '').toLowerCase().includes('wakil ketua i') && !(m.jabatan || '').toLowerCase().includes('ii'));
  const waka2 = members.filter(m => (m.jabatan || '').toLowerCase().includes('wakil ketua ii') && !(m.jabatan || '').toLowerCase().includes('iii'));
  const waka3 = members.filter(m => (m.jabatan || '').toLowerCase().includes('wakil ketua iii'));

  const anggota1 = members.filter(m => ((m.jabatan || '').toLowerCase().includes('organisasi') || (m.jabatan || '').toLowerCase().includes('keanggotaan')) && !(m.jabatan || '').toLowerCase().includes('wakil'));
  const anggota2 = members.filter(m => ((m.jabatan || '').toLowerCase().includes('hukum') || (m.jabatan || '').toLowerCase().includes('kemitraan') || (m.jabatan || '').toLowerCase().includes('komunikasi')) && !(m.jabatan || '').toLowerCase().includes('wakil'));
  const anggota3 = members.filter(m => ((m.jabatan || '').toLowerCase().includes('sdm') || (m.jabatan || '').toLowerCase().includes('etika')) && !(m.jabatan || '').toLowerCase().includes('wakil'));

  const assignedIds = new Set([
    ...ketua, ...sekretaris, ...bendahara, ...waka1, ...waka2, ...waka3, ...anggota1, ...anggota2, ...anggota3
  ].map(m => m.id));
  const unassigned = members.filter(m => !assignedIds.has(m.id));

  // Render Stack Bertumpuk (Garis Menyambung Pas di Bawahnya)
  const renderStack = (memberList, defaultJabatan = '') => {
    return (
      <div className="flex flex-col items-center">
        {memberList.map((m, index) => (
          <React.Fragment key={m.id}>
            {index > 0 && <div className="w-[2px] h-[15px] bg-gray-400"></div>}
            <MemberCard 
              member={m} 
              onEdit={handleOpenEditModal}
              onAddSub={() => handleOpenAddModal(defaultJabatan || m.jabatan, m.id)}
              onDeleteConfirm={(id) => setConfirmId(id)}
              confirmId={confirmId}
              setConfirmId={setConfirmId}
              onDelete={handleDelete}
              deletingId={deletingId}
              isTree
            />
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Struktur Anggota Tim" breadcrumb={["Admin", "Tim Kami"]}>
        <div className="flex flex-wrap items-center gap-4 mt-4 sm:mt-0">
          <div className="flex items-center bg-[#ADE1FB]/20 p-1 rounded-2xl border border-[#ADE1FB]/40">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'grid' 
                  ? 'bg-[#266CA9] text-white shadow-md' 
                  : 'text-[#041D56] hover:bg-white/50'
              }`}
            >
              <FiGrid size={16} /> Grid
            </button>
            <button
              onClick={() => setViewMode('tree')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'tree' 
                  ? 'bg-[#266CA9] text-white shadow-md' 
                  : 'text-[#041D56] hover:bg-white/50'
              }`}
            >
              <FiGitMerge size={16} /> Diagram Alur
            </button>
          </div>

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
            onClick={() => handleOpenAddModal()}
            className="group relative overflow-hidden bg-gradient-to-r from-[#266CA9] to-[#266CA9] text-white font-bold text-sm px-6 py-3 rounded-2xl transition-all shadow-lg hover:shadow-[#0F2573]/30 hover:-translate-y-1 flex items-center gap-2"
          >
            <FiUserPlus className="text-lg relative z-10" />
            <span className="relative z-10">Tambah Anggota</span>
          </button>
        </div>
      </PageHeader>

      <div className="w-full">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-[2rem] h-64 border border-gray-100 shadow-sm animate-pulse flex flex-col overflow-hidden">
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
            <div className="relative w-28 h-28 bg-[#ADE1FB]/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FiUserPlus className="text-6xl text-[#266CA9]" />
            </div>
            <h3 className="text-[#041D56] font-black text-2xl mb-2 relative z-10">Tim Masih Kosong</h3>
            <p className="text-[#266CA9] max-w-md leading-relaxed mb-8 relative z-10">
              Belum ada data anggota yang terdaftar. Tambahkan anggota pertama untuk mulai membangun struktur organisasi Anda.
            </p>
            <button
              onClick={() => handleOpenAddModal()}
              className="bg-[#266CA9] hover:bg-[#041D56] text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 relative z-10 flex items-center gap-3"
            >
              <FiUserPlus size={20} /> Daftarkan Anggota
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map((member) => (
              <MemberCard 
                key={member.id} 
                member={member} 
                onEdit={handleOpenEditModal}
                onAddSub={null}
                onDeleteConfirm={(id) => setConfirmId(id)}
                confirmId={confirmId}
                setConfirmId={setConfirmId}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            ))}
          </div>
        ) : (
          /* DIAGRAM ALUR SEPERTI KODE HALAMAN DEPAN */
          <div className="bg-white rounded-[2rem] border border-[#ADE1FB]/30 p-8 shadow-sm overflow-x-auto min-w-[950px]">
            <div className="flex flex-col items-center min-w-[950px]">
              
              {/* === LEVEL 1: KETUA === */}
              {renderStack(ketua, 'Ketua')}

              {ketua.length > 0 && <div className="w-[2px] h-[25px] bg-gray-400"></div>}

              {/* === LEVEL 2: SEKRETARIS & BENDAHARA === */}
              <div className="relative flex w-full max-w-[600px]">
                <div className="absolute top-0 left-[25%] right-[25%] h-[2px] bg-gray-400"></div>

                {/* Sekretaris */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-[2px] h-[20px] bg-gray-400"></div>
                  {renderStack(sekretaris, 'Sekretaris')}
                </div>

                {/* Garis Utama Tengah */}
                <div className="absolute left-1/2 top-0 -bottom-[30px] w-[2px] bg-gray-400 -translate-x-1/2"></div>

                {/* Bendahara */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-[2px] h-[20px] bg-gray-400"></div>
                  {renderStack(bendahara, 'Bendahara')}
                </div>
              </div>

              <div className="h-[30px]"></div>

              {/* === LEVEL 3: WAKIL KETUA I, II, III & ANGGOTA === */}
              <div className="relative flex w-full">
                <div className="absolute top-0 left-[16.66%] right-[16.66%] h-[2px] bg-gray-400"></div>

                {/* Kolom 1: Waka I & Anggota Organisasi */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-[2px] h-[20px] bg-gray-400"></div>
                  {renderStack(waka1, 'Wakil Ketua I')}
                  {anggota1.length > 0 && <div className="w-[2px] h-[20px] bg-gray-400"></div>}
                  {renderStack(anggota1, 'Anggota Bidang Organisasi dan Keanggotaan')}
                </div>

                {/* Kolom 2: Waka II & Anggota Hukum/Kemitraan */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-[2px] h-[20px] bg-gray-400"></div>
                  {renderStack(waka2, 'Wakil Ketua II')}
                  {anggota2.length > 0 && <div className="w-[2px] h-[20px] bg-gray-400"></div>}
                  {renderStack(anggota2, 'Anggota Bidang Hukum, Kemitraan, dan Komunikasi')}
                </div>

                {/* Kolom 3: Waka III & Anggota SDM */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-[2px] h-[20px] bg-gray-400"></div>
                  {renderStack(waka3, 'Wakil Ketua III')}
                  {anggota3.length > 0 && <div className="w-[2px] h-[20px] bg-gray-400"></div>}
                  {renderStack(anggota3, 'Anggota Bidang SDM dan Etika Profesi')}
                </div>
              </div>

              {unassigned.length > 0 && (
                <div className="mt-12 text-center w-full">
                  <h4 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-4">Anggota Lainnya</h4>
                  <div className="flex flex-wrap justify-center gap-4">
                    {unassigned.map(m => (
                      <MemberCard 
                        key={m.id} 
                        member={m} 
                        onEdit={handleOpenEditModal}
                        onAddSub={() => handleOpenAddModal('', m.id)}
                        onDeleteConfirm={(id) => setConfirmId(id)}
                        confirmId={confirmId}
                        setConfirmId={setConfirmId}
                        onDelete={handleDelete}
                        deletingId={deletingId}
                        isTree
                      />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* Modal Form Edit / Tambah */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#01082D]/70 backdrop-blur-md" onClick={() => !saving && setShowModal(false)}></div>
          
          <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 z-10">
            <div className="bg-gradient-to-r from-[#266CA9] to-[#266CA9] px-8 py-6 flex justify-between items-center relative">
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
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#041D56] uppercase tracking-wider pl-1">Nama Lengkap</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="text-[#266CA9]" />
                    </div>
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Cth: Budi Santoso"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#ADE1FB]/5 border-2 border-[#ADE1FB]/50 rounded-2xl text-sm focus:outline-none focus:border-[#0F2573] text-[#01082D] font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#041D56] uppercase tracking-wider pl-1">Jabatan</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiBriefcase className="text-[#266CA9]" />
                    </div>
                    <input
                      type="text"
                      value={jabatan}
                      onChange={(e) => setJabatan(e.target.value)}
                      placeholder="Cth: Sekretaris II"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#ADE1FB]/5 border-2 border-[#ADE1FB]/50 rounded-2xl text-sm focus:outline-none focus:border-[#0F2573] text-[#01082D] font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#041D56] uppercase tracking-wider pl-1">Foto Profil</label>
                  <div className="flex items-center gap-4 p-4 bg-[#ADE1FB]/10 border-2 border-[#ADE1FB]/50 rounded-2xl border-dashed">
                    <div className="relative w-16 h-16 rounded-full bg-white shadow-sm overflow-hidden shrink-0 flex items-center justify-center border-2 border-[#266CA9]">
                      {imageFile ? (
                        <img src={URL.createObjectURL(imageFile)} alt="New" className="w-full h-full object-cover" />
                      ) : currentImageUrl ? (
                        <img src={currentImageUrl} alt="Current" className="w-full h-full object-cover" />
                      ) : (
                        <FiUser className="text-[#266CA9] text-3xl" />
                      )}
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-[#0F2573] hover:bg-[#041D56] text-white text-xs font-bold px-4 py-2 rounded-full transition-all inline-block">
                          Pilih Foto
                          <input
                            type="file"
                            accept="image/*"
                            onChange={onSelectFile}
                            className="hidden"
                          />
                        </label>

                        {(imageFile || currentImageUrl) && (
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-full transition-all flex items-center gap-1 border border-red-200"
                          >
                            <FiTrash2 size={13} /> Hapus Foto
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-[#266CA9]">
                        {imageFile || currentImageUrl 
                          ? "Foto terpasang. Klik 'Hapus Foto' untuk mengembalikan ke logo default." 
                          : "Belum ada foto (Menggunakan logo default user)."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/3 py-4 text-sm font-bold text-[#041D56] bg-gray-100 hover:bg-gray-200 rounded-2xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-2/3 py-4 text-sm font-bold text-white bg-[#266CA9] hover:bg-[#041D56] rounded-2xl shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <span className="animate-pulse">Menyimpan...</span>
                  ) : (
                    <>
                      <FiCheck size={18} />
                      {editId ? 'Simpan' : 'Tambah Anggota'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP MODAL CROPPER FOTO */}
      {showCropModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden p-6 space-y-4 flex flex-col items-center">
            <div className="flex justify-between items-center w-full">
              <h4 className="font-bold text-[#041D56] flex items-center gap-2">
                <FiCrop /> Krop & Atur Foto
              </h4>
              <button onClick={() => setShowCropModal(false)} className="text-gray-400 hover:text-red-500">
                <FiX size={20} />
              </button>
            </div>

            <div className="relative w-full h-64 bg-gray-900 rounded-2xl overflow-hidden">
              <Cropper
                image={tempImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="w-full flex items-center gap-3 px-2">
              <FiZoomIn className="text-gray-500" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[#266CA9] cursor-pointer"
              />
            </div>

            <div className="flex gap-3 w-full pt-2">
              <button
                onClick={() => setShowCropModal(false)}
                className="flex-1 py-3 text-xs font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                onClick={handleSaveCroppedImage}
                className="flex-1 py-3 text-xs font-bold text-white bg-[#266CA9] hover:bg-[#041D56] rounded-xl shadow-md"
              >
                Terapkan Foto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Komponen Kartu Anggota (Tombol Tambah Bawahan '+' Menyisipkan Tepat di Bawahnya)
function MemberCard({ member, onEdit, onAddSub, onDeleteConfirm, confirmId, setConfirmId, onDelete, deletingId, isTree = false }) {
  const photoUrl = member.image_url || member.foto;

  return (
    <div className={`group relative bg-white rounded-[2rem] border border-[#ADE1FB]/30 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(4,29,86,0.15)] transition-all duration-500 flex flex-col items-center text-center overflow-hidden ${
      isTree ? 'w-56' : 'w-full'
    }`}>
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#266CA9] via-[#041D56] to-[#01082D] transition-all duration-500 group-hover:h-28"></div>

      {/* Tombol Aksi Hover */}
      <div className="absolute top-3 right-3 flex gap-1.5 z-20 opacity-0 transform -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        {onAddSub && (
          <button
            onClick={onAddSub}
            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center hover:bg-green-500 transition-all"
            title="Tambah Anggota Tepat Di Bawah Ini"
          >
            <FiUserPlus size={13} />
          </button>
        )}
        <button
          onClick={() => onEdit(member)}
          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#266CA9] transition-all"
          title="Edit"
        >
          <FiEdit2 size={13} />
        </button>
        <button
          onClick={() => onDeleteConfirm(member.id)}
          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-red-300 border border-white/30 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
          title="Hapus"
        >
          <FiTrash2 size={13} />
        </button>
      </div>

      <div className="relative z-10 flex justify-center mt-10 mb-3">
        <div className="w-20 h-20 rounded-full p-1 bg-white shadow-xl group-hover:scale-105 transition-transform duration-300 flex items-center justify-center border-2 border-[#ADE1FB]/30">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={member.nama || member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-[#ADE1FB]/30 flex items-center justify-center text-[#266CA9]">
              <FiUser className="text-3xl" />
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-5 w-full flex flex-col items-center flex-1">
        <h3 className="font-bold text-[#01082D] text-sm leading-tight mb-2 line-clamp-1 w-full">
          {member.nama || member.name || 'Tanpa Nama'}
        </h3>
        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#ADE1FB]/20 border border-[#ADE1FB]/50">
          <span className="text-[10px] font-bold tracking-wide text-[#266CA9] uppercase">
            {member.jabatan || member.role || 'Anggota Tim'}
          </span>
        </div>
      </div>

      {confirmId === member.id && (
        <div className="absolute inset-0 z-30 bg-[#01082D]/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-white animate-in fade-in duration-200">
          <FiTrash2 className="text-3xl text-red-400 mb-2" />
          <h4 className="font-bold text-sm mb-1">Hapus Anggota?</h4>
          <div className="flex gap-2 w-full mt-3">
            <button
              onClick={() => setConfirmId(null)}
              className="flex-1 py-2 rounded-xl bg-white/10 text-xs font-bold hover:bg-white/20"
            >
              Batal
            </button>
            <button
              onClick={() => onDelete(member.id)}
              disabled={deletingId === member.id}
              className="flex-1 py-2 rounded-xl bg-red-500 text-xs font-bold hover:bg-red-600 shadow-md"
            >
              {deletingId === member.id ? '...' : 'Hapus'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}