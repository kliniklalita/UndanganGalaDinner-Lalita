// ===== SEMUA DATA ACARA DIEDIT DI SINI =====
const CONFIG = {
  apiUrl: "https://script.google.com/macros/s/AKfycby4vjB4fg_qMqKWxOW0-isDjpQ0jn7PjlsMiAgTD1jwYDAPWDALwVaDIvkWjduRYwuVpQ/exec",                 // URL Web App Google Apps Script (isi setelah deploy)
  allowNameInUrl: false,      // true hanya untuk uji coba: ?guest=Nama
  fallbackName: "Bapak/Ibu Tamu Kehormatan",
  org: "Klinik Lalita", orgTagline: "Klinik Tumbuh Kembang Anak",
  eventLabel: "Gala Dinner", eventName: "Lalita’s Odyssey", years: "10",
  tagline: "A Decade of Journey and Beyond",
  start: "2026-11-22T14:30:00+07:00",
  end: "2026-11-22T21:00:00+07:00",   // sesuai surat undangan (hanya untuk Google Calendar)
  dateText: "Minggu, 22 November 2026", timeText: "14.30 – 21.00 WIB",
  venue: "Gedung Sasono Adiguno, TMII",
  address: "TMII, Jl. Malaka, Ceger, Kec. Cipayung, Kota Jakarta Timur, DKI Jakarta 13560",
  mapsQuery: "Gedung Sasono Adiguno TMII Jakarta",
  dressCode: "Semi-Formal Attire",
  palette: [["Navy","#1d365c","#fff"],["Cokelat","#5a3a00","#fff"],["Putih","#ffffff","#111"],["Hitam","#000000","#fff"]],
  men: ["Kemeja formal","Celana bahan","Blazer (opsional)","Sepatu pantofel"],
  women: ["Dress elegan / satin","Atasan atau rok satin","Blus & celana formal","Aksesori elegan"],
  maxGuests: 2,               // tamu + pendamping (sesuaikan kebijakan VIP)
  rsvpDeadline: "Jumat, 13 November 2026",
  journeyText: "Sepuluh tahun perjalanan bersama anak-anak, keluarga, tenaga profesional, dan mitra. Terima kasih kepada semua yang telah menjadi bagian dari kisah Lalita.",
  journey: [   // ganti foto/keterangan sesuai data resmi
    {img:"journey-1.webp", cap:"Lalita’s Journey of Growth & Gratitude"},
    {img:"journey-2.webp", cap:"Kebersamaan keluarga besar Lalita"},
    {img:"journey-3.webp", cap:"Semangat tim Lalita"}
  ],
  musicCredit: "Musik: “The Feeling” – AgusAlvarez & Luke Bergs (freetouse.com)"
};
