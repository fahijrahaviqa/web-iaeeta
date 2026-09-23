import React, { useEffect } from 'react';
import '../../assets/About.css'; 
import '../../assets/Contact.css'; 

export default function Contact() {
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

  return (
    <div className="about-page">
      {/* Bagian Hero Kontak */}
      <header className="about-hero">
        <h1 className="hidden-element">Hubungi Kami</h1>
        <p className="hidden-element delay-100">
          Pusat layanan informasi dan koordinasi operasional Tim Teknik CNS. Kami siap merespon kebutuhan Anda 24/7.
        </p>
      </header>

      {/* Wadah Utama: Satu Kesatuan Kotak */}
      <section className="contact-section">
        <div className="contact-unified-card hidden-element delay-100">
          
          {/* BAGIAN KIRI: Informasi Kontak */}
          <div className="contact-info-side">
            <h2>Pusat Koordinasi</h2>
            <p className="info-desc">
              Silakan hubungi hotline operasional kami untuk pelaporan darurat terkait gangguan sistem.
            </p>
            
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <h3>Kantor Operasional</h3>
                <p>Gedung AirNav Indonesia<br/>Bandara Internasional</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div>
                <h3>Hotline Teknisi</h3>
                <p>+62 812 3456 7890<br/>Ext: 112 (Darurat)</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div>
                <h3>Email Resmi</h3>
                <p>cns.support@airnav.co.id</p>
              </div>
            </div>
          </div>

          {/* BAGIAN KANAN: Form Input */}
          <div className="contact-form-side">
            <h2 className="form-title">Kirim Laporan / Pesan</h2>
            <form className="modern-form">
              <div className="form-group">
                <input type="text" id="name" className="modern-input" placeholder=" " required />
                <label htmlFor="name" className="modern-label">Nama Lengkap / Instansi</label>
              </div>
              
              <div className="form-group">
                <input type="email" id="email" className="modern-input" placeholder=" " required />
                <label htmlFor="email" className="modern-label">Alamat Email</label>
              </div>
              
              <div className="form-group">
                <input type="text" id="subject" className="modern-input" placeholder=" " required />
                <label htmlFor="subject" className="modern-label">Subjek Laporan</label>
              </div>
              
              <div className="form-group">
                <textarea id="message" rows="4" className="modern-input" placeholder=" " required></textarea>
                <label htmlFor="message" className="modern-label">Detail Pesan / Kendala</label>
              </div>
              
              <button type="button" className="modern-submit-btn">
                Kirim Laporan 🚀
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}