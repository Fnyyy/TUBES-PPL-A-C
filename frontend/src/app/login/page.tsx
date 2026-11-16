'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { LockIcon, ShieldCheckIcon, AlertTriangleIcon } from '@/components/Icons';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import YouthHealLogo from '@/components/YouthHealLogo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.login(email, password);
      localStorage.setItem('youtheal_token', res.token);
      localStorage.setItem('youtheal_user', JSON.stringify(res.user));
      router.push('/dashboard');
    } catch (err: unknown) {
      const apiErr = err as { status?: number; data?: { message?: string } };
      setError(apiErr?.data?.message || 'Kredensial login tidak valid. Pastikan email dan password terdaftar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '7rem 1.5rem 6rem', maxWidth: '440px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)' }}>
          <YouthHealLogo size={30} color="#ffffff" accentColor="#93c5fd" />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          <span className="text-mask-wrapper">
            <span className="text-mask-reveal delay-100">Portal Konselor </span>
            <span className="text-mask-reveal delay-200 text-mask-shimmer" style={{ fontWeight: 800 }}>
              BK
            </span>
          </span>
        </h1>
        <p className="text-mask-reveal delay-300" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Akses khusus staf konseling <strong>YouthHeal</strong> untuk menindaklanjuti laporan siswa.
        </p>
      </div>

      <SpotlightCard spotlightColor="rgba(30, 58, 138, 0.16)" style={{ padding: '2.25rem', borderRadius: '26px' }}>
        {error && (
          <div style={{ background: 'var(--primary-subtle)', border: '1px solid var(--primary-border)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangleIcon size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Petugas</label>
            <input
              type="email"
              className="form-input"
              placeholder="bk@sekolah.sch.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kata Sandi</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
            style={{ marginTop: '1rem', padding: '0.75rem' }}
          >
            {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.775rem', color: 'var(--text-dim)' }}>
          Akun dibuat dan dikelola oleh administrator sekolah. Siswa dilarang mencoba mengakses portal ini.
        </div>
      </SpotlightCard>
    </div>
  );
}
