# CV Nurrizky Cipta Karya — Website & CMS

Website company profile percetakan (React 19 + Vite + Tailwind CSS 4) dengan panel CMS untuk mengelola konten.

## Menjalankan

```bash
npm install
cp .env.example .env.local   # wajib: isi email & password admin
npm run dev                  # http://localhost:3000
```

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Server development di port 3000 |
| `npm run build` | Cek tipe + build produksi ke `dist/` |
| `npm run preview` | Menjalankan hasil build |
| `npm run typecheck` | Cek TypeScript saja |

## Halaman

| URL | Isi |
| --- | --- |
| `/` | Website publik |
| `/admin/login` | Halaman login admin |
| `/admin` | Dashboard CMS (wajib login) |
| `/admin/penawaran` | Kelola permintaan penawaran (RFQ) |
| `/admin/layanan` | Kelola layanan & produk |
| `/admin/portofolio` | Kelola portofolio |
| `/admin/testimoni` | Kelola testimoni |
| `/admin/perusahaan` | Profil, kontak, statistik, navigasi, banner promo |
| `/admin/backup` | Ekspor / impor / reset data |

## Struktur

```
src/
  pages/            HomePage, LoginPage
  pages/admin/      Layout + halaman-halaman CMS
  components/       Section website publik
  components/admin/ Komponen UI & CRUD yang dipakai halaman CMS
  context/          CMSContext — state & aksi CRUD
  data/             Data awal (seed)
  utils/            Formatter & konstanta
```

## Penyimpanan data

Belum ada database/backend. Semua data disimpan di `localStorage` browser, sehingga:

- perubahan di CMS hanya terlihat di browser yang sama,
- RFQ dari pengunjung tidak sampai ke admin di perangkat lain,
- login hanya pengecekan di sisi klien (kredensial ikut ter-bundle).

Untuk produksi, ganti `CMSContext` dengan API ke backend + database.

## Deploy

Aplikasi ini SPA dengan `BrowserRouter`, jadi hosting perlu mengarahkan semua path ke `index.html`
(Vercel/Netlify: rewrite `/*` → `/index.html`).
