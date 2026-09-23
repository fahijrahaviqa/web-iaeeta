import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';
import logoIaeeta from "../assets/logo_iaeeta.png";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Grid Atas: Informasi & Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Kolom 1: Brand & Deskripsi */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logoIaeeta} 
                alt="Logo IAEETA" 
                className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100" 
              />
              <span className="text-[#041D56] font-bold text-xl tracking-tight">
                IAEETA PEKANBARU
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              Garda terdepan dalam memastikan keandalan sistem telekomunikasi, navigasi, dan pengamatan udara (CNS) demi keselamatan penerbangan nusantara.
            </p>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div>
            <h3 className="text-[#041D56] font-bold text-lg mb-6">Tautan Cepat</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-[#266CA9] transition-colors duration-300">Dashboard</Link>
              </li>
              <li>
                <Link to="/tim-kami" className="hover:text-[#266CA9] transition-colors duration-300">Tim Kami</Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-[#266CA9] transition-colors duration-300">Media & Berita</Link>
              </li>
              <li>
                <Link to="/galeri" className="hover:text-[#266CA9] transition-colors duration-300">Galeri</Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak Kami */}
          <div>
            <h3 className="text-[#041D56] font-bold text-lg mb-6">Kontak Kami</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-[#266CA9] mt-1 flex-shrink-0" size={18} />
                <span>Gedung AirNav Indonesia<br />Bandara Internasional Sultan Syarif Kasim II, Pekanbaru</span>
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

          {/* Kolom 4: Sosial Media */}
          <div>
            <h3 className="text-[#041D56] font-bold text-lg mb-6">Ikuti Kami</h3>
            <p className="text-gray-600 text-sm mb-4">
              Dapatkan informasi terbaru mengenai kegiatan operasional kami.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#266CA9] hover:text-white transition-all duration-300 shadow-sm border border-gray-200">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#266CA9] hover:text-white transition-all duration-300 shadow-sm border border-gray-200">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#266CA9] hover:text-white transition-all duration-300 shadow-sm border border-gray-200">
                <FiYoutube size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; 2026 Tim Teknik CNS IAEETA Pekanbaru. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-[#266CA9] transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-[#266CA9] transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}