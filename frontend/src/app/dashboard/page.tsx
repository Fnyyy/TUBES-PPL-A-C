'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, DashboardReport, User } from '@/lib/api';
import { useDebounce } from '@/lib/debounce';
import {
  ShieldCheckIcon,
  SearchIcon,
  LogOutIcon,
  MessageSquareIcon,
  AlertTriangleIcon,
  CheckIcon,
  FileTextIcon,
} from '@/components/Icons';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<DashboardReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected report for modal / response
  const [selectedReport, setSelectedReport] = useState<DashboardReport | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('youtheal_token');
    const storedUser = localStorage.getItem('youtheal_user');
    if (!token) {
      router.push('/login');
      return;
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // ignore parse error
      }
    }
    loadReports();
  }, []);

  const loadReports = async (query = searchQuery, status = filterStatus) => {
    setLoading(true);
    try {
      const params: { status?: string; search?: string } = {};
      if (status !== 'all') params.status = status;
      if (query.trim()) params.search = query.trim();
      const res = await api.getDashboardReports(params);
      setReports(res.data || []);
    } catch {
      // If error (or backend not yet seeded/migrated), empty list
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search (400ms)
  const debouncedSearch = useDebounce((q: string) => {
    loadReports(q, filterStatus);
  }, 400);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    loadReports(searchQuery, status);
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch {
      // ignore
    }
    localStorage.removeItem('youtheal_token');
    localStorage.removeItem('youtheal_user');
    router.push('/login');
  };

  const handleUpdateStatus = async (newStatus: string) => {
    if (!selectedReport) return;
    setUpdatingStatus(true);
    try {
      await api.updateReportStatus(selectedReport.id, newStatus);
      setActionSuccess(`Status berhasil diperbarui menjadi ${newStatus}`);
      setSelectedReport({ ...selectedReport, status: newStatus as DashboardReport['status'] });
      loadReports();
    } catch {
      alert('Gagal memperbarui status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport || !replyMessage.trim()) return;
    setReplyLoading(true);
    try {
      await api.respondToReport(selectedReport.id, replyMessage.trim());
      setActionSuccess('Tanggapan berhasil dikirim dan dapat dilihat oleh pelapor.');
      setReplyMessage('');
      loadReports();
    } catch {
      alert('Gagal mengirim tanggapan');
    } finally {
      setReplyLoading(false);
    }
  };

  const getStatusBadge = (status: DashboardReport['status']) => {
    switch (status) {
      case 'Pending':
        return <span className="badge badge-pending">Pending</span>;
      case 'Investigating':
        return <span className="badge badge-investigating">Investigating</span>;
      case 'Ditanggapi':
        return <span className="badge badge-ditanggapi">Ditanggapi</span>;
      default:
        return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <div className="container" style={{ padding: '7rem 1.5rem 5rem' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Portal Konselor BK</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Masuk sebagai: <strong>{user?.name || user?.email || 'Staf Konseling'}</strong> ({user?.role || 'Staff'})
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-secondary"
          style={{ fontSize: '0.825rem', padding: '0.5rem 0.9rem' }}
        >
          <LogOutIcon size={15} />
          Keluar
        </button>
      </div>

      {/* Filter and Debounced Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Semua Laporan' },
            { id: 'Pending', label: 'Pending' },
            { id: 'Investigating', label: 'Investigating' },
            { id: 'Ditanggapi', label: 'Ditanggapi' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleStatusFilter(item.id)}
              className={`btn ${filterStatus === item.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ minWidth: '260px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Cari kode tiket, pelaku..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ paddingLeft: '2.25rem', fontSize: '0.85rem' }}
            />
            <SearchIcon
              size={15}
              style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}
            />
          </div>
        </div>
      </div>

      {/* Reports Table / List */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Memuat daftar laporan...
          </div>
        ) : reports.length === 0 ? (
          <div style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <FileTextIcon size={32} style={{ color: 'var(--text-dim)', marginBottom: '0.75rem' }} />
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}>Tidak ada laporan</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
              Belum ada data laporan yang sesuai dengan kriteria filter saat ini.
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Kode Tiket</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Kategori</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Urgensi</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tanggal</th>
                  <th style={{ padding: '0.85rem 1.25rem', fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => {
                  const catName = typeof r.category === 'object' ? r.category.name : r.category;
                  return (
                    <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem 1.25rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)' }}>
                        {r.tracking_code}
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>{catName}</td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span className="badge badge-neutral">{r.severity || 'Normal'}</span>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>{getStatusBadge(r.status)}</td>
                      <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        {new Date(r.created_at).toLocaleDateString('id-ID')}
                      </td>
                      <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            setSelectedReport(r);
                            setActionSuccess(null);
                          }}
                          className="btn btn-secondary"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.775rem' }}
                        >
                          Kelola &rarr;
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail & Response Modal */}
      {selectedReport && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="card"
            style={{ maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>RINCIAN LAPORAN</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, fontFamily: 'monospace', color: 'var(--primary)' }}>
                  {selectedReport.tracking_code}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="btn btn-secondary"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
              >
                ✕ Tutup
              </button>
            </div>

            {actionSuccess && (
              <div style={{ background: 'var(--success-subtle)', border: '1px solid #bbf7d0', color: 'var(--success)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                {actionSuccess}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem', marginBottom: '1.25rem', background: 'var(--bg-elevated)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Kategori:</span>{' '}
                <strong>{typeof selectedReport.category === 'object' ? selectedReport.category.name : selectedReport.category}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Status Saat Ini:</span>{' '}
                {getStatusBadge(selectedReport.status)}
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Pelaku Terduga:</span>{' '}
                <strong>{selectedReport.perpetrator_name || '-'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Lokasi:</span>{' '}
                <strong>{selectedReport.incident_location || '-'}</strong>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                Kronologi Laporan:
              </div>
              <div style={{ padding: '1rem', background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                {selectedReport.description}
              </div>
            </div>

            {/* Change Status Action */}
            <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
              <label className="form-label">Ubah Status Tindak Lanjut</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Pending', 'Investigating', 'Ditanggapi'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={updatingStatus || selectedReport.status === st}
                    onClick={() => handleUpdateStatus(st)}
                    className={`btn ${selectedReport.status === st ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
                  >
                    Set {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Counselor Response Form */}
            <form onSubmit={handleSendResponse} style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
              <label className="form-label">Tulis Catatan / Tindak Lanjut untuk Pelapor</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder="Tuliskan rekomendasi atau langkah perlindungan yang diambil oleh tim BK..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                required
                style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={replyLoading || !replyMessage.trim()}
                style={{ fontSize: '0.825rem' }}
              >
                {replyLoading ? 'Mengirim...' : 'Kirim Catatan Konselor'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
