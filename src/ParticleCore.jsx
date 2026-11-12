import React,{useEffect,useRef} from 'react';

// Shared projection keeps every technology star on its own dotted orbit.
export const TECHNOLOGIES=['Java','Spring Boot','Spring Security','JPA','QueryDSL','MySQL','PostgreSQL','AWS','Jenkins','GitHub Actions','JavaScript','React','TypeScript','Next.js','JSP','Flutter','Dart','Git','Jira','IntelliJ IDEA','VS Code','DBeaver'];
const GROUPS=[['Java','Spring Boot','Spring Security','JPA','QueryDSL'],['MySQL','PostgreSQL','AWS','Jenkins','GitHub Actions'],['JavaScript','React','TypeScript','Next.js','JSP'],['Flutter','Dart','Git','Jira'],['IntelliJ IDEA','VS Code','DBeaver']];
const ORBITS=GROUPS.map((names,i)=>({names,tilt:[.25,-.43,.79,-1.05,1.5][i],flatten:[.34,.42,.48,.39,.32][i],radius:[1.15,1.24,1.12,1.18,1.26][i],speed:[.19,-.145,.12,-.17,.095][i]}));
export default function ParticleCore(){
 const canvas=useRef(null);
 useEffect(()=>{
  const el=canvas.current,ctx=el.getContext('2d');if(!ctx)return;
  let width=0,height=0,frame=0,visible=true,disposed=false,last=0,clock=0;
  const motion=matchMedia('(prefers-reduced-motion: reduce)'),pointer={x:0,y:0,tx:0,ty:0};
  const count=innerWidth<700?1500:3600;
  const points=Array.from({length:count},(_,i)=>{const y=1-2*(i+.5)/count,theta=i*2.399963229728653,r=Math.sqrt(1-y*y);return{x:Math.cos(theta)*r,y,z:Math.sin(theta)*r,phase:i*.083,band:i%3}});
  function resize(){const box=el.getBoundingClientRect();width=box.width;height=box.height;const dpr=Math.min(devicePixelRatio||1,1.75);el.width=Math.round(width*dpr);el.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw(clock)}
  function draw(ms){
   if(!width||!height)return;ctx.clearRect(0,0,width,height);
   pointer.x+=(pointer.tx-pointer.x)*.035;pointer.y+=(pointer.ty-pointer.y)*.035;
   const t=ms*.00016,angle=t+pointer.x*.18,tilt=.24+pointer.y*.12,ca=Math.cos(angle),sa=Math.sin(angle),ct=Math.cos(tilt),st=Math.sin(tilt);
   const compact=width<700,radius=Math.min(width*(compact?.29:.32),height*.34),cx=width*.5,cy=height*.5;
   ctx.globalCompositeOperation='lighter';
   for(const p of points){
    const wave=1+.115*Math.sin(p.y*5+t*3)+.065*Math.cos(p.phase+t*2),px=(p.x*ca-p.z*sa)*wave,pz=(p.x*sa+p.z*ca)*wave;
    const py=p.y*ct-pz*st,z=p.y*st+pz*ct,perspective=3.4/(3.4-z),x=cx+px*radius*perspective,y=cy+py*radius*perspective;
    const ridge=Math.pow(Math.max(0,Math.sin(p.y*7+Math.atan2(p.x,p.z)*2+t*2)),8),front=(z+1.5)/2.5,alpha=Math.min(.7,.08+front*.24+ridge*.3),size=(.4+front*.48+ridge*.55)*perspective;
    ctx.fillStyle=p.band===0?`rgba(139,102,255,${alpha})`:p.band===1?`rgba(184,156,255,${alpha})`:`rgba(88,125,255,${alpha*.8})`;ctx.fillRect(x,y,size,size);
   }
   function project(orbit,a){const rx=Math.cos(a)*orbit.radius,ry=Math.sin(a)*orbit.flatten*orbit.radius,spin=orbit.tilt+pointer.x*.05;return{x:cx+(rx*Math.cos(spin)-ry*Math.sin(spin))*radius,y:cy+(rx*Math.sin(spin)+ry*Math.cos(spin))*radius,z:Math.sin(a)}}
   const stars=[];
   ORBITS.forEach((orbit,band)=>{
    for(let j=0;j<260;j++){const p=project(orbit,j/260*Math.PI*2);ctx.fillStyle=`rgba(181,155,255,${.18+(p.z+1)*.14})`;ctx.beginPath();ctx.arc(p.x,p.y,.6+(p.z+1)*.15,0,Math.PI*2);ctx.fill()}
    orbit.names.forEach((name,i)=>{const phase=i/orbit.names.length*Math.PI*2+band*.87+(i%2)*.23;stars.push({...project(orbit,phase+ms*.0001*orbit.speed),name,index:TECHNOLOGIES.indexOf(name),phase})});
   });
   // Draw back-to-front; labels stay upright while the stars orbit.
   const labels=[];stars.sort((a,b)=>a.z-b.z).forEach(p=>{
    const depth=(p.z+1)/2,alpha=.45+depth*.55,core=(compact?1.5:2.1)+depth*(compact?1.1:1.7),halo=core*5;
    const glow=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,halo);glow.addColorStop(0,`rgba(255,255,255,${alpha*.8})`);glow.addColorStop(.2,`rgba(244,240,255,${alpha*.4})`);glow.addColorStop(.5,`rgba(204,187,255,${alpha*.13})`);glow.addColorStop(1,'rgba(200,180,255,0)');ctx.fillStyle=glow;ctx.fillRect(p.x-halo,p.y-halo,halo*2,halo*2);
    ctx.fillStyle=`rgba(255,255,255,${alpha})`;ctx.beginPath();ctx.arc(p.x,p.y,core,0,Math.PI*2);ctx.fill();
    // A tiny soft cross is reserved for the brightest foreground stars.
    if(depth>.75){ctx.strokeStyle=`rgba(246,241,255,${alpha*.35})`;ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(p.x-core*2.6,p.y);ctx.lineTo(p.x+core*2.6,p.y);ctx.moveTo(p.x,p.y-core*2.6);ctx.lineTo(p.x,p.y+core*2.6);ctx.stroke()}
    if(compact&&p.index>=14)return;
    const font=(compact?10:12)+depth*(compact?1:2);ctx.font=`${p.index<5?400:300} ${font}px "S-Core Dream", sans-serif`;
    const tw=ctx.measureText(p.name).width,gap=core+9;
    const candidates=[{x:p.x+gap,y:p.y-font*.65},{x:p.x-tw-gap,y:p.y-font*.65},{x:p.x-tw/2,y:p.y-font-12},{x:p.x-tw/2,y:p.y+10}];
    let box;for(const candidate of candidates){const b={x:Math.max(8,Math.min(width-tw-8,candidate.x)),y:Math.max(8,Math.min(height-font-8,candidate.y)),w:tw,h:font+5};if(!labels.some(o=>b.x<o.x+o.w+9&&b.x+b.w+9>o.x&&b.y<o.y+o.h+6&&b.y+b.h+6>o.y)){box=b;break}}
    if(!box)return;labels.push(box);ctx.globalCompositeOperation='source-over';ctx.fillStyle=`rgba(248,247,255,${.6+depth*.4})`;ctx.textBaseline='top';ctx.shadowColor='#070709';ctx.shadowBlur=5;ctx.fillText(p.name,box.x,box.y);ctx.shadowBlur=0;ctx.globalCompositeOperation='lighter';
   });ctx.globalCompositeOperation='source-over';
  }
  function tick(ms){if(disposed)return;if(visible&&!document.hidden){if(last&&ms-last<100)clock+=ms-last;draw(clock)}last=ms;frame=requestAnimationFrame(tick)}
  function move(e){pointer.tx=(e.clientX/innerWidth-.5)*2;pointer.ty=(e.clientY/innerHeight-.5)*2}
  function setup(){cancelAnimationFrame(frame);last=0;draw(clock);if(!motion.matches)frame=requestAnimationFrame(tick)}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(el);
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{rootMargin:'100px'});observer.observe(el);
  document.fonts.ready.then(()=>{if(!disposed)draw(clock)});window.addEventListener('pointermove',move,{passive:true});motion.addEventListener('change',setup);resize();setup();
  return()=>{disposed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();observer.disconnect();window.removeEventListener('pointermove',move);motion.removeEventListener('change',setup)};
 },[]);
 return <><canvas ref={canvas} aria-hidden="true" className="particle-canvas"/><ul className="sr-only" aria-label="사용 기술">{TECHNOLOGIES.map(name=><li key={name}>{name}</li>)}</ul></>;
}
