import { useEffect } from "react";
import "../assets/Hero.css";
import logoIaeeta from "../assets/logo_iaeeta.png"; // Import logo IAEETA
import About from "../pages/guest/About";
import OurTim from "../pages/guest/OurTim";
import Contact from "../pages/guest/Contact";
import Media from "../pages/guest/Media";

export default function HeroSection() {
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
    <div className="hero-wrapper">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="hero-container">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="https://cdn.pixabay.com/video/2016/06/27/3586-172490363_tiny.mp4" type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content hidden-element">
          {/* Logo IAEETA ditambahkan di atas judul */}
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
            {/* <button className="btn-primary">Gabung Komunitas</button> */}
            <button className="btn-secondary">Jelajahi Media</button>
          </div>
        </div>
      </section>
      
      {/* ================= KOMPONEN HALAMAN LAINNYA ================= */}
      <section>
        <About />
        <OurTim />
        <Media />
        <Contact />
      </section>
    </div>
  );
}