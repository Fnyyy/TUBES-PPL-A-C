'use client';

import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import {
  FileTextIcon,
  UploadIcon,
  ShieldCheckIcon,
  CopyIcon,
  CheckIcon,
  AlertTriangleIcon,
} from '@/components/Icons';
import { SpotlightCard } from '@/components/reactbits/SpotlightCard';
import YouthHealLogo from '@/components/YouthHealLogo';

export default function ReportPage() {
  const [categoryId, setCategoryId] = useState('1');
  const [severity, setSeverity] = useState('Sedang');
  const [perpetrator, setPerpetrator] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: '1', name: 'Perundungan Fisik' },
    { id: '2', name: 'Perundungan Verbal' },
    { id: '3', name: 'Cyberbullying (Digital)' },
    { id: '4', name: 'Perundungan Sosial / Relasional' },
    { id: '5', name: 'Pelecehan Seksual' },
    { id: '6', name: 'Lainnya' },
  ];

  const severities = [
    { value: 'Ringan', desc: 'Bercanda kasar, ejekan verbal sesekali' },
    { value: 'Sedang', desc: 'Ancaman, pengucilan terencana, cyberbullying' },
    { value: 'Parah', label: 'Darurat', desc: 'Kekerasan fisik, pemerasan, pelecehan seksual' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.length < 30) {
      setError('Deskripsi kejadian harus berisi minimal 30 karakter agar dapat ditelaah dengan baik.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('category_id', categoryId);
    formData.append('severity', severity);
    if (perpetrator.trim()) formData.append('perpetrator_name', perpetrator.trim());
    if (incidentDate) formData.append('incident_date', incidentDate);
    if (incidentLocation.trim()) formData.append('incident_location', incidentLocation.trim());
    formData.append('description', description.trim());
    if (file) formData.append('photo', file);

    try {
      const res = await api.submitReport(formData);
      setSuccessCode(res.tracking_code);
    } catch (err: unknown) {
      const apiErr = err as { status?: number; data?: { message?: string } };
      setError(apiErr?.data?.message || 'Gagal mengirim laporan. Pastikan koneksi server tersedia.');
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (!successCode) return;
    navigator.clipboard.writeText(successCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '7rem 1.5rem 5rem', maxWidth: '720px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)' }}>
          <YouthHealLogo size={30} color="#ffffff" accentColor="#93c5fd" />
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          <span className="text-mask-wrapper">
            <span className="text-mask-reveal delay-100">Laporan Insiden </span>
            <span className="text-mask-reveal delay-200 text-mask-shimmer" style={{ fontWeight: 800 }}>
              Anonim
            </span>
          </span>
        </h1>
        <p className="text-mask-reveal delay-300" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Informasi yang kamu bagikan bersifat rahasia dan langsung diteruskan ke tim konseling <strong>YouthHeal</strong>.
        </p>
      </div>

      {successCode ? (
        <SpotlightCard spotlightColor="rgba(5, 150, 105, 0.15)" style={{ padding: '2.5rem', textAlign: 'center', border: '1px solid #bbf7d0', background: 'var(--success-subtle)', borderRadius: '28px' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <CheckIcon size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Laporan Berhasil Terkirim</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
            Simpan <strong>Kode Pelacakan</strong> di bawah ini. Kode ini adalah satu-satunya cara kamu memeriksa tindak lanjut laporanmu.
          </p>

          <div style={{ background: '#ffffff', border: '2px dashed var(--border-strong)', borderRadius: 'var(--radius)', padding: '1.25rem', maxWidth: '340px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '0.2em', fontFamily: 'monospace', color: 'var(--text)' }}>
              {successCode}
            </span>
            <button
              type="button"
              onClick={copyCode}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
              {copied ? 'Tersalin' : 'Salin'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/track?code=${successCode}`} className="btn btn-primary">
              Cek Status Laporan Sekarang &rarr;
            </Link>
            <button
              type="button"
              onClick={() => {
                setSuccessCode(null);
                setDescription('');
                setPerpetrator('');
                setIncidentLocation('');
                setFile(null);
              }}
              className="btn btn-secondary"
            >
              Buat Laporan Baru
            </button>
          </div>
        </SpotlightCard>
      ) : (
        <SpotlightCard spotlightColor="rgba(2, 132, 199, 0.12)" style={{ padding: '2.5rem 2.25rem', borderRadius: '28px', border: '1px solid rgba(226, 232, 240, 0.95)', boxShadow: '0 16px 40px -10px rgba(15, 23, 42, 0.08)' }}>
          <form onSubmit={handleSubmit}>
            {error && (
            <div style={{ background: 'var(--primary-subtle)', border: '1px solid var(--primary-border)', color: 'var(--danger)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangleIcon size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Kategori */}
          <div className="form-group">
            <label className="form-label">Kategori Perundungan</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.65rem' }}>
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${categoryId === cat.id ? 'var(--primary)' : 'var(--border)'}`,
                    background: categoryId === cat.id ? 'var(--primary-subtle)' : 'var(--bg-card)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: categoryId === cat.id ? 600 : 500,
                    transition: 'var(--transition)',
                  }}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={categoryId === cat.id}
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tingkat Keparahan */}
          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="form-label">
              Tingkat Keparahan / Urgensi <span className="form-label-optional">(Opsional)</span>
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {severities.map((sev) => (
                <label
                  key={sev.value}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${severity === sev.value ? 'var(--primary)' : 'var(--border)'}`,
                    background: severity === sev.value ? 'var(--primary-subtle)' : 'var(--bg-card)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <input
                      type="radio"
                      name="severity"
                      value={sev.value}
                      checked={severity === sev.value}
                      onChange={(e) => setSeverity(e.target.value)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{sev.label || sev.value}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sev.desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pelaku & Tanggal */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">
                Pihak Terduga Pelaku <span className="form-label-optional">(Inisial / Kelas)</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Siswa kelas 11B / Inisial R"
                value={perpetrator}
                onChange={(e) => setPerpetrator(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Tanggal Perkiraan Kejadian <span className="form-label-optional">(Opsional)</span>
              </label>
              <input
                type="date"
                className="form-input"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
              />
            </div>
          </div>

          {/* Lokasi */}
          <div className="form-group">
            <label className="form-label">
              Lokasi Kejadian <span className="form-label-optional">(Opsional)</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Contoh: Kantin sekolah, lorong kelas, grup WhatsApp"
              value={incidentLocation}
              onChange={(e) => setIncidentLocation(e.target.value)}
            />
          </div>

          {/* Deskripsi */}
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Kronologi Kejadian</label>
              <span style={{ fontSize: '0.75rem', color: description.length < 30 ? 'var(--danger)' : 'var(--text-dim)' }}>
                {description.length} / 2000 karakter (min. 30)
              </span>
            </div>
            <textarea
              className="form-textarea"
              placeholder="Jelaskan apa yang terjadi secara objektif. Kamu tidak perlu menyertakan identitasmu sendiri jika ingin tetap anonim..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={2000}
              required
            />
          </div>

          {/* File Upload */}
          <div className="form-group">
            <label className="form-label">
              Lampiran Bukti Tangkapan Layar / Foto <span className="form-label-optional">(Opsional)</span>
            </label>
            <div
              style={{
                border: '2px dashed var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.5rem',
                textAlign: 'center',
                background: 'var(--bg-elevated)',
                cursor: 'pointer',
              }}
              onClick={() => document.getElementById('report-file-input')?.click()}
            >
              <input
                type="file"
                id="report-file-input"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <UploadIcon size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                {file ? file.name : 'Pilih file tangkapan layar atau seret ke sini'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
                Format didukung: PNG, JPG, JPEG (Maks. 5MB)
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading || description.length < 30}
            style={{ marginTop: '1.25rem' }}
          >
            {loading ? 'Mengirim Laporan...' : 'Kirim Laporan Secara Anonim'}
          </button>
        </form>
        </SpotlightCard>
      )}
    </div>
  );
}
