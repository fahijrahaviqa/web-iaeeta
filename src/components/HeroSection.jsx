import { useEffect, useState } from "react";
import "../assets/Hero.css";
import logoIaeeta from "../assets/logo_iaeeta.png"; // Import logo IAEETA
import About from "../pages/guest/About";
import OurTim from "../pages/guest/OurTim";
import Contact from "../pages/guest/Contact";
import Media from "../pages/guest/Media";

export default function HeroSection() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToMedia = () => {
    const mediaSection = document.getElementById('media-publikasi');
    if (mediaSection) {
      mediaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="main-layout-wrapper" style={{ position: 'relative' }}>
      
      {/* ================= 1. HALAMAN AWAL (HERO SECTION) ================= */}
      <section id="halaman-awal" className="hero-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="https://cdn.pixabay.com/video/2016/06/27/3586-172490363_tiny.mp4" type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content hidden-element">
          <img 
            src={logoIaeeta} 
            alt="Logo IAEETA" 
            style={{ width: '120px', height: 'auto', margin: '0 auto 20px', display: 'block' }} 
            className="hero-logo hidden-element" 
          />

          <h1 className="hero-title">
            Indonesian Aviation Electronics And Electrical Technician Association (IAEETA)
          </h1> 

          <div className="hero-buttons delay-200 hidden-element">
            <button className="btn-secondary" onClick={scrollToMedia}>
              Jelajahi Media
            </button>
          </div>
        </div>
      </section>
      
      {/* ================= KONTEN HALAMAN LAINNYA ================= */}
      <div className="page-sections">
        <section id="media-publikasi" className="section-wrapper">
          <Media />
        </section>

        <section id="struktur-organisasi" className="section-wrapper">
          <OurTim />
        </section>

        <section id="tentang-kami" className="section-wrapper">
          <About />
        </section>

        <section id="hubungi-kami" className="section-wrapper">
          <Contact />
        </section>
      </div>

      {/* ================= TOMBOL PANAH KE ATAS ================= */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          style={{
            position: 'fixed',
            bottom: '20px', // Disesuaikan agar lebih rapi di pojok
            right: '20px',
            zIndex: 999,
            backgroundColor: '#0056b3', 
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',  // Layout tombol diperkecil
            height: '40px', // Layout tombol diperkecil
            fontSize: '20px', // Ukuran teks/ikon diperkecil
            cursor: 'pointer',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s ease'
          }}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

    </div>
  );
}