#!/bin/bash
# تست ۲ — نشان اعضا، ۸ نقطه وضعیت، بازگرداندن به حالت دستی
cd /home/z/my-project/out
setsid nohup python3 -m http.server 4173 </dev/null >/tmp/http4173.log 2>&1 &
sleep 2
cd /home/z/my-project
AB="agent-browser"

echo "=== RELOAD ==="
$AB open "http://localhost:4173/?v=096d"
$AB wait --load networkidle
sleep 2
$AB eval "(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('اطلاعات پایه')); b&&b.click(); return 'ok'})()"
sleep 1.2

echo "=== MEMBER BADGES (td) ==="
$AB eval "(()=>{const tds=[...document.querySelectorAll('td')].map(x=>x.textContent.trim()); return JSON.stringify(tds.filter(t=>t.includes('عضو خانواده')||t==='همسفره'))})()"

echo "=== TABLE FOOTNOTE ==="
$AB eval "(()=>{const p=[...document.querySelectorAll('p')].find(x=>x.textContent.includes('نوع عضو:')); return p?p.textContent.trim().slice(0,120):'NF'})()"

echo "=== STRIP DOTS ==="
$AB eval "(()=>{const s=[...document.querySelectorAll('button')].find(x=>x.getAttribute('aria-label')?.includes('آخرین وضعیت واکشی')); const dots=s?[...s.querySelectorAll('span.rounded-full.size-2\\.5, span.size-2\\.5')].length:0; return 'dots='+dots+' | '+s.textContent.trim().slice(0,80)})()"

echo "=== OPEN MODAL + MANUAL RESTORE SAMANEH ==="
$AB eval "(()=>{const s=[...document.querySelectorAll('button')].find(x=>x.getAttribute('aria-label')?.includes('آخرین وضعیت واکشی')); s.click(); return 'opened'})()"
sleep 1
$AB eval "(()=>{const cards=[...document.querySelectorAll('[role=dialog] .rounded-2xl.border')]; const c=cards.find(x=>x.textContent.includes('بانک سامانه')); if(!c) return 'CARD NF'; const b=[...c.querySelectorAll('button')].find(x=>x.textContent.includes('بازگرداندن به حالت دستی')); if(!b) return 'BTN NF'; b.click(); return 'restored'})()"
sleep 1
$AB eval "(()=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); return 'esc'})()"
sleep 1

echo "=== AFTER RESTORE: INITIAL STATE ==="
$AB eval "(()=>{const h=[...document.querySelectorAll('h3')].find(x=>x.textContent.includes('زمینه پرونده')); const card=h.closest('div.rounded-2xl'); const i1=document.getElementById('hh-supportSince'); const btns=[...card.querySelectorAll('button')].map(b=>b.textContent.trim()); const badge=[...card.querySelectorAll('.bg-emerald-600')].length; return JSON.stringify({disabled:i1?.disabled, ph:i1?.placeholder, val:i1?.value, btns, emeraldBadges:badge})})()"

echo "=== REFETCH FROM CARD ==="
$AB eval "(()=>{const h=[...document.querySelectorAll('h3')].find(x=>x.textContent.includes('زمینه پرونده')); const card=h.closest('div.rounded-2xl'); const b=[...card.querySelectorAll('button')].find(x=>x.textContent.includes('استعلام')); b.click(); return b.textContent.trim()})()"
sleep 1.6
$AB eval "(()=>{const h=[...document.querySelectorAll('h3')].find(x=>x.textContent.includes('زمینه پرونده')); const card=h.closest('div.rounded-2xl'); const lock=[...card.querySelectorAll('[aria-readonly]')].map(d=>d.textContent.trim()); return JSON.stringify(lock)})()"

echo "=== HELP MODAL TEXT CHECK ==="
$AB eval "(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('راهنمای این صفحه')); b&&b.click(); return 'ok'})()"
sleep 1
$AB eval "(()=>{const dl=[...document.querySelectorAll('[role=dialog]')].pop(); const t=dl?dl.textContent:''; return JSON.stringify({hasSamaneh:t.includes('بانک سامانه'), hasKhanewade:t.includes('عضو خانواده'), hasFetchOnly:t.includes('ورود دستی ندارند')})})()"
$AB eval "document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); 'esc'"

echo "=== SCREENSHOT ==="
$AB screenshot /home/z/my-project/scripts/v096-final.png
echo "=== ERRORS ==="
$AB errors || true
echo DONE
