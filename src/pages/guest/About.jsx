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
      {/* Bagian Hero Tanpa Gambar, Menggunakan Paragraf Pendahuluan */}
      <header className="about-hero">
        <h1 className="hidden-element">Tentang Tim CNS</h1>
        <p className="hidden-element delay-100">
          Garda terdepan dalam memastikan keandalan sistem telekomunikasi, navigasi, dan pengamatan udara (Communication, Navigation, Surveillance). Kami berdedikasi penuh selama 24 jam sehari, 7 hari seminggu, untuk menjaga kelancaran operasional dan keselamatan setiap pergerakan pesawat di ruang udara nusantara.
        </p>
      </header>

      {/* Bagian Konten dengan Efek Scroll */}
      <section className="scroll-container">
        <div className="sticky-sidebar">
          <h2 className="hidden-element">Dedikasi & <br />Tanggung Jawab</h2>
        </div>
        <div className="scroll-content">
          <p className="hidden-element">
            <strong>Tulang Punggung Penerbangan.</strong> Saat masyarakat melihat pesawat lepas landas dan mendarat dengan aman, ada teknologi kompleks yang bekerja secara diam-diam di baliknya. Tim CNS hadir untuk memastikan teknologi tersebut—mulai dari radar, radio komunikasi, hingga instrumen pendaratan (ILS)—berfungsi dengan presisi mutlak tanpa toleransi kesalahan.
          </p>
          <p className="hidden-element delay-100">
            <strong>Pemeliharaan Tanpa Henti.</strong> Peralatan navigasi udara tidak pernah tidur. Oleh karena itu, rutinitas kami mencakup inspeksi harian, kalibrasi berkala, hingga perbaikan darurat di tengah cuaca ekstrem sekalipun. Keandalan sistem hingga 99.9% adalah target mutlak yang tidak bisa ditawar demi nyawa ratusan ribu penumpang setiap harinya.
          </p>
          <p className="hidden-element delay-200">
            <strong>Adaptasi Teknologi Modern.</strong> Dunia penerbangan terus berevolusi. Kami secara konsisten melakukan modernisasi perangkat, beralih ke sistem berbasis satelit (ADS-B, PBN), serta mendigitalisasi pemantauan lalu lintas udara demi terciptanya ruang udara yang tidak hanya lebih aman, tetapi juga lebih efisien dan ramah lingkungan.
          </p>
          <p className="hidden-element delay-300">
            Website operasional ini dibangun untuk mempercepat alur pelaporan teknis harian, memantau riwayat pemeliharaan (*maintenance log*), serta menjadi pusat kendali informasi internal agar koordinasi antar teknisi di seluruh wilayah kerja menjadi lebih cepat dan terukur.
          </p>
        </div>
      </section>

      {/* Bagian Grid untuk Hal-hal Penting */}
      <section className="grid-section">
        <h2 className="hidden-element">Nilai Inti Operasional Kami</h2>
        <div className="grid-container">
          <div className="grid-item hidden-element delay-100">
            <h3>Safety First</h3>
            <p>
              Keselamatan penerbangan adalah fondasi utama. Kami memegang prinsip <i>Zero Tolerance for Error</i> dalam setiap tindakan pemeliharaan peralatan teknis.
            </p>
          </div>
          <div className="grid-item hidden-element delay-200">
            <h3>Keandalan (Reliability)</h3>
            <p>
              Memastikan seluruh sistem komunikasi, navigasi, dan surveilans (CNS) beroperasi optimal dengan target <i>uptime</i> sistem di atas 99.9% setiap tahunnya.
            </p>
          </div>
          <div className="grid-item hidden-element delay-300">
            <h3>Profesionalisme</h3>
            <p>
              Digerakkan oleh teknisi bersertifikasi yang terus menjalani pelatihan dan *rating* secara berkala untuk menjaga kompetensi di tingkat standar penerbangan internasional (ICAO).
            </p>
          </div>
          <div className="grid-item hidden-element delay-400">
            <h3>Respons Cepat</h3>
            <p>
              Kesiapsiagaan penuh 24/7. Tim kami dilatih untuk mendeteksi anomali peralatan dan melakukan <i>troubleshooting</i> dengan cepat guna meminimalisir dampak pada lalu lintas udara.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}