/* KCE SAT Prep lock. Every module opens once the module before it is finished (no minimum score).
   Code 9110 opens one locked module, or every module on this device (teacher mode, from the course page).
   The LIST line is written by tools/build_course.py; edit MODULES there, not here. */
(function(){
var LIST = [{"id": "baseline", "f": "baseline.html", "label": "SAT Baseline Assessment", "req": []}, {"id": "w01-lesson", "f": "week-01-lesson.html", "label": "Week 1 Lesson", "req": ["baseline"]}, {"id": "desmos", "f": "desmos-tutorial.html", "label": "Desmos Tutorial", "req": ["w01-lesson"]}, {"id": "w01-mid", "f": "week-01-midweek.html", "label": "Week 1 Mid-Week", "req": ["desmos"]}, {"id": "w02-lesson", "f": "week-02-lesson.html", "label": "Week 2 Lesson", "req": ["w01-mid"]}, {"id": "w02-mid", "f": "week-02-midweek.html", "label": "Week 2 Mid-Week", "req": ["w02-lesson"]}, {"id": "exam1", "f": "SAT Practice Exam 1 (KCE).html", "label": "Practice Exam 1", "req": ["w02-mid"]}, {"id": "w03-lesson", "f": "week-03-lesson.html", "label": "Week 3 Lesson", "req": ["exam1"]}, {"id": "w03-mid", "f": "week-03-midweek.html", "label": "Week 3 Mid-Week", "req": ["w03-lesson"]}, {"id": "w04-lesson", "f": "week-04-lesson.html", "label": "Week 4 Lesson", "req": ["w03-mid"]}, {"id": "w04-mid", "f": "week-04-midweek.html", "label": "Week 4 Mid-Week", "req": ["w04-lesson"]}, {"id": "exam2", "f": "SAT Practice Exam 2 (KCE).html", "label": "Practice Exam 2", "req": ["w04-mid"]}, {"id": "w05-lesson", "f": "week-05-lesson.html", "label": "Week 5 Lesson", "req": ["exam2"]}, {"id": "w05-mid", "f": "week-05-midweek.html", "label": "Week 5 Mid-Week", "req": ["w05-lesson"]}, {"id": "w06-lesson", "f": "week-06-lesson.html", "label": "Week 6 Lesson", "req": ["w05-mid"]}, {"id": "w06-mid", "f": "week-06-midweek.html", "label": "Week 6 Mid-Week", "req": ["w06-lesson"]}, {"id": "exam3", "f": "SAT Practice Exam 3 (KCE).html", "label": "Practice Exam 3", "req": ["w06-mid"]}, {"id": "w07-lesson", "f": "week-07-lesson.html", "label": "Week 7 Lesson", "req": ["exam3"]}, {"id": "w07-mid", "f": "week-07-midweek.html", "label": "Week 7 Mid-Week", "req": ["w07-lesson"]}, {"id": "w08-lesson", "f": "week-08-lesson.html", "label": "Week 8 Lesson", "req": ["w07-mid"]}, {"id": "w08-mid", "f": "week-08-midweek.html", "label": "Week 8 Mid-Week", "req": ["w08-lesson"]}, {"id": "exam4", "f": "SAT Practice Exam 4 (KCE).html", "label": "Practice Exam 4", "req": ["w08-mid"]}, {"id": "w09-lesson", "f": "week-09-lesson.html", "label": "Week 9 Lesson", "req": ["exam4"]}, {"id": "w09-mid", "f": "week-09-midweek.html", "label": "Week 9 Mid-Week", "req": ["w09-lesson"]}, {"id": "w10-lesson", "f": "week-10-lesson.html", "label": "Week 10 Lesson", "req": ["w09-mid"]}, {"id": "w10-mid", "f": "week-10-midweek.html", "label": "Week 10 Mid-Week", "req": ["w10-lesson"]}, {"id": "exam5", "f": "SAT Practice Exam 5 (KCE).html", "label": "Practice Exam 5", "req": ["w10-mid"]}];
var PKEY='kce_sat_progress_v1', OKEY='kce_sat_unlocked_v1', TKEY='kce_sat_teacher_v1', PIN='9110', HUB='index.html';
var ROOT=(function(){var s=document.currentScript&&document.currentScript.src||'';return s.slice(0,s.lastIndexOf('/')+1);})();
function rd(k){try{return JSON.parse(localStorage.getItem(k)||'{}')||{}}catch(e){return {}}}
function wr(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function done(id){return !!rd(PKEY)[id];}
function teacher(){try{return localStorage.getItem(TKEY)==='1'}catch(e){return false}}
function pinned(id){return !!rd(OKEY)[id];}
function byId(id){for(var i=0;i<LIST.length;i++)if(LIST[i].id===id)return LIST[i];return null;}
function byFile(f){for(var i=0;i<LIST.length;i++)if(LIST[i].f===f)return LIST[i];return null;}
function prev(e){return e.req.length?byId(e.req[0]):null;}
function isOpen(e){var p=prev(e);return !p||done(p.id)||done(e.id)||teacher()||pinned(e.id);}
function rel(url){var u=url.split('#')[0].split('?')[0];if(u.indexOf(ROOT)!==0)return null;var r=u.slice(ROOT.length);try{r=decodeURIComponent(r)}catch(x){}if(r===''||/\/$/.test(r))r+='index.html';else if(!/\.[a-z0-9]+$/i.test(r))r+='.html';return r;}
function href(f){return ROOT+f.split('/').map(encodeURIComponent).join('/');}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML;}
function css(){if(document.getElementById('satg-css'))return;var s=document.createElement('style');s.id='satg-css';s.textContent=
'.sg-ov{position:fixed;inset:0;z-index:2147483000;background:rgba(10,31,61,.96);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Arial,Helvetica,sans-serif}'+
'.sg-box{background:#fff;border-radius:18px;max-width:470px;width:100%;padding:30px 26px;text-align:center;border-top:6px solid #C9A84C;box-shadow:0 20px 60px rgba(0,0,0,.35)}'+
'.sg-box h2{font-family:Georgia,serif;color:#0A1F3D;margin:8px 0 10px;font-size:26px}.sg-box p{color:#4a5666;font-size:16px;line-height:1.5;margin:0 0 18px}'+
'.sg-lock{font-size:46px}.sg-btn{display:block;width:100%;text-decoration:none;font-weight:700;font-size:16px;padding:13px;border-radius:12px;background:#0A1F3D;color:#fff;border:none;cursor:pointer;margin-bottom:10px;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif}'+
'.sg-code{margin-top:14px;font-size:14px;color:#5b6475}.sg-code input{width:110px;padding:8px;border:2px solid #E7E0CF;border-radius:8px;font-size:16px;text-align:center;margin:0 6px}.sg-code button{padding:8px 14px;border-radius:8px;border:none;background:#C9A84C;color:#0A1F3D;font-weight:700;cursor:pointer;font-size:15px}'+
'.sg-msg{color:#DB2F30;font-size:14px;margin-top:8px;min-height:18px}'+
'.sg-toast{position:fixed;left:16px;right:16px;bottom:16px;margin:0 auto;width:fit-content;z-index:2147482000;background:#0A1F3D;color:#fff;border:2px solid #C9A84C;border-radius:14px;padding:14px 18px;font:15px/1.4 Arial,Helvetica,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.3);display:flex;gap:10px 14px;align-items:center;flex-wrap:wrap}.sg-toast span{flex:1 1 220px}'+
'.sg-toast a{color:#0A1F3D;background:#C9A84C;text-decoration:none;font-weight:700;padding:8px 12px;border-radius:9px;white-space:nowrap}.sg-toast button{background:none;border:none;color:#cfd8e6;font-size:20px;cursor:pointer;padding:0 4px}';
document.head.appendChild(s);}

/* ---------- mark a module finished ---------- */
function markDone(id){
  var e=id?byId(id):byFile(rel(location.href)); if(!e) return false;
  var p=rd(PKEY); var first=!p[e.id]; if(first){p[e.id]={done:1,at:new Date().toISOString()};wr(PKEY,p);}
  return first;
}
function toast(){
  var e=byFile(rel(location.href)); if(!e) return; css();
  if(document.getElementById('sg-toast')) return;
  var i=LIST.indexOf(e), nx=LIST[i+1];
  var t=document.createElement('div');t.className='sg-toast';t.id='sg-toast';
  t.innerHTML='<span>✓ <b>'+esc(e.label)+'</b> is finished.'+(nx?' <b>'+esc(nx.label)+'</b> is now open.':' You finished the whole course!')+'</span>'+
    '<a href="'+href(HUB)+'">Back to the course page</a><button type="button" aria-label="Close">×</button>';
  document.body.appendChild(t); t.querySelector('button').onclick=function(){t.remove();};
}

/* ---------- lock screen on a module page ---------- */
function guard(){
  var e=byFile(rel(location.href)); if(!e||isOpen(e)) return false;
  css(); var p=prev(e);
  var ov=document.createElement('div');ov.className='sg-ov';ov.id='sg-ov';ov.innerHTML=
   '<div class="sg-box"><div class="sg-lock" aria-hidden="true">🔒</div><h2 id="sg-title">Not unlocked yet</h2>'+
   '<p>Finish <b>'+esc(p.label)+'</b> first. Then this one opens.</p>'+
   '<a class="sg-btn" href="'+href(p.f)+'">Go to '+esc(p.label)+'</a>'+
   '<a class="sg-btn" style="background:#C9A84C;color:#0A1F3D" href="'+href(HUB)+'">Back to the course page</a>'+
   '<div class="sg-code"><label for="sgpin">Unlock code:</label><input type="password" inputmode="numeric" autocomplete="off" id="sgpin"><button type="button" id="sgok">Unlock</button><div class="sg-msg" id="sgmsg"></div></div></div>';
  document.body.appendChild(ov);document.documentElement.style.overflow='hidden';
  function tryPin(){
    if(document.getElementById('sgpin').value===PIN){var o=rd(OKEY);o[e.id]=1;wr(OKEY,o);ov.remove();document.documentElement.style.overflow='';hooks();}
    else{document.getElementById('sgmsg').textContent='That code is not right.';}
  }
  document.getElementById('sgok').onclick=tryPin;
  document.getElementById('sgpin').onkeydown=function(ev){if(ev.key==='Enter')tryPin();};
  ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-labelledby','sg-title');setTimeout(function(){document.getElementById('sgpin').focus();},0);
  ov.addEventListener('keydown',function(ev){if(ev.key!=='Tab')return;var f=ov.querySelectorAll('a,button,input');var a=f[0],z=f[f.length-1];
    if(ev.shiftKey&&document.activeElement===a){ev.preventDefault();z.focus();}else if(!ev.shiftKey&&document.activeElement===z){ev.preventDefault();a.focus();}else if(!ov.contains(document.activeElement)){ev.preventDefault();a.focus();}});
  return true;
}

/* ---------- automatic finish hooks ---------- */
function hooks(){
  var e=byFile(rel(location.href)); if(!e) return;
  if(/-lesson\.html$/.test(e.f)){              /* live lesson: finished when the Homework section is reached */
    var hw=document.getElementById('homework'); if(!hw||!('IntersectionObserver' in window)) return;
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){io.disconnect();if(markDone(e.id))toast();}});},{threshold:0,rootMargin:'0px 0px -40% 0px'});
    io.observe(hw);
  } else if(/-midweek\.html$/.test(e.f)){      /* mid-week: finished when results are sent */
    var f=document.getElementById('mwform'); if(f) f.addEventListener('submit',function(){markDone(e.id);});
  } else if(/^SAT Practice Exam/.test(e.f)){   /* practice exam: finished when the score is emailed */
    var x=document.getElementById('examform'); if(x){ x.addEventListener('submit',function(){markDone(e.id);});
      var sb=x.querySelector('button[type=submit]'); if(sb&&!done(e.id)){var n=document.createElement('div');n.className='sg-note';
        n.innerHTML='<b>Important:</b> press <b>Save &amp; email my results</b> before you leave this page. That sends your score to your instructor and opens the next module. If you close this page first, the exam has to be taken again.';
        n.style.cssText='background:#FDF0F0;border-left:4px solid #DB2F30;border-radius:8px;padding:10px 14px;margin:12px 0;font:15px/1.5 Arial,Helvetica,sans-serif;color:#1d2733';
        sb.parentNode.parentNode.insertBefore(n,sb.parentNode);} }
  }
  /* The Baseline (it emails automatically) and the Desmos tutorial call KCESAT.done() themselves. */
}

/* ---------- course page ---------- */
function hub(){
  css();
  var cards=document.querySelectorAll('.card[data-id]'), nextShown=false;
  for(var i=0;i<cards.length;i++){
    var c=cards[i], e=byId(c.getAttribute('data-id')); if(!e) continue;
    var a=c.querySelector('a.btn'); var links=c.querySelector('.links');
    if(done(e.id)){ var t=document.createElement('div');t.className='sg-done';t.textContent='✓ Finished';links.parentNode.insertBefore(t,links);
      if(a){a.textContent='Open again';a.classList.add('sg-again');} }
    else if(!isOpen(e)){ var sp=document.createElement('span');sp.className='btn primary sg-lockbtn';sp.textContent='🔒 Finish '+prev(e).label+' first';
      if(a) a.parentNode.replaceChild(sp,a); c.classList.add('sg-locked'); }
    else if(!nextShown){ c.classList.add('sg-next'); var n=document.createElement('div');n.className='sg-up';n.textContent='Up next';c.insertBefore(n,c.firstChild); nextShown=true; }
  }
  var n=0;for(var j=0;j<LIST.length;j++)if(done(LIST[j].id))n++;
  var pr=document.getElementById('sg-progress'); if(pr) pr.textContent=n+' of '+LIST.length+' finished';
  var bar=document.getElementById('sg-teacher'); if(!bar) return;
  if(teacher()){ bar.innerHTML='<b>Teacher mode is on</b> for this device: every module is open. <button type="button" id="sgoff">Turn teacher mode off</button>';
    document.getElementById('sgoff').onclick=function(){try{localStorage.removeItem(TKEY)}catch(x){}location.reload();}; }
  else { bar.innerHTML='Each module opens once you finish the one before it. Teacher: <label for="sgtpin" class="sg-vh">Teacher code</label><input type="password" inputmode="numeric" autocomplete="off" id="sgtpin" placeholder="code"><button type="button" id="sgton">Open every module on this device</button> <span class="sg-msg" id="sgtmsg"></span>';
    var go=function(){if(document.getElementById('sgtpin').value===PIN){try{localStorage.setItem(TKEY,'1')}catch(x){}location.reload();}else{document.getElementById('sgtmsg').textContent='That code is not right.';}};
    document.getElementById('sgton').onclick=go; document.getElementById('sgtpin').onkeydown=function(ev){if(ev.key==='Enter')go();}; }
}

window.KCESAT={done:function(id){var first=markDone(id);if(first)toast();return first;},isOpen:function(id){var e=byId(id);return e?isOpen(e):true;},finished:done,list:function(){return LIST.slice();}};
function run(){var r=rel(location.href)||'';if(r===HUB){hub();}else if(!guard()){hooks();}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
