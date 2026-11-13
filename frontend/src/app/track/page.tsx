'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, TrackResult } from '@/lib/api';
import { useDebounce } from '@/lib/debounce';
import {
  SearchIcon,
  ShieldCheckIcon,
  MessageSquareIcon,
  AlertTriangleIcon,
  ClockIcon,
} from '@/components/Icons';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import YouthHealLogo from '@/components/YouthHealLogo';

function TrackContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get('code') || '';

  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<TrackResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const fetchTrack = async (searchCode: string) => {
    const trimmed = searchCode.trim().toUpperCase();
    if (!trimmed || trimmed.length < 4) {
      setReport(null);
      setError(null);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const res = await api.trackReport(trimmed);
      setReport(res.report);
    } catch (err: unknown) {
      const apiErr = err as { status?: number; data?: { message?: string } };
      setReport(null);
      setError(apiErr?.data?.message || 'Laporan dengan kode tersebut tidak ditemukan. Periksa kembali kombinasi kode.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search when user types code (500ms debounce)
  const debouncedFetch = useDebounce((val: string) => {
    if (val.trim().length >= 6) {
      fetchTrack(val);
    }
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setCode(val);
    debouncedFetch(val);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTrack(code);
  };

  useEffect(() => {
    if (initialCode) {
      fetchTrack(initialCode);
    }
  }, [initialCode]);

  const getStatusBadge = (status: TrackResult['status']) => {
    switch (status) {
      case 'Pending':
        return <span className="badge badge-pending">Menunggu Penelaahan</span>;
      case 'Investigating':
        return <span className="badge badge-investigating">Dalam Investigasi BK</span>;
      case 'Ditanggapi':
        return <span className="badge badge-ditanggapi">Telah Ditanggapi</span>;
      default:
        return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <div className="container" style={{ padding: '7rem 1.5rem 5rem', maxWidth: '760px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)' }}>
          <YouthHealLogo size={30} color="#ffffff" accentColor="#93c5fd" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          <span className="text-mask-wrapper">
            <span className="text-mask-reveal delay-100">Lacak Perkembangan </span>
            <span className="text-mask-reveal delay-200 text-mask-shimmer" style={{ fontWeight: 800 }}>
              Laporan
            </span>
          </span>
        </h1>
        <p className="text-mask-reveal delay-300" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Masukkan 6-digit kode unik yang kamu peroleh di <strong>YouthHeal</strong> untuk melihat tindak lanjut guru BK.
        </p>
      </div>

      {/* Search Input Box with Debounce */}
      <form onSubmit={handleFormSubmit} className="card" style={{ padding: '1.25rem', marginBottom: '2rem', borderRadius: '26px', border: '1px solid rgba(226, 232, 240, 0.95)', boxShadow: '0 12px 32px -8px rgba(15, 23, 42, 0.06)' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Masukkan kode unik (Contoh: YT8492)"
              value={code}
              onChange={handleInputChange}
              maxLength={12}
              style={{
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                paddingLeft: '1rem',
                borderRadius: '16px',
              }}
            />
          </div>
          <button
            type="submit"
            className="btn-pill-primary"
            disabled={loading || code.trim().length < 4}
            style={{ padding: '0.75rem 1.6rem', whiteSpace: 'nowrap', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            {loading ? 'Mencari...' : 'Lacak Status'}
          </button>
        </div>
      </form>

      {/* Result Display */}
      {loading && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '0.9rem' }}>Memeriksa basis data laporan...</div>
        </div>
      )}

      {error && !loading && (
        <div className="card" style={{ textAlign: 'center', padding: '2.5rem', border: '1px solid var(--primary-border)', background: 'var(--primary-subtle)' }}>
          <AlertTriangleIcon size={32} style={{ color: 'var(--danger)', marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text)' }}>
            Laporan Tidak Ditemukan
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto' }}>
            {error}
          </p>
        </div>
      )}

      {report && !loading && (
        <SpotlightCard spotlightColor="rgba(2, 132, 199, 0.14)" style={{ padding: '2.5rem 2rem', borderRadius: '28px', border: '1px solid rgba(226, 232, 240, 0.95)', boxShadow: '0 16px 40px -10px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.05em' }}>
                KODE TIKET
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'monospace', color: 'var(--primary)', letterSpacing: '0.05em' }}>
                {report.tracking_code}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.25rem' }}>STATUS PENANGANAN</div>
              {getStatusBadge(report.status)}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', background: 'var(--bg-elevated)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Kategori</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{report.category}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Urgensi</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{report.severity || 'Normal'}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Waktu Pelaporan</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {new Date(report.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Uraian Kejadian
            </h4>
            <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1rem', fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text)' }}>
              {report.description}
            </div>
          </div>

          {/* Timeline Respon Guru BK */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquareIcon size={16} />
              Catatan Tindak Lanjut Konselor
            </h4>

            {report.responses && report.responses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {report.responses.map((resp, idx) => (
                  <div
                    key={idx}
                    style={{
                      borderLeft: '3px solid var(--primary)',
                      background: 'var(--primary-subtle)',
                      padding: '1rem',
                      borderRadius: '0 8px 8px 0',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{resp.staff || 'Konselor BK'}</span>
                      <span>{new Date(resp.created_at).toLocaleString('id-ID')}</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>
                      {resp.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '1.25rem', border: '1px dashed var(--border)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Belum ada tanggapan tertulis. Guru BK sedang menelaah kronologi insiden.
              </div>
            )}
          </div>
        </SpotlightCard>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>Memuat sistem pelacakan...</div>}>
      <TrackContent />
    </Suspense>
  );
}
