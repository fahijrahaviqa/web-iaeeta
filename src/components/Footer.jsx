import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook } from 'react-icons/fi';
import logoIaeeta from "../assets/logo_iaeeta.png";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Menggunakan grid-cols-12 untuk proporsi lebar kolom yang lebih presisi dan modern */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12">

          {/* KOLOM 1: Brand, Deskripsi & Sosial Media (Lebar 4/12) */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoIaeeta}
                alt="Logo IAEETA"
                className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100"
              />
              <span className="text-[#041D56] font-bold text-xl tracking-tight">
                IAEETA DPC PEKANBARU
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm mb-6">
              Garda terdepan dalam memastikan keandalan sistem telekomunikasi, navigasi, dan pengamatan udara (CNS) demi keselamatan penerbangan nusantara.
            </p>
            {/* Sosial Media dipindah ke sini agar lebih ringkas dan menyatu dengan Brand */}
            <div className="flex gap-4">
              <a href="https://www.instagram.com/iaeeta.pekanbaru/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#266CA9] hover:text-white transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-200 hover:border-transparent hover:-translate-y-1">
                <FiInstagram size={18} />
              </a>
            </div>
          </div>

          {/* KOLOM 2: Tautan Cepat (Lebar 2/12) */}
          <div className="md:col-span-4 lg:col-span-2">
            <h3 className="text-[#041D56] font-bold text-lg mb-6 relative inline-block">
              Tautan Cepat
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#266CA9] rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-[#266CA9] transition-colors duration-300">Beranda</Link></li>
              <li><Link to="/About" className="hover:text-[#266CA9] transition-colors duration-300">Tentang Kami</Link></li>
              <li><Link to="/OurTim" className="hover:text-[#266CA9] transition-colors duration-300">Tim Kami</Link></li>
              <li><Link to="/Media" className="hover:text-[#266CA9] transition-colors duration-300">Media & Berita</Link></li>
              <li><Link to="/Contact" className="hover:text-[#266CA9] transition-colors duration-300">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* KOLOM 3: Kontak Kami (Lebar 3/12) */}
          <div className="md:col-span-8 lg:col-span-3">
            <h3 className="text-[#041D56] font-bold text-lg mb-6 relative inline-block">
              Kontak Kami
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#266CA9] rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-[#266CA9] mt-1 flex-shrink-0" size={18} />
                <span className="leading-relaxed">Gedung AirNav Indonesia<br />Bandara Internasional Sultan Syarif Kasim II, Pekanbaru</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-[#266CA9] flex-shrink-0" size={18} />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-[#266CA9] flex-shrink-0" size={18} />
                <span>cns.support@airnav.co.id</span>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: Lokasi Google Maps (Lebar 3/12) */}
          <div className="md:col-span-13 lg:col-span-3 flex flex-col h-full">
            <h3 className="text-[#041D56] font-bold text-lg mb-6 relative inline-block">
              Lokasi Kami
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#266CA9] rounded-full"></span>
            </h3>
            {/* Container Maps dengan efek elegan */}
            <div className="w-full h-56 md:h-full min-h-[220px] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-200 transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(38,108,169,0.15)] group relative bg-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6903584077286!2d101.44530177496463!3d0.4588836995366223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5af479e5e1d93%3A0xb07ac44dbccf1fd1!2sGedung%20Radar%20Airnav%20Pekanbaru!5e0!3m2!1sen!2sid!4v1793608586592!5m2!1sen!2sid" 
                className="w-full h-full absolute inset-0 grayscale-[20%] contrast-[1.1] transition-all duration-500 group-hover:grayscale-0" // Efek visual: peta sedikit kalem, namun saat kursor diarahkan warnanya jadi cerah
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>

        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; 2026 Tim Teknik CNS IAEETA Pekanbaru. Hak Cipta Dilindungi.
          </p>
        </div>

      </div>
    </footer>
  );
}