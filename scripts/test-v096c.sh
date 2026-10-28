#!/bin/bash
# تست ۳ — نقطه‌های وضعیت + بازگرداندن به حالت دستی کارت بانک سامانه در مودال
cd /home/z/my-project/out
setsid nohup python3 -m http.server 4173 </dev/null >/tmp/http4173.log 2>&1 &
sleep 2
cd /home/z/my-project
AB="agent-browser"

$AB open "http://localhost:4173/?v=096e"
$AB wait --load networkidle
sleep 2
$AB eval "(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('اطلاعات پایه')); b&&b.click(); return 'ok'})()"
sleep 1

echo "=== STRIP DOTS ==="
$AB eval "(()=>{const s=[...document.querySelectorAll('button')].find(x=>x.getAttribute('aria-label')?.includes('آخرین وضعیت واکشی')); if(!s) return 'NF'; const dots=[...s.querySelectorAll('span')].filter(x=>{const c=getComputedStyle(x); return x.className.includes('size-2.5')}).length; return 'dots='+dots+' | summary='+s.textContent.trim().slice(0,90)})()"

echo "=== OPEN MODAL ==="
$AB eval "(()=>{const s=[...document.querySelectorAll('button')].find(x=>x.getAttribute('aria-label')?.includes('آخرین وضعیت واکشی')); s.click(); return 'opened'})()"
sleep 1

echo "=== FIND SAMANEH CARD BY H4 + MANUAL RESTORE ==="
$AB eval "(()=>{const h4=[...document.querySelectorAll('[role=dialog] h4')].find(x=>x.textContent.includes('بانک سامانه')); if(!h4) return 'H4 NF'; const card=h4.closest('div.rounded-2xl'); const b=[...card.querySelectorAll('button')].map(x=>x.textContent.trim()); const restore=[...card.querySelectorAll('button')].find(x=>x.textContent.includes('بازگرداندن به حالت دستی')); restore&&restore.click(); return JSON.stringify({btns:b, clicked:!!restore})})()"
sleep 1.2

echo "=== CLOSE MODAL ==="
$AB eval "document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); 'esc'"
sleep 1

echo "=== AFTER RESTORE ==="
$AB eval "(()=>{const h=[...document.querySelectorAll('h3')].find(x=>x.textContent.includes('زمینه پرونده')); const card=h.closest('div.rounded-2xl'); const i1=document.getElementById('hh-supportSince'); const btns=[...card.querySelectorAll('button')].map(b=>b.textContent.trim()); const em=[...card.querySelectorAll('.bg-emerald-600')].length; const ban=[...card.querySelectorAll('span')].filter(x=>x.textContent.includes('ورود دستی غیرمجاز')).length; return JSON.stringify({disabled:i1?.disabled, val:i1?.value, ph:i1?.placeholder, btns, emerald:em, banBadge:ban})})()"

echo "=== ERRORS ==="
$AB errors || true
echo DONE
