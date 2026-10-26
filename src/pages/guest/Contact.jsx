import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser'; 
import '../../assets/About.css'; 
import '../../assets/Contact.css'; 
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      // Masukkan ID dari EmailJS Anda di sini:
      const serviceID = 'service_6lb97nj';
      const templateID = 'template_m23kr9u';
      const publicKey = 'BFst2tYd8Z_Mgd0Sg';

      // Pastikan nama properti di sini SAMA PERSIS dengan variabel {{...}} di Template EmailJS
      const templateParams = {
        from_name: formData.name,   // Menyambungkan ke {{from_name}} di template
        from_email: formData.email, // Menyambungkan ke {{from_email}} di template
        subject: formData.subject,  // Menyambungkan ke {{subject}} di template
        message: formData.message,  // Menyambungkan ke {{message}} di template
        to_email: 'viqa004@gmail.com'
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setStatus({
        type: 'success',
        text: 'Pesan berhasil dikirim! Laporan Anda telah masuk ke email viqa004@gmail.com.'
      });

      setFormData({ name: '', email: '', subject: '', message: '' });

    }  catch (error) {
      setStatus({
        type: 'error',
        text: `Gagal mengirim pesan: ${error.text || error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="about-page">
      <header className="about-hero">
        <h1 className="hidden-element">Hubungi Kami</h1>
        <p className="hidden-element delay-100">
          Pusat layanan informasi dan koordinasi operasional Tim Teknik CNS. Kami siap merespon kebutuhan Anda 24/7.
        </p>
      </header>

      <section className="contact-section">
        <div className="contact-unified-card hidden-element delay-100">
          
          <div className="contact-info-side">
            <h2>Pusat Koordinasi</h2>
            <p className="info-desc">
              Silakan hubungi hotline operasional kami untuk pelaporan darurat terkait gangguan sistem.
            </p>
            
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <h3>Kantor Operasional</h3>
                <p>Gedung AirNav Indonesia<br/>Bandara Internasional</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div>
                <h3>Hotline Teknisi</h3>
                <p>+62 812 3456 7890<br/>Ext: 112 (Darurat)</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div>
                <h3>Email Resmi</h3>
                <p>viqa004@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="contact-form-side">
            <h2 className="form-title">Kirim Laporan / Pesan</h2>
            
            {status.text && (
              <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 text-sm font-medium border ${
                status.type === 'error' 
                  ? 'bg-red-50 text-red-600 border-red-200' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {status.type === 'error' ? (
                  <FiAlertCircle className="text-lg shrink-0 mt-0.5" />
                ) : (
                  <FiCheckCircle className="text-lg shrink-0 mt-0.5" />
                )}
                <span>{status.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="modern-form">
              <div className="form-group">
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="modern-input" 
                  placeholder=" " 
                  required 
                />
                <label htmlFor="name" className="modern-label">Nama Lengkap / Instansi</label>
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="modern-input" 
                  placeholder=" " 
                  required 
                />
                <label htmlFor="email" className="modern-label">Alamat Email</label>
              </div>
              
              <div className="form-group">
                <input 
                  type="text" 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="modern-input" 
                  placeholder=" " 
                  required 
                />
                <label htmlFor="subject" className="modern-label">Subjek Laporan</label>
              </div>
              
              <div className="form-group">
                <textarea 
                  id="message" 
                  rows="4" 
                  value={formData.message}
                  onChange={handleChange}
                  className="modern-input" 
                  placeholder=" " 
                  required
                ></textarea>
                <label htmlFor="message" className="modern-label">Detail Pesan / Kendala</label>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="modern-submit-btn flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <span>Mengirim Laporan...</span>
                ) : (
                  <>
                    <span>Kirim Laporan</span>
                    <FiSend />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}