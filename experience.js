import * as THREE from 'three';
import { RoomEnvironment } from './assets/three/RoomEnvironment.js';

const root = document.querySelector('#experience');
const stage = document.querySelector('.universe');
const canvas = document.querySelector('#world');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const phone = matchMedia('(max-width: 700px)');
const panels = [...document.querySelectorAll('[data-panel]')];
const nav = [...document.querySelectorAll('.route button')];
const motionButton = document.querySelector('#motion');
const qualityButton = document.querySelector('#quality');
const starts = [0, .34, .61, .93];
let motion = !reduced.matches;
try { const saved = localStorage.getItem('phaze-hero-motion'); if (saved) motion = saved === 'play'; } catch {}
let target = 0, progress = 0, time = 0, last = 0, raf = 0, lowQuality = phone.matches;
let activePanel = 0;
const clamp = THREE.MathUtils.clamp;
const mix = THREE.MathUtils.lerp;
const smooth = (a,b,v) => { const t=clamp((v-a)/(b-a),0,1);return t*t*(3-2*t); };
const readProgress = () => { target=clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight),0,1); requestFrame(); };
let engine;
if(window.ScrollCraft) engine=window.ScrollCraft.mount(document);
else document.querySelector('[data-sc-spacer]').style.height='900vh';

function jump(index) { scrollTo({top:starts[index]*(document.documentElement.scrollHeight-innerHeight),behavior:motion?'smooth':'instant'}); }
document.querySelectorAll('[data-jump]').forEach(button=>button.addEventListener('click',()=>jump(Number(button.dataset.jump))));
document.querySelector('.logo').addEventListener('click',event=>{event.preventDefault();jump(0);});
function syncMotion(){motionButton.textContent=motion?'Pause motion Ⅱ':'Play motion ▷';motionButton.setAttribute('aria-pressed',String(!motion));requestFrame();}
motionButton.addEventListener('click',()=>{motion=!motion;try{localStorage.setItem('phaze-hero-motion',motion?'play':'pause');}catch{}syncMotion();});
reduced.addEventListener('change',()=>{motion=!reduced.matches;syncMotion();});

let renderer,scene,camera,portal,sculpture,shards,stars,orbitLines,light1,light2,light3;
let count=1100;
const portalMaterials = new Set();
const seeds=[];
let randomState=1984;
function random(){randomState=(randomState*1664525+1013904223)>>>0;return randomState/4294967296;}
const dummy=new THREE.Object3D();
const color=new THREE.Color();
let pointerX=0,pointerY=0;

try {
 renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,lowQuality?1.25:1.7));
 renderer.setSize(innerWidth,innerHeight);renderer.setClearColor(0x050608);
 renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
 scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x050608,.016);
 camera=new THREE.PerspectiveCamera(43,innerWidth/innerHeight,.1,150);
 const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();
 const environment=pmrem.fromScene(room,.05);scene.environment=environment.texture;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xc5e8ff,0x11151f,1.8));
 light1=new THREE.PointLight(0x35d7ff,95,45,1.6);light1.position.set(5,4,2);scene.add(light1);
 light2=new THREE.PointLight(0x8b68ff,110,50,1.6);light2.position.set(-4,-3,-13);scene.add(light2);
 light3=new THREE.DirectionalLight(0xffffff,3);light3.position.set(-4,7,6);scene.add(light3);

 const metal=new THREE.MeshPhysicalMaterial({color:0x91abb8,metalness:1,roughness:.16,clearcoat:1,clearcoatRoughness:.15,envMapIntensity:2.5});
 const darkMetal=new THREE.MeshStandardMaterial({color:0x162532,metalness:1,roughness:.24,envMapIntensity:2});
 const lightMaterial=new THREE.MeshBasicMaterial({color:0x76e3ff});
 portal=new THREE.Group();portal.position.set(2,0,-1);scene.add(portal);
 function ring(radius,tube,material,z=0){const mesh=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,12,160),material);mesh.position.z=z;portal.add(mesh);return mesh;}
 ring(3.55,.22,metal);ring(3.15,.06,lightMaterial,.08);ring(3.82,.05,metal);ring(4.12,.025,new THREE.MeshBasicMaterial({color:0x31566b}));
 ring(3.34,.08,darkMetal,-.23);ring(3.72,.055,lightMaterial,-.2);
 const ribs=new THREE.InstancedMesh(new THREE.BoxGeometry(.055,.38,.45),darkMetal,160);
 for(let i=0;i<160;i++){const a=i/160*Math.PI*2;dummy.position.set(Math.cos(a)*3.48,Math.sin(a)*3.48,0);dummy.rotation.set(0,0,a-Math.PI/2);dummy.scale.set(1,1,1);dummy.updateMatrix();ribs.setMatrixAt(i,dummy.matrix);}portal.add(ribs);
 for(let i=1;i<15;i++){const mat=new THREE.MeshBasicMaterial({color:new THREE.Color().setHSL(.54+i*.003,.7,.3-i*.012),transparent:true,opacity:1-i*.045});ring(3.17,.017,mat,-i*1.8);}
 const arc=new THREE.Mesh(new THREE.TorusGeometry(4.38,.016,6,140,Math.PI*1.45),new THREE.MeshBasicMaterial({color:0x63b9d9}));arc.rotation.set(.3,-.15,.35);portal.add(arc);
 const arc2=arc.clone();arc2.rotation.set(-.35,.2,2.6);arc2.scale.setScalar(.92);portal.add(arc2);
 portal.traverse(object=>{if(object.material){const mat=object.material;mat.userData.baseOpacity=mat.opacity;mat.transparent=true;portalMaterials.add(mat);}});

 sculpture=new THREE.Group();sculpture.position.set(2,0,-17);scene.add(sculpture);
 const facetMaterial=new THREE.MeshPhysicalMaterial({color:0xb9ccd7,metalness:.95,roughness:.2,clearcoat:1,envMapIntensity:2.2});
 shards=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.21,0),facetMaterial,count);shards.instanceMatrix.setUsage(THREE.DynamicDrawUsage);sculpture.add(shards);
 for(let i=0;i<count;i++){
  const y=1-2*(i+.5)/count;const r=Math.sqrt(1-y*y);const angle=i*2.399963229728653;
  seeds.push({x:Math.cos(angle)*r,y,z:Math.sin(angle)*r,phase:random()*Math.PI*2,scale:.5+random()*.8,spin:random(),spread:random()});
  color.setHSL(.53+random()*.05,.12+random()*.18,.4+random()*.45);shards.setColorAt(i,color);
 }
 const core=new THREE.Mesh(new THREE.IcosahedronGeometry(2.65,3),new THREE.MeshPhysicalMaterial({color:0x0b1e2b,metalness:1,roughness:.1,transparent:true,opacity:.85}));core.name='core';sculpture.add(core);
 orbitLines=new THREE.Group();orbitLines.position.copy(sculpture.position);scene.add(orbitLines);
 for(let i=0;i<4;i++){const o=new THREE.Mesh(new THREE.TorusGeometry(4.1+i*.65,.009,5,150),new THREE.MeshBasicMaterial({color:0x41667f,transparent:true,opacity:.65}));o.rotation.set(Math.PI/2+.13*i,.3+i*.3,.1*i);orbitLines.add(o);}
 const starPositions=new Float32Array(1600*3);for(let i=0;i<1600;i++){starPositions[i*3]=(random()-.5)*90;starPositions[i*3+1]=(random()-.5)*65;starPositions[i*3+2]=12-random()*95;}
 const starGeometry=new THREE.BufferGeometry();starGeometry.setAttribute('position',new THREE.BufferAttribute(starPositions,3));stars=new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0x99d2ec,size:.025,transparent:true,opacity:.65,sizeAttenuation:true}));scene.add(stars);
 stage.classList.add('is-ready');
} catch(error) { console.warn('3D scene unavailable; showing artwork.',error.message);document.querySelector('#fallback-note').hidden=false; }

function paintScene(p,t) {
 if(!renderer)return;
 const enter=smooth(.04,.29,p),form=smooth(.24,.38,p),breakup=smooth(.42,.69,p),settle=smooth(.76,.96,p);
 const isPhone=phone.matches;
 camera.position.set(mix(0,1.8,enter)+pointerX*.13,mix(.25,10,settle)+pointerY*.1,mix(12,-6,enter)+(isPhone?4.2:0)+settle*10);
 camera.lookAt(mix(.2,1.1,enter),isPhone?1.4:0,mix(-2,-17,enter));
 portal.rotation.set(.15*(1-enter),-.38*(1-enter),t*.055*(1-enter));
 portal.position.x=mix(2,1.8,enter);
 portal.scale.setScalar(1+enter*.16);
 portal.visible=p<.38;
 for(const material of portalMaterials)material.opacity=material.userData.baseOpacity*(1-smooth(.28,.38,p));
 sculpture.visible=p>.16;
 sculpture.rotation.set(.1+Math.sin(t*.15)*.2, t*.09+breakup*1.6,breakup*.25-settle*.35);
 const sphereRadius=3.05;
 const c=sculpture.getObjectByName('core');c.scale.setScalar(Math.max(.001,1-breakup*1.4));c.visible=breakup<.72;
 const actualCount=lowQuality?600:count;shards.count=actualCount;
 for(let i=0;i<actualCount;i++){
  const s=seeds[Math.floor(i*count/actualCount)];const radius=sphereRadius+(Math.sin(t*.4+s.phase)*.025);
  const a=s.phase+t*.12;const helixA=s.phase+i*.035+breakup*1.3;
  const hx=Math.cos(helixA)*(3.7+s.spread*3),hy=s.y*6.8,hz=Math.sin(helixA)*(3.7+s.spread*3);
  const diskR=3.5+s.spread*4.8;const dx=Math.cos(a)*diskR,dy=Math.sin(a*3)*.5+s.y*.32,dz=Math.sin(a)*diskR;
  dummy.position.set(mix(mix(s.x*radius,hx,breakup),dx,settle),mix(mix(s.y*radius,hy,breakup),dy,settle),mix(mix(s.z*radius,hz,breakup),dz,settle));
  dummy.rotation.set(s.phase+t*.15*breakup,s.phase+t*.2,helixA*breakup);
  const size=s.scale*(.85+breakup*.4);dummy.scale.set(size*(1+breakup*.6),size*(1+breakup*1.2),size*.7);dummy.updateMatrix();shards.setMatrixAt(i,dummy.matrix);
 }
 shards.instanceMatrix.needsUpdate=true;
 shards.material.color.setHSL(mix(.56,.09,settle),.22,.7);
 sculpture.scale.setScalar(mix(.2,1,form));
 orbitLines.visible=p>.22;orbitLines.rotation.set(settle*.22,t*.025+breakup*.7,breakup*.25);orbitLines.scale.setScalar(.8+form*.2+breakup*.2);
 light1.position.z=mix(2,-12,enter);light1.color.setHSL(mix(.54,.58,breakup),.8,.65);
 light2.color.setHSL(mix(.69,.09,settle),.65,.65);light2.intensity=110+breakup*80;
 stars.rotation.z=t*.0015;renderer.render(scene,camera);
 stage.dataset.scVerifyState=`camera:${camera.position.z.toFixed(1)};facets:${breakup.toFixed(2)};orbit:${settle.toFixed(2)}`;
}

function paintCopy(p){
 const windows=[[0,.20],[.27,.46],[.51,.76],[.84,1.1]];
 let strongest=0,max=0;
 panels.forEach((panel,i)=>{
  const [a,b]=windows[i];const inAlpha=i===0?1:smooth(a,a+.035,p);const outAlpha=i===3?1:1-smooth(b-.055,b,p);const alpha=inAlpha*outAlpha;
  panel.style.opacity=alpha;panel.style.visibility=alpha>.005?'visible':'hidden';panel.style.setProperty('--copy-y',`${(1-inAlpha)*17-(1-outAlpha)*17}px`);
  panel.inert=alpha<.7;panel.classList.toggle('is-active',alpha>.7);
  if(alpha>max){max=alpha;strongest=i;}
 });
 const index=p<.245?0:p<.49?1:p<.815?2:3;activePanel=index;
 nav.forEach((b,i)=>{b.classList.toggle('active',i===index);if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 document.querySelector('.progress-fill').style.transform=`scaleX(${p})`;
 document.documentElement.style.setProperty('--accent',p>.82?'#f1cfaa':p>.48?'#b2bfff':'#8bdfff');
}
function frame(stamp){raf=0;const dt=Math.min((stamp-last)/1000||0,.05);last=stamp;if(document.hidden)return;
 progress=motion?mix(progress,target,1-Math.exp(-dt*11)):target;if(Math.abs(progress-target)<.0001)progress=target;
 if(motion)time+=dt;
 paintScene(progress,time);paintCopy(progress);
 if(motion||Math.abs(progress-target)>.0001)requestFrame();
}
function requestFrame(){if(!raf&&!document.hidden)raf=requestAnimationFrame(frame);}
addEventListener('scroll',readProgress,{passive:true});
addEventListener('resize',()=>{if(renderer){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}readProgress();},{passive:true});
document.addEventListener('visibilitychange',()=>{last=performance.now();requestFrame();});
document.addEventListener('pointermove',event=>{if(!motion||phone.matches)return;pointerX=(event.clientX/innerWidth-.5)*2;pointerY=-(event.clientY/innerHeight-.5)*2;},{passive:true});
qualityButton.addEventListener('click',()=>{lowQuality=!lowQuality;renderer?.setPixelRatio(Math.min(devicePixelRatio,lowQuality?1:1.7));qualityButton.textContent=lowQuality?'Full graphics':'Lighter graphics';qualityButton.setAttribute('aria-pressed',String(lowQuality));requestFrame();});
qualityButton.setAttribute('aria-pressed',String(lowQuality));qualityButton.textContent=lowQuality?'Full graphics':'Lighter graphics';
canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();stage.classList.remove('is-ready');document.querySelector('#fallback-note').hidden=false;motion=false;syncMotion();});
canvas.addEventListener('webglcontextrestored',()=>location.reload());
window.__phazeDemo={get state(){return{progress,target,activePanel,motion,lowQuality,webgl:!!renderer};},capturePoster(){if(!renderer)return null;paintScene(0,1);return canvas.toDataURL('image/png');}};
syncMotion();readProgress();
