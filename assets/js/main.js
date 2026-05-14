const isHoverDevice=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
// Custom cursor — only on non-touch hover-capable devices
if(isHoverDevice&&!prefersReducedMotion){
  const cursor=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px'});
  function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing)}
  animRing();
  document.querySelectorAll('a,button,.service-card,.price-card,.port-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.style.width='48px';ring.style.height='48px';ring.style.borderColor='rgba(0,212,255,0.8)'});
    el.addEventListener('mouseleave',()=>{ring.style.width='32px';ring.style.height='32px';ring.style.borderColor='rgba(0,212,255,0.5)'});
  });
}
const canvas=document.getElementById('canvas-bg'),ctx=canvas.getContext('2d');
let W,H,pts=[];
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
resize();window.addEventListener('resize',resize);
class P{constructor(){this.reset()}reset(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;this.r=Math.random()*1.5+.5;this.a=Math.random()*.4+.1}update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset()}}
for(let i=0;i<80;i++)pts.push(new P());
function draw(){ctx.clearRect(0,0,W,H);pts.forEach(p=>{p.update();ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,212,255,${p.a})`;ctx.fill()});
for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(0,212,255,${.06*(1-d/120)})`;ctx.lineWidth=.5;ctx.stroke()}}
requestAnimationFrame(draw)}
if(!prefersReducedMotion)draw();
const reveals=document.querySelectorAll('.reveal');
function checkReveal(){reveals.forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight*.92)el.classList.add('visible')})}
checkReveal();window.addEventListener('scroll',checkReveal,{passive:true});
const contactForm=document.getElementById('contact-form');
if(contactForm){contactForm.addEventListener('submit',async function(e){e.preventDefault();const btn=document.getElementById('submit-btn'),s=document.getElementById('form-success'),er=document.getElementById('form-error');btn.textContent='Sending...';btn.disabled=true;s.style.display='none';er.style.display='none';
try{const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(contactForm)))});const json=await res.json();
if(res.ok&&json.success){s.style.display='block';contactForm.reset();btn.textContent='Sent ✓';setTimeout(()=>{btn.textContent='Send Message →';btn.disabled=false},4000)}else throw new Error()}
catch{er.style.display='block';btn.textContent='Send Message →';btn.disabled=false}})}
const so=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const el=e.target,t=el.textContent.trim(),n=parseFloat(t.replace(/[^0-9.]/g,''));if(!n||isNaN(n))return;const pre=t.match(/^[^0-9]*/)[0],suf=t.replace(/^[^0-9]*[\d.]+/,''),dur=1400,st=performance.now();function step(now){const p=Math.min((now-st)/dur,1),ease=1-Math.pow(1-p,3),val=n*ease;el.textContent=pre+(Number.isInteger(n)?Math.round(val):val.toFixed(1))+suf;if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step);so.unobserve(el)}})},{threshold:.5});
document.querySelectorAll('.stat-num').forEach(el=>so.observe(el));

// WhatsApp smart handler — opens on mobile, shows notice on desktop
function handleWhatsApp() {
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const waUrl = 'https://wa.me/639485609968?text=Hi%20Raiven!%20I%27d%20like%20to%20book%20a%20free%2030-minute%20discovery%20call.';
  if (isMobile) {
    window.open(waUrl, '_blank');
  } else {
    // Show mobile-only notice on desktop
    const desc = document.getElementById('wa-book-desc');
    const note = document.getElementById('wa-contact-note');
    if (desc) {
      desc.textContent = '📱 WhatsApp works on mobile — scan or open on your phone';
      desc.style.color = 'var(--accent3)';
      setTimeout(() => {
        desc.textContent = 'Chat directly — fastest response';
        desc.style.color = '';
      }, 4000);
    }
    if (note) note.style.display = 'inline';
  }
}
