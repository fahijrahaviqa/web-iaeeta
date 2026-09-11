import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { getGalleryItems, addGalleryItem, deleteGalleryItem } from '../galleryService';
import { FiUploadCloud, FiTrash2, FiCamera, FiImage, FiType, FiAlignLeft, FiX } from 'react-icons/fi';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await getGalleryItems();
      setItems(data || []);
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

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Pilih foto terlebih dahulu!');

    try {
      setUploading(true);
      await addGalleryItem(title, description, file);
      setTitle('');
      setDescription('');
      handleRemoveFile();
      fetchGallery();
    } catch (err) {
      alert(`Gagal mengunggah foto: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus foto ini?')) return;
    try {
      await deleteGalleryItem(id);
      fetchGallery();
    } catch (err) {
      alert(`Gagal menghapus: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Kelola Galeri Foto" breadcrumb={["Admin", "Galeri Foto"]} />

      <div className="flex flex-col xl:flex-row gap-8 items-start">
        
        {/* Kolom Kiri: Form Upload */}
        <div className="w-full xl:w-1/3 xl:sticky xl:top-6 shrink-0 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ADE1FB] to-[#266CA9] rounded-[2rem] blur opacity-20"></div>
          
          <div className="relative bg-white rounded-3xl p-8 border border-[#ADE1FB]/30 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0F2573] to-[#041D56] flex items-center justify-center shadow-md shadow-[#0F2573]/20">
                <FiUploadCloud className="text-2xl text-[#ADE1FB]" />
              </div>
              <div>
                <h3 className="font-extrabold text-2xl text-[#01082D] tracking-tight">Upload Foto</h3>
                <p className="text-sm font-medium text-[#266CA9]">Dokumentasikan momen baru</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group rounded-2xl overflow-hidden transition-all duration-300">
                {!previewUrl ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      required
                    />
                    <div className="border-2 border-dashed border-[#ADE1FB] bg-[#ADE1FB]/5 group-hover:bg-[#ADE1FB]/20 group-hover:border-[#266CA9] rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <FiCamera className="text-3xl text-[#266CA9]" />
                      </div>
                      <p className="text-sm font-bold text-[#041D56] mb-1">Seret & Lepas Foto</p>
                      <p className="text-xs text-[#266CA9] font-medium bg-white px-3 py-1 rounded-full shadow-sm mt-2">atau klik untuk mencari</p>
                    </div>
                  </>
                ) : (
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#0F2573] shadow-md group">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-[#01082D]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
                      >
                        <FiX /> Ganti Foto
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiType className="text-[#266CA9]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Judul Foto..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-[#266CA9] rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-[#ADE1FB]/50 text-[#01082D] font-medium transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                    <FiAlignLeft className="text-[#266CA9]" />
                  </div>
                  <textarea
                    placeholder="Tulis deskripsi singkat..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-[#266CA9] rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-[#ADE1FB]/50 text-[#01082D] font-medium transition-all resize-none"
                    rows="3"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="relative w-full overflow-hidden rounded-xl text-white font-bold text-sm py-4 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#041D56] to-[#0F2573] transition-transform duration-300 group-hover:scale-105"></div>
                <div className="relative flex items-center justify-center gap-2">
                  {uploading ? (
                    <span className="animate-pulse flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Mengunggah...
                    </span>
                  ) : (
                    <>Simpan ke Galeri <FiUploadCloud className="text-lg" /></>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>

        {/* Kolom Kanan: Grid Seragam (Square/Ratio Tetap) */}
        <div className="w-full xl:w-2/3">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <h3 className="font-extrabold text-2xl text-[#01082D] flex items-center gap-2 mb-1">
                Koleksi <span className="text-[#266CA9]">Tersimpan</span>
              </h3>
              <p className="text-sm font-medium text-gray-500">Semua foto yang telah dipublikasikan</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#ADE1FB]/20 border border-[#ADE1FB]/50 px-4 py-2 rounded-full">
              <FiImage className="text-[#0F2573]" />
              <span className="text-sm font-bold text-[#0F2573]">{items.length} Total</span>
            </div>
          </div>

          {loading ? (
            // Loading Skeleton Seragam
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 animate-pulse aspect-[4/3] rounded-3xl w-full"></div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-[#ADE1FB] rounded-3xl p-16 text-center flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-[#ADE1FB]/20 rounded-full flex items-center justify-center mb-5">
                <FiImage className="text-5xl text-[#266CA9]" />
              </div>
              <p className="text-[#041D56] font-extrabold text-xl mb-2">Belum Ada Koleksi</p>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                Ruang galeri Anda masih kosong. Silakan unggah foto pertama Anda melalui form di sebelah kiri.
              </p>
            </div>
          ) : (
            // Grid Seragam (aspect-[4/3] memaksakan proporsi persegi panjang seragam 4:3)
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgb(4,29,86,0.15)] transition-all duration-500 border border-gray-100 cursor-pointer aspect-[9/5]"
                >
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                  />
                  
                  {/* Overlay Blur Premium */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#01082D]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Tombol Hapus Mengambang */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-red-500 hover:text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-600 hover:scale-110 shadow-lg z-20"
                    title="Hapus Foto"
                  >
                    <FiTrash2 className="text-lg" />
                  </button>

                  {/* Konten Teks yang Muncul */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10 flex flex-col justify-end h-full">
                    <div>
                      <div className="w-8 h-1 bg-[#ADE1FB] rounded-full mb-3 transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                      <h4 className="font-extrabold text-white text-xl leading-tight mb-2 drop-shadow-md line-clamp-2">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-sm text-[#ADE1FB] line-clamp-2 leading-relaxed opacity-90">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}