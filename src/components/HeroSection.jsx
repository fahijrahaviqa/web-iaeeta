import { useEffect } from "react";
import "../assets/Hero.css";
import About from "../pages/guest/About";

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
    <div className="w-full">
      {/* ================= HERO SECTION (VIDEO BACKGROUND) ================= */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2016/06/27/3586-172490363_tiny.mp4" type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>

        {/* Overlay menggunakan warna paling gelap (#01082D) dengan transparansi 70% */}
        <div className="absolute z-10 w-full h-full bg-[#01082D]/70"></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto hidden-element text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Masa Depan <span className="text-[#ADE1FB]">Teknologi</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-gray-300 delay-100 hidden-element">
            Kami membangun solusi digital inovatif untuk membantu bisnis Anda berkembang di era modern.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center delay-200 hidden-element">
            {/* Tombol Utama: Dasar #266CA9, Hover #0F2573 */}
            <button className="bg-[#266CA9] hover:bg-[#0F2573] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#01082D]/50">
              Mulai Sekarang
            </button>
            {/* Tombol Sekunder: Garis #ADE1FB */}
            <button className="bg-transparent border-2 border-[#ADE1FB] hover:bg-[#ADE1FB] hover:text-[#01082D] text-[#ADE1FB] font-bold py-3 px-8 rounded-full transition-all duration-300">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 z-20 animate-bounce">
          <svg className="w-8 h-8 text-[#ADE1FB] opacity-80" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* ================= SECTION FITUR (PALET GELAP) ================= */}
      {/* Latar belakang bagian menggunakan #01082D */}
      <section className="min-h-screen bg-[#01082D] flex items-center justify-center p-8 border-t border-[#041D56]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Background #041D56 */}
          <div className="bg-[#041D56] p-8 rounded-2xl shadow-2xl hidden-element delay-100 border border-[#0F2573]">
            <div className="bg-[#0F2573] w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#ADE1FB]">Cepat & Responsif</h3>
            <p className="text-gray-300">Website yang dirancang dengan struktur kode modern sehingga memberikan performa dan kecepatan maksimal.</p>
          </div>

          {/* Card 2: Background #041D56 */}
          <div className="bg-[#041D56] p-8 rounded-2xl shadow-2xl hidden-element delay-200 border border-[#0F2573]">
            <div className="bg-[#0F2573] w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#ADE1FB]">Ide Kreatif</h3>
            <p className="text-gray-300">Kami menghadirkan ide-ide segar dan antarmuka pengguna yang memukau untuk setiap proyek.</p>
          </div>

          {/* Card 3: Background #041D56 */}
          <div className="bg-[#041D56] p-8 rounded-2xl shadow-2xl hidden-element delay-300 border border-[#0F2573]">
            <div className="bg-[#0F2573] w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#ADE1FB]">Keamanan Terjamin</h3>
            <p className="text-gray-300">Melindungi data Anda adalah prioritas utama kami dengan enkripsi tingkat tinggi.</p>
          </div>

        </div>
      </section>  
      <section>
        <About />
      </section>
    </div>
  );
}