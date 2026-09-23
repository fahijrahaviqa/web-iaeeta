import React, { useEffect } from 'react';
import '../../assets/About.css';  // Menggunakan style dasar halaman
import '../../assets/Media.css';  // Style khusus untuk kartu media

export default function Media() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show-element');
      });
    });
    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));
    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, []);

  // Data Artikel/Berita terkait CNS
  const newsItems = [
    {
      id: 1,
      title: 'Sukses Pelaksanaan Flight Check ILS',
      date: '12 September 2026',
      category: 'Operasional',
      desc: 'Tim CNS bersama Balai Kalibrasi berhasil melakukan uji terbang (flight check) untuk memastikan presisi tinggi pada Instrument Landing System (ILS).',
      img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80', // Gambar sayap pesawat/udara
      delay: 'delay-100'
    },
    {
      id: 2,
      title: 'Upgrade Sistem Komunikasi VHF',
      date: '05 Agustus 2026',
      category: 'Teknologi',
      desc: 'Pembaruan perangkat pemancar radio VHF di beberapa titik untuk memperluas jangkauan komunikasi antara Air Traffic Controller dan Pilot.',
      img: 'https://images.unsplash.com/photo-1544411047-c45a05f98bfc?auto=format&fit=crop&w=600&q=80', // Gambar antena/tower
      delay: 'delay-200'
    },
    {
      id: 3,
      title: 'Pelatihan Kompetensi Teknisi 2026',
      date: '20 Juli 2026',
      category: 'Sertifikasi',
      desc: 'Sebanyak 25 teknisi CNS baru saja menyelesaikan program pembaruan lisensi (rating) berstandar ICAO untuk kesiapan operasional tahunan.',
      img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80', // Gambar teknisi/hardware
      delay: 'delay-300'
    }
  ];

  return (
    <div className="about-page">
      {/* Bagian Hero dengan Penjelasan Halaman */}
      <header className="about-hero">
        <h1 className="hidden-element">Media & Publikasi</h1>
        <p className="hidden-element delay-100">
          Ikuti perkembangan terbaru mengenai kegiatan operasional, pemeliharaan sistem, serta inovasi teknologi dari Tim CNS dalam menjaga ruang udara yang aman dan efisien.
        </p>
      </header>

      <section className="media-section">
        <h2 className="hidden-element media-title">Berita Terkini</h2>
        
        <div className="media-grid">
          {newsItems.map((item) => (
            <div key={item.id} className={`media-card hidden-element ${item.delay}`}>
              
              {/* Thumbnail Gambar dengan Label Kategori */}
              <div className="media-image-container">
                <span className="media-category">{item.category}</span>
                <img src={item.img} alt={item.title} className="media-image" />
              </div>
              
              {/* Konten Berita */}
              <div className="media-content">
                <p className="media-date">{item.date}</p>
                <h3 className="media-heading">{item.title}</h3>
                <p className="media-desc">{item.desc}</p>
                <button className="media-btn">Baca Selengkapnya &rarr;</button>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}