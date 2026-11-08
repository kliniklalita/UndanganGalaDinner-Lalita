# Undangan VIP – Gala Dinner Lalita’s Odyssey (10 Years)

Struktur: `index.html` · `css/` · `js/app.js` · `config/config.js` (semua data acara) · `assets/` · `backend/Code.gs`

## 1. Backend (Google Sheets + Apps Script)
1. Buat Google Sheets baru (akun klinik) → Extensions → Apps Script → tempel `backend/Code.gs`.
2. Ganti `SITE_URL` dengan alamat GitHub Pages Anda, lalu jalankan fungsi `setup` sekali (setujui izin).
3. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone → salin URL.
4. Tempel URL itu ke `apiUrl` di `config/config.js`.

## 2. Tambah tamu VIP
Isi sheet **VIP Guest List** kolom A (Guest ID, mis. `lal-001`) dan B (Nama, mis. “Bapak Andi Wijaya”). Kolom C otomatis berisi link pribadi; kirim link itu ke tamu. Status RSVP terisi otomatis.

## 3. Moderasi ucapan
Sheet **Guest Messages** kolom E: ubah dropdown ke `Approved` / `Rejected`. Hanya `Approved` tampil di website (maks. 60 detik).

## 4. Ubah info acara
Edit `config/config.js` saja (tanggal, venue, jam selesai, kuota tamu, foto, dll).

## 5. GitHub Pages
Unggah seluruh isi folder ini ke repository publik → Settings → Pages → branch `main`, folder `/ (root)`.
**Jangan** unggah daftar tamu atau data RSVP; semuanya tetap di Google Sheets.

## Kredit
Musik “The Feeling” – AgusAlvarez & Luke Bergs (freetouse.com) – kredit sudah dicantumkan di footer, jangan dihapus.
