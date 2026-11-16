'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheckIcon,
  SearchIcon,
  FileTextIcon,
  KeyIcon,
  MessageSquareIcon,
  ComputerIcon,
  UsersIcon,
  AlertTriangleIcon,
  PhoneIcon,
  ActivityIcon,
} from '@/components/Icons';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import ShinyText from '@/components/reactbits/ShinyText';
import BlurText from '@/components/reactbits/BlurText';
import SquaresBackground from '@/components/reactbits/SquaresBackground';
import BullyingIllustrationBackground from '@/components/BullyingIllustrationBackground';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import ScrollTextReveal from '@/components/reactbits/ScrollTextReveal';
import DecryptedText from '@/components/reactbits/DecryptedText';
import YouthHealLogo from '@/components/YouthHealLogo';

export default function HomePage() {
  // Typewriter effect
  const words = ['Perundungan.', 'Cyberbullying.', 'Kekerasan.', 'Intimidasi.', 'Pelecehan.'];
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && charIndex <= currentWord.length) {
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 100);
    } else if (!isDeleting && charIndex > currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, 60);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  // Mood selector
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const moodResponses: Record<string, string> = {
    sedih: 'Perasaanmu valid. Kamu tidak harus memikul beban ini sendirian. Kami siap mendengarmu.',
    cemas: 'Tarik napas perlahan. Kamu berada di ruang yang aman dan rahasiamu terjaga sepenuhnya.',
    marah: 'Kemarahanmu adalah tanda batas dirimu terganggu. Salurkan melalui laporan resmi agar dapat ditindak.',
    baik: 'Senang mendengarnya. Terus saling jaga dan jadilah teman yang peduli bagi sesama di sekolah.',
  };

  // Bullying screener quiz
  const [quizStep, setQuizStep] = useState(1);
  const [quizScore, setQuizScore] = useState(0);

  const handleQuizAnswer = (isBullyFactor: boolean) => {
    const newScore = isBullyFactor ? quizScore + 1 : quizScore;
    setQuizScore(newScore);
    setQuizStep((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setQuizStep(1);
    setQuizScore(0);
  };

  const categories = [
    {
      title: 'Cyberbullying',
      tag: 'Platform Digital',
      desc: 'Ancaman, pelecehan, atau penyebaran rumor dan konten memalukan di media sosial atau grup obrolan.',
      icon: ComputerIcon,
    },
    {
      title: 'Verbal',
      tag: 'Kata & Ujaran',
      desc: 'Hinaan berulang, julukan merendahkan, ancaman, atau intimidasi lisan yang menyerang psikologis.',
      icon: MessageSquareIcon,
    },
    {
      title: 'Fisik',
      tag: 'Kontak Langsung',
      desc: 'Tindakan memukul, mendorong, menendang, merampas atau merusak barang milik korban secara sengaja.',
      icon: AlertTriangleIcon,
    },
    {
      title: 'Sosial / Relasional',
      tag: 'Hubungan Sosial',
      desc: 'Pengucilan secara sengaja, menghasut teman untuk memusuhi, dan manipulasi pertemanan.',
      icon: UsersIcon,
    },
    {
      title: 'Pelecehan Seksual',
      tag: 'Tindakan Serius',
      desc: 'Komentar bernuansa seksual yang tidak diinginkan, sentuhan tanpa izin, atau pemaksaan visual.',
      icon: ShieldCheckIcon,
    },
    {
      title: 'Lainnya',
      tag: 'Kategori Tambahan',
      desc: 'Segala bentuk perlakuan diskriminatif, pemalakan uang saku, atau pemaksaan yang membuat tertekan.',
      icon: FileTextIcon,
    },
  ];

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#0b1120',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '7.5rem 0 4.5rem',
        }}
      >
        <BullyingIllustrationBackground variant="hero" />

        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(30, 58, 138, 0.45)', border: '1px solid rgba(56, 189, 248, 0.35)', padding: '0.35rem 0.85rem', borderRadius: '9999px', marginBottom: '1.25rem', backdropFilter: 'blur(8px)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#38bdf8', boxShadow: '0 0 8px #38bdf8' }}></span>
              <span className="tech-font" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7dd3fc', letterSpacing: '0.04em' }}>
                <DecryptedText text="YOUTHHEAL // RUANG AMAN & TERPERCAYA" speed={40} maxIterations={10} />
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.8rem)', fontWeight: 800, lineHeight: 1.16, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: '#ffffff' }}>
              Hentikan{' '}
              <span style={{ color: '#38bdf8', textShadow: '0 0 24px rgba(56, 189, 248, 0.45)', display: 'inline-block' }}>
                {words[wordIndex].substring(0, charIndex)}
                <span className="typewriter-cursor" style={{ color: '#38bdf8', fontWeight: 300 }}>|</span>
              </span>
              <span style={{ display: 'block', fontSize: '0.52em', fontWeight: 600, color: '#94a3b8', letterSpacing: '-0.01em', marginTop: '0.45rem' }}>
                Mulai Bersuara Sekarang.
              </span>
            </h1>

            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.25rem', maxWidth: '520px' }}>
              <strong style={{ color: '#ffffff', fontWeight: 700 }}>YouthHeal</strong> adalah platform <strong style={{ color: '#38bdf8', fontWeight: 700 }}>100% anonim</strong> dan terpercaya. Laporkan perundungan siber, intimidasi verbal, atau kekerasan di lingkungan sekolah tanpa rasa takut.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              <Link href="/report" className="btn-pill-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '0.95rem', boxShadow: '0 8px 24px -4px rgba(2, 132, 199, 0.5)' }}>
                <FileTextIcon size={18} />
                Lapor Anonim
              </Link>
              <Link href="/track" className="btn-pill-ghost" style={{ padding: '0.8rem 1.8rem', fontSize: '0.95rem', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.25)', background: 'rgba(255, 255, 255, 0.06)', backdropFilter: 'blur(12px)' }}>
                <SearchIcon size={18} />
                Lacak Status Laporan
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '2.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '1.75rem', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1 }}>100%</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginTop: '0.35rem' }}>Identitas Anonim</div>
              </div>
              <div style={{ width: 1, height: '36px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }}></div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1 }}>24/7</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginTop: '0.35rem' }}>Akses Layanan</div>
              </div>
              <div style={{ width: 1, height: '36px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }}></div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1 }}>6</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginTop: '0.35rem' }}>Kategori Penanganan</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ScrollReveal delay={180} distance={24}>
              <SpotlightCard
                spotlightColor="rgba(56, 189, 248, 0.25)"
                style={{ maxWidth: '420px', width: '100%', padding: '2rem', borderRadius: '28px', border: '1px solid rgba(56, 189, 248, 0.25)', background: 'linear-gradient(145deg, rgba(11, 17, 32, 0.75) 0%, rgba(15, 23, 42, 0.65) 100%)', backdropFilter: 'blur(20px)', boxShadow: '0 24px 50px -12px rgba(0, 0, 0, 0.6)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.7) 0%, rgba(2, 132, 199, 0.4) 100%)', border: '1px solid rgba(56, 189, 248, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <YouthHealLogo size={24} color="#ffffff" accentColor="#38bdf8" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: '#ffffff', letterSpacing: '-0.01em' }}>Jaminan Perlindungan</h2>
                    <p className="tech-font" style={{ fontSize: '0.7rem', color: '#38bdf8', margin: 0, letterSpacing: '0.04em' }}>ENKRIPSI SESI // ZERO IP LOG</p>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.35rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: '#cbd5e1' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> Laporan diverifikasi langsung oleh Guru BK
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> Akses hasil tindak lanjut dengan Kode Unik 6-Digit
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span> Bebas intimidasi & intervensi pihak luar
                  </li>
                </ul>
                <Link href="/report" className="btn-pill-primary" style={{ width: '100%', textAlign: 'center', padding: '0.65rem 1rem', fontSize: '0.875rem' }}>
                  Kirim Laporan Sekarang &rarr;
                </Link>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Smooth Dark-to-Light Transition Bridge */}
      <div style={{ height: '120px', background: 'linear-gradient(180deg, #0b1120 0%, #0f1b32 15%, #162344 30%, #2a3a64 45%, #5a6a94 55%, #8a96b8 65%, #bcc4d8 75%, #e2e8f0 88%, #f8fafc 100%)', position: 'relative', zIndex: 1 }} />

      {/* Slide 2: Mood Check-In & Screener with Bullying Target Student Background */}
      <section
        id="layanan"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '5rem 0',
          background: '#f8fafc',
        }}
      >
        {/* Bullying Target Student Illustration Background Layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/images/slide2-target.jpg')`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.18,
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'grayscale(0.3) contrast(1.1)',
          }}
        />

        {/* Soft Overlay for text contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(248, 250, 252, 0.7) 0%, rgba(255, 255, 255, 0.55) 50%, rgba(248, 250, 252, 0.75) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Mood Check-in (Soft Ice Card) */}
          <ScrollReveal delay={0} distance={24}>
            <SpotlightCard
              spotlightColor="rgba(2, 132, 199, 0.14)"
              style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', borderRadius: '28px', border: '1px solid rgba(226, 232, 240, 0.9)', background: 'rgba(255, 255, 255, 0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 16px 40px -8px rgba(37, 99, 235, 0.12)' }}
            >
              <div>
                <ScrollReveal delay={60} distance={12}>
                  <div className="tech-badge tech-badge-cyan" style={{ marginBottom: '1rem' }}>
                    <ActivityIcon size={14} />
                    <span>REFLEKSI // EMOSI</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={120} distance={16}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.65rem', color: 'var(--text)' }}>
                    <ScrollTextReveal text="Bagaimana perasaanmu saat ini?" delay={140} wordDelay={35} />
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={200} distance={14}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                    Pilih kondisi yang paling menggambarkan dirimu hari ini untuk mendapatkan pesan penguatan mental instan.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={280} distance={18}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1.5rem' }}>
                    {[
                      { key: 'sedih', label: '😢 Sedih' },
                      { key: 'cemas', label: '😰 Cemas' },
                      { key: 'marah', label: '😡 Marah' },
                      { key: 'baik', label: '😊 Baik' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setSelectedMood(item.key)}
                        className={selectedMood === item.key ? 'btn-pill-primary' : 'btn-pill-ghost'}
                        style={{ padding: '0.7rem 1rem', fontSize: '0.875rem', cursor: 'pointer' }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              {selectedMood && (
                <div style={{ background: '#ffffff', border: '1px solid #bfdbfe', borderLeft: '4px solid var(--primary)', padding: '1rem 1.25rem', borderRadius: '18px', fontSize: '0.875rem', color: 'var(--text)', boxShadow: '0 4px 12px rgba(30, 58, 138, 0.06)' }}>
                  {moodResponses[selectedMood]}
                </div>
              )}
            </SpotlightCard>
          </ScrollReveal>

          {/* Screener Quiz (Modern Contrast Card matching Image 3) */}
          <ScrollReveal delay={160} distance={24}>
            <SpotlightCard
              spotlightColor="rgba(56, 189, 248, 0.2)"
              style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', borderRadius: '28px', border: '1px solid rgba(56, 189, 248, 0.25)', background: 'linear-gradient(145deg, rgba(9, 18, 37, 0.88) 0%, rgba(23, 37, 84, 0.88) 100%)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', color: '#ffffff', boxShadow: '0 16px 40px -8px rgba(15, 23, 42, 0.35)' }}
            >
              <div>
                <ScrollReveal delay={180} distance={12}>
                  <div className="tech-badge tech-badge-glow" style={{ marginBottom: '1rem' }}>
                    <AlertTriangleIcon size={14} />
                    <span>DETEKSI DINI // EVALUASI</span>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={240} distance={16}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.65rem', color: '#ffffff' }}>
                    <ScrollTextReveal text="Apakah kamu sedang mengalami bullying?" delay={260} wordDelay={35} />
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={320} distance={14}>
                  <p style={{ fontSize: '0.875rem', color: '#cbd5e1', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                    Jawab 3 pertanyaan objektif ini untuk mengenali situasi yang sedang kamu hadapi di sekolah.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={380} distance={16}>
                  {quizStep === 1 && (
                    <div>
                      <p className="tech-font" style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.25rem', color: '#f8fafc' }}>
                        [1/3] Apakah perlakuan buruk atau ejekan tersebut terjadi secara berulang dan disengaja?
                      </p>
                      <div style={{ display: 'flex', gap: '0.85rem' }}>
                        <button className="btn-pill-primary" onClick={() => handleQuizAnswer(true)} style={{ padding: '0.6rem 1.3rem' }}>Ya, Berulang</button>
                        <button className="btn-pill-ghost" onClick={() => handleQuizAnswer(false)} style={{ padding: '0.6rem 1.3rem', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>Hanya Sekali / Tidak</button>
                      </div>
                    </div>
                  )}

                  {quizStep === 2 && (
                    <div>
                      <p className="tech-font" style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.25rem', color: '#f8fafc' }}>
                        [2/3] Ketika kamu meminta berhenti, apakah mereka justru melanjutkan atau menertawakanmu?
                      </p>
                      <div style={{ display: 'flex', gap: '0.85rem' }}>
                        <button className="btn-pill-primary" onClick={() => handleQuizAnswer(true)} style={{ padding: '0.6rem 1.3rem' }}>Ya, Tetap Melanjutkan</button>
                        <button className="btn-pill-ghost" onClick={() => handleQuizAnswer(false)} style={{ padding: '0.6rem 1.3rem', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>Tidak, Mereka Berhenti</button>
                      </div>
                    </div>
                  )}

                  {quizStep === 3 && (
                    <div>
                      <p className="tech-font" style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.25rem', color: '#f8fafc' }}>
                        [3/3] Apakah ada ketimpangan relasi atau kekuatan (senioritas, jumlah, atau dominasi)?
                      </p>
                      <div style={{ display: 'flex', gap: '0.85rem' }}>
                        <button className="btn-pill-primary" onClick={() => handleQuizAnswer(true)} style={{ padding: '0.6rem 1.3rem' }}>Ya, Ada Ketimpangan</button>
                        <button className="btn-pill-ghost" onClick={() => handleQuizAnswer(false)} style={{ padding: '0.6rem 1.3rem', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>Tidak, Hubungan Setara</button>
                      </div>
                    </div>
                  )}

                  {quizStep > 3 && (
                    <div>
                      {quizScore >= 2 ? (
                        <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '1.35rem', borderRadius: '18px' }}>
                          <div style={{ fontWeight: 800, color: '#fca5a5', marginBottom: '0.4rem', fontSize: '1rem' }}>
                            ⚠ Indikasi Kuat Perundungan
                          </div>
                          <p style={{ fontSize: '0.85rem', color: '#f1f5f9', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                            Pola kejadian menunjukkan tanda perundungan terstruktur. Kamu berhak merasa aman di lingkungan sekolah.
                          </p>
                          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <Link href="/report" className="btn-pill-primary" style={{ fontSize: '0.85rem' }}>
                              Buat Laporan Sekarang
                            </Link>
                            <button className="btn-pill-ghost" onClick={resetQuiz} style={{ fontSize: '0.85rem', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>
                              Ulangi Kuis
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '1.35rem', borderRadius: '18px' }}>
                          <div style={{ fontWeight: 800, color: '#6ee7b7', marginBottom: '0.4rem', fontSize: '1rem' }}>
                            ✓ Kemungkinan Konflik Interpersonal
                          </div>
                          <p style={{ fontSize: '0.85rem', color: '#f1f5f9', marginBottom: '1.2rem', lineHeight: 1.6 }}>
                            Situasi ini kemungkinan adalah kesalahpahaman biasa. Jika kamu tetap merasa terganggu, konsultasikan ke guru BK.
                          </p>
                          <button className="btn-pill-ghost" onClick={resetQuiz} style={{ fontSize: '0.85rem', color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}>
                            Ulangi Kuis
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollReveal>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
        </div>
      </section>

      {/* Slide 3: Categories Grid with Curled Student Bullying Background */}
      <section
        id="kategori"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '5rem 0',
          background: '#f8fafc',
        }}
      >
        {/* Bullying Curled Student Illustration Background Layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('/images/slide3-curled.jpg')`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15,
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'grayscale(0.3) contrast(1.1)',
          }}
        />

        {/* Soft Overlay for text contrast */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(248, 250, 252, 0.72) 0%, rgba(255, 255, 255, 0.55) 50%, rgba(248, 250, 252, 0.75) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <ScrollReveal delay={0} distance={12}>
            <div className="tech-badge tech-badge-navy" style={{ marginBottom: '0.85rem' }}>
              <DecryptedText text="KLASIFIKASI LAPORAN // 6 KATEGORI" speed={30} maxIterations={8} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80} distance={16}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>
              <ScrollTextReveal text="Kategori Perundungan yang Dapat Dilaporkan" delay={90} wordDelay={35} />
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200} distance={14}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', maxWidth: '540px', margin: '0.5rem auto 0' }}>
              Setiap bentuk perundungan memiliki karakteristik dan dampak tersendiri bagi korban.
            </p>
          </ScrollReveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <ScrollReveal key={idx} delay={280 + idx * 60} distance={22}>
                <SpotlightCard
                  spotlightColor="rgba(2, 132, 199, 0.15)"
                  style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    borderRadius: '26px',
                    border: '1px solid rgba(226, 232, 240, 0.85)',
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 12px 32px -8px rgba(15, 23, 42, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(30, 58, 138, 0.1)' }}>
                      <Icon size={22} />
                    </div>
                    <span className="tech-badge tech-badge-navy">{cat.tag}</span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text)' }}>{cat.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>{cat.desc}</p>
                </SpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>
        </div>
      </section>

      {/* 3 Step Workflow */}
      <section id="panduan" style={{ position: 'relative', padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <ScrollReveal delay={0} distance={12}>
            <div className="tech-badge tech-badge-cyan" style={{ marginBottom: '0.85rem' }}>
              <DecryptedText text="PROSES SISTEM // WORKFLOW" speed={30} maxIterations={8} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80} distance={16}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>
              <ScrollTextReveal text="3 Langkah Mudah & Terlindungi" delay={90} wordDelay={40} />
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200} distance={14}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', maxWidth: '500px', margin: '0.5rem auto 0' }}>
              Layanan YouthHeal dirancang transparan untuk pelapor tanpa meminta kartu pelajar atau nama asli.
            </p>
          </ScrollReveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          <ScrollReveal delay={260} distance={22}>
            <SpotlightCard
              spotlightColor="rgba(30, 58, 138, 0.14)"
              style={{ textAlign: 'center', padding: '2.5rem 1.75rem', height: '100%', borderRadius: '28px', border: '1px solid rgba(226, 232, 240, 0.9)', background: '#ffffff', boxShadow: '0 12px 32px -8px rgba(15, 23, 42, 0.06)' }}
            >
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)' }}>
                <FileTextIcon size={24} />
              </div>
              <div className="tech-badge tech-badge-navy" style={{ marginBottom: '0.75rem' }}>LANGKAH 01</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.65rem' }}>Isi Formulir Singkat</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Pilih kategori kejadian, ceritakan kronologi secara objektif, dan sertakan bukti tangkapan layar (jika ada).</p>
            </SpotlightCard>
          </ScrollReveal>

          <ScrollReveal delay={360} distance={22}>
            <SpotlightCard
              spotlightColor="rgba(30, 58, 138, 0.14)"
              style={{ textAlign: 'center', padding: '2.5rem 1.75rem', height: '100%', borderRadius: '28px', border: '1px solid rgba(226, 232, 240, 0.9)', background: '#ffffff', boxShadow: '0 12px 32px -8px rgba(15, 23, 42, 0.06)' }}
            >
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)' }}>
                <KeyIcon size={24} />
              </div>
              <div className="tech-badge tech-badge-navy" style={{ marginBottom: '0.75rem' }}>LANGKAH 02</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.65rem' }}>Simpan Kode 6-Digit</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Sistem YouthHeal menghasilkan kode tiket rahasia. Simpan kode ini untuk mengecek balasan dari tim BK.</p>
            </SpotlightCard>
          </ScrollReveal>

          <ScrollReveal delay={460} distance={22}>
            <SpotlightCard
              spotlightColor="rgba(30, 58, 138, 0.14)"
              style={{ textAlign: 'center', padding: '2.5rem 1.75rem', height: '100%', borderRadius: '28px', border: '1px solid rgba(226, 232, 240, 0.9)', background: '#ffffff', boxShadow: '0 12px 32px -8px rgba(15, 23, 42, 0.06)' }}
            >
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.15)' }}>
                <MessageSquareIcon size={24} />
              </div>
              <div className="tech-badge tech-badge-navy" style={{ marginBottom: '0.75rem' }}>LANGKAH 03</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.65rem' }}>Pantau Respons Konselor</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Konselor BK meninjau kronologi dan memberikan arahan serta langkah pendampingan langsung.</p>
            </SpotlightCard>
          </ScrollReveal>
        </div>
        </div>
      </section>

      {/* Emergency Crisis Hotlines */}
      <section style={{ position: 'relative', padding: '5rem 0', background: 'linear-gradient(180deg, #091225 0%, #172554 100%)' }}>
        <div className="container">
        <ScrollReveal delay={0} distance={20}>
          <div style={{ textAlign: 'center', color: '#ffffff' }}>
            <ScrollReveal delay={60} distance={12}>
              <div className="tech-badge tech-badge-glow" style={{ marginBottom: '1rem' }}>
                <PhoneIcon size={14} />
                <span>HOTLINE // TANGGAP DARURAT</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120} distance={16}>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                <ScrollTextReveal text="Butuh Bantuan Mendesak?" delay={140} wordDelay={40} />
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200} distance={14}>
              <p style={{ color: '#cbd5e1', fontSize: '0.925rem', maxWidth: '580px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
                Jika kamu atau rekanmu sedang dalam bahaya fisik langsung atau krisis mental berat, hubungi kontak darurat resmi berikut tanpa ragu.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300} distance={20}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
                <SpotlightCard spotlightColor="rgba(56, 189, 248, 0.2)" style={{ padding: '1.5rem', background: '#ffffff', textAlign: 'center', borderRadius: '22px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>KPAI</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Komisi Perlindungan Anak</div>
                  <a href="tel:02131901556" className="btn-pill-ghost" style={{ width: '100%', fontSize: '0.85rem', color: '#0f172a' }}>
                    <PhoneIcon size={14} /> 021-31901556
                  </a>
                </SpotlightCard>

                <SpotlightCard spotlightColor="rgba(30, 58, 138, 0.2)" style={{ padding: '1.5rem', background: '#ffffff', textAlign: 'center', borderRadius: '22px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>SAPA 129</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Sahabat Perempuan & Anak</div>
                  <a href="tel:129" className="btn-pill-primary" style={{ width: '100%', fontSize: '0.85rem' }}>
                    <PhoneIcon size={14} /> Hubungi 129
                  </a>
                </SpotlightCard>

                <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.2)" style={{ padding: '1.5rem', background: '#ffffff', textAlign: 'center', borderRadius: '22px' }}>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>SEJIWA (Kemenkes)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Layanan Kesehatan Jiwa</div>
                  <a href="tel:119" className="btn-pill-ghost" style={{ width: '100%', fontSize: '0.85rem', color: '#0f172a' }}>
                    <PhoneIcon size={14} /> 119 Ext 8
                  </a>
                </SpotlightCard>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
        </div>
      </section>

      {/* Closing CTA Banner with YouthHeal Logo */}
      <section style={{ position: 'relative', padding: '5rem 0', background: 'linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%)' }}>
        <div className="container">
        <ScrollReveal delay={0} distance={22}>
          <div style={{ textAlign: 'center' }}
          >
            <ScrollReveal delay={60} distance={12}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)' }}>
                <YouthHealLogo size={32} color="#ffffff" accentColor="#93c5fd" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120} distance={16}>
              <h2 style={{ fontSize: '2.15rem', fontWeight: 800, marginBottom: '0.85rem', letterSpacing: '-0.025em', color: 'var(--text)' }}>
                <ScrollTextReveal text="Siap Mengambil Langkah Pertama Bersama YouthHeal?" delay={140} wordDelay={35} />
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={220} distance={14}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.025rem', maxWidth: '540px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>
                Identitasmu dilindungi secara mutlak. Setiap suara dan laporan yang kamu kirimkan adalah langkah nyata menuju lingkungan sekolah yang aman bagi semua.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={320} distance={18}>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/report" className="btn-pill-primary" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}>
                  <FileTextIcon size={18} />
                  Buat Laporan Anonim Sekarang
                </Link>
                <Link href="/track" className="btn-pill-ghost" style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}>
                  <SearchIcon size={18} />
                  Lacak Status Laporan
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
