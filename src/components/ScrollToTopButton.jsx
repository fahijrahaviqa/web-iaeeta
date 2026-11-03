// File: src/components/ScrollToTopButton.jsx
import React, { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Tombol muncul setelah halaman di-scroll ke bawah sejauh 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener saat komponen dilepas
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Agar scrollnya mulus, tidak langsung loncat
    });
  };

  // Jika belum discroll lebih dari 300px, jangan tampilkan apa-apa (null)
  if (!showScrollTop) return null;

  return (
    <button 
      onClick={scrollToTop} 
      style={{
        position: 'fixed',
        bottom: '20px', 
        right: '20px',
        zIndex: 998, // Dibawah modal tapi di atas konten biasa
        backgroundColor: '#0056b3', 
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',  
        height: '40px', 
        fontSize: '20px', 
        cursor: 'pointer',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease'
      }}
      aria-label="Scroll to top"
      // Efek hover manual menggunakan inline event (opsional)
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#004494'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
    >
      ↑
    </button>
  );
}