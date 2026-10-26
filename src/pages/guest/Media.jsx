import React, { useEffect, useState } from 'react';
import '../../assets/About.css';  
import '../../assets/Media.css';  
import { supabase } from '../../supabaseClient'; 

export default function Media() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk mengontrol Modal (Halaman Mengambang)
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('tanggal_kegiatan', { ascending: false });

        if (error) throw error;

        // Pengurutan Permanen: Terbaru di Paling Atas (Descending)
        const sortedData = (data || []).sort((a, b) => {
          if (!a.tanggal_kegiatan) return 1; 
          if (!b.tanggal_kegiatan) return -1;
          return new Date(b.tanggal_kegiatan) - new Date(a.tanggal_kegiatan); 
        });

        setNewsItems(sortedData);
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

  // Efek untuk mengunci scroll layar latar belakang saat modal terbuka
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Bersihkan saat komponen dilepas
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedArticle]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak diketahui';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="about-page">
      {/* MENAMBAHKAN ANIMASI CSS KEYFRAMES UNTUK MODAL */}
      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popInModal {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

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
                    
                      
                      {/* Tombol memicu state untuk menampilkan Modal */}
                      <button 
                        className="media-btn" 
                        onClick={() => setSelectedArticle(item)}
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

      {/* ================= HALAMAN MENGAMBANG (MODAL DETAIL) DENGAN ANIMASI ================= */}
      {selectedArticle && (
        <div 
          style={modalStyles.overlay} 
          onClick={() => setSelectedArticle(null)} // Tutup jika luar kotak di klik
        >
          {/* Konten Modal */}
          <div 
            style={modalStyles.contentBox} 
            onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam kotak menutup modal
          >
            {/* Tombol Tutup (X) */}
            <button 
              style={modalStyles.closeBtn} 
              onClick={() => setSelectedArticle(null)}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e2e8f0'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f1f5f9'}
            >
              ✕
            </button>

            {/* Gambar Besar */}
            {selectedArticle.image_url && (
              <img 
                src={selectedArticle.image_url} 
                alt={selectedArticle.title} 
                style={modalStyles.image} 
              />
            )}

            {/* Judul & Tanggal */}
            <h2 style={modalStyles.title}>{selectedArticle.title}</h2>
            <p style={modalStyles.date}>{formatDate(selectedArticle.tanggal_kegiatan)}</p>
            
            {/* Deskripsi Lengkap dengan format Paragraf (Enter/Line Break) */}
            <div style={modalStyles.description}>
              {selectedArticle.description.split('\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '16px', textAlign: 'justify' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// === STYLING KHUSUS UNTUK MODAL MENGAMBANG ===
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    backdropFilter: 'blur(4px)', 
    zIndex: 9999, 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    animation: 'fadeInOverlay 0.3s ease-out forwards' // Animasi Fade In
  },
  contentBox: {
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '90vh', 
    overflowY: 'auto', 
    position: 'relative',
    padding: '30px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    animation: 'popInModal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' // Animasi Pop Up membesar
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f1f5f9',
    color: '#334155',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '16px',
    marginBottom: '25px'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#01082D',
    marginBottom: '10px',
    lineHeight: '1.3',
    paddingRight: '40px' 
  },
  date: {
    fontSize: '0.95rem',
    color: '#266CA9',
    fontWeight: 'bold',
    marginBottom: '25px',
    paddingBottom: '15px',
    borderBottom: '2px solid #f1f5f9'
  },
  description: {
    fontSize: '1.05rem',
    color: '#444',
    lineHeight: '1.8'
  }
};