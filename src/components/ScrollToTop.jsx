import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Memaksa browser untuk scroll ke paling atas (X: 0, Y: 0) secara instan
    window.scrollTo(0, 0);
  }, [pathname]); // Akan dijalankan setiap kali alamat (pathname) berubah

  return null; // Komponen ini tidak menampilkan tampilan apa-apa, hanya menjalankan fungsi scroll
}