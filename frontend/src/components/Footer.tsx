import Link from 'next/link';
import YouthHealLogo from './YouthHealLogo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontWeight: 800, fontSize: '1.15rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <YouthHealLogo size={18} color="#ffffff" accentColor="#93c5fd" />
          </div>
          <span style={{ color: 'var(--text)' }}>
            Youth<span style={{ color: 'var(--primary)' }}>Heal</span>
          </span>
        </div>
        <p style={{ maxWidth: '520px', margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Platform pelaporan perundungan anonim & pendampingan kesehatan mental siswa. Privasi Anda terjaga tanpa pencatatan identitas pribadi.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.825rem' }}>
          <Link href="/report" style={{ color: 'var(--text-muted)' }}>Buat Laporan</Link>
          <Link href="/track" style={{ color: 'var(--text-muted)' }}>Lacak Tiket</Link>
          <Link href="/login" style={{ color: 'var(--text-muted)' }}>Portal Konselor</Link>
        </div>
        <p style={{ fontSize: '0.775rem', color: 'var(--text-dim)', margin: 0 }}>
          &copy; {new Date().getFullYear()} YouthHeal. Dikelola untuk lingkungan sekolah yang aman & inklusif.
        </p>
      </div>
    </footer>
  );
}
