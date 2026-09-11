import React, { useEffect } from 'react';
import '../../assets/About.css'; 

export default function About() {
  // Logika Animasi Scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-element');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="about-page">
      {/* Bagian Hero dengan Animasi Fade In Teks */}
      <header className="hero">
        <h1 className="hidden-element">Tentang Kami</h1>
        <p className="hidden-element delay-100">Membangun masa depan melalui barisan kode yang bermakna.</p>
      </header>

      {/* Bagian Konten dengan Efek Scroll */}
      <section className="scroll-container">
        <div className="sticky-sidebar">
          <h2 className="hidden-element">Kisah & <br />Perjalanan Kami</h2>
        </div>
        <div className="scroll-content">
          <p className="hidden-element">
            Berawal dari sebuah garasi kecil di tahun 2020, kami memulai mimpi
            untuk menciptakan solusi teknologi yang dapat diakses oleh siapa saja.
            Setiap baris kode yang kami tulis didasari oleh semangat untuk
            mempermudah hidup banyak orang.
          </p>
          <p className="hidden-element delay-100">
            Seiring berjalannya waktu, tim kami terus berkembang. Kami tidak hanya
            sekadar membangun aplikasi, tetapi kami membangun pengalaman. Terus
            berinovasi dan belajar dari setiap kegagalan adalah kunci dari
            pertumbuhan kami.
          </p>
          <p className="hidden-element delay-200">
            Hari ini, kami bangga telah membantu ratusan klien mencapai target
            mereka. Kami percaya bahwa teknologi yang hebat tidak harus rumit;
            teknologi yang hebat adalah yang mudah dipahami dan memberikan dampak
            positif secara langsung.
          </p>
        </div>
      </section>

      {/* Bagian Grid untuk Hal-hal Penting */}
      <section className="grid-section">
        <h2 className="hidden-element">Nilai Utama Kami</h2>
        <div className="grid-container">
          <div className="grid-item hidden-element delay-100">
            <h3>Inovasi</h3>
            <p>
              Kami tidak pernah berhenti mencari cara baru untuk memecahkan
              masalah lama. Inovasi adalah DNA kami.
            </p>
          </div>
          <div className="grid-item hidden-element delay-200">
            <h3>Kualitas</h3>
            <p>
              Kode yang bersih, aman, dan dapat diskalakan. Kami mengutamakan
              kualitas di atas kuantitas.
            </p>
          </div>
          <div className="grid-item hidden-element delay-300">
            <h3>Kolaborasi</h3>
            <p>
              Ide terbaik lahir dari kerja sama tim. Kami selalu mendengarkan dan
              bertukar pikiran.
            </p>
          </div>
          <div className="grid-item hidden-element delay-400">
            <h3>Integritas</h3>
            <p>
              Transparan dan jujur dalam setiap langkah. Kami menjaga kepercayaan
              klien layaknya keluarga.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>&copy; 2026 Tim Developer Masa Depan. Dibuat dengan 💡 dan kode yang bersih menggunakan React.</p>
      </footer>
    </div>
  );
}