(()=>{const C=CONFIG,$=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),Q=new URLSearchParams(location.search),T0=Date.now();
let guest={id:Q.get('g')||'',name:''};
const KEY=(()=>{try{let k=localStorage.getItem('k');if(!k){k=Math.random().toString(36).slice(2);localStorage.setItem('k',k)}return k}catch(e){return Math.random().toString(36).slice(2)}})();
$$('[data-c]').forEach(e=>e.textContent=C[e.dataset.c]);
$('#cr').textContent=C.musicCredit;
$('#sw').innerHTML=C.palette.map(p=>`<div style="background:${p[1]};color:${p[2]}">${p[0]}</div>`).join('');
$('#men').innerHTML=C.men.map(x=>`<li>${x}</li>`).join('');$('#women').innerHTML=C.women.map(x=>`<li>${x}</li>`).join('');
$('#gal').innerHTML=C.journey.map(j=>`<figure><img loading="lazy" src="${j.img}" alt=""><figcaption>${j.cap}</figcaption></figure>`).join('');
const enc=encodeURIComponent;
$('#map').src='https://maps.google.com/maps?q='+enc(C.mapsQuery)+'&output=embed';
$('#maps').href='https://www.google.com/maps/search/?api=1&query='+enc(C.mapsQuery);
const ds=s=>s.slice(0,19).replace(/[-:]/g,'');
const cal='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+enc('Gala Dinner – Lalita’s Odyssey: 10 Years')+'&dates='+ds(C.start)+'/'+ds(C.end)+'&ctz=Asia/Jakarta&location='+enc(C.venue+', '+C.address)+'&details='+enc('Undangan perayaan 10 tahun Klinik Lalita – '+C.tagline+'.');
$('#cal').href=$('#cal2').href=cal;
const sel=document.querySelector('select[name=n]');for(let i=1;i<=C.maxGuests;i++)sel.add(new Option(i+' orang',i));
function setName(n){$$('.gname').forEach(e=>e.textContent=n);if(n!==C.fallbackName){$('#rn').value=$('#mn').value=n;if(guest.id){$('#rn').readOnly=$('#mn').readOnly=true}}}
async function init(){
 if(C.apiUrl&&guest.id){try{const r=await(await fetch(C.apiUrl+'?action=guest&id='+enc(guest.id))).json();if(r.ok)guest.name=r.name}catch(e){}}
 else if(!C.apiUrl||C.allowNameInUrl)guest.name=(Q.get('guest')||'').slice(0,60);
 setName(guest.name||C.fallbackName);loadMsgs();setInterval(loadMsgs,60000)}
// countdown
const cds=$('#cds');function tick(){const d=new Date(C.start)-new Date();
 if(d<=0){cds.innerHTML='<p class="sf gl" style="font-size:24px">Hari ini adalah hari perayaan kita ✨</p>';$('#cdt').textContent='Acara Dimulai';return}
 const s=Math.floor(d/1e3),v=[[Math.floor(s/86400),'Hari'],[Math.floor(s%86400/3600),'Jam'],[Math.floor(s%3600/60),'Menit'],[s%60,'Detik']];
 cds.innerHTML=v.map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}
tick();setInterval(tick,1000);
// cover + music
const au=$('#au'),mus=$('#mus');let on=false;
function play(){au.play().then(()=>{on=true;mus.classList.remove('off')}).catch(()=>{mus.classList.add('off')})}
mus.classList.add('off');mus.onclick=()=>{if(on){au.pause();on=false;mus.classList.add('off')}else play()};
$('#open').onclick=()=>{$('#env').classList.add('open');play();setTimeout(()=>{$('#cover').classList.add('gone');document.body.classList.remove('lock')},1700)};
// reveal
const io=new IntersectionObserver(a=>a.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});$$('.rv').forEach(e=>io.observe(e));
// rsvp
const att=document.querySelectorAll('input[name=att]');att.forEach(r=>r.onchange=()=>{$('#nw').style.display=r.value==='Hadir'?'block':'none'});
function say(el,t,ok){el.textContent=t;el.style.color=ok?'#efdb6d':'#ffb4a8'}
async function send(body,btn,out,okMsg,bright){
 if(!C.apiUrl){say(out,'Mode pratinjau: backend Google Sheets belum terhubung.',false);return false}
 btn.disabled=true;try{
  const r=await(await fetch(C.apiUrl,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(body)})).json();
  if(r.ok){say(out,okMsg,!bright);if(bright)out.style.color='#1d365c';return true}
  say(out,r.error||'Gagal mengirim, coba lagi.',false);if(bright)out.style.color='#b3261e'}catch(e){say(out,'Koneksi bermasalah, coba lagi.',false);if(bright)out.style.color='#b3261e'}
 btn.disabled=false;return false}
$('#rsvp').onsubmit=async e=>{e.preventDefault();const f=e.target,out=$('#rm'),a=f.att.value;
 if(f.website.value)return;if(f.name.value.trim().length<2)return say(out,'Mohon isi nama lengkap.',false);if(!a)return say(out,'Mohon pilih kehadiran.',false);
 if(Date.now()-T0<4000)return say(out,'Mohon tunggu sebentar lalu kirim kembali.',false);
 const ok=await send({type:'rsvp',id:guest.id,name:f.name.value.trim(),att:a,n:a==='Hadir'?+f.n.value:0,notes:f.notes.value.trim(),key:KEY+'r'+a+f.n.value,hp:f.website.value},f.querySelector('button'),out,'Terima kasih! Konfirmasi Anda telah kami terima.');
 if(ok){f.querySelector('button').textContent='Perbarui Konfirmasi';f.querySelector('button').disabled=false}};
$('#mf').onsubmit=async e=>{e.preventDefault();const f=e.target,out=$('#mm');
 if(f.website.value)return;if(f.name.value.trim().length<2||f.msg.value.trim().length<3)return say(out,'Mohon isi nama dan ucapan.',false);out.style.color='#b3261e';
 const ok=await send({type:'msg',id:guest.id,name:f.name.value.trim(),msg:f.msg.value.trim(),key:KEY+'m'+Date.now(),hp:f.website.value},f.querySelector('button'),out,'Terima kasih! Ucapan Anda akan tampil setelah ditinjau.',true);
 if(ok){f.msg.value='';f.querySelector('button').disabled=false}};
async function loadMsgs(){const box=$('#msgs');if(!C.apiUrl){box.innerHTML='<p style="color:#6b7285;font-size:14px">Ucapan akan tampil di sini.</p>';return}
 try{const r=await(await fetch(C.apiUrl+'?action=messages')).json();box.innerHTML='';(r.items||[]).forEach(m=>{const d=document.createElement('div');d.className='m';const b=document.createElement('b'),p=document.createElement('p');b.textContent=m.name;p.textContent=m.message;d.append(b,p);box.append(d)});
  if(!(r.items||[]).length)box.innerHTML='<p style="color:#6b7285;font-size:14px">Jadilah yang pertama memberi ucapan.</p>'}catch(e){}}
init()})();
