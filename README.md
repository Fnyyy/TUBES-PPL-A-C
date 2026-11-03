# YouTheal — Platform Anti-Bullying & Konseling Siswa (Anti-Slop Edition)

Cloning & modern redesign dari [youtheal-new.vercel.app](https://youtheal-new.vercel.app/) menggunakan arsitektur decoupled:
- **Backend**: Laravel 11 + PostgreSQL (Sanctum Auth)
- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Design Philosophy**: *Anti-Slop* — Elegan, clean, bebas tumpukan emoji tacky, performan, dilengkapi debounce input dan perlindungan privasi.

---

## Fitur Utama

1. **Laporan 100% Anonim (`/report`)**
   - Pemilihan kategori bullying (Fisik, Verbal, Siber, Sosial, Pelecehan, Lainnya).
   - Skala urgensi / keparahan kejadian.
   - Pengecekan panjang deskripsi realtime (minimal 30 karakter, maksimal 2000 karakter).
   - Unggah bukti screenshot/foto (JPG, PNG, WebP).
   - Pembuatan otomatis **Kode Tiket Unik 6-Karakter** (disimpan pelapor untuk pelacakan).

2. **Lacak Status dengan Debounce (`/track`)**
   - Debounce search (500ms): Otomatis memicu pencarian API saat mengetik kode tiket tanpa membebani server.
   - Menampilkan status realtime (*Pending*, *Investigating*, *Ditanggapi*).
   - Timeline respon dan arahan perlindungan dari konselor/guru BK.

3. **Portal Khusus Guru BK / Konselor (`/login` & `/dashboard`)**
   - Autentikasi berbasis token Sanctum.
   - Filter status laporan dan pencarian dengan debounce.
   - Modal telaah kronologi insiden, pembaruan status, dan pengiriman pesan tindak lanjut ke siswa pelapor.

4. **Screener Cepat & Refleksi Emosional**
   - Kuis 3-pertanyaan untuk deteksi dini pola perundungan vs konflik interpersonal biasa.
   - Check-in emosi dengan respon penguatan mental (menggunakan icon SVG bersih tanpa spam emoji).

5. **Quick Exit Darurat (Panic Button)**
   - Tombol mengambang keluar cepat ke Google Classroom.
   - Shortcut keyboard: Tekan tombol **`ESC` 3x** berturut-turut untuk langsung keluar dari website saat situasi darurat.

---

## Panduan Menjalankan Project (Untuk Anggota Tim)

Ikuti langkah-langkah di bawah ini secara berurutan untuk menjalankan project **YouthHeal** di komputer/laptop masing-masing via VS Code atau Antigravity.

---

### 📋 Prasyarat Sistem (Prerequisites)

Pastikan software berikut sudah terinstal di komputer:
1. **PHP 8.2+** (Pastikan ekstensi `pdo_pgsql`, `pgsql`, `mbstring`, `curl`, `fileinfo` aktif di `php.ini`)
2. **Composer** (Dependency manager untuk PHP)
3. **PostgreSQL** (Service PostgreSQL harus dalam status *Running*, default port `5432`)
4. **Node.js** (Versi 18.x atau 20.x ke atas) & **npm**
5. **Git** & **VS Code / Antigravity IDE**

---

### 🗄️ Langkah 1: Persiapan Database PostgreSQL

1. Buka **pgAdmin** atau terminal `psql`.
2. Buat database baru bernama:
   ```sql
   CREATE DATABASE youtheal_db;
   ```
3. Catat username (biasanya `postgres`) dan password PostgreSQL kalian.

---

### ⚙️ Langkah 2: Menjalankan Backend (Laravel 11)

Buka terminal di root project, lalu masuk ke direktori `backend`:

1. **Pindah ke folder backend**:
   ```bash
   cd backend
   ```

2. **Siapkan file `.env`**:
   Jika belum ada file `.env`, buat salinan dari `.env.example` (atau buat file baru `.env`):
   Pastikan konfigurasi database di dalam `backend/.env` sesuai dengan database kalian:
   ```env
   APP_NAME=YouthHeal
   APP_ENV=local
   APP_KEY=base64:RyoU2oD0ZCC4CgJD+ZeMOyq5pV20uTAr30h4DbcwwyI=
   APP_DEBUG=true
   APP_URL=http://localhost:8000

   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=youtheal_db
   DB_USERNAME=postgres
   DB_PASSWORD=password_postgres_kalian

   SANCTUM_STATEFUL_DOMAINS=localhost:3000
   SESSION_DOMAIN=localhost
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   ```

3. **Install Dependencies & Generate Key**:
   ```bash
   composer install
   php artisan key:generate
   ```

4. **Jalankan Migrasi & Database Seeder**:
   ```bash
   php artisan migrate --seed
   ```
   *(Perintah ini akan membuat tabel-tabel laporan, kategori bullying, dan akun default Guru BK).*

5. **Jalankan Server Backend**:
   ```bash
   php artisan serve --port=8000
   ```
   Backend akan aktif di: `http://localhost:8000`  
   *(Biarkan terminal ini tetap menyala).*

---

### 💻 Langkah 3: Menjalankan Frontend (Next.js 15)

Buka **Terminal Baru (Split Terminal)** di VS Code/Antigravity:

1. **Pindah ke folder frontend**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan Server Frontend**:
   ```bash
   npm run dev
   ```
   Frontend akan aktif di: `http://localhost:3000`

4. **Buka di Browser**:
   Kunjungi [http://localhost:3000](http://localhost:3000)

---

### 🔑 Akun Login Default (Konselor / Guru BK)

Untuk menguji fitur **Portal Konselor BK** (`/login` & `/dashboard`):
- **URL Login**: [http://localhost:3000/login](http://localhost:3000/login)
- **Email**: `bk@sekolah.ac.id`
- **Password**: `password`

---

### 🛠️ Mengatasi Masalah Umum (Troubleshooting)

1. **Error: `'npm'` atau `'node'` tidak dikenali di PowerShell VS Code**:
   - Tutup dan buka kembali VS Code setelah menginstal Node.js.
   - Atau muat ulang PATH di PowerShell dengan perintah:
     ```powershell
     $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
     ```

2. **Error: `SQLSTATE[08006] could not connect to server`**:
   - Pastikan aplikasi PostgreSQL sedang berjalan (*running* di Windows Services).
   - Pastikan database `youtheal_db` sudah dibuat di pgAdmin.
   - Pastikan `DB_PASSWORD` di file `backend/.env` cocok dengan password PostgreSQL laptop kalian.

3. **Error ekstensi `pdo_pgsql` not found**:
   - Buka file `php.ini` di folder PHP kalian (misalnya `C:\php\php.ini` atau XAMPP).
   - Hapus tanda titik koma (`;`) di depan baris `extension=pdo_pgsql` dan `extension=pgsql`.
   - Simpan file dan restart terminal.
