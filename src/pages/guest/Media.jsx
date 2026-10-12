import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import '../../assets/About.css';  
import '../../assets/Media.css';  
import { supabase } from '../../supabaseClient'; 

export default function Media() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // 2. Inisialisasi navigate

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('tanggal_kegiatan', { ascending: false });

        if (error) throw error;
        setNewsItems(data);
      } catch (error) {
        console.error("Gagal mengambil data media:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMedia();
  }, []);

  useEffect(() => {
    if (newsItems.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show-element');
      });
    });
    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));
    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, [newsItems]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak diketahui';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="about-page">
      <header className="about-hero">
        <h1 className="hidden-element">Media & Publikasi</h1>
        <p className="hidden-element delay-100">
          Ikuti perkembangan terbaru mengenai kegiatan operasional, pemeliharaan sistem, serta inovasi teknologi.
        </p>
      </header>

      <section className="media-section">
        <h2 className="hidden-element media-title">Kegiatan</h2>
        
        {isLoading ? (
          <p style={{ textAlign: 'center' }}>Memuat berita terkini...</p>
        ) : (
          <div className="media-grid">
            {newsItems.length > 0 ? (
              newsItems.map((item, index) => {
                const delayClass = `delay-${(index + 1) * 100}`;
                return (
                  <div key={item.id} className={`media-card hidden-element ${delayClass}`}>
                    <div className="media-image-container">
                      <span className="media-category">Publikasi</span>
                      <img src={item.image_url} alt={item.title} className="media-image" />
                    </div>
                    
                    <div className="media-content">
                      <p className="media-date">{formatDate(item.tanggal_kegiatan)}</p>
                      <h3 className="media-heading">{item.title}</h3>
                    
                      
                      {/* 3. Tambahkan onClick pada tombol */}
                      <button 
                        className="media-btn" 
                        onClick={() => navigate(`/media/${item.id}`)}
                      >
                        Baca Selengkapnya &rarr;
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: 'center', width: '100%' }}>Belum ada publikasi saat ini.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}