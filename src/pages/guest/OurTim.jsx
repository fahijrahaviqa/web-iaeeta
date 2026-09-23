import React, { useEffect } from 'react';
import '../../assets/About.css';  // Meminjam background dan animasi dari About
import '../../assets/OurTim.css'; 

export default function OurTim() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show-element');
      });
    });
    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));
    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, []);

  // Data Anggota Tim CNS
  const teamMembers = [
    {
      id: 1,
      name: 'Budi Santoso, S.T.',
      role: 'Manager Teknik CNS',
      desc: 'Bertanggung jawab penuh atas seluruh operasional teknik dan keandalan sistem penerbangan wilayah.',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
      delay: 'delay-100'
    },
    {
      id: 2,
      name: 'Siti Aminah, M.T.',
      role: 'Supervisor Communication',
      desc: 'Memastikan jaringan radio VHF/HF darat-udara beroperasi tanpa gangguan 24/7.',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
      delay: 'delay-200'
    },
    {
      id: 3,
      name: 'Andi Pratama, S.T.',
      role: 'Supervisor Navigation',
      desc: 'Ahli kalibrasi dan pemeliharaan instrumen panduan pendaratan presisi (ILS, VOR).',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi',
      delay: 'delay-300'
    },
    {
      id: 4,
      name: 'Rina Wijaya, S.Kom.',
      role: 'Supervisor Surveillance',
      desc: 'Memantau sistem Radar dan ADS-B untuk visibilitas pergerakan pesawat di ruang udara.',
      img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rina',
      delay: 'delay-400'
    }
  ];

  return (
    <div className="about-page">
      {/* Menggunakan class about-hero agar selaras dengan halaman About */}
      <header className="about-hero">
        <h1 className="hidden-element">Struktur Organisasi</h1>
        <p className="hidden-element delay-100">
          Mengenal lebih dekat para ahli teknis di balik layar keandalan sistem navigasi udara kita.
        </p>
      </header>

      <section className="team-section">
        <h2 className="hidden-element team-title">Personel Utama Kami</h2>
        
        {/* Pimpinan (Tampil di atas sendirian) */}
        <div className="team-leader-container">
          <div className={`team-card hidden-element ${teamMembers[0].delay}`}>
            <img src={teamMembers[0].img} alt={teamMembers[0].name} className="team-avatar" />
            <h3>{teamMembers[0].name}</h3>
            <p className="team-role">{teamMembers[0].role}</p>
            <p className="team-desc">{teamMembers[0].desc}</p>
          </div>
        </div>

        {/* Divisi / Supervisor (Tampil sejajar di bawah) */}
        <div className="team-grid">
          {teamMembers.slice(1).map((member) => (
            <div key={member.id} className={`team-card hidden-element ${member.delay}`}>
              <img src={member.img} alt={member.name} className="team-avatar" />
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-desc">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}