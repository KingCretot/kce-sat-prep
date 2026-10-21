/* KCE SAT practice exams: send results in the background so the student stays on the score report.
   Adds every missed question (module, number, skill, the student's answer, the correct answer, the question)
   to the email. Marks the exam finished in the course only after the email is accepted. */
(function(){
var MODS=[['rw1','Reading & Writing Module 1'],['rw2','Reading & Writing Module 2'],['m1','Math Module 1'],['m2','Math Module 2']];
function txt(el){if(!el)return '';var c=el.cloneNode(true);c.querySelectorAll('sup').forEach(function(s){s.replaceWith('^'+s.textContent);});c.querySelectorAll('sub').forEach(function(s){s.replaceWith('_'+s.textContent);});c.querySelectorAll('br').forEach(function(b){b.replaceWith(' / ');});c.querySelectorAll('p,div,li,tr,.psg').forEach(function(b){b.append(' / ');});return c.textContent.replace(/\s+/g,' ').replace(/(\s\/\s*)+$/,'').replace(/(\s\/){2,}/g,' /').trim();}
function missed(){
  var out=[],n=0;
  MODS.forEach(function(md){
    var sec=md[0],list=(typeof KEY!=='undefined'&&KEY[sec])||[];
    list.forEach(function(k,i){
      var qid=sec+'_'+(i+1),picked='',ok=false;
      if(k.grid){var inp=document.querySelector('[name="'+qid+'"]');picked=inp?inp.value.trim():'';ok=typeof gridMatch==='function'?gridMatch(picked,k.answer):picked===k.answer;}
      else{var p=document.querySelector('input[name="'+qid+'"]:checked');picked=p?p.value:'';ok=picked===k.answer;}
      if(!ok){n++;var stem=txt(document.querySelector('#'+qid+' .stem'));if(stem.length>160)stem=stem.slice(0,157)+'…';
        var ps=txt(document.querySelector('#'+qid+' .passage'));if(ps.length>120)ps=ps.slice(0,117)+'…';
        out.push(md[1]+' · Q'+(i+1)+' · '+k.tag+' · answered '+(picked||'(blank)')+', correct '+k.answer+(ps?' · Passage: "'+ps+'"':'')+' · '+stem);}
    });
  });
  return {count:n,text:out.join('\n')};
}
function payload(form){
  var d={};[].forEach.call(form.querySelectorAll('input[type=hidden]'),function(i){d[i.name]=i.value;});
  var m=missed();d.missed_count=String(m.count);d.missed_questions=m.text||'None — every question correct.';
  return d;
}
function init(){
  var form=document.getElementById('examform');if(!form)return;
  var btn=form.querySelector('button[type=submit]'),sent=document.getElementById('sentmsg');
  var st=document.createElement('div');st.id='sendstatus';st.setAttribute('aria-live','polite');
  st.style.cssText='margin:10px 0;font:600 15px/1.5 Arial,Helvetica,sans-serif';
  btn.parentNode.parentNode.insertBefore(st,btn.parentNode.nextSibling);
  document.addEventListener('submit',function(ev){
    if(ev.target!==form)return;
    ev.preventDefault();ev.stopImmediatePropagation();
    btn.disabled=true;st.style.color='#586273';st.textContent='Sending your results to your instructor…';
    fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload(form))})
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);
      st.textContent='';if(sent)sent.style.display='block';btn.textContent='✓ Sent to your instructor';
      try{if(typeof clearState==='function')clearState();}catch(e){}
      var note=document.querySelector('.sg-note');if(note)note.remove();
      try{if(window.KCESAT)KCESAT.done();}catch(e){}})
    .catch(function(){btn.disabled=false;st.style.color='#DB2F30';
      st.textContent='Not sent. Check your internet connection, then press Save & email again. Stay on this page until it says Sent.';});
  },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
