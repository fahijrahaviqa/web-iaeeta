import { useEffect } from "react";
import "../assets/Hero.css";
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
          <h1 className="hero-title">
            Keselamatan Udara <br />
            <span className="text-highlight">Adalah Prioritas Kami</span>
          </h1>
          <p className="hero-subtitle delay-100 hidden-element">
            Selamat datang di Portal Resmi Organisasi Tim CNS (Communication, Navigation, Surveillance) AirNav.
          </p>
          <div className="hero-buttons delay-200 hidden-element">
            <button className="btn-primary">Pelajari Layanan Kami</button>
            <button className="btn-secondary">Hubungi Tim</button>
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