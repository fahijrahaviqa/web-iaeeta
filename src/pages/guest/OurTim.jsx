import React, { useEffect, useState } from 'react';
import '../../assets/About.css';  
import '../../assets/OurTim.css'; 
import { supabase } from '../../supabaseClient'; 

export default function OurTim() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data, error } = await supabase
          .from('tim_kami')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;
        setTeamMembers(data);
      } catch (error) {
        console.error("Gagal mengambil data tim:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeam();
  }, []);

  useEffect(() => {
    if (teamMembers.length === 0) return; 

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('show-element');
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, [teamMembers]);

  return (
    <div className="about-page">
      <header className="about-hero">
        <h1 className="hidden-element">Struktur Organisasi</h1>
        <p className="hidden-element delay-100">
          Mengenal lebih dekat para ahli teknis di balik layar keandalan sistem navigasi udara kita.
        </p>
      </header>

      <section className="team-section">
        <h2 className="hidden-element team-title">Personel Utama Kami</h2>

        {isLoading ? (
          <p style={{ textAlign: 'center' }}>Memuat data tim...</p>
        ) : (
          <>
            {/* Pimpinan */}
            {teamMembers.length > 0 && (
              <div className="team-leader-container">
                <div className="team-card hidden-element delay-100">
                  {/* PERBAIKAN: Gunakan .image_url dan hilangkan penggabungan URL */}
                  <img
                    src={teamMembers[0].image_url} 
                    alt={teamMembers[0].nama}
                    className="team-avatar"
                  />
                  <h3>{teamMembers[0].nama}</h3>
                  <p className="team-role">{teamMembers[0].jabatan}</p>
                  <p className="team-desc">{teamMembers[0].deskripsi}</p>
                  <small style={{ color: '#888' }}>{teamMembers[0].asal_instansi}</small>
                </div>
              </div>
            )}

            {/* Divisi / Supervisor */}
            <div className="team-grid">
              {teamMembers.slice(1).map((member, index) => {
                const delayClass = `delay-${(index + 2) * 100}`;
                return (
                  <div key={member.id} className={`team-card hidden-element ${delayClass}`}>
                    {/* PERBAIKAN: Gunakan .image_url dan hilangkan penggabungan URL */}
                    <img
                      src={member.image_url}
                      alt={member.nama}
                      className="team-avatar"
                    />
                    <h3>{member.nama}</h3>
                    <p className="team-role">{member.jabatan}</p>
                    <p className="team-desc">{member.deskripsi}</p>
                    <small style={{ color: '#888' }}>{member.asal_instansi}</small>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}