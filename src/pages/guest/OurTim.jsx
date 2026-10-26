import React, { useEffect, useState } from 'react';
import '../../assets/About.css';  
import '../../assets/OurTim.css'; 
import { supabase } from '../../supabaseClient'; 
import { FiUser } from 'react-icons/fi'; // Import icon fallback jika foto kosong

// Komponen Kartu Profil (Adaptasi Desain Admin - Tanpa Tombol Edit/Hapus & Warna Lebih Muda)
const OrgCard = ({ member }) => {
  if (!member) return null;
  const photoUrl = member.image_url || member.foto;

  return (
    <div className="hidden-element group relative bg-white rounded-[2rem] border border-[#ADE1FB]/50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center overflow-hidden w-56 m-2">
      {/* Background Header - Diubah menjadi Biru Muda yang lembut */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#6190a8] via-[#5289b3] to-[#266CA9] opacity-80 transition-all duration-500 group-hover:h-28 group-hover:opacity-100"></div>

      {/* Foto Profil */}
      <div className="relative z-10 flex justify-center mt-10 mb-3">
        <div className="w-20 h-20 rounded-full p-1 bg-white shadow-xl group-hover:scale-105 transition-transform duration-300 flex items-center justify-center border-2 border-[#ADE1FB]/50">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={member.nama}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-[#ADE1FB]/30 flex items-center justify-center text-[#266CA9]">
              <FiUser className="text-3xl" />
            </div>
          )}
        </div>
      </div>

      {/* Detail Teks */}
      <div className="px-4 pb-5 w-full flex flex-col items-center flex-1">
        <h3 className="font-bold text-[#041D56] text-sm leading-tight mb-2 line-clamp-1 w-full">
          {member.nama || 'Tanpa Nama'}
        </h3>
        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#ADE1FB]/20 border border-[#ADE1FB]/50">
          <span className="text-[10px] font-bold tracking-wide text-[#266CA9] uppercase">
            {member.jabatan || 'Anggota Tim'}
          </span>
        </div>
      </div>
    </div>
  );
};

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

  // --- LOGIKA FILTER JABATAN ---
  const ketua = teamMembers.filter(m => (m.jabatan || '').toLowerCase().includes('ketua') && !(m.jabatan || '').toLowerCase().includes('wakil'));
  const sekretaris = teamMembers.filter(m => (m.jabatan || '').toLowerCase().includes('sekretaris'));
  const bendahara = teamMembers.filter(m => (m.jabatan || '').toLowerCase().includes('bendahara'));

  const waka1 = teamMembers.filter(m => (m.jabatan || '').toLowerCase().includes('wakil ketua i') && !(m.jabatan || '').toLowerCase().includes('ii'));
  const waka2 = teamMembers.filter(m => (m.jabatan || '').toLowerCase().includes('wakil ketua ii') && !(m.jabatan || '').toLowerCase().includes('iii'));
  const waka3 = teamMembers.filter(m => (m.jabatan || '').toLowerCase().includes('wakil ketua iii'));

  const anggota1 = teamMembers.filter(m => ((m.jabatan || '').toLowerCase().includes('organisasi') || (m.jabatan || '').toLowerCase().includes('keanggotaan')) && !(m.jabatan || '').toLowerCase().includes('wakil'));
  const anggota2 = teamMembers.filter(m => ((m.jabatan || '').toLowerCase().includes('hukum') || (m.jabatan || '').toLowerCase().includes('kemitraan') || (m.jabatan || '').toLowerCase().includes('komunikasi')) && !(m.jabatan || '').toLowerCase().includes('wakil'));
  const anggota3 = teamMembers.filter(m => ((m.jabatan || '').toLowerCase().includes('sdm') || (m.jabatan || '').toLowerCase().includes('etika')) && !(m.jabatan || '').toLowerCase().includes('wakil'));

  const assignedIds = new Set([
    ...ketua, ...sekretaris, ...bendahara, ...waka1, ...waka2, ...waka3, ...anggota1, ...anggota2, ...anggota3
  ].map(m => m.id));
  const unassigned = teamMembers.filter(m => !assignedIds.has(m.id));

  // Render Stack Bertumpuk - Garis diubah menjadi biru muda (#7CB9E8)
  const renderStack = (members) => {
    return members.map((m, index) => (
      <div key={m.id} className="flex flex-col items-center">
        {index > 0 && <div className="w-[3px] h-[15px] bg-[#7CB9E8]"></div>}
        <OrgCard member={m} />
      </div>
    ));
  };

  return (
    <div className="about-page" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header className="about-hero" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="hidden-element">Struktur Organisasi</h1>
        <p className="hidden-element delay-100">
          Mengenal lebih dekat para ahli teknis di balik layar keandalan sistem navigasi udara kita.
        </p>
      </header>

      <section className="team-section">
        <h2 className="hidden-element team-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
          Dewan Pimpinan Cabang Pekanbaru
        </h2>

        {isLoading ? (
          <p style={{ textAlign: 'center' }}>Memuat data tim...</p>
        ) : (
          <div className="w-full overflow-x-auto pb-8">
            {/* Minimal width agar struktur diagram tidak hancur */}
            <div className="flex flex-col items-center min-w-[1000px] p-4">
              
              {/* === LEVEL 1: KETUA === */}
              {renderStack(ketua)}

              {/* Garis Vertikal turun dari Ketua */}
              {ketua.length > 0 && <div className="w-[3px] h-[25px] bg-[#7CB9E8]"></div>}

              {/* === LEVEL 2: SEKRETARIS & BENDAHARA === */}
              <div className="relative flex w-full max-w-[650px]">
                {/* Garis Penghubung Horizontal (Sekretaris - Bendahara) */}
                <div className="absolute top-0 left-[25%] right-[25%] h-[3px] bg-[#7CB9E8]"></div>

                {/* Cabang Kiri: Sekretaris */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-[3px] h-[20px] bg-[#7CB9E8]"></div>
                  {renderStack(sekretaris)}
                </div>

                {/* Garis Utama Tengah */}
                <div className="absolute left-1/2 top-0 -bottom-[30px] w-[3px] bg-[#7CB9E8] -translate-x-1/2"></div>

                {/* Cabang Kanan: Bendahara */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-[3px] h-[20px] bg-[#7CB9E8]"></div>
                  {renderStack(bendahara)}
                </div>
              </div>

              <div className="h-[30px]"></div>

              {/* === LEVEL 3: WAKIL KETUA I, II, III & ANGGOTA === */}
              <div className="relative flex w-full">
                {/* Garis Penghubung Horizontal (Waka I - Waka III) */}
                <div className="absolute top-0 left-[16.66%] right-[16.66%] h-[3px] bg-[#7CB9E8]"></div>

                {/* Kolom 1: Waka I & Anggota */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-[3px] h-[20px] bg-[#7CB9E8]"></div>
                  {renderStack(waka1)}
                  {anggota1.length > 0 && <div className="w-[3px] h-[20px] bg-[#7CB9E8]"></div>}
                  {renderStack(anggota1)}
                </div>

                {/* Kolom 2: Waka II & Anggota */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-[3px] h-[20px] bg-[#7CB9E8]"></div>
                  {renderStack(waka2)}
                  {anggota2.length > 0 && <div className="w-[3px] h-[20px] bg-[#7CB9E8]"></div>}
                  {renderStack(anggota2)}
                </div>

                {/* Kolom 3: Waka III & Anggota */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-[3px] h-[20px] bg-[#7CB9E8]"></div>
                  {renderStack(waka3)}
                  {anggota3.length > 0 && <div className="w-[3px] h-[20px] bg-[#7CB9E8]"></div>}
                  {renderStack(anggota3)}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Anggota Lainnya (Jika belum masuk filter) */}
        {!isLoading && unassigned.length > 0 && (
          <div className="mt-16 text-center w-full">
            <h4 className="text-[#266CA9] font-bold text-sm uppercase tracking-wider mb-6">Anggota Lainnya</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {unassigned.map(m => (
                <OrgCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
}