import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Sesuaikan lokasi impor
import '../../assets/About.css'; 

export default function MediaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('id', id)
          .single(); 

        if (error) throw error;
        setArticle(data);
      } catch (error) {
        console.error("Gagal mengambil detail artikel:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak diketahui';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Tampilan Loading yang selaras dengan tema
  if (isLoading) return (
    <div className="about-page flex items-center justify-center min-h-screen">
      <div className="text-[#ADE1FB] text-xl animate-pulse flex flex-col items-center gap-3">
        <span className="text-3xl">⏳</span>
        <p>Memuat artikel...</p>
      </div>
    </div>
  );

  // Tampilan Error / Tidak Ditemukan
  if (!article) return (
    <div className="about-page flex items-center justify-center min-h-screen">
      <div className="text-gray-300 text-xl flex flex-col items-center gap-3">
        <span className="text-4xl">⚠️</span>
        <p>Artikel tidak ditemukan.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#ADE1FB] hover:text-white underline">
          Kembali ke halaman sebelumnya
        </button>
      </div>
    </div>
  );

  return (
    <div className="about-page pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Tombol Kembali Modern */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-[#ADE1FB] hover:text-white transition-colors duration-300 mb-8 font-semibold group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
          Kembali ke Daftar Media
        </button>

        {/* Kotak Artikel (Efek Glassmorphism) */}
        <div className="bg-[#041D56]/50 backdrop-blur-md border border-[#0F2573] rounded-3xl p-6 md:p-10 shadow-2xl">
          
          {/* Gambar Penuh dengan proporsi proporsional */}
          <div className="w-full h-[300px] md:h-[450px] overflow-hidden rounded-2xl mb-10 shadow-lg border border-[#0F2573]/50">
            <img 
              src={article.image_url} 
              alt={article.title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
            />
          </div>

          {/* Header Konten: Judul & Tanggal */}
          <div className="mb-8 border-b border-[#0F2573] pb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-[#ADE1FB] text-sm md:text-base font-medium">
              <span>📅</span>
              <span>Dipublikasikan pada {formatDate(article.tanggal_kegiatan)}</span>
            </div>
          </div>
          
          {/* Deskripsi Lengkap dengan tipografi yang nyaman */}
          <div className="text-gray-300 text-lg leading-relaxed md:leading-loose space-y-6">
            {article.description.split('\n').map((paragraph, index) => (
              paragraph.trim() !== '' && (
                <p key={index} className="text-justify">{paragraph}</p>
              )
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}