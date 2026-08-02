window.initAxiomGlobe=function(root){
if(!root)return false;
const q=(id)=>root.querySelector("#"+id);
"use strict";
let lon0 = 36.0, lat0 = 20.0;     // current camera centre, degrees
const SPIN = 1.75;                // degrees per second, west to east
const SUN = (()=>{ const v=[0.52,0.22,-0.82], m=Math.hypot(...v); return v.map(c=>c/m); })();
const D2R = Math.PI/180;

const NODES = [
  {id:"USA", label:"USA",          lon:-74.0, lat:40.7},
  {id:"AE",  label:"UAE",          lon:55.27, lat:25.2},
  {id:"SA",  label:"SAUDI ARABIA", lon:46.72, lat:24.71},
  {id:"QA",  label:"QATAR",        lon:51.53, lat:25.29},
  {id:"OM",  label:"OMAN",         lon:58.4,  lat:23.59},
  {id:"PK",  label:"PAKISTAN",     lon:67.0,  lat:24.86},
  {id:"ZA",  label:"AFRICA",       lon:28.05, lat:-26.20}
];
const GOLD = "#D2A657";
const CORRIDOR_DOTS = ["#3B82F6", "#EAB308", "#22C55E", "#38BDF8", "#F97316"];
const LINKS = [
  {a:"USA", b:"AE", key:1, packets:4},
  {a:"USA", b:"PK", key:1, packets:4},
  {a:"USA", b:"ZA", key:1, packets:3},
  {a:"USA", b:"SA", key:0, packets:3},
  {a:"USA", b:"QA", key:0, packets:2},
  {a:"USA", b:"OM", key:0, packets:2}
];
LINKS.forEach(l=>{ l.color = GOLD; });

const FLAGS = {
 USA:`<svg viewBox="0 0 34 23"><rect width="34" height="23" fill="#F4F5F7"/>
   <g fill="#C4212F"><rect y="0" width="34" height="1.77"/><rect y="3.54" width="34" height="1.77"/><rect y="7.08" width="34" height="1.77"/><rect y="10.62" width="34" height="1.77"/><rect y="14.15" width="34" height="1.77"/><rect y="17.69" width="34" height="1.77"/><rect y="21.23" width="34" height="1.77"/></g>
   <rect width="14.5" height="12.4" fill="#20325F"/>
   <g fill="#fff"><circle cx="2.4" cy="2.2" r=".6"/><circle cx="5.6" cy="2.2" r=".6"/><circle cx="8.8" cy="2.2" r=".6"/><circle cx="12" cy="2.2" r=".6"/><circle cx="4" cy="4.4" r=".6"/><circle cx="7.2" cy="4.4" r=".6"/><circle cx="10.4" cy="4.4" r=".6"/><circle cx="2.4" cy="6.5" r=".6"/><circle cx="5.6" cy="6.5" r=".6"/><circle cx="8.8" cy="6.5" r=".6"/><circle cx="12" cy="6.5" r=".6"/><circle cx="4" cy="8.7" r=".6"/><circle cx="7.2" cy="8.7" r=".6"/><circle cx="10.4" cy="8.7" r=".6"/><circle cx="2.4" cy="10.7" r=".6"/><circle cx="5.6" cy="10.7" r=".6"/><circle cx="8.8" cy="10.7" r=".6"/><circle cx="12" cy="10.7" r=".6"/></g></svg>`,
 UK:`<svg viewBox="0 0 34 23"><rect width="34" height="23" fill="#1B2C6B"/>
   <path d="M0 0l34 23M34 0L0 23" stroke="#F4F5F7" stroke-width="4.6"/>
   <path d="M0 0l34 23M34 0L0 23" stroke="#C4212F" stroke-width="2.2"/>
   <path d="M17 0v23M0 11.5h34" stroke="#F4F5F7" stroke-width="7.4"/>
   <path d="M17 0v23M0 11.5h34" stroke="#C4212F" stroke-width="4.2"/></svg>`,
 DE:`<svg viewBox="0 0 34 23"><rect width="34" height="7.67" fill="#15181C"/><rect y="7.67" width="34" height="7.67" fill="#C4212F"/><rect y="15.33" width="34" height="7.67" fill="#E2B23A"/></svg>`,
 AE:`<svg viewBox="0 0 34 23"><rect width="34" height="7.67" fill="#1B8A4B"/><rect y="7.67" width="34" height="7.67" fill="#F4F5F7"/><rect y="15.33" width="34" height="7.67" fill="#15181C"/><rect width="8.5" height="23" fill="#C4212F"/></svg>`,
 SA:`<svg viewBox="0 0 34 23"><rect width="34" height="23" fill="#0E7A3C"/>
   <path d="M6 9.6h20" stroke="#F4F5F7" stroke-width="1.5"/>
   <path d="M6.5 14.4h19.5M25 14.4l-2.6-1.9v3.8z" stroke="#F4F5F7" stroke-width="1.1" fill="#F4F5F7"/></svg>`,
 QA:`<svg viewBox="0 0 34 23"><rect width="34" height="23" fill="#8A1538"/>
   <path d="M0 0h11l4.6 1.44L11 2.88l4.6 1.43L11 5.75l4.6 1.44L11 8.63l4.6 1.43L11 11.5l4.6 1.44L11 14.38l4.6 1.43L11 17.25l4.6 1.44L11 20.12l4.6 1.44L11 23H0z" fill="#F4F5F7"/></svg>`,
 OM:`<svg viewBox="0 0 34 23"><rect width="34" height="7.67" fill="#F4F5F7"/><rect y="7.67" width="34" height="7.67" fill="#C4212F"/><rect y="15.33" width="34" height="7.67" fill="#1B8A4B"/><rect width="9.5" height="23" fill="#C4212F"/>
   <g stroke="#F4F5F7" stroke-width=".9"><path d="M3.2 4.2l3.2 3.4M6.4 4.2L3.2 7.6M4.8 3.2v5.4"/></g></svg>`,
 PK:`<svg viewBox="0 0 34 23"><rect width="34" height="23" fill="#0E6B3C"/><rect width="8.5" height="23" fill="#F4F5F7"/>
   <path d="M23.6 5.4a6.2 6.2 0 100 12.2 7 7 0 110-12.2z" fill="#F4F5F7"/>
   <path d="M25.6 7.1l.7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2z" fill="#F4F5F7"/></svg>`,
 ZA:`<svg viewBox="0 0 34 23"><rect width="34" height="23" fill="#0B5B2E"/>
   <path d="M0 0h12L34 11.5 12 23H0z" fill="#15181C"/>
   <path d="M0 0h10L32 11.5 10 23H0z" fill="#C4212F"/>
   <path d="M0 0h8L30 11.5 8 23H0z" fill="#E2B23A"/>
   <path d="M0 0h6L28 11.5 6 23H0z" fill="#1B3F8B"/></svg>`
};

const nodeById = id => NODES.find(n=>n.id===id);
const corrList = q("corrList");
const KEYED = LINKS.filter(l=>l.key);
if (corrList && !corrList.children.length && !corrList.querySelector(".corr--region")) {
KEYED.forEach((l,i)=>{
  const dot = CORRIDOR_DOTS[i % CORRIDOR_DOTS.length];
  const b=document.createElement("button");
  b.className="corr"; b.type="button"; b.dataset.i=i;
  b.innerHTML = `<span class="corr__dot" style="background:${dot};color:${dot}"></span>
    <span class="corr__flag">${FLAGS[l.a]}</span>
    ${nodeById(l.a).label} <span class="corr__swap">⇄</span> ${nodeById(l.b).label}
    <span class="corr__flag">${FLAGS[l.b]}</span>`;
  corrList.appendChild(b);
});
}
if (corrList) {
  [...corrList.querySelectorAll(".corr")].forEach((b,i)=>{ b.dataset.i=String(i); });
}

/* ---- fixed orthographic camera ---- */
function unit(lon,lat){
  const la=lat*D2R, lo=lon*D2R, c=Math.cos(la);
  return [c*Math.cos(lo), Math.sin(la), c*Math.sin(lo)];
}
/* orthonormal view basis at the current camera centre: AX east, AY north,
   AZ towards the camera. Rebuilt each frame so the sphere shader and this
   overlay always share one projection. */
const AX=[0,0,0], AY=[0,0,0], AZ=[0,0,0];
function setBasis(){
  const lo=lon0*D2R, la=lat0*D2R;
  AZ[0]=Math.cos(la)*Math.cos(lo); AZ[1]=Math.sin(la); AZ[2]=Math.cos(la)*Math.sin(lo);
  AX[0]=-Math.sin(lo); AX[1]=0; AX[2]=Math.cos(lo);
  AY[0]=-Math.sin(la)*Math.cos(lo); AY[1]=Math.cos(la); AY[2]=-Math.sin(la)*Math.sin(lo);
}
setBasis();
const nodeV = NODES.map(n=>unit(n.lon,n.lat));
/* Per destination — tuned to hero mock (Figma): UK low Atlantic hop, DE slightly
   higher, Gulf routes sweep with their own apex, Pakistan on a separate arc. */
const ARC_TUNING = {
  AE: { lift: 0.070, bend: 0.038, spread:  0.040, sign: -1, phase: -0.20 },
  SA: { lift: 0.064, bend: 0.032, spread:  0.032, sign: -1, phase: 0.05 },
  PK: { lift: 0.076, bend: 0.046, spread:  0.048, sign:  1, phase: 0.40 },
  ZA: { lift: 0.082, bend: 0.042, spread:  0.036, sign: -1, phase: 0.28 },
  QA: { lift: 0.060, bend: 0.028, spread:  0.028, sign: -1, phase: 0.18 },
  OM: { lift: 0.066, bend: 0.031, spread:  0.034, sign: -1, phase: 0.10 },
};
function cross3(a,b,o){
  o[0]=a[1]*b[2]-a[2]*b[1];
  o[1]=a[2]*b[0]-a[0]*b[2];
  o[2]=a[0]*b[1]-a[1]*b[0];
  return o;
}
function norm3(v){
  const m=Math.hypot(v[0],v[1],v[2])||1;
  v[0]/=m; v[1]/=m; v[2]/=m;
  return v;
}
LINKS.forEach(l=>{
  l.va=nodeV[NODES.indexOf(nodeById(l.a))];
  l.vb=nodeV[NODES.indexOf(nodeById(l.b))];
  l.ang=Math.acos(Math.max(-1,Math.min(1,l.va[0]*l.vb[0]+l.va[1]*l.vb[1]+l.va[2]*l.vb[2])));
  l.side=[0,0,0];
  cross3(l.va,l.vb,l.side);
  norm3(l.side);
  l.tan=[0,0,0];
  cross3(l.side,l.va,l.tan);
  norm3(l.tan);
  const t=ARC_TUNING[l.b]||{lift:0.058,bend:0.028,spread:0,sign:1,phase:0};
  l.lift=t.lift+0.022*(l.ang/Math.PI);
  l.bend=t.bend;
  l.spread=t.spread;
  l.bendSign=t.sign;
  l.phase=t.phase;
});
function arcAt(l,s,out){
  slerp(l.va,l.vb,l.ang,s,tmp);
  const h=Math.sin(Math.PI*s);
  const h2=Math.sin(2*Math.PI*s);
  const depart=Math.sin(Math.PI*Math.min(1,s/0.45))*(1-Math.min(1,s/0.88));
  const lat=l.bendSign*(l.bend*h+l.spread*h2*0.48);
  tmp[0]+=l.side[0]*lat+l.tan[0]*l.spread*depart*1.25;
  tmp[1]+=l.side[1]*lat+l.tan[1]*l.spread*depart*1.25;
  tmp[2]+=l.side[2]*lat+l.tan[2]*l.spread*depart*1.25;
  const m=Math.hypot(tmp[0],tmp[1],tmp[2])||1;
  const hLift=h*(0.7+0.3*Math.sin(Math.PI*s+l.phase))+0.1*h2*Math.cos(l.phase);
  const rr=1+l.lift*Math.max(0.08,hLift);
  out[0]=tmp[0]/m*rr; out[1]=tmp[1]/m*rr; out[2]=tmp[2]/m*rr;
  return out;
}
function slerp(a,b,ang,t,out){
  if (ang<1e-6){ out[0]=a[0];out[1]=a[1];out[2]=a[2]; return out; }
  const s=Math.sin(ang), f1=Math.sin((1-t)*ang)/s, f2=Math.sin(t*ang)/s;
  out[0]=a[0]*f1+b[0]*f2; out[1]=a[1]*f1+b[1]*f2; out[2]=a[2]*f1+b[2]*f2;
  return out;
}
const tmp=[0,0,0], p4=[0,0,0];
function proj(v,out){
  out[0]=cx+(v[0]*AX[0]+v[1]*AX[1]+v[2]*AX[2])*R;
  out[1]=cy-(v[0]*AY[0]+v[1]*AY[1]+v[2]*AY[2])*R;
  out[2]=     v[0]*AZ[0]+v[1]*AZ[1]+v[2]*AZ[2];
  return out;
}

/* ---- element refs ---- */
const cv=q("gc"), ctx=cv&&cv.getContext("2d");
const glc=q("glc");
const mkWrap=q("markers");
const globeEl=q("globe");
const reduce=matchMedia("(prefers-reduced-motion: reduce)");
const phoneLayout=matchMedia("(max-width:767px)");
let W=0,H=0,cx=0,cy=0,R=0,dpr=1,flow=true,hover=-1;
let zoom=1;
const ZOOM_MIN=0.74, ZOOM_MAX=1.36, ZOOM_STEP=0.08;
const hit=q("ghit");

if(!cv||!ctx||!glc||!globeEl||!mkWrap){
  console.warn("[axiom-globe] missing canvas or globe container — arcs and flags disabled.");
  return false;
}

const mkEls = NODES.map(n=>{
  const el=document.createElement("div");
  el.className="mk";
  el.innerHTML=`<div class="mk__inner"><div class="mk__flag">${FLAGS[n.id]}</div>
    <div class="mk__stem"></div><div class="mk__label">${n.label}</div></div>`;
  mkWrap.appendChild(el);
  return el;
});

/* one gold light sprite, reused for every packet */
const spark=document.createElement("canvas"); spark.width=spark.height=48;
{
  const s=spark.getContext("2d"), g=s.createRadialGradient(24,24,0,24,24,24);
  g.addColorStop(0,"rgba(255,252,244,.95)");
  g.addColorStop(.16,"rgba(255,232,182,.72)");
  g.addColorStop(.42,"rgba(210,166,87,.26)");
  g.addColorStop(1,"rgba(210,166,87,0)");
  s.fillStyle=g; s.fillRect(0,0,48,48);
}

/* ---- WebGL sphere: the night-lights map wrapped on a rotating globe.
   Ray-cast against a unit sphere in the fragment shader, which keeps the
   projection identical to the 2D corridor overlay drawn on top. ---- */
const gl = (function(){
  try { return glc.getContext("webgl",{alpha:true,antialias:false,premultipliedAlpha:true}) ||
               glc.getContext("experimental-webgl",{alpha:true,premultipliedAlpha:true}); }
  catch(e){ return null; }
})();
let glReady=false, uni={}, quadBuf=null;

const VERT = `attribute vec2 aPos; void main(){ gl_Position=vec4(aPos,0.0,1.0); }`;
const FRAG = `
precision highp float;
uniform sampler2D uTex;
uniform mat3  uRot;      // view space -> earth space
uniform vec2  uC;        // sphere centre, framebuffer px
uniform float uR;        // sphere radius, framebuffer px
uniform vec3  uSun;      // sun direction in view space
const float PI = 3.141592653589793;
void main(){
  vec2  p  = (gl_FragCoord.xy - uC) / uR;
  float r  = length(p);
  float px = 1.5 / uR;
  vec3 col = vec3(0.0);
  float a  = 0.0;

  if (r < 1.0 + 6.0*px){
    float rr = min(r, 1.0);
    float z  = sqrt(max(0.0, 1.0 - rr*rr));
    vec3  nV = vec3(p, z);
    vec3  nE = uRot * nV;
    float lat = asin(clamp(nE.y, -1.0, 1.0));
    float lon = atan(nE.z, nE.x);
    /* the map already carries gold city light over a dark blue Earth */
    vec3  t  = texture2D(uTex, vec2(lon/(2.0*PI) + 0.5, 0.5 - lat/PI)).rgb;

    float ndl = dot(nV, uSun);
    float day = smoothstep(0.10, 0.50, ndl);
    float g   = dot(t, vec3(0.33, 0.40, 0.27));
    float landn = smoothstep(0.058, 0.092, g);
    vec3  dayCol = mix(vec3(0.055,0.120,0.245), vec3(0.32,0.35,0.40), landn);

    col  = mix(t, dayCol, day * 0.72) + t * 0.03 * (1.0 - day);
    col *= 0.62 + 0.38 * pow(z, 0.42);                              /* limb darkening */
    float term = 1.0 - smoothstep(0.0, 0.14, abs(ndl));               /* dawn band only at terminator */
    float rim  = smoothstep(0.90, 0.998, rr);
    col += vec3(0.06,0.38,0.92) * pow(1.0 - z, 4.2) * 0.62 * max(rim, term * 0.35);
    col += vec3(1.0,0.72,0.38) * pow(1.0 - z, 4.8) * term * rim * 0.55; /* no broad orange over USA */
    a = smoothstep(1.0 + 2.0*px, 1.0 - 2.0*px, r);
    col *= a;
  }

  if (r > 1.0 - 3.0*px){
    float d    = max(0.0, r - 1.0);
    float halo = exp(-d / 0.022);
    vec2  sd   = normalize(uSun.xy + vec2(1e-5));
    float face = max(0.0, dot(normalize(p + vec2(1e-6)), sd));
    vec3  hc   = vec3(0.12,0.42,0.95) * halo * 0.38
               + vec3(1.0,0.78,0.42) * halo * 0.18 * pow(face, 5.0);
    col += hc;
    a = max(a, clamp(max(hc.r, max(hc.g, hc.b)), 0.0, 1.0) * 0.85);
  }
  if (a <= 0.003) discard;
  gl_FragColor = vec4(col, a);
}`;

function initGL(img){
  if (!gl) return;
  const sh=(type,src)=>{ const s=gl.createShader(type); gl.shaderSource(s,src); gl.compileShader(s);
    if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
  const prog=gl.createProgram();
  gl.attachShader(prog,sh(gl.VERTEX_SHADER,VERT));
  gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,FRAG));
  gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);

  quadBuf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,quadBuf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(8),gl.DYNAMIC_DRAW);
  const loc=gl.getAttribLocation(prog,"aPos");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

  const tex=gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);        /* no seam at 180° */
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.generateMipmap(gl.TEXTURE_2D);

  uni={ C:gl.getUniformLocation(prog,"uC"), R:gl.getUniformLocation(prog,"uR"),
        Rot:gl.getUniformLocation(prog,"uRot"), Sun:gl.getUniformLocation(prog,"uSun"),
        Tex:gl.getUniformLocation(prog,"uTex") };
  gl.uniform1i(uni.Tex,0);
  gl.uniform3f(uni.Sun,SUN[0],SUN[1],SUN[2]);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);   /* premultiplied output */
  glReady=true;
  resize();
}

/* the quad hugs the sphere so the fragment shader only runs where it matters */
function glQuad(){
  if(!glReady||!W||!H) return;
  const m=R*1.07;
  const x0=((cx-m)/W)*2-1, x1=((cx+m)/W)*2-1;
  const y0=1-((cy+m)/H)*2, y1=1-((cy-m)/H)*2;
  gl.bindBuffer(gl.ARRAY_BUFFER,quadBuf);
  gl.bufferSubData(gl.ARRAY_BUFFER,0,new Float32Array([x0,y0, x1,y0, x0,y1, x1,y1]));
}
function drawGlobe(){
  if(!glReady) return;
  gl.viewport(0,0,glc.width,glc.height);
  gl.clearColor(0,0,0,0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2f(uni.C, cx*dpr, glc.height - cy*dpr);
  gl.uniform1f(uni.R, R*dpr);
  gl.uniformMatrix3fv(uni.Rot, false, [AX[0],AX[1],AX[2], AY[0],AY[1],AY[2], AZ[0],AZ[1],AZ[2]]);
  gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}


function layoutGlobe(){
  if (!W || !H) return;
  const narrow = W <= 1080;
  const baseR = Math.min(
    W * (narrow ? (W <= 767 ? 0.52 : 0.38) : 0.48),
    H * (narrow ? (W <= 767 ? 0.54 : 0.58) : 0.78),
  );
  R = baseR * zoom;
  if (narrow) {
    cx = Math.min(
      Math.max(W * (W <= 767 ? 0.68 : 0.56), W - R * 0.76),
      W * 0.38 + R,
    );
    cy = H * (W <= 767 ? 0.52 : 0.56);
  } else {
    cx = Math.min(Math.max(W * 0.58, W - R * 0.78), W * 0.44 + R);
    cy = H * 0.54;
  }
  if (hit) {
    hit.style.left=(cx-R)+"px"; hit.style.top=(cy-R)+"px";
    hit.style.width=hit.style.height=(2*R)+"px";
  }
  glQuad();
  const over=(cy+R)-H;
  if (over>1){
    const fade=Math.min(H*0.46, over+H*0.10);
    const s0=(100*(H-fade)/H).toFixed(1), s1=(100*(H-fade*0.42)/H).toFixed(1);
    const m=`linear-gradient(to bottom,#000 ${s0}%,rgba(0,0,0,.45) ${s1}%,transparent 100%)`;
    globeEl.style.webkitMaskImage=m; globeEl.style.maskImage=m;
  } else {
    globeEl.style.webkitMaskImage="none"; globeEl.style.maskImage="none";
  }
}

const heroEl=root.querySelector(".hero");

function resize(){
  const heroBox=heroEl && heroEl.getBoundingClientRect();
  const globeBox=globeEl && globeEl.getBoundingClientRect();
  const r=cv.getBoundingClientRect();
  dpr=Math.min(devicePixelRatio||1,2);
  W=r.width || (globeBox && globeBox.width) || (heroBox && heroBox.width) || 0;
  H=r.height || (globeBox && globeBox.height) || (heroBox && heroBox.height) || 0;
  if (!W || !H) return;
  cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  glc.width=Math.round(W*dpr); glc.height=Math.round(H*dpr);
  layoutGlobe();
}
new ResizeObserver(resize).observe(cv);
if (heroEl) new ResizeObserver(resize).observe(heroEl);
if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => requestAnimationFrame(resize));
  window.visualViewport.addEventListener("scroll", () => requestAnimationFrame(resize));
}
window.addEventListener("orientationchange", () => {
  setTimeout(() => requestAnimationFrame(resize), 100);
});

function hexA(hex,a){
  const n=parseInt(hex.slice(1),16);
  return `rgba(${n>>16&255},${n>>8&255},${n&255},${Math.max(0,Math.min(1,a)).toFixed(3)})`;
}

function draw(t){
  setBasis();
  drawGlobe();
  ctx.clearRect(0,0,W,H);
  ctx.lineCap="round";
  LINKS.forEach((l,li)=>{
    const on = l.key && KEYED.indexOf(l)===hover;
    const base = l.key ? (on?1:0.82) : 0.36;
    const N=96, pts=[];
    for (let i=0;i<=N;i++){
      const s=i/N;
      arcAt(l,s,tmp);
      proj(tmp,p4);
      const dx=p4[0]-cx, dy=p4[1]-cy;
      pts.push((p4[2]<0 && dx*dx+dy*dy<R*R) ? null : [p4[0],p4[1]]);
    }
    const lw=Math.max(1.1,R*(on?0.0058:0.0042));
    ctx.beginPath();
    let pen=false;
    for (const p of pts){
      if (!p){ pen=false; continue; }
      if (!pen){ ctx.moveTo(p[0],p[1]); pen=true; } else ctx.lineTo(p[0],p[1]);
    }
    ctx.lineWidth=lw*4.2; ctx.strokeStyle=hexA(l.color,base*0.10); ctx.stroke();
    ctx.lineWidth=lw*2.1; ctx.strokeStyle=hexA(l.color,base*0.20); ctx.stroke();
    ctx.lineWidth=lw;     ctx.strokeStyle=hexA(l.color,base*0.92); ctx.stroke();

    const speed=0.055+(li%3)*0.008;
    for (let k=0;k<l.packets;k++){
      const s=((t*speed+k/l.packets+li*0.13)%1);
      arcAt(l,s,tmp);
      proj(tmp,p4);
      if (p4[2]<0 && (p4[0]-cx)*(p4[0]-cx)+(p4[1]-cy)*(p4[1]-cy)<R*R) continue;
      const fade=Math.sin(Math.PI*s), rad=Math.max(1.6,R*(on?0.011:0.0082)), d=rad*(l.a==="USA"?5.2:6.0);
      ctx.globalCompositeOperation="lighter";
      ctx.globalAlpha=Math.min(1,0.22+0.55*fade)*base;
      ctx.drawImage(spark,p4[0]-d*0.5,p4[1]-d*0.5,d*0.85,d*0.85);
      ctx.globalAlpha=1;
      ctx.globalCompositeOperation="source-over";
      ctx.fillStyle=hexA("#FFF6E4",0.9*fade*base);
      ctx.beginPath(); ctx.arc(p4[0],p4[1],rad*0.55,0,6.2832); ctx.fill();
    }
  });

  NODES.forEach((n,i)=>{
    proj(nodeV[i],p4);
    if (p4[2]<=0.02) return;
    const hub = n.id === "USA";
    const pulse=(t*0.5+i*0.17)%1, rr=Math.max(3,R*0.014)*(1+pulse*(hub?1.4:2.4));
    ctx.strokeStyle=hexA("#F0D49A",(hub?0.18:0.34)*(1-pulse)); ctx.lineWidth=1.1;
    ctx.beginPath(); ctx.arc(p4[0],p4[1],rr,0,6.2832); ctx.stroke();
    ctx.fillStyle=hub?"rgba(255,240,210,.82)":"rgba(255,240,210,.95)";
    ctx.beginPath(); ctx.arc(p4[0],p4[1],Math.max(1.6,R*(hub?0.0048:0.0055)),0,6.2832); ctx.fill();
  });

  NODES.forEach((n,i)=>{
    proj(nodeV[i],p4);
    const el=mkEls[i], vis=Math.max(0,Math.min(1,(p4[2]-0.06)/0.22));
    if (vis<=0.01){ el.style.opacity="0"; return; }
    const sc=0.86+0.14*p4[2];
    el.style.opacity=(vis*(0.55+0.45*p4[2])).toFixed(2);
    el.style.transform=`translate(${p4[0].toFixed(1)}px,${(p4[1]-Math.max(10,R*0.035)).toFixed(1)}px) scale(${sc.toFixed(2)})`;
    el.classList.toggle("mk--dim",p4[2]<0.45);
  });
}

/* ---- corridor legend ---- */
if (corrList) {
corrList.addEventListener("pointerover",e=>{ const b=e.target.closest(".corr"); if(b) hover=+b.dataset.i; });
corrList.addEventListener("pointerout", e=>{ if(e.target.closest(".corr")) hover=-1; });
corrList.addEventListener("focusin",  e=>{ const b=e.target.closest(".corr"); if(b) hover=+b.dataset.i; });
corrList.addEventListener("focusout", ()=>{ hover=-1; });
corrList.addEventListener("click", e=>{
  const b=e.target.closest(".corr"); if(!b) return;
  const was=b.classList.contains("is-on");
  [...corrList.children].forEach(c=>c.classList.remove("is-on"));
  if(!was) b.classList.add("is-on");
});
}

const pauseBtn=q("tPause");
if (pauseBtn) pauseBtn.onclick=()=>{
  flow=!flow;
  pauseBtn.setAttribute("aria-pressed",String(!flow));
  pauseBtn.setAttribute("aria-label",flow?"Pause corridor animation":"Resume corridor animation");
  pauseBtn.innerHTML=flow
    ? '<svg width="11" height="12" viewBox="0 0 11 12" aria-hidden="true"><rect width="3.4" height="12" fill="currentColor"/><rect x="7.6" width="3.4" height="12" fill="currentColor"/></svg>'
    : '<svg width="11" height="12" viewBox="0 0 11 12" aria-hidden="true"><path d="M0 0l11 6-11 6z" fill="currentColor"/></svg>';
};

function syncZoomButtons(){
  const zoomIn=q("tZoomIn"), zoomOut=q("tZoomOut");
  if (zoomOut){
    const atMin=zoom<=ZOOM_MIN+1e-6;
    zoomOut.disabled=atMin;
    zoomOut.setAttribute("aria-disabled",String(atMin));
  }
  if (zoomIn){
    const atMax=zoom>=ZOOM_MAX-1e-6;
    zoomIn.disabled=atMax;
    zoomIn.setAttribute("aria-disabled",String(atMax));
  }
}
function applyZoom(delta){
  zoom=Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, +(zoom+delta).toFixed(4)));
  layoutGlobe();
  syncZoomButtons();
}
const zoomInBtn=q("tZoomIn"), zoomOutBtn=q("tZoomOut");
if (zoomInBtn) zoomInBtn.onclick=()=>applyZoom(ZOOM_STEP);
if (zoomOutBtn) zoomOutBtn.onclick=()=>applyZoom(-ZOOM_STEP);
syncZoomButtons();

/* ---- headline auto-fit: one line per phrase, whatever the font ---- */
const h1=root.querySelector("h1");
function fitHeadline(){
  if (!h1) return;
  h1.style.fontSize="";
  const avail=h1.clientWidth;
  if(!avail) return;
  for(let pass=0;pass<2;pass++){
    let widest=0;
    for(const s of h1.children) widest=Math.max(widest,s.offsetWidth);
    if(widest<=avail || !widest) break;
    const base=parseFloat(getComputedStyle(h1).fontSize);
    h1.style.fontSize=(base*(avail/widest)*0.995).toFixed(2)+"px";
  }
}
fitHeadline();
addEventListener("resize",()=>requestAnimationFrame(fitHeadline));
if(document.fonts && document.fonts.ready) document.fonts.ready.then(fitHeadline);
if(document.fonts) document.fonts.addEventListener("loadingdone",fitHeadline);
phoneLayout.addEventListener("change",()=>requestAnimationFrame(()=>{ resize(); fitHeadline(); }));

/* ---- rotation: auto-spin plus drag ---- */
let drag=null, vlon=0;
if (hit) {
hit.addEventListener("pointerdown",e=>{
  drag={x:e.clientX,y:e.clientY}; vlon=0;
  hit.setPointerCapture(e.pointerId); hit.classList.add("dragging");
});
hit.addEventListener("pointermove",e=>{
  if(!drag) return;
  const k=150/Math.max(140,R);
  vlon=-(e.clientX-drag.x)*k;
  lon0+=vlon;
  lat0=Math.max(-72,Math.min(72,lat0+(e.clientY-drag.y)*k*0.7));
  drag.x=e.clientX; drag.y=e.clientY;
});
["pointerup","pointercancel"].forEach(ev=>hit.addEventListener(ev,()=>{ drag=null; hit.classList.remove("dragging"); }));
hit.addEventListener("keydown",e=>{
  const s=e.shiftKey?12:4;
  if(e.key==="ArrowLeft") lon0+=s;
  else if(e.key==="ArrowRight") lon0-=s;
  else if(e.key==="ArrowUp") lat0=Math.min(72,lat0+s*0.7);
  else if(e.key==="ArrowDown") lat0=Math.max(-72,lat0-s*0.7);
  else return;
  e.preventDefault();
});
}

/* ---- loop ---- */
resize();
const texUrl =
  root.getAttribute("data-earth-texture") || "/hero/earth-night-lights.webp";
const texImg = new Image();
texImg.crossOrigin = "anonymous";
texImg.onload = () => {
  if (!gl) {
    globeEl.style.display = "none";
    return;
  }
  try {
    initGL(texImg);
  } catch (err) {
    globeEl.style.display = "none";
    return;
  }
  requestAnimationFrame(() => {
    resize();
    requestAnimationFrame(resize);
  });
};
texImg.onerror = () => {
  globeEl.style.display = "none";
};
texImg.src = texUrl;
let last=performance.now(), t=0.35;
function frame(now){
  const dt=Math.min(0.05,(now-last)/1000); last=now;
  if (!W || !H){ requestAnimationFrame(frame); return; }
  if (flow && !reduce.matches){
    t+=dt;
    if(!drag) lon0-=SPIN*dt;          /* west to east, as seen from space */
  }
  if(!drag && Math.abs(vlon)>1e-4){ lon0+=vlon; vlon*=0.90; }
  draw(t);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
return true;
};