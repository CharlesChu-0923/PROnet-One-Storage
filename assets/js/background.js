const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let points = [];
function resize(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const count = Math.max(34, Math.min(90, Math.floor(innerWidth / 20)));
  points = Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22}));
}
function frame(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;}
  ctx.lineWidth=1;
  for(let i=0;i<points.length;i++) for(let j=i+1;j<points.length;j++){
    const a=points[i], b=points[j], dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
    if(d<150){ctx.strokeStyle=`rgba(56,189,248,${(1-d/150)*0.13})`;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}
  }
  for(const p of points){ctx.fillStyle='rgba(125,211,252,.32)';ctx.beginPath();ctx.arc(p.x,p.y,1.4,0,Math.PI*2);ctx.fill();}
  requestAnimationFrame(frame);
}
addEventListener('resize', resize); resize(); frame();
