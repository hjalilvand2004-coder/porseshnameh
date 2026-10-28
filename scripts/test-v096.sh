#!/bin/bash
# تست مرورگری v0.9.6 — سرور را در همان دستور بالا می‌آورد و مراحل را یکجا اجرا می‌کند
set -e
pkill -f "http.server 4173" 2>/dev/null || true
sleep 1
cd /home/z/my-project/out
setsid nohup python3 -m http.server 4173 </dev/null >/tmp/http4173.log 2>&1 &
sleep 2
cd /home/z/my-project

AB="agent-browser"
echo "=== OPEN ==="
$AB open "http://localhost:4173/?v=096c"
$AB wait --load networkidle
sleep 2
echo "=== DEMO LOGIN ==="
$AB eval "(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('ورود نمایشی')); b?b.click():'NF'; return b?.textContent.trim()||'NF'})()"
sleep 2
echo "=== OPEN BANK ==="
$AB eval "(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('بانک پروندهها')); b?b.click():'NF'; return b?.textContent.trim()||'NF'})()"
sleep 1.2
echo "=== CONTINUE FIRST ==="
$AB find first "button" text | grep -q "ادامه پرسشنامه" || true
$AB eval "const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='ادامه پرسشنامه'); b?b.click():'NF'"
sleep 1.2
echo "=== GO STEP 3 ==="
$AB eval "const t=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('اطلاعات پایه')); t?t.click():'NF'"
sleep 1.2
echo "=== MEMBER TYPE BADGES ==="
$AB eval "(()=>{const c=[...document.querySelectorAll('[role=cell]')].map(x=>x.textContent.trim()); return JSON.stringify(c.filter(t=>t==='عضو خانواده — ثبت احوال'||t==='همسفره'))})()"
echo "=== SAMANEH INITIAL ==="
$AB eval "(()=>{const h=[...document.querySelectorAll('h3')].find(x=>x.textContent.includes('زمینه پرونده')); const card=h.closest('div.rounded-2xl'); const i1=document.getElementById('hh-supportSince'), i2=document.getElementById('hh-priorServices'); const btn=[...card.querySelectorAll('button')].map(b=>b.textContent.trim()); return JSON.stringify({ph:i1?.placeholder, d1:i1?.disabled, d2:i2?.disabled, btns:btn})})()"
echo "=== FETCH SAMANEH ==="
$AB eval "(()=>{const h=[...document.querySelectorAll('h3')].find(x=>x.textContent.includes('زمینه پرونده')); const btn=[...h.closest('div.rounded-2xl').querySelectorAll('button')].find(b=>b.textContent.includes('استعلام')); btn.click(); return btn.textContent.trim()})()"
sleep 1.6
echo "=== SAMANEH LOCKED ==="
$AB eval "(()=>{const h=[...document.querySelectorAll('h3')].find(x=>x.textContent.includes('زمینه پرونده')); const card=h.closest('div.rounded-2xl'); const lock=[...card.querySelectorAll('[aria-readonly]')].map(d=>d.textContent.trim()); const badge=[...card.querySelectorAll('[role=status], .bg-emerald-600')].map(b=>b.textContent.trim()); return JSON.stringify({lock, badge})})()"
echo "=== STRIP SUMMARY ==="
$AB eval "(()=>{const s=[...document.querySelectorAll('button')].find(x=>x.getAttribute('aria-label')?.includes('آخرین وضعیت واکشی')); return s? s.textContent.trim().slice(0,160):'NF'})()"
echo "=== OPEN MODAL ==="
$AB eval "(()=>{const s=[...document.querySelectorAll('button')].find(x=>x.getAttribute('aria-label')?.includes('آخرین وضعیت واکشی')); s.click(); return 'opened'})()"
sleep 1
echo "=== MODAL CARDS ==="
$AB eval "(()=>{const dl=[...document.querySelectorAll('[role=dialog] h4')].map(x=>x.textContent.trim()); return JSON.stringify(dl)})()"
echo "=== CLOSE MODAL ==="
$AB eval "document.querySelector('[role=dialog] button[type=button], [role=dialog] .absolute.end-4')?.click(); document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true})); 'esc'"
sleep 0.8
echo "=== SCREENSHOT ==="
$AB screenshot /home/z/my-project/scripts/v096-step3.png
echo "=== CONSOLE ERRORS ==="
$AB errors || echo "no errors"
echo "DONE"
