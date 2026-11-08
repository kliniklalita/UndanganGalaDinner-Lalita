// ===== Google Apps Script – tempel di Sheets: Extensions > Apps Script =====
const SITE_URL = 'https://USERNAME.github.io/undangan-lalita/'; // GANTI
const MAX_GUESTS = 2;                                           // samakan dengan config.js
const TZ = 'Asia/Jakarta';

function setup() { // jalankan SEKALI
  const ss = SpreadsheetApp.getActive();
  const defs = {
    'RSVP': ['Timestamp','Guest ID','Guest Name','Attendance Status','Number of Guests','Additional Notes'],
    'Guest Messages': ['Timestamp','Guest ID','Guest Name','Message','Approval Status'],
    'VIP Guest List': ['Guest ID','Guest Name','Invitation URL','RSVP Status','Number of Guests','Notes']
  };
  Object.keys(defs).forEach(n => {
    const s = ss.getSheetByName(n) || ss.insertSheet(n);
    s.getRange(1,1,1,defs[n].length).setValues([defs[n]]).setFontWeight('bold');
    s.setFrozenRows(1);
  });
  const m = ss.getSheetByName('Guest Messages');
  m.getRange('E2:E1000').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['Pending','Approved','Rejected'],true).build());
  ss.getSheetByName('VIP Guest List').getRange('C2').setFormula('=ARRAYFORMULA(IF(A2:A="","","'+SITE_URL+'?g="&A2:A))');
}
function out(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON)}
function sheet(n){return SpreadsheetApp.getActive().getSheetByName(n)}
function clean(s,n){s=String(s||'').replace(/[<>]/g,'').trim().slice(0,n);return /^[=+\-@]/.test(s)?"'"+s:s}
function findGuest(id){if(!id)return null;const v=sheet('VIP Guest List').getDataRange().getValues();for(let i=1;i<v.length;i++)if(String(v[i][0])===String(id))return {row:i+1,name:v[i][1]};return null}

function doGet(e) { // hanya data minimum: 1 nama tamu / pesan yang disetujui
  const a = e.parameter.action;
  if (a === 'guest') { const g = findGuest(e.parameter.id); return out(g ? {ok:true,name:g.name} : {ok:false}); }
  if (a === 'messages') {
    const v = sheet('Guest Messages').getDataRange().getValues().slice(1)
      .filter(r => r[4] === 'Approved').slice(-50).reverse().map(r => ({name:r[2],message:r[3]}));
    return out({ok:true,items:v});
  }
  return out({ok:false});
}

function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(15000);
  try {
    const d = JSON.parse(e.postData.contents), cache = CacheService.getScriptCache();
    if (d.hp) return out({ok:true});                                   // honeypot
    const g = findGuest(d.id); if (d.id && !g) return out({ok:false,error:'Link undangan tidak valid.'});
    const name = clean(g ? g.name : d.name, 80); if (name.length < 2) return out({ok:false,error:'Nama wajib diisi.'});
    const ck = 'rl_' + (d.id || name); if (cache.get(ck)) return out({ok:false,error:'Mohon tunggu beberapa detik.'});
    cache.put(ck, '1', 15);
    if (d.key && cache.get('k_' + d.key)) return out({ok:true});        // anti duplikat
    if (d.key) cache.put('k_' + d.key, '1', 21600);
    const ts = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss');
    if (d.type === 'rsvp') {
      const att = d.att === 'Hadir' ? 'Hadir' : 'Tidak Hadir';
      const n = att === 'Hadir' ? Math.min(Math.max(parseInt(d.n)||1,1), MAX_GUESTS) : 0;
      const notes = clean(d.notes, 300);
      sheet('RSVP').appendRow([ts, d.id||'', name, att, n, notes]);
      if (g) sheet('VIP Guest List').getRange(g.row,4,1,3).setValues([[att,n,notes]]);
      return out({ok:true});
    }
    if (d.type === 'msg') {
      const msg = clean(d.msg, 400); if (msg.length < 3) return out({ok:false,error:'Ucapan terlalu pendek.'});
      sheet('Guest Messages').appendRow([ts, d.id||'', name, msg, 'Pending']);
      return out({ok:true});
    }
    return out({ok:false,error:'Permintaan tidak dikenal.'});
  } catch (err) { return out({ok:false,error:'Terjadi kesalahan.'}); }
  finally { lock.releaseLock(); }
}
