import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Sesuaikan lokasi impor
import '../../assets/About.css'; 

export default function MediaDetail() {
  const { id } = useParams(); // Mengambil parameter :id dari URL
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
          .single(); // Ambil hanya satu baris data berdasarkan ID

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

  if (isLoading) return <div className="about-page"><p style={{ textAlign: 'center', marginTop: '50px' }}>Memuat artikel...</p></div>;
  if (!article) return <div className="about-page"><p style={{ textAlign: 'center', marginTop: '50px' }}>Artikel tidak ditemukan.</p></div>;

  return (
    <div className="about-page">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Tombol Kembali */}
        <button 
          onClick={() => navigate(-1)} 
          style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer', border: 'none', borderRadius: '4px', background: '#e0e0e0' }}
        >
          &larr; Kembali
        </button>

        {/* Gambar Penuh */}
        <img 
          src={article.image_url} 
          alt={article.title} 
          style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }} 
        />

        {/* Konten Detail */}
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{article.title}</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>{formatDate(article.tanggal_kegiatan)}</p>
        
        {/* Deskripsi Lengkap */}
        <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
          {/* Mengubah line break database menjadi <br /> agar format paragraf terjaga */}
          {article.description.split('\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '16px' }}>{paragraph}</p>
          ))}
        </div>

      </div>
    </div>
  );
}