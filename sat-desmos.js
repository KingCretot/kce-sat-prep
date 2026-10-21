/* KCE SAT Prep: built-in Desmos graphing calculator (College Board version, the one on the digital SAT).
   Adds a Calculator button to the Math module bars (#m1, #m2). One calculator is kept for both Math
   modules, the way the real test does. Shown only while a Math module is on screen. */
(function(){
var SRC='https://www.desmos.com/testing/cb-digital-sat/graphing';
var MATH=['m1','m2','m'];
var panel,frame,loaded=false,wide=false;
function css(){var s=document.createElement('style');s.textContent=
'.sd-btn{display:inline-flex;align-items:center;gap:7px;background:#C9A84C;color:#0A1F3D;border:none;border-radius:10px;padding:8px 14px;font:700 15px Arial,Helvetica,sans-serif;cursor:pointer}'+
'.sd-btn[aria-pressed="true"]{background:#fff}'+
'#sd-panel{position:fixed;top:0;right:0;bottom:0;width:var(--sdw);z-index:2000;background:#fff;border-left:3px solid #C9A84C;box-shadow:-8px 0 30px rgba(10,31,61,.25);display:none;flex-direction:column}'+
'#sd-panel.on{display:flex}'+
'#sd-head{background:#0A1F3D;color:#fff;display:flex;align-items:center;gap:8px;padding:9px 12px;font:700 14px Arial,Helvetica,sans-serif;flex-wrap:wrap}'+
'#sd-head .t{flex:1;min-width:150px}#sd-head .t small{display:block;font-weight:400;color:#cfd8e6;font-size:12px}'+
'#sd-head button,#sd-head a{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.3);border-radius:8px;padding:6px 10px;font:700 13px Arial,Helvetica,sans-serif;cursor:pointer;text-decoration:none}'+
'#sd-head .x{font-size:18px;line-height:1;padding:4px 10px}'+
'#sd-clock{font-family:Consolas,Menlo,monospace;background:rgba(201,168,76,.18);border:1px solid #C9A84C;color:#f0e4c4;border-radius:8px;padding:5px 9px;font-size:14px;white-space:nowrap}'+
'#sd-frame{flex:1;width:100%;border:0;background:#fff}'+
'body.sd-open{padding-right:var(--sdw)}'+
':root{--sdw:min(46vw,720px)}:root.sd-wide{--sdw:min(62vw,980px)}'+
'@media (max-width:900px){:root,:root.sd-wide{--sdw:100vw}body.sd-open{padding-right:0;overflow:hidden}#sd-wide{display:none}}';
document.head.appendChild(s);}
function build(){
  panel=document.createElement('aside');panel.id='sd-panel';panel.setAttribute('aria-label','Desmos graphing calculator');
  panel.innerHTML='<div id="sd-head"><div class="t">Desmos Graphing Calculator<small>College Board version, the same one as test day</small></div>'+
   '<span id="sd-clock" aria-live="off"></span>'+
   '<button type="button" id="sd-wide">Wider</button>'+
   '<a href="'+SRC+'" target="_blank" rel="noopener" title="If the calculator does not load here, open it in a new tab">New tab</a>'+
   '<button type="button" class="x" id="sd-close" aria-label="Close the calculator">×</button></div>';
  frame=document.createElement('iframe');frame.id='sd-frame';frame.title='Desmos graphing calculator';
  frame.setAttribute('allow','clipboard-read; clipboard-write');
  panel.appendChild(frame);document.body.appendChild(panel);
  document.getElementById('sd-close').onclick=close;
  document.getElementById('sd-wide').onclick=function(){wide=!wide;document.documentElement.classList.toggle('sd-wide',wide);this.textContent=wide?'Narrower':'Wider';};
}
function btns(){return document.querySelectorAll('.sd-btn');}
function setPressed(v){btns().forEach(function(b){b.setAttribute('aria-pressed',v?'true':'false');b.lastChild.textContent=v?' Hide calculator':' Calculator';});}
var tick=null;
function clock(){var c=document.getElementById('sd-clock');for(var i=0;i<MATH.length;i++){var s=document.getElementById(MATH[i]);if(s&&s.classList.contains('active')){var k=s.querySelector('.clock');c.textContent=(MATH[i]==='m'?'Math':'Module '+(i+1))+' · '+(k?k.textContent:'');c.style.borderColor=k&&k.classList.contains('warn')?'#F08C8A':'';c.style.color=k&&k.classList.contains('warn')?'#ffd9d7':'';return;}}c.textContent='';}
function open(){if(!loaded){frame.src=SRC;loaded=true;}panel.classList.add('on');document.body.classList.add('sd-open');setPressed(true);clock();clearInterval(tick);tick=setInterval(clock,200);}
function close(){clearInterval(tick);panel.classList.remove('on');document.body.classList.remove('sd-open');setPressed(false);}
function toggle(){panel.classList.contains('on')?close():open();}
function onMath(){for(var i=0;i<MATH.length;i++){var s=document.getElementById(MATH[i]);if(s&&s.classList.contains('active'))return true;}return false;}
function init(){
  if(!MATH.some(function(id){return document.getElementById(id);}))return;
  css();build();
  MATH.forEach(function(id){
    var bar=document.querySelector('#'+id+' .bar .in');if(!bar)return;
    var b=document.createElement('button');b.type='button';b.className='sd-btn';b.setAttribute('aria-pressed','false');
    b.innerHTML='<span aria-hidden="true">🧮</span><span> Calculator</span>';b.onclick=toggle;
    var clock=bar.querySelector('.clock');bar.insertBefore(b,clock||null);
  });
  var mo=new MutationObserver(function(){if(!onMath())close();});
  document.querySelectorAll('section.screen').forEach(function(s){mo.observe(s,{attributes:true,attributeFilter:['class']});});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
