import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { getGalleryItems, addGalleryItem, deleteGalleryItem, updateGalleryItem } from '../galleryService';
import { FiUploadCloud, FiTrash2, FiCamera, FiImage, FiType, FiAlignLeft, FiX, FiEdit2, FiCheck, FiCalendar, FiFilter } from 'react-icons/fi';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tanggalKegiatan, setTanggalKegiatan] = useState(''); 
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // State Edit
  const [editId, setEditId] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);

  // State Konfirmasi Hapus
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // PERBAIKAN FILTER: Menggunakan format YYYY-MM dari input kalender
  const [filterMonth, setFilterMonth] = useState('');

  // State Mobile Tap
  const [activeCard, setActiveCard] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await getGalleryItems();
      
      const sortedData = (data || []).sort((a, b) => {
        if (!a.tanggal_kegiatan) return 1;
        if (!b.tanggal_kegiatan) return -1;
        return new Date(b.tanggal_kegiatan) - new Date(a.tanggal_kegiatan);
      });

      setItems(sortedData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTitle('');
    setDescription('');
    setTanggalKegiatan(''); 
    setFile(null);
    setPreviewUrl(null);
    setCurrentImageUrl(null);
  };

  const handleEditClick = (item) => {
    setEditId(item.id);
    setTitle(item.title);
    setDescription(item.description || '');
    setTanggalKegiatan(item.tanggal_kegiatan || ''); 
    setFile(null);
    setPreviewUrl(item.image_url);
    setCurrentImageUrl(item.image_url);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editId && !file) return alert('Pilih foto terlebih dahulu!');
    if (!tanggalKegiatan) return alert('Tanggal kegiatan wajib diisi!');

    try {
      setUploading(true);
      
      if (editId) {
        await updateGalleryItem(editId, title, description, file, currentImageUrl, tanggalKegiatan);
      } else {
        await addGalleryItem(title, description, file, tanggalKegiatan);
      }
      
      handleCancelEdit();
      fetchGallery(); 
    } catch (err) {
      alert(`Gagal menyimpan data: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteGalleryItem(id);
      if (editId === id) handleCancelEdit();
      fetchGallery();
    } catch (err) {
      alert(`Gagal menghapus: ${err.message}`);
    } finally {
      setDeletingId(null);
      setConfirmId(null); 
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // LOGIKA FILTER BARU BERDASARKAN KALENDER (YYYY-MM)
  const filteredItems = items.filter(item => {
    if (!filterMonth) return true; // Jika kalender kosong, tampilkan semua
    if (!item.tanggal_kegiatan) return false;
    
    // Potong tanggal kegiatan (misal 2026-11-20) menjadi YYYY-MM saja (2026-11)
    const itemMonth = item.tanggal_kegiatan.substring(0, 7); 
    return itemMonth === filterMonth;
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <PageHeader title="Kelola Galeri Foto" breadcrumb={["Admin", "Galeri Foto"]} />

      <div className="flex flex-col xl:flex-row gap-6 md:gap-8 items-start">
        
        {/* Kolom Kiri: Form */}
        <div className="w-full xl:w-1/3 xl:sticky xl:top-6 shrink-0 relative z-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ADE1FB] to-[#266CA9] rounded-[2rem] blur opacity-20 hidden md:block"></div>
          
          <div className="relative bg-white rounded-3xl p-6 md:p-8 border border-[#ADE1FB]/30 shadow-md md:shadow-xl">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#0F2573] to-[#041D56] flex items-center justify-center shadow-md shadow-[#0F2573]/20 shrink-0">
                {editId ? <FiEdit2 className="text-xl md:text-2xl text-[#ADE1FB]" /> : <FiUploadCloud className="text-xl md:text-2xl text-[#ADE1FB]" />}
              </div>
              <div>
                <h3 className="font-extrabold text-xl md:text-2xl text-[#01082D] tracking-tight">
                  {editId ? 'Edit Foto' : 'Upload Foto'}
                </h3>
                <p className="text-xs md:text-sm font-medium text-[#266CA9]">
                  {editId ? 'Ubah rincian momen ini' : 'Dokumentasikan momen baru'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="relative group rounded-2xl overflow-hidden transition-all duration-300">
                {!previewUrl ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      required={!editId}
                    />
                    <div className="border-2 border-dashed border-[#ADE1FB] bg-[#ADE1FB]/5 group-hover:bg-[#ADE1FB]/20 group-hover:border-[#266CA9] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[160px]">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                        <FiCamera className="text-2xl md:text-3xl text-[#266CA9]" />
                      </div>
                      <p className="text-xs md:text-sm font-bold text-[#041D56] mb-1">Pilih Foto</p>
                      <p className="text-[10px] md:text-xs text-[#266CA9] font-medium bg-white px-3 py-1 rounded-full shadow-sm mt-1 md:mt-2">Klik untuk mencari file</p>
                    </div>
                  </>
                ) : (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#0F2573] shadow-md group">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="absolute inset-0 bg-[#01082D]/40 md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] pointer-events-none z-10">
                      <div className="bg-white text-[#0F2573] font-bold text-[10px] md:text-xs px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <FiCamera /> Ganti Foto
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FiType className="text-[#266CA9] text-sm md:text-base" />
                  </div>
                  <input
                    type="text"
                    placeholder="Judul Foto..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-9 md:pl-11 pr-3 md:pr-4 py-3 md:py-3.5 bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-[#266CA9] rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-[#ADE1FB]/50 text-[#01082D] font-medium transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                    <FiCalendar className="text-[#266CA9] text-sm md:text-base" />
                  </div>
                  <input
                    type="date"
                    value={tanggalKegiatan}
                    onChange={(e) => setTanggalKegiatan(e.target.value)}
                    className="w-full pl-9 md:pl-11 pr-3 md:pr-4 py-3 md:py-3.5 bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-[#266CA9] rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-[#ADE1FB]/50 text-[#01082D] font-medium transition-all cursor-text"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute top-3 md:top-4 left-0 pl-3 md:pl-4 pointer-events-none">
                    <FiAlignLeft className="text-[#266CA9] text-sm md:text-base" />
                  </div>
                  <textarea
                    placeholder="Tulis deskripsi singkat..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full pl-9 md:pl-11 pr-3 md:pr-4 py-3 md:py-3.5 bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-[#266CA9] rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 md:focus:ring-4 focus:ring-[#ADE1FB]/50 text-[#01082D] font-medium transition-all resize-none"
                    rows="3"
                  />
                </div>
              </div>

              <div className="flex gap-2 md:gap-3">
                {editId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={uploading}
                    className="w-1/3 bg-gray-100 hover:bg-gray-200 text-[#041D56] font-bold text-xs md:text-sm py-3 md:py-4 rounded-xl transition-colors disabled:opacity-70"
                  >
                    Batal
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={uploading}
                  className={`relative ${editId ? 'w-2/3' : 'w-full'} overflow-hidden rounded-xl text-white font-bold text-xs md:text-sm py-3 md:py-4 group disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#041D56] to-[#0F2573] transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    {uploading ? (
                      <span className="animate-pulse flex items-center gap-2">
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Menyimpan...
                      </span>
                    ) : (
                      <>
                        {editId ? 'Simpan' : 'Simpan Foto'} 
                        {editId ? <FiCheck className="text-base md:text-lg" /> : <FiUploadCloud className="text-base md:text-lg" />}
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Kolom Kanan: Grid Foto */}
        <div className="w-full xl:w-2/3 mt-4 md:mt-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h3 className="font-extrabold text-xl md:text-2xl text-[#01082D] flex items-center gap-2 mb-1">
                Koleksi <span className="text-[#266CA9]">Tersimpan</span>
              </h3>
              <p className="text-xs md:text-sm font-medium text-gray-500">Semua foto yang telah dipublikasikan</p>
            </div>
            
            {/* Bagian Filter Baru dengan Kalender Bulan-Tahun (Month Picker) */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-grow sm:flex-grow-0">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFilter className="text-[#266CA9]" />
                  </div>
                  {/* Input type="month" memunculkan kalender pilih bulan dan tahun */}
                  <input
                    type="month"
                    value={filterMonth}
                    onChange={(e) => setFilterMonth(e.target.value)}
                    className="w-full sm:w-auto pl-9 pr-4 py-2 md:py-2.5 bg-white border border-[#ADE1FB]/50 focus:border-[#266CA9] rounded-full text-xs md:text-sm font-bold text-[#0F2573] focus:outline-none cursor-pointer shadow-sm transition-colors"
                  />
                </div>
                
                {/* Tombol Clear Filter: Hanya muncul jika ada bulan yang dipilih */}
                {filterMonth && (
                  <button 
                    onClick={() => setFilterMonth('')}
                    className="p-2 md:p-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-full border border-red-100 transition-colors"
                    title="Hapus Filter (Tampilkan Semua)"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>

              <div className="inline-flex items-center gap-1.5 md:gap-2 bg-[#ADE1FB]/20 border border-[#ADE1FB]/50 px-3 md:px-4 py-2 md:py-2.5 rounded-full shrink-0">
                <FiImage className="text-[#0F2573] text-sm" />
                <span className="text-[10px] md:text-sm font-bold text-[#0F2573]">{filteredItems.length} Total</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 animate-pulse aspect-[4/3] rounded-3xl w-full"></div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-[#ADE1FB] rounded-3xl p-8 md:p-16 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-[#ADE1FB]/20 rounded-full flex items-center justify-center mb-4 md:mb-5">
                <FiImage className="text-3xl md:text-5xl text-[#266CA9]" />
              </div>
              <p className="text-[#041D56] font-extrabold text-lg md:text-xl mb-2">Tidak Ada Foto</p>
              <p className="text-gray-500 text-xs md:text-sm max-w-sm leading-relaxed px-4">
                {filterMonth 
                  ? `Tidak ada dokumentasi kegiatan yang ditemukan pada periode tersebut.`
                  : `Ruang galeri Anda masih kosong. Silakan unggah foto pertama Anda.`}
              </p>
              {filterMonth && (
                <button 
                  onClick={() => setFilterMonth('')}
                  className="mt-4 text-sm font-bold text-[#266CA9] hover:underline"
                >
                  Tampilkan Semua Waktu
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pb-10">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 aspect-[4/3] sm:aspect-[9/5] cursor-pointer"
                >
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transform md:group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  />
                  
                  <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#01082D]/90 transition-opacity duration-500 pointer-events-none ${
                    activeCard === item.id ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                  }`}></div>
                  
                  {confirmId !== item.id && (
                    <div className={`absolute top-3 right-3 md:top-4 md:right-4 flex gap-1.5 md:gap-2 transform transition-all duration-300 z-20 ${
                      activeCard === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                    }`}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEditClick(item); }}
                        className="bg-white/90 backdrop-blur-md text-[#266CA9] hover:text-white p-2 md:p-2.5 rounded-full hover:bg-[#266CA9] shadow-md transition-colors"
                        title="Edit Foto"
                      >
                        <FiEdit2 className="text-sm md:text-lg" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirmId(item.id); }} 
                        className="bg-white/90 backdrop-blur-md text-red-500 hover:text-white p-2 md:p-2.5 rounded-full hover:bg-red-600 shadow-md transition-colors"
                        title="Hapus Foto"
                      >
                        <FiTrash2 className="text-sm md:text-lg" />
                      </button>
                    </div>
                  )}

                  {confirmId !== item.id && (
                    <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 transform transition-all duration-500 ease-out z-10 flex flex-col justify-end h-full pointer-events-none ${
                      activeCard === item.id ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100'
                    }`}>
                      <div>
                        {item.tanggal_kegiatan && (
                          <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-black uppercase tracking-wider mb-1">
                            <div className="bg-white/90 backdrop-blur text-[#266CA9] px-1.5 md:px-2 py-0.5 md:py-1 rounded flex items-center gap-1">
                              <FiCalendar size={10} />
                              {formatDate(item.tanggal_kegiatan)}
                            </div>
                          </div>
                        )}
                        <h4 className="font-extrabold text-white text-base md:text-xl leading-tight mb-1 drop-shadow-md line-clamp-2 mt-1 md:mt-2">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-xs md:text-sm text-[#ADE1FB] line-clamp-2 leading-relaxed opacity-90">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {confirmId === item.id && (
                    <div className="absolute inset-0 z-30 bg-[#01082D]/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-white animate-in fade-in duration-300">
                      <FiTrash2 className="text-3xl md:text-4xl text-red-400 mb-2 md:mb-3" />
                      <h4 className="font-bold text-sm md:text-lg mb-1">Hapus Foto?</h4>
                      <div className="flex gap-2 w-full mt-3">
                        <button
                          onClick={(e) => { e.stopPropagation(); setConfirmId(null); }}
                          className="flex-1 py-2 md:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-xs md:text-sm transition-colors border border-white/20"
                        >
                          Batal
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                          disabled={deletingId === item.id}
                          className="flex-1 py-2 md:py-2.5 rounded-xl bg-red-500 hover:bg-red-600 font-bold text-xs md:text-sm transition-colors shadow-lg flex items-center justify-center"
                        >
                          {deletingId === item.id ? 'Menghapus...' : 'Ya, Hapus'}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}