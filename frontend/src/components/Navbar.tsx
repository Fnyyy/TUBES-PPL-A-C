'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import YouthHealLogo from './YouthHealLogo';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Beranda' },
    { href: '/#layanan', label: 'Layanan' },
    { href: '/#kategori', label: 'Kategori' },
    { href: '/#panduan', label: 'Panduan' },
    { href: '/track', label: 'Lacak Status' },
  ];

  return (
    <div className="navbar-wrapper">
      <header className="navbar-pill">
        {/* Brand with circular logo badge */}
        <Link href="/" className="nav-brand">
          <div className="brand-circle-badge">
            <YouthHealLogo size={22} color="#ffffff" accentColor="#93c5fd" />
          </div>
          <span className="brand-title">
            Youth<span className="brand-accent">Heal</span>
          </span>
        </Link>

        {/* Center navigation links */}
        <nav className="nav-links">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right action buttons matching image 1 */}
        <div className="nav-actions">
          <Link href="/login" className="btn-pill-ghost">
            Staff BK
          </Link>
          <Link href="/report" className="btn-pill-primary">
            Buat Laporan
          </Link>
        </div>
      </header>
    </div>
  );
}
