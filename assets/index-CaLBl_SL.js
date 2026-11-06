(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();const B=()=>window.PokiSDK;let xn={},Oe=!1,kn=!1,Y=!1;async function Pt(n={}){xn=n;const t=B();if(!t){console.warn("[poki] SDK not found, running without it");return}try{await t.init()}catch{console.warn("[poki] init failed (ad blocker?), continuing")}}function Tt(){if(!Oe){Oe=!0;try{B()?.gameLoadingFinished()}catch{}}}function Rt(){if(!(kn||Y)){kn=!0;try{B()?.gameplayStart()}catch{}}}function ke(){if(!(!kn||Y)){kn=!1;try{B()?.gameplayStop()}catch{}}}async function Ct(){const n=B();if(!n||Y)return;ke(),Y=!0;let t=!1;try{await n.commercialBreak(()=>{t=!0,xn.onAdStart?.()})}catch{}finally{Y=!1,t&&xn.onAdEnd?.()}}async function At(){const n=B();if(!n||Y)return!1;ke(),Y=!0;let t=!1,e=!1;try{e=await n.rewardedBreak(()=>{t=!0,xn.onAdStart?.()})===!0}catch{e=!1}finally{Y=!1,t&&xn.onAdEnd?.()}return e}function $t(n,t,e){try{B()?.measure(n,t,e)}catch{}}function Lt(){try{const n=B()?.getLanguage();if(n)return n}catch{}return(navigator.language||"en").slice(0,2).toLowerCase()}async function qt(n){try{return await B()?.shareableURL(n)??null}catch{return null}}function Et(n){try{const t=B()?.getURLParam(n);if(t)return t}catch{}return new URLSearchParams(location.search).get(n)}function Ft(n,t){try{B()?.movePill(n,t)}catch{}}function It(n){try{B()?.openExternalLink(n)}catch{}}const T={init:Pt,loadingFinished:Tt,gameplayStart:Rt,gameplayStop:ke,commercialBreak:Ct,rewardedBreak:At,measure:$t,getLanguage:Lt,shareableURL:qt,getURLParam:Et,movePill:Ft,openExternalLink:It,get isPlaying(){return kn},get isAdActive(){return Y}},Bt=window.AudioContext||window.webkitAudioContext,k=new Bt,on=k.createDynamicsCompressor();on.threshold.value=-14;on.knee.value=10;on.ratio.value=4;on.attack.value=.003;on.release.value=.12;on.connect(k.destination);const jn=k.createGain();jn.connect(on);const Qn=k.createGain();Qn.connect(jn);const Me=k.createGain();Me.connect(jn);const W=k.createGain();W.connect(Me);let tt=!1,st=!1,ot=!0,we=!0;function An(){const n=k.currentTime;jn.gain.setTargetAtTime(tt||st?0:1,n,.015),Qn.gain.setTargetAtTime(ot?.9:0,n,.015),Me.gain.setTargetAtTime(we?.2:0,n,.05)}function We(n){tt=n,An()}function zt(n){ot=n,An()}function Ht(n){we=n,An(),n&&Nt()}An();const Ot=()=>{k.state!=="running"&&k.resume()};for(const n of["pointerdown","keydown","touchend"])window.addEventListener(n,Ot,{capture:!0});document.addEventListener("visibilitychange",()=>{st=document.hidden,An()});const Wt=(()=>{const n=k.createBuffer(1,k.sampleRate,k.sampleRate),t=n.getChannelData(0);for(let e=0;e<t.length;e++)t[e]=Math.random()*2-1;return n})(),w=()=>k.state==="running",Q=n=>1+(Math.random()*2-1)*n;function x(n,t,e,a,o,i=0,c=Qn,u=.003){const l=k.currentTime+i,d=k.createOscillator();d.type=n,d.frequency.setValueAtTime(t,l),e!==t&&d.frequency.exponentialRampToValueAtTime(Math.max(e,1),l+a);const m=k.createGain();return m.gain.setValueAtTime(1e-4,l),m.gain.exponentialRampToValueAtTime(o,l+u),m.gain.exponentialRampToValueAtTime(1e-4,l+a),d.connect(m).connect(c),d.start(l),d.stop(l+a+.02),d}function C(n,t,e,a,o,i=1,c=0,u=Qn){const l=k.currentTime+c,d=k.createBufferSource();d.buffer=Wt,d.playbackRate.value=Q(.1);const m=k.createBiquadFilter();m.type=e,m.Q.value=i,m.frequency.setValueAtTime(a,l),m.frequency.exponentialRampToValueAtTime(Math.max(o,20),l+n);const h=k.createGain();h.gain.setValueAtTime(1e-4,l),h.gain.exponentialRampToValueAtTime(t,l+.004),h.gain.exponentialRampToValueAtTime(1e-4,l+n),d.connect(m).connect(h).connect(u),d.start(l,Math.random()*.5),d.stop(l+n+.02)}const $=n=>2**(n/12);function fn(n=.5,t=300){const e=k.currentTime;W.gain.cancelScheduledValues(e),W.gain.setTargetAtTime(1-n,e,.01),W.gain.setTargetAtTime(1,e+t/1e3,.12)}const S={slam(n){if(!w())return;const t=Q(.06);x("sine",(150+110*n)*t,38,.14+.2*n,.45+.5*n),x("triangle",230*t,170*t,.18,.12+.1*n),C(.07+.12*n,.18+.4*n,"lowpass",1800+4e3*n,300,.7),n>.55&&(C(.05,.25*n,"highpass",3e3,6e3,.7),fn(.45*n,260))},stone(n){w()&&(x("sine",(n?120:150)*Q(.08),45,n?.18:.08,n?.4:.14),C(n?.12:.05,n?.3:.1,"lowpass",700,150,.7))},clang(n){if(!w())return;const t=(n?520:680)*Q(.05);x("square",t,t*.98,.18,n?.07:.05),x("sine",t*2.76,t*2.7,.3,n?.06:.04),C(.05,n?.2:.1,"highpass",2500,4e3,.7)},ice(){w()&&(C(.35,.12,"bandpass",3500,1800,3),x("sine",1400,900,.2,.05))},rubber(){w()&&(x("sine",140,420,.25,.25),x("triangle",90,260,.2,.1))},land(){w()&&(x("sine",190*Q(.08),90,.1,.25),C(.05,.08,"lowpass",1200,300))},dive(){w()&&(C(.2,.16,"bandpass",2400,350,1.4),x("sine",640*Q(.05),260,.12,.08))},launch(n){w()&&C(.28+.15*n,.06+.12*n,"bandpass",350,2600,1.2)},charged(){w()&&(x("sine",1320,1320,.28,.13),x("sine",1980,1980,.22,.07,.02))},perfect(n){if(!w())return;const t=523.25*$(Math.min(n,10)*2);[0,4,7,12].forEach((e,a)=>x("triangle",t*$(e),t*$(e),.22,.12,a*.045))},spring(){if(!w())return;const n=x("sine",180,720,.38,.28),t=k.createOscillator(),e=k.createGain();t.frequency.value=22,e.gain.value=60,t.connect(e).connect(n.frequency),t.start(),t.stop(k.currentTime+.4)},bonk(){w()&&(x("square",190,85,.13,.12),x("sine",420,200,.08,.15))},wall(){w()&&x("triangle",320*Q(.1),200,.06,.07)},coin(n){if(!w())return;const t=987.8*$(n);x("square",t,t,.05,.05),x("square",t*1.335,t*1.335,.12,.05,.05)},star(){w()&&([0,4,7,11,14].forEach((n,t)=>x("sine",880*$(n),880*$(n),.3,.12,t*.05)),fn(.5,500))},shatter(){if(w()){C(.45,.4,"highpass",2500,7e3,.6),C(.15,.3,"lowpass",1500,200,.8);for(let n=0;n<6;n++){const t=2200+Math.random()*3500;x("sine",t,t*.98,.1+Math.random()*.15,.05,Math.random()*.12)}fn(.6,400)}},cloud(){w()&&C(.22,.14,"lowpass",900,200,.5)},death(){if(!w())return;C(.12,.3,"lowpass",2500,250,.8);const n=x("triangle",560,240,.5,.16,.06),t=k.createOscillator(),e=k.createGain();t.frequency.value=9,e.gain.value=18,t.connect(e).connect(n.frequency),t.start(),t.stop(k.currentTime+.6),fn(.6,600)},respawn(){w()&&x("sine",300,900,.16,.12)},checkpoint(){w()&&(x("triangle",784,784,.15,.13),x("triangle",1175,1175,.3,.13,.1))},win(){w()&&([0,4,7,12,16].forEach((n,t)=>x("triangle",523.25*$(n),523.25*$(n),.35,.14,t*.09)),[0,4,7].forEach(n=>x("sine",523.25*$(n+12),523.25*$(n+12),.9,.08,.5)),C(.6,.08,"highpass",5e3,9e3,.5,.45),fn(.8,1200))},starPop(n){if(!w())return;const t=659.25*$(n*3);x("triangle",t,t,.25,.16),x("sine",t*2,t*2,.2,.06)},tick(n){if(!w())return;const t=1200*$(Math.min(n,24)*.5);x("square",t,t,.03,.025)},click(){w()&&x("sine",820,600,.05,.12)},unlock(){w()&&([0,2,4,7,9,12,16,19].forEach((n,t)=>x("sine",523.25*$(n),523.25*$(n),.3,.09,t*.05)),fn(.7,900))}},Yt=112,re=60/Yt/2,Ye=[[48,0],[45,1],[41,0],[43,0]],In=n=>440*2**((n-69)/12);let Ve=!1,ce=0,vn=0;function Vt(){if(!we||k.state!=="running"){vn=k.currentTime+.05;return}for(;vn<k.currentTime+.12;){const n=Math.floor(ce/8)%Ye.length,[t,e]=Ye[n],a=ce%8,o=Math.max(0,vn-k.currentTime),i=[0,-1,12,-1,0,7,-1,12];i[a]>=0&&x("triangle",In(t+i[a]-12),In(t+i[a]-12),re*.9,.35,o,W,.01);const c=[0,e?3:4,7,12],u=t+24+c[a*3%4];(a%2===0||Math.random()<.4)&&x("sine",In(u),In(u),re*.8,.09,o,W,.01),(a===0||a===4)&&x("sine",120,45,.16,.35,o,W),a%2===1&&C(.04,.05,"highpass",7e3,9e3,.5,o,W),(a===2||a===6)&&C(.1,.06,"bandpass",1800,1200,.8,o,W),ce++,vn+=re}}function Nt(){Ve||(Ve=!0,vn=k.currentTime+.1,setInterval(Vt,30))}const Ut=new Set(["Space","Enter","ArrowDown","KeyS","ArrowUp","KeyW"]),Kt=new Set(["Escape","KeyP"]),Xt=new Set(["KeyR"]),jt=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","PageUp","PageDown"]);let Mn=!0,wn=!1,Wn=null;matchMedia("(pointer: coarse)").matches;let be=null,at=null,it=null;function U(n){Mn=n,n||(wn=!1)}function Qt(n){Wn=n}function Jt(n){be=n}function Zt(n){at=n}function ns(n){it=n}function es(){const n=wn;return wn=!1,n}function lt(){wn=!1}function ts(){if(Wn){const n=Wn;Wn=null,n()}}function rt(){Mn&&(wn=!0,ts())}window.addEventListener("keydown",n=>{if(jt.has(n.code)&&n.preventDefault(),!n.repeat){if(Kt.has(n.code)){Mn&&at?.();return}if(Xt.has(n.code)){Mn&&it?.();return}Ut.has(n.code)&&rt()}});window.addEventListener("wheel",n=>{n.target?.closest?.(".scroll")||n.preventDefault()},{passive:!1});window.addEventListener("contextmenu",n=>n.preventDefault());document.addEventListener("gesturestart",n=>n.preventDefault());function ss(n){n.style.touchAction="none",n.addEventListener("pointerdown",t=>{if(t.pointerType,!Mn)return;t.preventDefault();const e=n.getBoundingClientRect();be&&be(t.clientX-e.left,t.clientY-e.top)||rt()})}const ct="slam-climb.save",ft=()=>({v:1,level:1,coins:0,stars:{},owned:["classic"],style:"classic",music:!0,sfx:!0,reduceMotion:!1});let _=ft(),_e=!0;function os(){try{const n=localStorage.getItem(ct);n&&(_=as(JSON.parse(n))),localStorage.setItem("poki_ignore_probe","1"),localStorage.removeItem("poki_ignore_probe")}catch{_e=!1}return _}function N(n={}){_={..._,...n};try{localStorage.setItem(ct,JSON.stringify(_))}catch{_e=!1}}function as(n){const t={...ft(),...n};return(!Array.isArray(t.owned)||!t.owned.includes("classic"))&&(t.owned=["classic",...t.owned||[]]),t}const Dn={w:720,h:1280},G={dpr:1,scale:1,ox:0,oy:0,cssW:1,cssH:1,pxW:1,pxH:1,left:0,top:0,right:Dn.w,bottom:Dn.h};let ut=2;function is(n){ut=n}function dt(n){const t=n.parentElement,e=t.clientWidth||1,a=t.clientHeight||1,o=Math.min(window.devicePixelRatio||1,ut);n.width=Math.round(e*o),n.height=Math.round(a*o);const i=Math.min(e/Dn.w,a/Dn.h)*o,c=(n.width-Dn.w*i)/2,u=(n.height-Dn.h*i)/2;Object.assign(G,{dpr:o,scale:i,ox:c,oy:u,cssW:e,cssH:a,pxW:n.width,pxH:n.height,left:-c/i,top:-u/i,right:(n.width-c)/i,bottom:(n.height-u)/i})}function ls(n,t){const e=()=>{dt(n)};new ResizeObserver(e).observe(n.parentElement),window.addEventListener("orientationchange",e),e()}const un={level:2};let Bn=0,fe=0,zn=0,Hn=0;function rs(n,t){if(Bn+=n,fe++,Bn<1)return;const e=Bn/fe*1e3;Bn=0,fe=0,e>20?(zn++,Hn=0):e<14&&(Hn++,zn=0),zn>=2&&un.level>0&&(un.level--,zn=0,t(un.level)),Hn>=10&&un.level<2&&(un.level++,Hn=0,t(un.level))}const p={gravity:1900,apexGravityMul:.5,apexBand:170,diveHang:.055,diveStartSpeed:520,diveAccel:5600,diveMax:2800,bounceBase:110,bounceAmp:1350,bounceK:450,passiveKeep:.7,minHeight:110,stoneHop:55,springMul:1.25,springMinHeight:850,perfectDrop:380,perfectZone:.42,perfectBoost:1.22,drift:270,radius:30,slamLockout:.1,iceSlide:520,rubberMax:1800,coastLandings:10,magnet:90},L=30,E=690,ue=n=>p.bounceBase+p.bounceAmp*(1-Math.exp(-Math.max(0,n)/p.bounceK)),r={p950:"#1A0B33",p900:"#24124A",p800:"#2F185E",p700:"#3B1E6E",p600:"#4D2A8C",p500:"#6240AD",p400:"#7D5CC6",p300:"#9C82D8",p200:"#BFAEE8",g800:"#22703A",g700:"#2E9247",g600:"#3DAA52",g500:"#4FC25B",g400:"#73D46F",g300:"#9AE38D",g200:"#C2EEB3",y700:"#C98A00",y600:"#E6A91C",y500:"#FFD23F",y400:"#FFDD6B",y300:"#FFE796",y200:"#FFF0BF",yellow:"#FFD23F"},mt=[r.g500,r.g300,r.y500,r.y300,r.p300,r.p200],cs=[{name:"Tower"}],fs=n=>cs[0],pn=26,us=n=>n==="steel"||n==="glass"||n==="gate";function ds(n,t,e){const a=t.bars.map(d=>({kind:d.kind,x:d.x,baseX:d.x,y:d.y,hw:d.hw,amp:d.amp,spd:d.spd,phase:d.phase,dip:0,dipV:0,flash:0,alive:!0,pressed:!1,fade:1,decals:[]})),o=a.find(d=>d.kind==="goal"),i=o?o.y:-(t.rows-1)*60,c=t.coins.map((d,m)=>({x:d.x,y:d.y,taken:!1,bob:m*.7})),u=t.slams??e?.slams??9,l=e?.minSlams??Math.max(1,u-t.spare);return{n,id:t.id,name:t.name,theme:fs(),slams:u,minSlams:l,s2:e?.s2??Ne(u,l).s2,s3:e?.s3??Ne(u,l).s3,pads:a,coins:c,start:{...t.start},goalY:i,top:-(t.rows-1)*60-400,bottom:0}}function ms(n,t,e){return e?1:t>=n.s3?3:t>=n.s2?2:1}function Ne(n,t){const e=Math.max(0,n-t);return{s3:e,s2:Math.max(0,e-1)}}const hs=`# Drum intro. Tap at the TOP of the hop: the bounce comes from how far you fell.
name: First Slam
slams: 3
|....................o.|
|...............o......|
|............GGGGGGGG..|
|......................|
|......................|
|......................|
|............o.........|
|......................|
|......................|
|......................|
|........o.oo..........|
|......@...............|
|......................|
|.......o..o...........|
|DDDDDDDDDDDDDDDDDDDDDD|
`,gs=`# Drum practice: three slams, each from higher up.
name: Pump It
slams: 3
|......................|
|.....GGGGGGGGGGGG.....|
|...................o..|
|......................|
|......................|
|......................|
|...................o..|
|......................|
|......................|
|......................|
|.................o....|
|......................|
|......................|
|......................|
|..............o.o.....|
|............o.........|
|......................|
|......................|
|.........@............|
|..........o...oo......|
|......................|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Ds=`# Drum combo: two slams from the top of each hop reach the goal; the side drum is a stepping stone.
name: Higher Step
slams: 3
|................o.....|
|...................o..|
|......................|
|..GGGGGGGGGGG.........|
|......................|
|......................|
|................o.....|
|......................|
|......................|
|......................|
|......................|
|..............o.......|
|.............DDDDDDDDD|
|.......o....o.........|
|......................|
|......................|
|.............o........|
|...@..................|
|....o.......o.........|
|......................|
|DDDDDDDDDDDDDDDDDDDDDD|
`,ys=`# Breather: lots of coins.
name: Coin Rain
slams: 3
|...............o......|
|......GGGGGGGGGG......|
|......................|
|......................|
|..................o...|
|......................|
|......................|
|......................|
|..................o.o.|
|......................|
|......................|
|.............o........|
|..................o...|
|....................o.|
|..........@...........|
|...........o..........|
|..................o...|
|DDDDDDDDDDDDDDDDDDDDDD|
`,ps=`# Stone intro: stone kills your bounce. Fall through the hole to bounce high.
name: Through the Hole
slams: 3
|......................|
|......................|
|......................|
|.............o........|
|...........GGGGGGGGGG.|
|......................|
|......................|
|..........o...........|
|......................|
|..........SSSSSSSSSSSS|
|......................|
|........o.............|
|.....o................|
|...@..................|
|......o...............|
|....o.o...............|
|DDDDDDDDDDDDDDDDDDDDDD|
`,bs=`# Stone practice: only the wide lane by the wall has a long fall.
name: The Lane
slams: 3
|......................|
|......................|
|..............o.......|
|...........GGGGGGGGGG.|
|......................|
|......................|
|......................|
|......................|
|...........o..........|
|......................|
|..............SSSSSSS.|
|......................|
|.......o.o............|
|........o.............|
|....@.................|
|......................|
|.....o..o.............|
|DDDDDDDDDDDDSSSSSSSSSS|
`,Ss=`# Stone combo: walk off the high ledge and slam onto the deep drum below.
name: Ledge Drop
slams: 3
|......................|
|..............o.......|
|...................o..|
|......................|
|......................|
|...........GGGGGGGGGG.|
|......................|
|...@..................|
|................o.....|
|........o.............|
|SSSSSSSSSSS...........|
|......................|
|......................|
|...........o..........|
|..............o.......|
|......................|
|......................|
|......................|
|......................|
|......................|
|...........o.o........|
|......................|
|......................|
|......................|
|......................|
|...........o..........|
|SSSSSSSSSDDDDDDSSSSSSS|
`,vs=`# Breather.
name: Stone Shelves
slams: 3
|......................|
|......................|
|......................|
|...GGGGGGGGGGGGGGGG.o.|
|......................|
|......................|
|.................o....|
|......................|
|......................|
|......................|
|SSS............o...SSS|
|............o.........|
|..........@...........|
|.............o........|
|...........o.o........|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Gs=`# Spring intro: drums top out around 23 rows. The spring goes higher.
name: Spring
spare: 4
|.................o....|
|......................|
|.......GGGGGGGGGG.....|
|......................|
|....................o.|
|......................|
|......................|
|......................|
|......................|
|..................o...|
|......................|
|......................|
|......................|
|......................|
|......................|
|................o.....|
|......................|
|......................|
|..........o...........|
|......................|
|.............oo.......|
|......................|
|......................|
|.....@.o..............|
|......................|
|.............o........|
|DDDDDDDDDDDssssssssDDD|
`,xs=`# Spring + stone: get onto the ceiling, then drop through the hole onto the spring.
name: Spring Hole
spare: 3
|......................|
|......................|
|...GGGGGGGGGGGGGG.....|
|..................o...|
|......................|
|......................|
|......................|
|......................|
|...............o......|
|......................|
|......................|
|......................|
|......................|
|.............o........|
|......................|
|......................|
|......................|
|......................|
|...........o..........|
|SSSSSSSS.....SSSSSSSSS|
|......................|
|.....o...o............|
|......................|
|..........o...........|
|......................|
|.@....................|
|..o...................|
|.........o............|
|DDDDSSSSsssssSSSSSSSSS|
`,ks=`# Spring combo: spring to spring.
name: Spring Chain
spare: 3
|........o.............|
|.o......GGGGGGGG......|
|......................|
|......................|
|......................|
|......................|
|......................|
|......................|
|...o..................|
|...........o..........|
|.sssss................|
|......................|
|......................|
|......................|
|......................|
|......................|
|...............o......|
|......................|
|......................|
|......................|
|......................|
|..................o...|
|................sssss.|
|......................|
|......................|
|......................|
|................o.....|
|......................|
|......................|
|......................|
|............o.........|
|..........@...........|
|......................|
|.............o........|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Ms=`# Breather.
name: Spring Field
spare: 4
|..........o...........|
|......GGGGGGGGGGo.....|
|......................|
|......................|
|......................|
|......................|
|......................|
|..................o...|
|......................|
|......................|
|......................|
|......................|
|......................|
|....................o.|
|......................|
|......................|
|...............o......|
|......................|
|...................o..|
|..................o...|
|......................|
|..........@.o.........|
|......................|
|..................o...|
|sssssDDDDDDDDDDDDsssss|
`,ws=`# Steel intro: steel is solid from below and the sides. Go round it.
name: Steel Roof
spare: 4
|......................|
|......................|
|......................|
|.........o............|
|......................|
|......................|
|......................|
|....GGGGGGGGGGGG......|
|...............o......|
|......................|
|......................|
|......................|
|....................o.|
|......................|
|......................|
|==============...o....|
|...................o..|
|......................|
|.................o....|
|.....@.........o......|
|.......o..............|
|...................o..|
|DDDDDDDDDDDDDDDDDDDDDD|
`,_s=`# Steel practice: up through the gaps, side to side.
name: Zigzag
spare: 3
|......................|
|......................|
|......................|
|..........o........o..|
|......................|
|......................|
|......................|
|......................|
|......................|
|.........GGGGGGGGGGGG.|
|......................|
|......o...............|
|......................|
|......................|
|.o....................|
|.........=============|
|......................|
|......................|
|...o..................|
|....o.................|
|......................|
|......................|
|....o.................|
|DDDDDDDD======........|
|......................|
|......o...............|
|......................|
|...@..................|
|......................|
|......o...............|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Ps=`# Steel combo: the lid caps the drums. Get under the open side and pump the spring.
name: Under the Lid
spare: 3
|.................o....|
|......................|
|......................|
|......................|
|......................|
|..........o...........|
|..................o...|
|......................|
|......................|
|......................|
|......................|
|........o.GGGGGGGGGGG.|
|......................|
|......................|
|......................|
|......................|
|......................|
|....o.................|
|......o...............|
|......................|
|......................|
|.........=============|
|......................|
|......................|
|....o.................|
|...@o.................|
|....o.................|
|......................|
|sssssssssDDDDDDDDDDDDD|
`,Ts=`# Breather.
name: Steel Shelves
spare: 4
|......................|
|......................|
|......................|
|......................|
|................o.....|
|......................|
|.....GGGGGGGGGGGG...o.|
|......................|
|......................|
|......................|
|..................o...|
|......................|
|......................|
|......................|
|=====...........o=====|
|......................|
|......................|
|.............oo.......|
|...............o......|
|..........@...........|
|......................|
|...........o..o.......|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Rs=`# Ice intro: no bounce, you slide and shoot off the edge.
name: Slide
spare: 4
|......................|
|......o...............|
|GGGGGGGGGGG...........|
|......................|
|......................|
|......................|
|..........o...........|
|......................|
|........~~~~~~~~~~~~~~|
|......................|
|......................|
|............o.........|
|......................|
|......................|
|...............o......|
|.............o......o.|
|......................|
|......................|
|......................|
|...............o.@....|
|..............o...o...|
|......................|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Cs=`# Ice practice: slide into the wall, back the other way, off the edge.
name: Ice Ramp
spare: 3
|......................|
|......................|
|......................|
|......................|
|......................|
|...............o......|
|...............GGGGGGG|
|......................|
|......................|
|......................|
|............o.........|
|......................|
|......................|
|..........o...........|
|~~~~~~~~~~~~~.........|
|......................|
|......................|
|.........o............|
|......................|
|......oo..............|
|......................|
|...@....o.............|
|......................|
|....o..o..............|
|DDDDDDDDDDDDDDDDDDDDDD|
`,As=`# Ice combo: ride the ice off its edge and slam onto the only drum.
name: Ice Gap
spare: 3
|......................|
|......................|
|......................|
|......................|
|...................o..|
|...........GGGGGGGGGGG|
|......................|
|......................|
|..@...................|
|................o.....|
|.....o................|
|~~~~~~~~~~............|
|......................|
|..........o...o.......|
|......................|
|......................|
|......................|
|............o.........|
|..........o...........|
|......................|
|......................|
|......................|
|..........oo..........|
|......................|
|SSSSSSSSSSDDDDDDSSSSSS|
`,$s=`# Breather.
name: Ice Rink
spare: 4
|......................|
|......GGGGGGGGGG......|
|...............o......|
|......................|
|......................|
|......................|
|..................o...|
|......................|
|..................o...|
|...~~~~~~~~~~~~~~~~...|
|...................o..|
|......................|
|.............o........|
|...................o..|
|....................o.|
|..........@...........|
|...........o..........|
|...................o..|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Ls=`# Glass intro: only fire breaks it. Fire = a slam that fell far (it glows).
name: Glass Roof
spare: 3
|.............o......o.|
|......................|
|.....GGGGGGGGGGGG.....|
|...................o..|
|......................|
|......................|
|.................o....|
|gggggggggggggggggggggg|
|......................|
|......................|
|.............o........|
|...............o......|
|..............o.......|
|..........@...........|
|...........o..........|
|..............o.......|
|DDDDDDDDDDDDDDDDDDDDDD|
`,qs=`# Glass practice: smash DOWN through the floor for a huge fall.
name: Glass Floor
spare: 3
|................o.o...|
|......................|
|......................|
|..........GGGGGGGGGGG.|
|......................|
|......................|
|......................|
|...............o......|
|......................|
|.....o....o...........|
|......................|
|..@...................|
|......................|
|DDDDDD.......o........|
|gggggggggggggggggggggg|
|..........o...........|
|......................|
|......................|
|......................|
|...........o..........|
|......................|
|......................|
|..........o...........|
|......................|
|SSSSDDDDDDDDDDDDDDSSSS|
`,Es=`# Glass combo: steel, glass and ice.
name: Glass Maze
spare: 2
|......o...............|
|......................|
|......................|
|......................|
|......................|
|......................|
|.............GGGGGGGGG|
|..o...................|
|......................|
|......................|
|......................|
|......................|
|~~~~~~~~~~~~..o.......|
|......................|
|......................|
|.....o................|
|......................|
|..................o...|
|gggggggggggggggggggggg|
|......................|
|.........o............|
|.............o........|
|......................|
|..........@...........|
|.......o..............|
|...............o......|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Fs=`# Breather.
name: Glass Party
spare: 4
|...............o......|
|....................o.|
|......GGGGGGGGGG......|
|......................|
|......................|
|..................o...|
|......................|
|......................|
|................o.....|
|..ggggggg....ggggggg..|
|......................|
|......................|
|.............o........|
|..............oo......|
|..........@...........|
|......................|
|...........o..o.......|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Is=`# Rubber intro: rubber gives back your whole fall. Drums do not.
name: Rubber
spare: 3
|..............o.......|
|......o...............|
|................@.....|
|......................|
|..................o...|
|......................|
|.GGGGGGGGG............|
|......................|
|......................|
|.................o....|
|....................o.|
|......................|
|......................|
|......................|
|......................|
|......................|
|.................o....|
|...................o..|
|......................|
|......................|
|......................|
|......................|
|.................o....|
|.................o....|
|......................|
|......................|
|DDDDDDDDDDDRRRRRRRRRRR|
`,Bs=`# Rubber practice: big falls onto rubber keep their height.
name: Rubber Steps
spare: 3
|......................|
|...............o......|
|......GGGGGGGGG.......|
|......................|
|......................|
|......................|
|..@...................|
|...............o......|
|......................|
|......................|
|.......o..............|
|...................o..|
|......................|
|......................|
|...o............RRRRRR|
|......................|
|...o...SSSSSSSSS......|
|......................|
|......................|
|......................|
|....o.................|
|...o..................|
|......................|
|......................|
|......................|
|...o..................|
|RRRRRRRSSSSSSSSSSSSSSS|
`,zs=`# Rubber combo: smash through the glass, let the rubber throw you back up.
name: Rubber + Glass
spare: 2
|......................|
|......................|
|....................o.|
|......................|
|..........GGGGGGGGGGG.|
|......................|
|......................|
|......................|
|..........o.....o.....|
|......................|
|......................|
|.....o................|
|...@..................|
|......................|
|......................|
|DDDDDDDDD.o...o.......|
|gggggggggggggggggggggg|
|......................|
|......................|
|......................|
|......................|
|......................|
|......................|
|..........o.o.........|
|......................|
|......................|
|......................|
|......................|
|......................|
|..........o...........|
|RRRRRRRRRRRRRRRRRRRRRR|
`,Hs=`# Breather.
name: Bouncy Castle
spare: 4
|.............o....o...|
|...............o..o...|
|.....GGGGGGGGGGGG.....|
|......................|
|......................|
|......................|
|..........@...o.......|
|......................|
|......................|
|......................|
|......................|
|...........oo.........|
|......................|
|......................|
|......................|
|...........o..........|
|...........o..........|
|......................|
|RRRRRRRRRRRRRRRRRRRRRR|
`,Os=`# Moving intro: the drum slides. Land on it.
name: Moving Drum
spare: 3
|......................|
|..................o...|
|......GGGGGGGGGG......|
|......................|
|....................o.|
|......................|
|......................|
|......................|
|..................o...|
|......................|
|......................|
|......DDDDDDDDDDo.....| move 75 0.5
|...SSSSSSSSSSSSSSSS...|
|......................|
|.............oo.......|
|......................|
|..........@....o......|
|......................|
|...........o..o.......|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Ws=`# Moving practice: a drum ferries you up past the stone.
name: Ferry
spare: 3
|.....o................|
|......................|
|.............GGGGGGGG.|
|......................|
|......................|
|.o....................|
|......................|
|......................|
|......................|
|......................|
|......................|
|......................|
|......................|
|....o....o............|
|.....o................|
|......................|
|......................|
|...DDDDDD.............| move 90 0.8
|......................|
|............o.........|
|..........SSSSSSSSSSSS|
|......................|
|...................o..|
|......................|
|......................|
|..............@.......|
|...............o......|
|...............o......|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Ys=`# Moving combo: time your rise past the sliding steel.
name: Sliding Lid
spare: 2
|......................|
|......................|
|......................|
|.......o..............|
|....o.................|
|......................|
|......................|
|......................|
|......................|
|......................|
|.....GGGGGGGGGGGG.....|
|......................|
|......................|
|.......o...o..........|
|......................|
|......................|
|....................o.|
|......................|
|........======........| move 150 0.6
|......................|
|.............o........|
|......................|
|..........oo..........|
|..........@...........|
|......................|
|.................o....|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Vs=`# Breather.
name: Conveyor Party
spare: 4
|......................|
|.....GGGGGGGGGGGG..o..|
|......................|
|......................|
|......................|
|...................o..|
|......................|
|......................|
|......................|
|.................o....|
|......................|
|........DDDDDD........| move 200 1.2
|................o.....|
|......................|
|.............oo.......|
|......................|
|..........@....o......|
|......................|
|...........o..o.......|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Ns=`# Switch intro: SLAM the gold button to open the striped gate.
name: Switch
spare: 3
|......................|
|......................|
|.....oGGGGGGGGGG......|
|......................|
|xxxxxxxxxxxxxxxxxxxxxx|
|......................|
|......................|
|......................|
|..o...................|
|................o.....|
|......................|
|......................|
|..........o...........|
|.o................o...|
|......................|
|..........@.o.........|
|...o..................|
|...............o......|
|bbbbbDDDDDDDDDDDDDDDDD|
`,Us=`# Switch practice: the button is up high.
name: Switch Up
spare: 3
|......................|
|......................|
|.........o............|
|......................|
|......................|
|......................|
|...GGGGGGGGGG..o......|
|......................|
|......................|
|......................|
|xxxxxxxxxxxxxxxxxxxxxx|
|..................o...|
|....................o.|
|......................|
|....................o.|
|......................|
|...............o....o.|
|.................o....|
|..............bbbbbbbb|
|......................|
|......................|
|..........@.o.........|
|......................|
|......................|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Ks=`# Switch combo: steel, ice and a button.
name: Switch Maze
spare: 2
|......................|
|......................|
|......................|
|......GGGGGGGGGG......|
|.o....................|
|......................|
|......................|
|......................|
|xxxxxxxxxxxxxxxxxxxxxx|
|....o.................|
|......................|
|........o.............|
|...............o......|
|......................|
|......o...............|
|bbbbbbb=======........|
|......................|
|..................o...|
|....................o.|
|................@.....|
|......................|
|.................o..o.|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Xs=`# Breather.
name: Open Sesame
spare: 4
|..........o.....o.....|
|......GGGGGGGGGG......|
|......................|
|......................|
|..................o...|
|......................|
|......................|
|......................|
|......xxxxxxxxxx......|
|....................o.|
|......................|
|.............o........|
|.................o....|
|....................o.|
|..........@...........|
|...........o..........|
|...................o..|
|bbbbDDDDDDDDDDDDDDbbbb|
`,js=`# Spikes intro: do not land on them.
name: Spikes
spare: 3
|....................o.|
|..............o.......|
|......................|
|......................|
|......................|
|..GGGGGGGGGGG...o.....|
|......................|
|......................|
|......................|
|......................|
|..............o.......|
|..................^^^^|
|......................|
|........o.............|
|............o.........|
|.............o........|
|......................|
|....@.................|
|.....o................|
|............o.........|
|DDDDDDDDDDDDDDDDDDDDDD|
`,Qs=`# Spikes practice: two islands over a spike floor.
name: Spike Pit
spare: 3
|......................|
|......................|
|........GGGGGGG.....o.|
|......................|
|......................|
|......................|
|......................|
|..................o...|
|......................|
|...........o..........|
|......................|
|......................|
|................o.....|
|.............o........|
|.......o..............|
|......................|
|....@.................|
|..............o.......|
|.............o........|
|.....o................|
|..DDDDDD......DDDDDD..|
|......................|
|^^^^^^^^^^^^^^^^^^^^^^|
`,Js=`# Spikes combo: a narrow lane, spikes, steel and glass.
name: Gauntlet
spare: 2
|......................|
|......................|
|......................|
|......................|
|......................|
|.....o................|
|......................|
|......................|
|....GGGGGGGGGGGG......|
|......................|
|......................|
|.o....................|
|......................|
|gggggggggggggggggggggg|
|......................|
|......................|
|......................|
|...o......o.........o.|
|........==============|
|..........o...........|
|......................|
|.....o................|
|.....o................|
|...@..................|
|....o.................|
|......................|
|DDDDDDDD^^^^^^DDDDDDDD|
`,Zs=`# Finale.
name: Summit
spare: 4
|......................|
|......................|
|......GGGGGGGGGG......|
|......................|
|......................|
|......................|
|.............o........|
|......................|
|......................|
|......................|
|......................|
|................o.....|
|............DDDDDD....| move 90 0.7
|......................|
|......................|
|......................|
|......................|
|......................|
|RRRRRR................|
|..................o.o.|
|......................|
|......................|
|......................|
|......................|
|......................|
|..................o.o.|
|................ssssss|
|......................|
|......................|
|......................|
|......................|
|......................|
|............o..o......|
|..........@...o.......|
|......................|
|......................|
|DDDDDDDDDDDDDDDDDDDDDD|
`,de=22,dn=30,no=60,On=30,eo={D:"drum",S:"stone",s:"spring",R:"rubber","=":"steel","~":"ice",g:"glass",b:"switch",x:"gate","^":"spike",G:"goal"};function to(n,t){const e={id:n,name:n,slams:null,spare:3,cap:99,start:{x:360,y:-300},bars:[],coins:[],rows:0,warnings:[]},a=[];for(const c of t.split(/\r?\n/)){const u=c.replace(/\s+$/,"");if(!u.trim()||u.trim().startsWith("#"))continue;const l=/^\s*\|(.*?)\|(.*)$/.exec(u);if(l){a.push({cells:l[1],note:l[2].trim()});continue}const d=/^\s*(\w+)\s*:\s*(.*?)\s*(#.*)?$/.exec(u);if(!d){e.warnings.push(`unreadable line: ${u}`);continue}const[,m,h]=d;m==="name"?e.name=h:m==="slams"?e.slams=h==="auto"?null:Number(h):m==="spare"?e.spare=Number(h):m==="cap"?e.cap=Number(h):e.warnings.push(`unknown header "${m}"`)}e.rows=a.length;let o=!1,i=!1;return a.forEach((c,u)=>{const l=-(a.length-1-u)*no;c.cells.length!==de&&e.warnings.push(`row ${u} has ${c.cells.length} cells (needs ${de})`);const d=/move\s+(-?[\d.]+)(?:\s+([\d.]+))?(?:\s+(-?[\d.]+))?/.exec(c.note);let m=0;for(;m<c.cells.length;){const h=c.cells[m];if(h==="."||h===" "){m++;continue}if(h==="o"){e.coins.push({x:On+m*dn+dn/2,y:l-30}),m++;continue}if(h==="@"){e.start={x:On+m*dn+dn,y:l-30},o=!0,m++;continue}const D=eo[h];if(!D){e.warnings.push(`row ${u}: unknown cell "${h}"`),m++;continue}let v=m;for(;v+1<c.cells.length&&c.cells[v+1]===h;)v++;const R=On+m*dn,q=On+(v+1)*dn;e.bars.push({kind:D,x:(R+q)/2,y:l,hw:(q-R)/2,amp:d?Number(d[1]):0,spd:d&&d[2]?Number(d[2]):1,phase:d&&d[3]?Number(d[3]):0}),D==="goal"&&(i=!0),D==="ice"&&m===0&&v===de-1&&e.warnings.push(`row ${u}: ice spans wall to wall (the blob would slide forever)`),m=v+1}}),o||e.warnings.push("no start (@)"),i||e.warnings.push("no goal (G)"),e.coins.length>30&&e.warnings.push("more than 30 coins (the solver tracks at most 30)"),e}const so={"01-first-slam":{slams:3,minSlams:2,s2:0,s3:1,routeCoins:8},"02-pump-it":{slams:3,minSlams:2,s2:0,s3:1,routeCoins:9},"03-higher-step":{slams:3,minSlams:2,s2:0,s3:1,routeCoins:9},"04-coin-rain":{slams:3,minSlams:2,s2:0,s3:1,routeCoins:9},"05-through-the-hole":{slams:3,minSlams:2,s2:0,s3:1,routeCoins:7},"06-the-lane":{slams:3,minSlams:2,s2:0,s3:1,routeCoins:7},"07-ledge-drop":{slams:3,minSlams:2,s2:0,s3:1,routeCoins:9},"08-stone-shelves":{slams:3,minSlams:2,s2:0,s3:1,routeCoins:7},"09-spring":{slams:6,minSlams:2,s2:3,s3:4,routeCoins:9},"10-spring-hole":{slams:5,minSlams:2,s2:2,s3:3,routeCoins:9},"11-spring-chain":{slams:5,minSlams:2,s2:2,s3:3,routeCoins:8},"12-spring-field":{slams:6,minSlams:2,s2:3,s3:4,routeCoins:8},"14-zigzag":{slams:6,minSlams:3,s2:2,s3:3,routeCoins:9},"15-under-the-lid":{slams:4,minSlams:1,s2:2,s3:3,routeCoins:9},"16-steel-shelves":{slams:6,minSlams:2,s2:3,s3:4,routeCoins:9},"17-slide":{slams:6,minSlams:2,s2:3,s3:4,routeCoins:9},"18-ice-ramp":{slams:5,minSlams:2,s2:2,s3:3,routeCoins:9},"20-ice-rink":{slams:6,minSlams:2,s2:3,s3:4,routeCoins:9},"21-glass-roof":{slams:5,minSlams:2,s2:2,s3:3,routeCoins:9},"22-glass-floor":{slams:5,minSlams:2,s2:2,s3:3,routeCoins:9},"23-glass-maze":{slams:5,minSlams:3,s2:1,s3:2,routeCoins:9},"24-glass-party":{slams:6,minSlams:2,s2:3,s3:4,routeCoins:9},"25-rubber":{slams:4,minSlams:1,s2:2,s3:3,routeCoins:9},"26-rubber-steps":{slams:4,minSlams:1,s2:2,s3:3,routeCoins:9},"27-rubber-glass":{slams:4,minSlams:2,s2:1,s3:2,routeCoins:9},"28-bouncy-castle":{slams:5,minSlams:1,s2:3,s3:4,routeCoins:9},"29-moving-drum":{slams:5,minSlams:2,s2:2,s3:3,routeCoins:9},"30-ferry":{slams:6,minSlams:3,s2:2,s3:3,routeCoins:9},"32-conveyor-party":{slams:6,minSlams:2,s2:3,s3:4,routeCoins:9},"33-switch":{slams:5,minSlams:2,s2:2,s3:3,routeCoins:9},"34-switch-up":{slams:6,minSlams:3,s2:2,s3:3,routeCoins:9},"35-switch-maze":{slams:5,minSlams:3,s2:1,s3:2,routeCoins:9},"36-open-sesame":{slams:6,minSlams:2,s2:3,s3:4,routeCoins:9},"37-spikes":{slams:5,minSlams:2,s2:2,s3:3,routeCoins:9},"38-spike-pit":{slams:5,minSlams:2,s2:2,s3:3,routeCoins:9},"39-gauntlet":{slams:4,minSlams:2,s2:1,s3:2,routeCoins:9},"40-summit":{slams:7,minSlams:3,s2:3,s3:4,routeCoins:9},"13-steel-roof":{slams:7,minSlams:3,s2:3,s3:4,routeCoins:9},"19-ice-gap":{slams:4,minSlams:1,s2:2,s3:3,routeCoins:9},"31-sliding-lid":{slams:5,minSlams:3,s2:1,s3:2,routeCoins:9}},ht=Object.assign({"../../levels/01-first-slam.txt":hs,"../../levels/02-pump-it.txt":gs,"../../levels/03-higher-step.txt":Ds,"../../levels/04-coin-rain.txt":ys,"../../levels/05-through-the-hole.txt":ps,"../../levels/06-the-lane.txt":bs,"../../levels/07-ledge-drop.txt":Ss,"../../levels/08-stone-shelves.txt":vs,"../../levels/09-spring.txt":Gs,"../../levels/10-spring-hole.txt":xs,"../../levels/11-spring-chain.txt":ks,"../../levels/12-spring-field.txt":Ms,"../../levels/13-steel-roof.txt":ws,"../../levels/14-zigzag.txt":_s,"../../levels/15-under-the-lid.txt":Ps,"../../levels/16-steel-shelves.txt":Ts,"../../levels/17-slide.txt":Rs,"../../levels/18-ice-ramp.txt":Cs,"../../levels/19-ice-gap.txt":As,"../../levels/20-ice-rink.txt":$s,"../../levels/21-glass-roof.txt":Ls,"../../levels/22-glass-floor.txt":qs,"../../levels/23-glass-maze.txt":Es,"../../levels/24-glass-party.txt":Fs,"../../levels/25-rubber.txt":Is,"../../levels/26-rubber-steps.txt":Bs,"../../levels/27-rubber-glass.txt":zs,"../../levels/28-bouncy-castle.txt":Hs,"../../levels/29-moving-drum.txt":Os,"../../levels/30-ferry.txt":Ws,"../../levels/31-sliding-lid.txt":Ys,"../../levels/32-conveyor-party.txt":Vs,"../../levels/33-switch.txt":Ns,"../../levels/34-switch-up.txt":Us,"../../levels/35-switch-maze.txt":Ks,"../../levels/36-open-sesame.txt":Xs,"../../levels/37-spikes.txt":js,"../../levels/38-spike-pit.txt":Qs,"../../levels/39-gauntlet.txt":Js,"../../levels/40-summit.txt":Zs}),Yn=Object.keys(ht).sort(),oo=so,Pe=Yn.length,ao=n=>n.split("/").pop().replace(/\.txt$/,"");function io(n){const t=Math.max(0,Math.min(Yn.length-1,n-1)),e=ao(Yn[t]),a=to(e,ht[Yn[t]]);return ds(t+1,a,oo[e])}const H={outQuad:n=>1-(1-n)*(1-n),inCubic:n=>n*n*n,inOutQuad:n=>n<.5?2*n*n:1-Math.pow(-2*n+2,2)/2,outCubic:n=>1-Math.pow(1-n,3),outBack:n=>1+2.70158*Math.pow(n-1,3)+1.70158*Math.pow(n-1,2)},z={reduceMotion:!1,budget:1,trails:!0},J=[];function an(n,t,e,a,o=H.outQuad,i=0,c){J.push({t:0,dur:Math.max(a,1)/1e3,delay:i/1e3,from:t,to:e,set:n,ease:o,done:c})}function lo(n){for(let t=J.length-1;t>=0;t--){const e=J[t];if(e.delay>0){e.delay-=n;continue}e.t=Math.min(e.t+n/e.dur,1),e.set(e.from+(e.to-e.from)*e.ease(e.t)),e.t>=1&&(J[t]=J[J.length-1],J.pop(),e.done?.())}}let Z=0;const O={x:0,y:0,rot:0,maxPx:22,maxRad:.035};function ln(n){Z=Math.min(1,Z+n)}function me(n,t){return Math.sin(n*1.31+t*17.13)*.6+Math.sin(n*2.97+t*3.71)*.4}function ro(n,t){Z=Math.max(0,Z-n*1.7);const e=z.reduceMotion?0:Z*Z,a=t*28;O.x=O.maxPx*e*me(a,1),O.y=O.maxPx*e*me(a,2),O.rot=O.maxRad*e*me(a,3)}let Vn=0,_n=1;function co(n=.3,t=300){_n=n,an(e=>_n=e,n,1,t,H.inOutQuad)}function fo(n){return Vn>0?0:n*_n}const A={zoom:0,kick:0,kickV:0};function Te(n){z.reduceMotion||(A.zoom=Math.max(A.zoom,n))}function gt(n){z.reduceMotion||(A.kickV+=n*18)}var F=(n=>(n[n.Dot=0]="Dot",n[n.Square=1]="Square",n[n.Confetti=2]="Confetti",n[n.Shard=3]="Shard",n[n.Star=4]="Star",n[n.Spark=5]="Spark",n[n.Ring=6]="Ring",n))(F||{});const Jn=420,Zn=Array.from({length:Jn},()=>({x:0,y:0,vx:0,vy:0,life:0,max:1,size:4,color:r.yellow,shape:0,rot:0,vr:0,g:1,drag:1.5,alive:!1,shrink:!0}));let he=0;function P(n,t,e){const a=Math.max(1,Math.round(e.n*z.budget)),o=e.speed??300,i=e.life??.5,c=e.size??6,u=e.angle??0,l=e.spread??Math.PI*2;for(let d=0;d<a;d++){const m=Zn[he];he=(he+1)%Jn;const h=u+(Math.random()-.5)*l,D=o*(.35+Math.random()*.65),v=e.jitter??0;m.x=n+(Math.random()-.5)*v,m.y=t+(Math.random()-.5)*v*.4,m.vx=Math.cos(h)*D+(e.vx??0),m.vy=Math.sin(h)*D+(e.vy??0),m.max=m.life=i*(.7+Math.random()*.6),m.size=c*(.7+Math.random()*.6),m.color=Array.isArray(e.color)?e.color[Math.random()*e.color.length|0]:e.color,m.shape=e.shape??0,m.rot=Math.random()*Math.PI*2,m.vr=(Math.random()-.5)*(e.spin??10),m.g=e.g??1,m.drag=e.drag??1.5,m.shrink=e.shrink??!0,m.alive=!0}}const uo=1400;function mo(n){for(let t=0;t<Jn;t++){const e=Zn[t];if(!e.alive)continue;if(e.life-=n,e.life<=0){e.alive=!1;continue}e.vy+=uo*e.g*n;const a=1-Math.min(1,e.drag*n);e.vx*=a,e.shape===2&&(e.vy*=1-Math.min(1,3*n)),e.x+=e.vx*n,e.y+=e.vy*n,e.rot+=e.vr*n}}function ho(n){for(let t=0;t<Jn;t++){const e=Zn[t];if(!e.alive)continue;const a=e.life/e.max,o=e.shrink?e.size*a:e.size*Math.min(1,a*3);switch(n.fillStyle=e.color,n.strokeStyle=e.color,e.shape){case 0:n.beginPath(),n.arc(e.x,e.y,o,0,Math.PI*2),n.fill();break;case 1:n.fillRect(e.x-o,e.y-o,o*2,o*2);break;case 2:{n.save(),n.translate(e.x,e.y),n.rotate(e.rot),n.scale(1,Math.cos(e.rot*1.7)),n.fillRect(-o,-o*.5,o*2,o),n.restore();break}case 3:{n.save(),n.translate(e.x,e.y),n.rotate(e.rot),n.beginPath(),n.moveTo(0,-o*1.4),n.lineTo(o*.8,o),n.lineTo(-o*.7,o*.6),n.closePath(),n.fill(),n.restore();break}case 4:{n.save(),n.translate(e.x,e.y),n.rotate(e.rot),Re(n,o*1.3,o*.55),n.fill(),n.restore();break}case 5:{const i=Math.min(40,Math.hypot(e.vx,e.vy)*.04+4),c=Math.hypot(e.vx,e.vy)||1;n.lineWidth=o*.6,n.lineCap="round",n.beginPath(),n.moveTo(e.x,e.y),n.lineTo(e.x-e.vx/c*i,e.y-e.vy/c*i),n.stroke();break}case 6:{n.lineWidth=3*a+.5,n.beginPath(),n.arc(e.x,e.y,e.size*(1.6-a),0,Math.PI*2),n.stroke();break}}}}function Re(n,t,e){n.beginPath();for(let a=0;a<10;a++){const o=a%2?e:t,i=-Math.PI/2+a*Math.PI/5;a?n.lineTo(Math.cos(i)*o,Math.sin(i)*o):n.moveTo(Math.cos(i)*o,Math.sin(i)*o)}n.closePath()}const Pn=Array.from({length:20},()=>({x:0,y:0,r0:0,r1:0,life:0,max:1,w:6,color:r.yellow,flat:1,alive:!1}));let ge=0;function en(n,t,e,a=.35,o=8,i=r.yellow,c=.35){const u=Pn[ge];ge=(ge+1)%Pn.length,Object.assign(u,{x:n,y:t,r0:10,r1:e,life:a,max:a,w:o,color:i,flat:c,alive:!0})}function go(n){for(const t of Pn)t.alive&&(t.life-=n)<=0&&(t.alive=!1)}function Do(n){for(const t of Pn){if(!t.alive)continue;const e=1-t.life/t.max,a=H.outCubic(e),o=t.r0+(t.r1-t.r0)*a;n.strokeStyle=t.color,n.lineWidth=t.w*(1-e)+.5,n.beginPath(),n.ellipse(t.x,t.y,o,o*t.flat,0,0,Math.PI*2),n.stroke()}}const Tn=9,Rn=Array.from({length:10},()=>({xs:new Float32Array(Tn),ys:new Float32Array(Tn),life:0,max:1,color:r.yellow,alive:!1}));let De=0;function yo(n,t,e,a,o){const i=Rn[De];De=(De+1)%Rn.length;for(let c=0;c<Tn;c++){const u=a*c/(Tn-1),l=c===0?0:(Math.random()-.5)*34;i.xs[c]=n+Math.cos(e)*u-Math.sin(e)*l,i.ys[c]=t+Math.sin(e)*u+Math.cos(e)*l}i.life=i.max=.18,i.color=o,i.alive=!0}function po(n){for(const t of Rn)t.alive&&(t.life-=n)<=0&&(t.alive=!1)}function bo(n){n.lineJoin="round",n.lineCap="round";for(const t of Rn){if(!t.alive)continue;const e=t.life/t.max;n.strokeStyle=t.color,n.lineWidth=7*e+1,n.beginPath(),n.moveTo(t.xs[0],t.ys[0]);for(let a=1;a<Tn;a++)n.lineTo(t.xs[a],t.ys[a]);n.stroke()}}const Cn=Array.from({length:14},()=>({text:"",x:0,y:0,vy:0,life:0,max:1,size:40,color:r.yellow,scale:1,rot:0,alive:!1}));let ye=0;function yn(n,t,e,a=44,o=r.yellow,i=.9,c=-90){const u=Cn[ye];ye=(ye+1)%Cn.length,Object.assign(u,{text:n,x:t,y:e,vy:c,life:i,max:i,size:a,color:o,scale:0,rot:(Math.random()-.5)*.18,alive:!0}),an(l=>u.scale=l,0,1,260,H.outBack)}function So(n){for(const t of Cn)t.alive&&(t.y+=t.vy*n,t.vy*=1-Math.min(1,2.5*n),(t.life-=n)<=0&&(t.alive=!1))}function vo(n){n.textAlign="center",n.textBaseline="middle";for(const t of Cn){if(!t.alive)continue;const e=t.life/t.max;n.save();const a=Math.min(1,e*4);n.translate(t.x,t.y),n.rotate(t.rot),n.scale(t.scale*a,t.scale*a),n.font=`900 ${t.size}px system-ui, -apple-system, "Segoe UI", sans-serif`,n.lineWidth=t.size*.22,n.strokeStyle=r.p950,n.lineJoin="round",n.strokeText(t.text,0,0),n.fillStyle=t.color,n.fillText(t.text,0,0),n.restore()}}function Go(){for(const n of Zn)n.alive=!1;for(const n of Pn)n.alive=!1;for(const n of Rn)n.alive=!1;for(const n of Cn)n.alive=!1;Z=0,Vn=0,_n=1,A.zoom=0,A.kick=0,A.kickV=0}function xo(n){Vn>0&&(Vn-=n),lo(n),ro(n,performance.now()/1e3);const t=fo(n);mo(t),go(t),po(n),So(n),A.kickV+=(-A.kick*260-A.kickV*18)*n,A.kick+=A.kickV*n,A.zoom=Math.max(0,A.zoom-n*.35)}const mn={body:r.y500,dark:r.y700},Nn=[{id:"classic",name:"Classic",cost:0,...mn,trail:r.y300},{id:"confetti",name:"Confetti",cost:40,...mn,trail:r.g300},{id:"paint",name:"Paint",cost:90,...mn,trail:r.p300},{id:"thunder",name:"Thunder",cost:160,...mn,trail:r.p200},{id:"stars",name:"Stardust",cost:240,...mn,trail:r.y200},{id:"pixel",name:"Pixel",cost:340,...mn,trail:r.g500}],Ce=n=>Nn.find(t=>t.id===n)??Nn[0],ko="LV",Mo="Paused",wo="Resume",_o="Restart",Po="Styles",To="Next",Ro="Double coins",Co="Doubled!",Ao="Skip level",$o="Level complete!",Lo="PERFECT!",qo="Nice!",Eo="Great!",Fo="HUGE!",Io="SMASH!",Bo="Sound",zo="Music",Ho="Motion",Oo="on",Wo="off",Yo="Back",Vo="Equip",No="Equipped",Uo="Next style",Ko="New style ready!",Xo="All styles unlocked!",jo="Unlocked!",Qo="Progress can't be saved in this browser",Jo="Tap to resume",Zo="tiny...",na="Levels",ea="last slam!",ta="OPEN!",sa="Out of slams",oa="Ouch!",aa="Retry",ia="+3 slams",la="All levels done!",ra="Fell off",ca="Slams left",fa={level:ko,paused:Mo,resume:wo,restart:_o,styles:Po,next:To,double:Ro,doubled:Co,skip:Ao,complete:$o,perfect:Lo,nice:qo,great:Eo,huge:Fo,smash:Io,sound:Bo,music:zo,motion:Ho,on:Oo,off:Wo,back:Yo,equip:Vo,equipped:No,nextStyle:Uo,ready:Ko,allOwned:Xo,unlocked:jo,noSave:Qo,tapResume:Jo,tiny:Zo,levels:na,lastSlam:ea,open:ta,outOfSlams:sa,ouch:oa,retry:aa,plusSlams:ia,allDone:la,fell:ra,slamsLeft:ca},ua=fa,b=n=>ua[n]??n,g={x:360,y:-200,vx:0,vy:0,dir:1,state:"air",hang:0,charged:!1,powered:!1,lock:0,topY:-200,restPad:null,sq:0,sqV:0,spawn:1,chargeFlash:0,blink:0,blinkT:2,happy:0,ouch:0,sad:0,trailX:new Float32Array(12),trailY:new Float32Array(12),trailN:0},f={n:1,level:null,style:Ce("classic"),started:!1,playing:!0,time:0,camY:-1100,combo:0,slams:0,slamsUsed:0,continued:!1,coast:0,levelCoins:0,attempts:1,coinStreak:0,lastCoinT:-9,totalCoins:0,hudCoins:0,hudBump:0,slamFx:[],emptyShake:0,lastPraise:-9,tutIdle:2.2,tutGood:0,maxHeight:0},$n={onWin:n=>{},onFail:n=>{}},ne=Array.from({length:40},()=>({sx:0,sy:0,t:0,dur:.5,delay:0,alive:!1,cx:0,cy:0})),da=(n,t)=>({x:(G.ox+n*G.scale)/G.dpr,y:(G.oy+(t-f.camY)*G.scale)/G.dpr});function ma(n,t){const e=ne.find(o=>!o.alive);if(!e){f.hudCoins++;return}const a=da(n,t);e.sx=a.x,e.sy=a.y,e.t=0,e.dur=.45+Math.random()*.2,e.delay=0,e.alive=!0,e.cx=(Math.random()-.5)*160,e.cy=-60-Math.random()*80}function ha(n){for(const t of ne)if(t.alive){if(t.delay>0){t.delay-=n;continue}t.t+=n/t.dur,t.t>=1&&(t.alive=!1,f.hudCoins++,f.hudBump=1,S.tick(f.coinStreak))}for(let t=f.slamFx.length-1;t>=0;t--)(f.slamFx[t].t+=n)>.6&&f.slamFx.splice(t,1);f.emptyShake=Math.max(0,f.emptyShake-n*3)}function ga(n,t=!1){f.level=io(n),f.n=f.level.n,f.attempts=t?f.attempts+1:1,f.combo=0,f.levelCoins=0,f.slams=f.level.slams,f.slamsUsed=0,f.continued=!1,f.coast=0,f.maxHeight=0,f.slamFx.length=0,f.started=!1,f.playing=!0,f.time=0,Go();for(const a of ne)a.alive&&(a.alive=!1,f.hudCoins++);const e=f.level.start;Object.assign(g,{x:e.x,y:e.y,vx:0,vy:0,dir:1,state:"air",hang:0,charged:!1,powered:!1,lock:0,sq:-.2,sqV:0,spawn:0,trailN:0,happy:0,sad:0,topY:e.y,restPad:null}),an(a=>g.spawn=a,0,1,300,H.outBack),f.camY=Math.min(-(G.bottom-170),e.y-(G.top+(G.bottom-G.top)*.55)),f.tutIdle=f.n<=2?2.2:-999,f.n>2&&(f.tutGood=99)}function Da(n){f.slams+=n,f.continued=!0,f.coast=0,f.playing=!0,g.state="air",g.sad=0,g.restPad=null,g.vy=-Math.sqrt(2*p.gravity*p.minHeight),g.topY=g.y,g.lock=p.slamLockout;for(let t=0;t<n;t++)f.slamFx.push({t:-.15*t,i:f.slams-1-t});S.unlock()}function ya(){const n=g.vy;f.slams--,f.slamsUsed++,f.coast=0,f.slamFx.push({t:0,i:f.slams}),f.started||(f.started=!0,g.vx=0),g.state="dive",g.hang=p.diveHang,g.vy=0,g.vx=0,g.charged=!1,g.sq=.22,g.sqV=-6,S.dive(),P(g.x,g.y,{n:6,color:r.p200,speed:160,life:.3,size:5,angle:-Math.PI/2,spread:Math.PI*.9,g:.2,drag:4}),f.tutIdle=0,n>-300&&f.tutGood++,f.slams===0&&yn(b("lastSlam"),g.x,g.y-90,30,r.y400,.8,-60)}function pa(){f.emptyShake=1,S.bonk()}function ba(){g.charged=!0,g.chargeFlash=1,S.charged(),en(g.x,g.y,70,.25,5,r.y300,1)}const Ue=n=>Math.max(0,Math.min(1,n));function Sa(n){const t=g;if(n.kind==="spike"){Dt();return}const e=t.state==="dive",a=Math.max(0,n.y-p.radius-t.topY),o=e&&a>=p.perfectDrop;if(n.kind==="goal"){t.y=n.y-p.radius,Xe(n,Ue(a/950),!1,e,a),ka(n);return}if(n.kind==="glass"&&o){yt(n);return}if(t.y=n.y-p.radius,t.lock=p.slamLockout,t.charged=!1,lt(),n.kind==="ice"){t.state="slide",t.restPad=n,t.vy=0,t.powered=!1,t.topY=t.y,t.sq=.25,t.sqV=0,f.combo=0,S.ice(),P(t.x,n.y,{n:8,color:[r.g200,r.g300],speed:220,life:.35,size:5,angle:t.dir>0?Math.PI:0,spread:.8,g:-.1,drag:3}),Ke(!1);return}const i=n.kind==="stone"||n.kind==="steel"||n.kind==="gate"||n.kind==="glass",c=Math.abs(t.x-n.x)/n.hw,u=!i&&o&&c<=p.perfectZone;let l;i?l=p.stoneHop:n.kind==="rubber"?l=Math.min(p.rubberMax,Math.max(p.minHeight,a,e?ue(a):0)):e?l=ue(a):l=Math.max(p.minHeight,Math.min(a*p.passiveKeep,ue(a)*.8)),n.kind==="spring"&&(l=Math.max(l*p.springMul,p.springMinHeight)),t.powered=!i&&o,u?(l*=p.perfectBoost,f.combo++):f.combo=0,n.kind==="switch"&&e&&!n.pressed&&va(n),t.topY=t.y,t.vy=-Math.sqrt(2*p.gravity*l),t.state="air",i?Ga(n,e):Xe(n,Ue(a/950)*(e?1:.6),u,e,a),Ke(!i&&l<=p.minHeight+10)}function Ke(n){f.slams>0||!f.playing||(f.coast++,(n&&f.coast>=2||f.coast>=p.coastLandings)&&Se("slams"))}function va(n){n.pressed=!0;for(const t of f.level.pads)t.kind==="gate"&&t.alive&&(t.alive=!1,an(e=>t.fade=e,1,0,350,H.outCubic),P(t.x,t.y+pn/2,{n:18,color:[r.p300,r.y500],speed:300,life:.5,size:6,shape:F.Square,g:.8,jitter:t.hw*1.6,shrink:!1}));yn(b("open"),n.x,n.y-110,34,r.y400,.9),ln(.25),S.unlock()}function Ga(n,t){g.sq=t?.45:.25,g.sqV=0,n.kind==="steel"||n.kind==="gate"?S.clang(t):S.stone(t),ln(t?.12:.03),P(g.x,n.y,{n:t?10:4,color:[r.p300,r.p400],speed:t?260:120,life:.35,size:6,angle:-Math.PI/2,spread:2.8,g:.9}),f.combo=0}function Xe(n,t,e,a,o){const i=g.x,c=n.y;if(g.sq=.18+.55*t+(e?.12:0),g.sqV=0,n.dipV+=260+900*t,n.flash=.5+.5*t,t<.15&&!a){n.kind==="spring"?S.spring():n.kind==="rubber"?S.rubber():S.land(),P(i,c,{n:4,color:r.p400,speed:120,life:.3,size:5,angle:-Math.PI/2,spread:2.6,g:.5});return}n.kind==="spring"&&S.spring(),n.kind==="rubber"&&S.rubber(),S.slam(e?1:t),S.launch(t),ln(.06+.42*t*t+(e?.22:0)),gt(8+26*t),e&&Te(.06+Math.min(.04,f.combo*.01)),en(i,c,70+190*t,.32+.15*t,6+8*t,r.y300,.3),e&&en(i,c,280,.5,10,f.style.trail,.3);const u=Math.round(4+10*t);if(P(i-10,c,{n:u,color:r.p300,speed:200+360*t,life:.4,size:7,angle:Math.PI,spread:.7,g:-.15,drag:4}),P(i+10,c,{n:u,color:r.p300,speed:200+360*t,life:.4,size:7,angle:0,spread:.7,g:-.15,drag:4}),t>.5&&P(i,c,{n:Math.round(6+10*t),color:r.y200,speed:700*t,life:.3,size:3,shape:F.Spark,angle:-Math.PI/2,spread:2.4,g:.6,drag:2}),xa(f.style.id,i,c,t,e,n),e){const l=f.combo;yn(l>1?`${b("perfect")} x${l}`:b("perfect"),i,g.y-120,Math.min(78,52+l*4),l>=3?r.y400:r.y200,.95),S.perfect(l-1),f.lastPraise=f.time}else a&&o>=750&&f.time-f.lastPraise>1?(yn(o>=1100?b("huge"):b("great"),i,g.y-100,o>=1100?44:36,r.y200,.75),f.lastPraise=f.time):a&&o<160&&f.n<=2&&yn(b("tiny"),i,g.y-80,26,r.p300,.6,-50)}function xa(n,t,e,a,o,i){const c=f.style,u=o?1.4:1;switch(n){case"classic":P(t,e-10,{n:Math.round((6+12*a)*u),color:[r.y500,r.y300,r.y200],speed:380+400*a,life:.5,size:6,angle:-Math.PI/2,spread:2.2,g:1});break;case"confetti":P(t,e-10,{n:Math.round((12+36*a)*u),color:mt,speed:500+700*a,life:.9,size:7,shape:F.Confetti,angle:-Math.PI/2,spread:1.9,g:.55,drag:1.2,spin:16});break;case"paint":{P(t,e-8,{n:Math.round((10+22*a)*u),color:[r.g400,r.y500,r.p300],speed:420+600*a,life:.6,size:7+5*a,angle:-Math.PI/2,spread:2.6,g:1.3,drag:.8}),i.decals.length>=7&&i.decals.shift(),i.decals.push({dx:Math.max(-i.hw+12,Math.min(i.hw-12,t-i.x)),r:14+22*a,color:[r.y500,r.g400,r.p300][Math.random()*3|0]});break}case"thunder":{const l=Math.round(2+4*a*u);for(let d=0;d<l;d++)yo(t,e,-Math.PI/2+(d/Math.max(1,l-1)-.5)*2.6,120+200*a,c.trail);P(t,e,{n:Math.round(8+12*a),color:[r.y200,c.trail],speed:600+400*a,life:.3,size:3,shape:F.Spark,angle:-Math.PI/2,spread:3,g:.3});break}case"stars":P(t,e-10,{n:Math.round((8+18*a)*u),color:[r.y500,r.y300,r.y200],speed:380+520*a,life:.8,size:7+3*a,shape:F.Star,angle:-Math.PI/2,spread:2.4,g:.35,drag:2.2,spin:8});break;case"pixel":P(t,e-10,{n:Math.round((10+24*a)*u),color:[r.g500,r.g300,r.y300,r.p300],speed:420+520*a,life:.7,size:6,shape:F.Square,angle:-Math.PI/2,spread:2.4,g:1.5,drag:.6,shrink:!1,spin:0});break}}function Dt(){f.playing&&(g.state="dead",f.playing=!1,f.combo=0,g.powered=!1,ln(.55),gt(30),en(g.x,g.y,160,.4,10,r.y500,1),P(g.x,g.y,{n:30,color:[r.y500,r.y700,r.y300],speed:700,life:.8,size:9,g:1.1,drag:1}),P(g.x,g.y,{n:4,color:r.y200,speed:200,life:.6,size:8,g:.6}),S.death(),an(()=>{},0,1,700,H.outQuad,0,()=>$n.onFail("spike")))}function Se(n){if(!f.playing)return;f.playing=!1;const t=g;n==="slams"&&(t.state="fail",t.sad=9,t.vy=0,t.vx=0,t.trailN=0,t.restPad=f.level.pads.find(e=>Math.abs(e.y-p.radius-t.y)<2&&Math.abs(t.x-e.x)<=e.hw+p.radius*.55)??null,S.death()),an(()=>{},0,1,n==="slams"?650:250,H.outQuad,0,()=>$n.onFail(n))}function ka(n){const t=g;t.state="win",t.happy=9,t.restPad=n,t.y=n.y-p.radius,t.vy=0,t.vx=0,t.trailN=0,t.powered=!1,f.playing=!1,co(.25,700),Te(.1),ln(.5);for(let a=0;a<3;a++)P(n.x+(a-1)*n.hw*.8,n.y-10,{n:30,color:mt,speed:900,life:1.4,size:8,shape:F.Confetti,angle:-Math.PI/2,spread:1.2,g:.5,drag:1,spin:18});en(n.x,n.y,420,.7,14,r.y400,.35),S.win();const e=ms(f.level,f.slams,f.continued);an(()=>{},0,1,1200,H.outQuad,0,()=>$n.onWin(e))}function yt(n){n.alive=!1,ln(.6),Te(.08),P(g.x,n.y+pn/2,{n:34,color:[r.p200,r.p300,r.y200],speed:900,life:.9,size:11,shape:F.Shard,g:1.2,drag:.8,spin:20,jitter:Math.min(160,n.hw*1.5)}),en(g.x,n.y,260,.45,10,r.p200,.3),yn(b("smash"),g.x,n.y-60,64,r.y400,1),S.shatter()}function Ma(n){f.time+=n;const t=f.level;for(const l of t.pads)l.amp&&(l.x=l.baseX+Math.sin(f.time*l.spd+l.phase)*l.amp),l.dipV+=(-l.dip*340-l.dipV*13)*n,l.dip+=l.dipV*n,l.flash=Math.max(0,l.flash-n*4);const e=g;if(e.chargeFlash=Math.max(0,e.chargeFlash-n*3),e.happy=Math.max(0,e.happy-n),e.ouch=Math.max(0,e.ouch-n),(e.blinkT-=n)<=0&&(e.blink=.12,e.blinkT=1.8+Math.random()*3),e.blink=Math.max(0,e.blink-n),e.state==="win"||e.state==="fail"){const l=e.restPad;l&&(e.y=l.y+Math.max(0,l.dip)*.25-p.radius,l.amp&&(e.x+=Math.cos(f.time*l.spd+l.phase)*l.amp*l.spd*n)),e.vx=0,e.vy=0,e.trailN=0;const d=e.state==="win"?Math.sin(f.time*7)*.07:.12+Math.sin(f.time*2)*.02;e.sqV+=((d-e.sq)*300-e.sqV*12)*n,e.sq+=e.sqV*n,gn(n);return}if(e.state==="dead"){gn(n);return}const a=es();e.lock-=n,a&&f.playing&&e.state==="air"&&e.lock<=0&&(f.slams>0?ya():pa()),f.n<=2&&f.playing&&e.state==="air"&&(f.tutIdle+=n);const o=p.radius;if(e.state==="slide"){const l=e.restPad;l.amp&&(e.x+=Math.cos(f.time*l.spd+l.phase)*l.amp*l.spd*n),e.x+=e.dir*p.iceSlide*n,e.y=l.y-o,e.vy=0,e.x<L+o?(e.x=L+o,e.dir=1,hn(-1)):e.x>E-o&&(e.x=E-o,e.dir=-1,hn(1)),Math.abs(e.x-l.x)>l.hw+o*.55&&(e.state="air",e.restPad=null,e.topY=e.y,e.lock=0),z.budget>=.5&&Math.random()<.5&&P(e.x-e.dir*20,l.y,{n:1,color:r.g200,speed:60,life:.3,size:4,g:-.1,drag:3}),je(n,-.1),gn(n);return}if(e.state==="dive")e.vx=0,e.hang>0?(e.hang-=n,e.vy=0,e.hang<=0&&(e.vy=p.diveStartSpeed)):(e.vy=Math.min(p.diveMax,e.vy+p.diveAccel*n),!e.charged&&e.y-e.topY>=p.perfectDrop&&ba());else{let l=p.gravity;Math.abs(e.vy)<p.apexBand&&(l*=p.apexGravityMul),e.vy=Math.min(2300,e.vy+l*n),e.vx=f.started?e.dir*p.drift:0}const i=e.x,c=e.y;e.x+=e.vx*n,e.y+=e.vy*n,e.y<e.topY&&(e.topY=e.y),e.x<L+o?(e.x=L+o,e.dir=1,hn(-1)):e.x>E-o&&(e.x=E-o,e.dir=-1,hn(1));for(const l of t.pads){if(!us(l.kind)||!l.alive)continue;const d=l.x-l.hw,m=l.x+l.hw,h=l.y,D=l.y+pn;e.y+o*.6>h&&e.y-o*.6<D&&(i+o<=d+1&&e.x+o>d?(e.x=d-o,e.dir=-1,hn(1)):i-o>=m-1&&e.x-o<m&&(e.x=m+o,e.dir=1,hn(-1))),e.vy<0&&c-o>=D&&e.y-o<D&&Math.abs(e.x-l.x)<=l.hw+o*.55&&(l.kind==="glass"&&e.powered?yt(l):(e.y=D+o,e.vy=380,e.topY=e.y,e.ouch=.5,e.sq=-.35,e.sqV=0,l.flash=.6,ln(.2),P(e.x,D,{n:6,color:[r.p200,r.p300],speed:260,life:.5,size:6,shape:l.kind==="glass"?F.Shard:F.Dot,angle:Math.PI/2,spread:2,g:1}),l.kind==="glass"?S.bonk():S.clang(!1)))}if(e.vy>0){const l=c+o,d=e.y+o;let m=null;for(const h of t.pads){if(!h.alive)continue;const D=h.kind==="spike"?h.y-16:h.y;l<=D+2&&d>=D&&Math.abs(e.x-h.x)<=h.hw+o*.55&&(!m||D<m.y)&&(m=h)}m&&Sa(m)}if(!f.playing){gn(n);return}for(const l of t.pads)if(!(l.kind!=="spike"||e.vy<=0)&&Math.abs(e.x-l.x)<l.hw+o*.4&&e.y+o>l.y-14&&e.y-o<l.y+30){Dt();break}if(e.y>t.bottom+500&&Se("void"),!f.playing){gn(n);return}for(const l of t.coins){if(l.taken)continue;const d=e.x-l.x,m=e.y-l.y,h=d*d+m*m;if(h<p.magnet*p.magnet){const D=Math.min(1,14*n);l.x+=d*D,l.y+=m*D}h<(o+22)**2&&(l.taken=!0,wa(l.x,l.y))}e.powered&&z.budget>=.5&&P(e.x,e.y+10,{n:2,color:[r.y500,r.y300,r.y600],speed:90,life:.35,size:11,g:-.25,drag:4,jitter:30}),e.state==="dive"&&e.hang<=0||e.powered?(e.trailX.copyWithin(1,0),e.trailY.copyWithin(1,0),e.trailX[0]=e.x,e.trailY[0]=e.y,e.trailN=Math.min(e.trailX.length,e.trailN+1)):e.trailN>0&&e.trailN--;const u=Math.abs(e.vy);je(n,e.state==="dive"&&e.hang<=0?-Math.min(.42,u/p.diveMax*.5):-Math.min(.24,u/2400*.3)),f.maxHeight=Math.max(f.maxHeight,-e.y),gn(n)}function je(n,t){g.sqV+=((t-g.sq)*430-g.sqV*15)*n,g.sq+=g.sqV*n}function wa(n,t){f.coinStreak=f.time-f.lastCoinT<.6?Math.min(f.coinStreak+1,12):0,f.lastCoinT=f.time,f.levelCoins++,f.totalCoins++,S.coin(f.coinStreak),P(n,t,{n:6,color:[r.y300,r.y200],speed:200,life:.3,size:4,shape:F.Spark,g:0}),en(n,t,34,.2,4,r.y300,1),ma(n,t)}function hn(n){const t=g;t.sq=-.22,t.sqV=0,t.state!=="dive"&&(S.wall(),P(n<0?L:E,t.y,{n:5,color:r.p400,speed:160,life:.3,size:5,angle:n<0?0:Math.PI,spread:1.4,g:.2,drag:4}))}function gn(n){const t=g,e=t.vy>300?.45:.58,a=G.bottom-G.top,o=t.y-(G.top+a*e),i=1-Math.exp(-n*(t.vy>1200?9:6));f.camY+=(o-f.camY)*i;const c=-(G.bottom-170);f.camY>c&&(f.camY=c)}const y=Math.PI*2;let s;function _a(n){s=n}function M(n,t,e,a,o){o=Math.min(o,e/2,a/2),s.beginPath(),s.moveTo(n+o,t),s.arcTo(n+e,t,n+e,t+a,o),s.arcTo(n+e,t+a,n,t+a,o),s.arcTo(n,t+a,n,t,o),s.arcTo(n,t,n+e,t,o),s.closePath()}const Un=n=>Math.max(0,Math.min(1,n)),X=r.p800,Qe=Array.from({length:16},(n,t)=>({x:t*.6180339%1*1.6-.3,y:(t*.3819+.13)%1,s:.6+t*.737%1*.9}));function Pa(n){const t=f.level,e=G,a=e.scale;s.setTransform(1,0,0,1,0,0),s.fillStyle=r.p700,s.fillRect(0,0,e.pxW,e.pxH),s.setTransform(a,0,0,a,e.ox,e.oy),Ta(n);const o=1+A.zoom,i=e.ox+g.x*a,c=e.oy+(g.y-f.camY)*a;s.setTransform(1,0,0,1,0,0),s.translate(i,c),s.scale(o,o),s.rotate(O.rot),s.translate(-i,-c),s.translate(e.ox+O.x*a,e.oy+O.y*a),s.scale(a,a),s.translate(0,-f.camY+A.kick);const u=f.camY+e.top-200,l=f.camY+e.bottom+200;Ra(u,l),Ca(u,l);for(const d of t.pads)d.y>u-300&&d.y<l&&Aa(d,n);for(const d of t.coins)!d.taken&&d.y>u&&d.y<l&&Oa(d.x,d.y,n+d.bob);Do(s),Wa(),ho(s),g.state!=="dead"&&Ya(n),bo(s),vo(s),s.setTransform(a,0,0,a,e.ox,e.oy),Va(n),Ua(n),s.setTransform(1,0,0,1,0,0),ja(t,n),Qa()}function Ta(n){const a=(-f.camY*.25%1700+1700)%1700,o=G.right-G.left;for(let i=-1;i<=1;i++)for(let c=0;c<Qe.length;c++){const u=Qe[c],l=G.left+u.x*o,d=u.y*1700+a+i*1700-200;if(!(d<G.top-120||d>G.bottom+120))if(c%3===0){const m=.55+.45*Math.sin(n*2+u.x*20);s.fillStyle=r.p400,s.save(),s.translate(l,d),s.scale(m,m),Re(s,6*u.s,2.5*u.s),s.fill(),s.restore()}else{const m=30*u.s;s.fillStyle=r.p600,s.beginPath(),s.arc(l,d,m,0,y),s.arc(l+m*1.1,d+m*.25,m*.8,0,y),s.arc(l-m*1.05,d+m*.3,m*.7,0,y),s.fill()}}}function Ra(n,t){s.fillStyle=r.p500,s.fillRect(L-120,n,120,t-n),s.fillRect(E,n,120,t-n),s.strokeStyle=r.p600,s.lineWidth=4,s.beginPath();const o=Math.floor(n/44),i=Math.ceil(t/44);for(let c=o;c<=i;c++){const u=c*44;s.moveTo(L-120,u),s.lineTo(L,u),s.moveTo(E,u),s.lineTo(E+120,u);const l=c&1?0:30;for(let d=L-120+l;d<L;d+=60)s.moveTo(d,u),s.lineTo(d,u+44);for(let d=E+l;d<E+120;d+=60)s.moveTo(d,u),s.lineTo(d,u+44)}s.stroke(),s.fillStyle=r.p400,s.fillRect(L-6,n,6,t-n),s.fillRect(E,n,6,t-n),s.fillStyle=X,s.fillRect(L,n,8,t-n),s.fillRect(E-8,n,8,t-n)}function Ca(n,t){s.font="800 20px system-ui, sans-serif",s.textAlign="left",s.textBaseline="middle",s.fillStyle=r.p400;for(let e=Math.ceil(-t/500)*500;e<=-n;e+=500)e<=0||(s.fillRect(L+8,-e-2,16,4),s.fillText(`${e/50}m`,L+30,-e))}function Aa(n,t){switch(n.kind){case"drum":Ae(n,[r.g500,r.g700,r.g300,r.g200],40);break;case"switch":$a(n);break;case"goal":La(n,t);break;case"spring":qa(n);break;case"rubber":Ea(n);break;case"spike":Ha(n);break;case"stone":Fa(n);break;case"steel":Je(n,!1);break;case"gate":Je(n,!0);break;case"glass":Ia(n,t);break;case"ice":za(n,t);break}}function Ae(n,t,e){const[a,o,i,c]=t,u=Math.max(0,n.dip)*.25,l=n.x,d=n.y+u,m=n.hw,h=Math.min(14,m*.12);s.fillStyle=X,s.beginPath(),s.ellipse(l+8,d+e+10,m,h,0,0,y),s.fill(),s.fillStyle=a,s.fillRect(l-m,d,m*2,e),s.fillStyle=o,s.beginPath(),s.ellipse(l,d+e,m,h,0,0,y),s.fill(),s.fillRect(l-m,d+e-9,m*2,9),s.strokeStyle=o,s.lineWidth=3.5,s.lineJoin="round",s.beginPath();const D=Math.max(2,Math.round(m/22));for(let v=0;v<=D;v++){const R=l-m+v/D*m*2,q=v%2?d+e-11:d+9;v?s.lineTo(R,q):s.moveTo(R,q)}if(s.stroke(),s.fillStyle=n.flash>.5?c:i,s.beginPath(),s.ellipse(l,d,m,h,0,0,y),s.fill(),n.dip>.5){const v=Un(n.dip/30);s.fillStyle=a,s.beginPath(),s.ellipse(l,d+2,m*(.35+.5*v),h*.6*(.4+v),0,0,y),s.fill()}for(const v of n.decals)s.fillStyle=v.color,s.beginPath(),s.ellipse(l+v.dx,d,v.r,Math.min(h*.9,v.r*.35),0,0,y),s.fill();s.strokeStyle=c,s.lineWidth=6,s.beginPath(),s.ellipse(l,d,m,h,0,0,y),s.stroke()}function $a(n){Ae(n,[r.g600,r.g800,r.g400,r.g300],30);const t=n.x,e=n.y+Math.max(0,n.dip)*.25,a=n.pressed?5:16,o=Math.min(n.hw*.7,40);s.fillStyle=r.y700,M(t-o,e-a-4,o*2,a+6,8),s.fill(),s.fillStyle=r.y500,M(t-o,e-a-6,o*2,a,8),s.fill(),s.fillStyle=r.y300,M(t-o+6,e-a-4,o*2-12,4,2),s.fill()}function La(n,t){const e=n.x,a=n.y,o=n.hw;s.strokeStyle=r.y300,s.lineWidth=10,s.lineCap="round",s.beginPath(),s.moveTo(e-o+10,a),s.lineTo(e-o+10,a-200),s.moveTo(e+o-10,a),s.lineTo(e+o-10,a-200),s.stroke();const i=o*2-20,c=Math.max(6,Math.round(i/24)),u=20;for(let l=0;l<2;l++)for(let d=0;d<c;d++)s.fillStyle=(l+d)%2?r.p900:r.y400,s.fillRect(e-o+10+d*i/c,a-220+l*u+Math.sin(t*3+d*.5)*4,i/c+1,u);Ae(n,[r.y500,r.y700,r.y300,r.y200],50),s.fillStyle=r.y300;for(let l=0;l<5;l++){const d=t*.8+l*y/5,m=e+Math.cos(d)*(o+24),h=a-100+Math.sin(d*1.3)*70,D=.4+.6*Math.abs(Math.sin(t*5+l));s.save(),s.translate(m,h),s.scale(D,D),Re(s,11,5),s.fill(),s.restore()}}function qa(n){const t=n.x,e=n.hw,a=Math.max(-14,Math.min(34,n.dip*.9)),o=n.y+56,i=n.y+a;s.fillStyle=X,s.beginPath(),s.ellipse(t+8,o+16,e*.8,10,0,0,y),s.fill(),s.fillStyle=r.p900,M(t-e*.75,o,e*1.5,16,8),s.fill(),s.strokeStyle=r.p300,s.lineWidth=7,s.lineJoin="round",s.beginPath();const c=5,u=e*.55;for(let l=0;l<=c*2;l++){const d=o-(o-i-8)*l/(c*2),m=t+(l%2?u:-u);l?s.lineTo(m,d):s.moveTo(t-u,o)}s.stroke(),s.fillStyle=r.g700,M(t-e,i-4,e*2,14,7),s.fill(),s.fillStyle=n.flash>.5?r.g300:r.g500,M(t-e,i-8,e*2,12,6),s.fill(),s.fillStyle=r.g300,M(t-e+8,i-6,e*2-16,4,2),s.fill()}function Ea(n){const t=Math.max(-.3,Math.min(.6,n.dip/40)),e=n.x,a=n.y+Math.max(0,n.dip)*.4,o=n.hw*(1+t*.08),i=30*(1-t*.3);s.fillStyle=X,M(e-o+8,a+8,o*2,i,i/2),s.fill(),s.fillStyle=r.g600,M(e-o,a,o*2,i,i/2),s.fill(),s.fillStyle=n.flash>.5?r.g200:r.g400,M(e-o,a,o*2,i*.62,i/2),s.fill(),s.fillStyle=r.g200;const c=Math.max(2,Math.floor(o/24));for(let u=0;u<c;u++){const l=e-o+(u+.5)*o*2/c;s.beginPath(),s.arc(l,a+i*.32,4,0,y),s.fill()}}function Fa(n){const t=n.x,e=n.y,a=n.hw,o=30;s.fillStyle=X,M(t-a+8,e+8,a*2,o,9),s.fill(),s.fillStyle=r.p600,M(t-a,e,a*2,o,9),s.fill(),s.fillStyle=n.flash>.5?r.p300:r.p500,M(t-a,e,a*2,11,6),s.fill(),s.fillStyle=r.p800,s.beginPath();const i=Math.max(1,Math.floor(a/60));for(let c=0;c<i;c++){const u=t-a+(c+.5)*a*2/i+(c*37+Math.round(t))%24-12;s.moveTo(u+5,e+20),s.arc(u,e+20,5,0,y),s.moveTo(u+17,e+24),s.arc(u+14,e+24,3,0,y)}s.fill()}function Je(n,t){const e=t?n.fade:1;if(e<=.01)return;const a=n.x,o=pn*e,i=n.y+(pn-o)/2,c=n.hw;if(s.fillStyle=X,s.fillRect(a-c+6,i+6,c*2,o),s.fillStyle=r.p900,s.fillRect(a-c,i,c*2,o),s.fillStyle=n.flash>.5?r.p200:r.p300,s.fillRect(a-c+3,i+3,c*2-6,Math.max(0,o-6)),s.fillStyle=r.p200,s.fillRect(a-c+3,i+3,c*2-6,Math.min(5,Math.max(0,o-6))),t){s.save(),s.beginPath(),s.rect(a-c+3,i+3,c*2-6,Math.max(0,o-6)),s.clip(),s.fillStyle=r.y500;for(let u=a-c-o;u<a+c;u+=28)s.beginPath(),s.moveTo(u,i+o),s.lineTo(u+12,i+o),s.lineTo(u+12+o,i),s.lineTo(u+o,i),s.fill();s.restore()}else{s.fillStyle=r.p600;for(let u=a-c+12;u<a+c-6;u+=40)s.beginPath(),s.arc(u,i+o/2,3,0,y),s.fill()}}function Ia(n,t){if(!n.alive)return;const e=n.x,a=n.y,o=n.hw,i=pn;s.fillStyle=r.p600,s.fillRect(e-o,a,o*2,i),s.fillStyle=r.p200,s.fillRect(e-o,a,o*2,4),s.fillRect(e-o,a+i-3,o*2,3),s.fillStyle=r.p300;for(let c=e-o+20+t*40%90;c<e+o-24;c+=90)s.beginPath(),s.moveTo(c,a+i),s.lineTo(c+14,a),s.lineTo(c+22,a),s.lineTo(c+8,a+i),s.fill();if(o>=45){const c=1+Math.sin(t*6)*.1;s.save(),s.translate(e,a+i/2),s.scale(c,c),s.fillStyle=r.p900,s.beginPath(),s.arc(0,0,17,0,y),s.fill(),Ba(0,3,11),s.restore()}}function Ba(n,t,e){s.fillStyle=r.y500,s.beginPath(),s.moveTo(n,t-e*1.3),s.quadraticCurveTo(n+e,t-e*.2,n+e*.7,t+e*.3),s.arc(n,t+e*.2,e*.7,0,Math.PI),s.quadraticCurveTo(n-e,t-e*.2,n,t-e*1.3),s.fill(),s.fillStyle=r.y200,s.beginPath(),s.arc(n,t+e*.25,e*.38,0,y),s.fill()}function za(n,t){const e=n.x,a=n.y,o=n.hw,i=22;s.fillStyle=X,M(e-o+6,a+6,o*2,i,6),s.fill(),s.fillStyle=r.g400,M(e-o,a,o*2,i,6),s.fill(),s.fillStyle=n.flash>.5?r.g200:r.g300,M(e-o,a,o*2,i-7,6),s.fill(),s.fillStyle=r.g200;for(let c=e-o+14+t*60%70;c<e+o-24;c+=70)s.fillRect(c,a+4,22,3),s.fillRect(c+8,a+10,10,2);s.fillStyle=r.g700;for(let c=e-o+30;c<e+o-20;c+=60)s.beginPath(),s.moveTo(c,a+13),s.lineTo(c+8,a+16),s.lineTo(c,a+19),s.fill(),s.beginPath(),s.moveTo(c-4,a+13),s.lineTo(c-12,a+16),s.lineTo(c-4,a+19),s.fill()}function Ha(n){const t=n.x,e=n.y,a=n.hw;s.fillStyle=X,s.beginPath(),s.ellipse(t+8,e+34,a,9,0,0,y),s.fill(),s.fillStyle=r.p950,M(t-a,e,a*2,26,7),s.fill();const o=Math.max(2,Math.round(a*2/26)),i=a*2/o;for(let c=0;c<o;c++){const u=t-a+c*i;s.fillStyle=r.p300,s.beginPath(),s.moveTo(u,e+2),s.lineTo(u+i/2,e-24),s.lineTo(u+i,e+2),s.closePath(),s.fill(),s.fillStyle=r.p200,s.beginPath(),s.moveTo(u+i/2-3,e-14),s.lineTo(u+i/2,e-24),s.lineTo(u+i/2+3,e-14),s.closePath(),s.fill()}}function Oa(n,t,e){const a=.25+.75*Math.abs(Math.cos(e*3));s.save(),s.translate(n,t+Math.sin(e*2.5)*4),s.scale(a,1),s.fillStyle=r.y700,s.beginPath(),s.arc(0,2,16,0,y),s.fill(),s.fillStyle=r.y500,s.beginPath(),s.arc(0,0,16,0,y),s.fill(),s.fillStyle=r.y300,s.beginPath(),s.arc(0,0,9,0,y),s.fill(),s.restore()}function Wa(){const n=g,t=n.trailN;if(!(!t||!z.trails)){s.fillStyle=n.powered?r.y400:f.style.trail;for(let e=t-1;e>=2;e-=2){const a=1-e/n.trailX.length;s.beginPath(),s.arc(n.trailX[e],n.trailY[e],p.radius*.75*a,0,y),s.fill()}}}function Ya(n){const t=g,e=p.radius,a=Math.max(-.5,Math.min(.9,t.sq)),o=(1+a)*t.spawn,i=1/(1+a)*t.spawn,c=a>0?e*(1-1/(1+a)):0;s.save(),s.translate(t.x,t.y+c);const u=t.state==="dive";t.powered&&(s.fillStyle=r.y700,s.beginPath(),s.arc(0,0,e+14+Math.sin(n*25)*3,0,y),s.fill()),(t.powered||u&&t.charged)&&(s.strokeStyle=r.y300,s.lineWidth=4,s.beginPath(),s.arc(0,0,e+9+Math.sin(n*30)*3,0,y),s.stroke()),t.chargeFlash>0&&(s.strokeStyle=r.y300,s.lineWidth=5*t.chargeFlash+.5,s.beginPath(),s.arc(0,0,e+50*(1-t.chargeFlash),0,y),s.stroke()),s.scale(o,i),s.fillStyle=r.y700,s.beginPath(),s.arc(0,0,e,0,y),s.fill(),s.fillStyle=u&&t.charged?r.y400:r.y500,s.beginPath(),s.arc(-2.5,-3.5,e-3.5,0,y),s.fill(),s.fillStyle=r.y200,s.beginPath(),s.ellipse(-11,-14,8,5,-.6,0,y),s.fill();const l=Math.max(-1,Math.min(1,t.vx/400))*4,d=Math.max(-1,Math.min(1,t.vy/1400))*4;s.fillStyle=r.p950,s.strokeStyle=r.p950,s.lineCap="round",s.lineWidth=3.5;const m=10,h=-3+d*.6;t.happy>0||t.state==="win"?(s.beginPath(),s.arc(-m+l,h+2,6,Math.PI*1.1,Math.PI*1.9),s.stroke(),s.beginPath(),s.arc(m+l,h+2,6,Math.PI*1.1,Math.PI*1.9),s.stroke(),s.beginPath(),s.arc(l,10,8,.1,Math.PI-.1),s.fill()):t.sad>0||t.state==="fail"?(s.beginPath(),s.arc(-m,h+4,5,Math.PI*.1,Math.PI*.9),s.stroke(),s.beginPath(),s.arc(m,h+4,5,Math.PI*.1,Math.PI*.9),s.stroke(),s.beginPath(),s.arc(0,18,6,Math.PI*1.15,Math.PI*1.85),s.stroke()):t.ouch>0?(s.beginPath(),s.moveTo(-m-5,h-5),s.lineTo(-m+3,h),s.lineTo(-m-5,h+5),s.moveTo(m+5,h-5),s.lineTo(m-3,h),s.lineTo(m+5,h+5),s.stroke(),s.beginPath(),s.ellipse(0,12,5,4,0,0,y),s.fill()):u?(s.beginPath(),s.ellipse(-m,h+2,5,4,0,0,y),s.ellipse(m,h+2,5,4,0,0,y),s.fill(),s.lineWidth=4,s.beginPath(),s.moveTo(-m-8,h-9),s.lineTo(-m+5,h-4),s.moveTo(m+8,h-9),s.lineTo(m-5,h-4),s.stroke(),s.lineWidth=3,s.beginPath(),s.moveTo(-7,13),s.lineTo(7,13),s.stroke()):(t.blink>0?(s.beginPath(),s.moveTo(-m-5,h),s.lineTo(-m+5,h),s.moveTo(m-5,h),s.lineTo(m+5,h),s.stroke()):(s.fillStyle=r.y200,s.beginPath(),s.ellipse(-m,h,7,9,0,0,y),s.ellipse(m,h,7,9,0,0,y),s.fill(),s.fillStyle=r.p950,s.beginPath(),s.ellipse(-m+l,h+d,4,5.5,0,0,y),s.ellipse(m+l,h+d,4,5.5,0,0,y),s.fill(),s.fillStyle=r.y200,s.beginPath(),s.arc(-m+l-1.5,h+d-2,1.6,0,y),s.arc(m+l-1.5,h+d-2,1.6,0,y),s.fill()),s.fillStyle=r.p950,t.vy<-1300?(s.beginPath(),s.ellipse(l*.5,13,5,6,0,0,y),s.fill()):(s.beginPath(),s.arc(l*.5,9,6,.25,Math.PI-.25),s.stroke())),s.fillStyle=r.y600,s.beginPath(),s.ellipse(-19,8,5,3,0,0,y),s.ellipse(19,8,5,3,0,0,y),s.fill(),s.restore()}function Va(n){const t=g;if(t.state!=="dive"||t.vy<900||z.reduceMotion)return;const e=Un((t.vy-900)/1700),a=G.bottom-G.top+300;s.strokeStyle=r.p400,s.lineWidth=1+3*e,s.lineCap="round",s.beginPath();for(let o=0;o<16;o++){const i=o*.618%1,c=G.left+20+i*(G.right-G.left-40);if(Math.abs(c-t.x)<70)continue;const u=G.bottom+150-(n*2600+o*397)%a;s.moveTo(c,u),s.lineTo(c,u+(60+o%3*35)*(.5+e))}s.stroke()}function Na(n,t,e){s.fillStyle=r.g700,M(n-9*e+3,t-34*e+4,18*e,40*e,9*e),s.fill(),M(n-24*e+3,t-4*e+4,48*e,36*e,14*e),s.fill(),s.fillStyle=r.g300,M(n-9*e,t-34*e,18*e,40*e,9*e),s.fill(),M(n-24*e,t-4*e,48*e,36*e,14*e),s.fill(),s.strokeStyle=r.g700,s.lineWidth=3*e,s.beginPath(),s.moveTo(n-4*e,t+6*e),s.lineTo(n-4*e,t+16*e),s.moveTo(n+8*e,t+6*e),s.lineTo(n+8*e,t+16*e),s.stroke()}function Ua(n){if(!f.playing||g.state!=="air"||f.n>2)return;const t=f.tutGood<3&&Math.abs(g.vy)<420;if(!t&&f.tutIdle<3)return;if(t){const l=1-Math.abs(g.vy)/420;s.strokeStyle=r.y300,s.lineWidth=2+4*l,s.beginPath(),s.arc(g.x,g.y-f.camY,p.radius+14+(1-l)*30,0,y),s.stroke()}const e=n*1.6%1,a=e<.25,o=g.y-f.camY,i=g.x<360?g.x+150:g.x-130,c=Math.min(G.bottom-120,o+40);a&&(s.strokeStyle=r.y300,s.lineWidth=5*(1-e*4)+.5,s.beginPath(),s.arc(i,c-34,18+e*4*40,0,y),s.stroke()),Na(i,c+(a?0:14),1);const u=g.y-f.camY+70+n*2%1*20;s.strokeStyle=r.g300,s.lineWidth=7,s.lineCap="round",s.lineJoin="round";for(let l=0;l<2;l++)s.beginPath(),s.moveTo(g.x-18,u+l*22),s.lineTo(g.x,u+16+l*22),s.lineTo(g.x+18,u+l*22),s.stroke()}function Ka(){return Math.max(.85,Math.min(1.35,Math.min(G.cssW,G.cssH)/420))}function $e(){const n=Ka();return{u:n,pause:{x:14+26*n,y:14+26*n,r:26*n},restart:{x:14+26*n+62*n,y:14+26*n,r:26*n},coin:{x:G.cssW-30*n,y:14+26*n}}}function Ze(n,t,e,a){if(a){s.fillStyle=r.p800,s.beginPath(),s.arc(n,t,e,0,y),s.fill(),s.strokeStyle=r.p500,s.lineWidth=2.5,s.stroke();return}s.fillStyle=r.y700,s.beginPath(),s.arc(n,t,e,0,y),s.fill(),s.fillStyle=r.y500,s.beginPath(),s.arc(n-e*.1,t-e*.12,e*.85,0,y),s.fill(),s.fillStyle=r.p950,s.beginPath(),s.arc(n-e*.32,t-e*.1,e*.14,0,y),s.arc(n+e*.32,t-e*.1,e*.14,0,y),s.fill()}function nt(n,t,e,a){s.fillStyle=r.g800,s.beginPath(),s.arc(n,t+4*a,e,0,y),s.fill(),s.fillStyle=r.g500,s.beginPath(),s.arc(n,t,e,0,y),s.fill()}function Xa(n,t,e){s.strokeStyle=r.p900,s.lineWidth=4.5*e,s.lineCap="round",s.beginPath(),s.arc(n,t,10*e,-Math.PI*.35,Math.PI*1.35),s.stroke();const a=n+Math.cos(-Math.PI*.35)*10*e,o=t+Math.sin(-Math.PI*.35)*10*e;s.fillStyle=r.p900,s.beginPath(),s.moveTo(a+6*e,o-1*e),s.lineTo(a-3*e,o-7*e),s.lineTo(a-2*e,o+5*e),s.closePath(),s.fill()}function ja(n,t){const e=G.dpr,a=$e(),o=a.u*e;f.hudBump=Math.max(0,f.hudBump-.06),s.textBaseline="middle";const i=a.pause.x*e,c=a.pause.y*e,u=a.pause.r*e;nt(i,c,u,o),s.fillStyle=r.p900,M(i-9*o,c-10*o,6*o,20*o,2*o),s.fill(),M(i+3*o,c-10*o,6*o,20*o,2*o),s.fill();const l=a.restart.x*e,d=a.restart.y*e;nt(l,d,u,o),Xa(l,d,o);const m=l+u+10*o,h=c-18*o;s.fillStyle=r.p900,M(m,h,86*o,36*o,18*o),s.fill(),s.font=`900 ${20*o}px system-ui, sans-serif`,s.textAlign="center",s.fillStyle=r.g300,s.fillText(`${b("level")} ${n.n}`,m+43*o,h+19*o);const D=Math.max(n.slams,f.slams+f.slamsUsed),v=Math.sin(t*60)*6*o*f.emptyShake,R=h+60*o,q=10*o,oe=25*o,j=a.pause.x*e-u+q;if(D<=10)for(let Sn=0;Sn<D;Sn++){const Fn=f.slamFx.find(He=>He.i===Sn&&He.t>=0);let le=1;Fn&&(le=Fn.t<.15?1+Fn.t*4:Math.max(1,1.6-(Fn.t-.15)*2)),s.save(),s.translate(j+Sn*oe+v,R),s.scale(le,le),Ze(0,0,q,Sn>=f.slams),s.restore()}else Ze(j+v,R,q,!1),s.font=`900 ${22*o}px system-ui, sans-serif`,s.textAlign="left",s.fillStyle=r.y300,s.fillText(`× ${f.slams}`,j+16*o+v,R+1);const V=a.coin.x*e,ae=a.coin.y*e,ie=1+f.hudBump*.35;s.font=`900 ${26*o*ie}px system-ui, sans-serif`,s.textAlign="right";const Fe=String(f.hudCoins),Ie=s.measureText(Fe).width;s.fillStyle=r.p900,M(V-Ie-34*o,ae-18*o,Ie+56*o,36*o,18*o),s.fill(),s.fillStyle=r.y300,s.fillText(Fe,V-22*o,ae+1),s.save(),s.translate(V,ae),s.scale(ie,ie),s.fillStyle=r.y700,s.beginPath(),s.arc(0,2*o,13*o,0,y),s.fill(),s.fillStyle=r.y500,s.beginPath(),s.arc(0,0,13*o,0,y),s.fill(),s.fillStyle=r.y300,s.beginPath(),s.arc(0,0,7*o,0,y),s.fill(),s.restore();const En=G.pxW-16*o,rn=G.pxH*.3,cn=G.pxH*.7;s.fillStyle=r.p900,M(En-5*o,rn,10*o,cn-rn,5*o),s.fill();const Be=Math.max(1,-n.goalY),_t=Un(-g.y/Be),ze=Un(f.maxHeight/Be);s.fillStyle=r.p500,M(En-5*o,cn-(cn-rn)*ze,10*o,(cn-rn)*ze,5*o),s.fill(),s.fillStyle=r.y500,s.fillRect(En-9*o,rn-2*o,18*o,4*o),s.beginPath(),s.arc(En,cn-(cn-rn)*_t,8*o,0,y),s.fill()}function Qa(){const n=G.dpr,t=$e(),e=t.coin.x*n,a=t.coin.y*n;for(const o of ne){if(!o.alive||o.delay>0)continue;const i=H.inCubic(Math.min(1,o.t)),c=1-i,u=o.sx*n,l=o.sy*n,d=(u+e)/2+o.cx*n,m=Math.min(l,a)+o.cy*n,h=c*c*u+2*c*i*d+i*i*e,D=c*c*l+2*c*i*m+i*i*a,v=12*t.u*n*(1-.3*i);s.fillStyle=r.y700,s.beginPath(),s.arc(h,D+2,v,0,y),s.fill(),s.fillStyle=r.y500,s.beginPath(),s.arc(h,D,v,0,y),s.fill()}}const Ja=document.getElementById("ui");let tn=null,K=null,bn=null,pt=-1;const Le=()=>tn!==null;window.addEventListener("keydown",n=>{!tn||n.timeStamp<=pt||((n.code==="Enter"||n.code==="Space")&&K?(n.preventDefault(),K()):(n.code==="Escape"||n.code==="KeyP")&&bn&&(n.preventDefault(),bn()))});function Ln(n){qn(!0);const t=document.createElement("div");return t.className="overlay",t.innerHTML=`<div class="panel">${n}</div>`,Ja.appendChild(t),requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add("show"))),tn=t,pt=window.event?.timeStamp??performance.now(),t}function qn(n=!1){const t=tn;tn=null,K=null,bn=null,t&&(t.style.pointerEvents="none",t.classList.remove("show"),n?t.remove():setTimeout(()=>t.remove(),130))}function I(n,t,e){const a=n.querySelector(t);a&&a.addEventListener("click",()=>{a.disabled||tn!==n.closest(".overlay")||(S.click(),e())})}const ve='<span class="cdot"></span>',qe='<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="5" width="15" height="14" rx="3"/><path d="M17 10.5 23 7v10l-6-3.5z"/></svg>',Za='<span class="sdot"></span>';function ni(){const n=Nn.filter(e=>!_.owned.includes(e.id)).sort((e,a)=>e.cost-a.cost)[0];if(!n)return{label:b("allOwned"),pct:100,ready:!1};const t=f.totalCoins;return t>=n.cost?{label:`${b("ready")} ${n.name}`,pct:100,ready:!0}:{label:`${b("nextStyle")}: ${n.name} ${t}/${n.cost}`,pct:t/n.cost*100,ready:!1}}function ei(n){const t=Math.max(n.maxLeft,n.slamsLeft,n.s3,1),e=D=>`${Math.min(100,(D+1)/(t+1)*100)}%`,a=Ln(`
    <h1>${b("complete")}</h1>
    <div class="scorebar">
      <div class="sb-stars">
        <span class="s on pop" style="left:0%">★</span>
        <span class="s" id="st2" style="left:${e(n.s2)}">★</span>
        <span class="s" id="st3" style="left:${e(n.s3)}">★</span>
      </div>
      <div class="sb-track"><div class="sb-fill" id="sbf"></div>
        <i class="notch" style="left:${e(n.s2)}"></i><i class="notch" style="left:${e(n.s3)}"></i></div>
      <div class="sb-line"><span>${ve} <b id="rc">0</b>/${n.levelCoins}</span><span id="rs">${n.slamsLeft?`${Za.repeat(Math.min(n.slamsLeft,8))}`:""}</span><span>${b("slamsLeft")} <b id="rt">0</b></span></div>
    </div>
    <div class="progress"><div class="label" id="pl"></div><div class="track"><div class="fill" id="pf"></div></div></div>
    <div class="col">
      <button class="btn big breathe" id="next">${b("next")} →</button>
      <div class="row">
        ${n.canDouble?`<button class="btn ad" id="dbl">${qe} ${b("double")}</button>`:""}
        <button class="btn ghost" id="rty">↻</button>
        <button class="btn ghost" id="sty">${b("styles")}</button>
      </div>
    </div>`);K=n.onNext,I(a,"#next",n.onNext),I(a,"#rty",n.onRetry),I(a,"#sty",n.onStyles);const o=a.querySelector("#sbf"),i=a.querySelector("#rc"),c=a.querySelector("#rt");let u=1;const l=D=>{o.style.width=e(D),c.textContent=String(D),!n.continued&&(u<2&&D>=n.s2&&(u=2,a.querySelector("#st2")?.classList.add("on","pop"),S.starPop(1)),u<3&&D>=n.s3&&(u=3,a.querySelector("#st3")?.classList.add("on","pop"),S.starPop(2)))},d=Array.from(a.querySelectorAll("#rs .sdot"));setTimeout(()=>{l(0);for(let D=0;D<n.slamsLeft;D++)setTimeout(()=>{a.isConnected&&(d[Math.min(D,d.length-1)]?.classList.add("spent"),l(D+1),S.coin(D+4))},300*(D+1));setTimeout(m,300*(n.slamsLeft+1)+200)},350);const m=()=>{if(!a.isConnected)return;const D=performance.now(),v=Math.min(700,120+n.coins*60);let R=-1;const q=oe=>{const j=Math.min(1,(oe-D)/v),V=Math.round(n.coins*(1-(1-j)*(1-j)));V!==R&&(R=V,i.textContent=String(V),S.tick(V)),j<1&&a.isConnected?requestAnimationFrame(q):a.isConnected&&(n.coins>=n.levelCoins&&n.levelCoins>0&&i.parentElement.classList.add("full"),h())};requestAnimationFrame(q)},h=()=>{const D=ni(),v=a.querySelector("#pl");v&&(v.textContent=D.label,setTimeout(()=>{const R=a.querySelector("#pf");R&&(R.style.width=`${D.pct}%`)},60),a.querySelector("#sty")?.classList.toggle("breathe",D.ready))};n.canDouble&&(T.measure("rewarded","double","visible"),I(a,"#dbl",async()=>{T.measure("rewarded","double","interact");const D=a.querySelector("#dbl");D.disabled=!0,await T.rewardedBreak()?(f.totalCoins+=n.coins,f.hudCoins+=n.coins,N({coins:f.totalCoins}),D.textContent=b("doubled"),S.unlock(),i.textContent=String(n.coins*2),i.parentElement.animate([{transform:"scale(1)"},{transform:"scale(1.35)"},{transform:"scale(1)"}],{duration:450,easing:"cubic-bezier(.34,1.56,.64,1)"}),setTimeout(h,300)):D.remove()}))}function ti(n){const t=n.reason==="slams"?b("outOfSlams"):n.reason==="spike"?b("ouch"):b("fell"),e=Ln(`
    <h1>${t}</h1>
    <div class="col">
      <button class="btn big breathe" id="rty">↻ ${b("retry")}</button>
      ${n.canContinue?`<button class="btn ad" id="cnt">${qe} ${b("plusSlams")}</button>`:""}
    </div>`);K=n.onRetry,I(e,"#rty",n.onRetry),n.canContinue&&(T.measure("rewarded","slams","visible"),I(e,"#cnt",async()=>{T.measure("rewarded","slams","interact");const a=e.querySelector("#cnt");a.disabled=!0,await T.rewardedBreak()?n.onContinue():a.remove()}))}function si(n){const t=_,e=(o,i)=>`<button class="btn ghost" data-t="${o}">${b(o)}: ${b(i?"on":"off")}</button>`,a=Ln(`
    <h1>${b("paused")}</h1>
    <div class="col">
      <button class="btn big breathe" id="res">${b("resume")}</button>
      <div class="row"><button class="btn" id="rst">${b("restart")}</button><button class="btn" id="sty">${b("styles")}</button></div>
      <button class="btn" id="lvl">${b("levels")}</button>
    </div>
    <div class="toggles">${e("sound",t.sfx)}${e("music",t.music)}${e("motion",!t.reduceMotion)}</div>
    ${_e?"":`<div style="font-size:13px">${b("noSave")}</div>`}`);K=n.onResume,bn=n.onResume,I(a,"#res",n.onResume),I(a,"#rst",n.onRestart),I(a,"#sty",n.onStyles),I(a,"#lvl",n.onLevels),a.querySelectorAll("[data-t]").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.t;i==="sound"&&N({sfx:!_.sfx}),i==="music"&&N({music:!_.music}),i==="motion"&&N({reduceMotion:!_.reduceMotion});const c=i==="sound"?_.sfx:i==="music"?_.music:!_.reduceMotion;o.textContent=`${b(i)}: ${b(c?"on":"off")}`,n.onSettings(),S.click()})})}function bt(n,t,e){const a=Math.max(1,Math.min(Pe,_.level)),o=[];for(let c=1;c<=a;c++){const u=_.stars[String(c)]??0;o.push(`<button class="lv ${c===n?"cur":""}" data-n="${c}">
      <span class="num">${c}</span>
      <span class="ls">${[0,1,2].map(l=>`<i class="${l<u?"on":""}">★</i>`).join("")}</span>
    </button>`)}const i=Ln(`
    <h1>${b("levels")}</h1>
    <div class="levels scroll">${o.join("")}</div>
    <button class="btn big" id="back">${b("back")}</button>`);K=e,bn=e,I(i,"#back",e),i.querySelectorAll(".lv").forEach(c=>{c.addEventListener("click",()=>{tn===i&&(S.click(),t(Number(c.dataset.n)))})}),requestAnimationFrame(()=>i.querySelector(".lv.cur")?.scrollIntoView({block:"center"}))}function St(n){const t=()=>{const o=_;return`
      <h1>${b("styles")}</h1>
      <div class="coins">${ve} <b id="sc">${f.totalCoins}</b></div>
      <div class="grid">
        ${Nn.map(i=>{const c=o.owned.includes(i.id),u=o.style===i.id;return`<div class="tile ${c?"":"locked"} ${u?"eq":""}" data-id="${i.id}">
            <div class="dot" style="background:${i.trail}"></div>
            <div class="nm">${i.name}</div>
            <div class="pr">${u?b("equipped"):c?b("equip"):`${ve} ${i.cost}`}</div>
          </div>`}).join("")}
      </div>
      <button class="btn big" id="back">${b("back")}</button>`},e=Ln(t());K=n,bn=n;const a=()=>{I(e,"#back",n),e.querySelectorAll(".tile").forEach(o=>{o.addEventListener("click",()=>{const i=Ce(o.dataset.id),c=_;if(c.owned.includes(i.id))N({style:i.id}),f.style=i,S.click();else if(f.totalCoins>=i.cost)f.totalCoins-=i.cost,f.hudCoins-=i.cost,N({coins:f.totalCoins,owned:[...c.owned,i.id],style:i.id}),f.style=i,S.unlock(),T.measure("milestone",`style-${i.id}`,"reached"),oi(e,i.trail);else{S.bonk(),o.animate([{transform:"translateX(0)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],{duration:220});return}e.querySelector(".panel").innerHTML=t(),a()})})};a()}function oi(n,t){const e="http://www.w3.org/2000/svg",a=document.createElementNS(e,"svg");a.setAttribute("viewBox","-100 -100 200 200"),a.style.cssText="position:absolute;left:50%;top:50%;width:420px;height:420px;margin:-210px 0 0 -210px;pointer-events:none";const o=[];for(let u=0;u<24;u++){const l=u%2?40:100,d=u*Math.PI/12;o.push(`${Math.cos(d)*l},${Math.sin(d)*l}`)}const i=document.createElementNS(e,"polygon");i.setAttribute("points",o.join(" ")),i.setAttribute("fill","#FFD23F"),a.appendChild(i),n.appendChild(a);const c=document.createElement("div");c.style.cssText=`position:absolute;left:50%;top:50%;width:120px;height:120px;margin:-60px 0 0 -60px;border-radius:50%;background:${t};border:6px solid #3B1E6E;box-sizing:border-box;pointer-events:none`,n.appendChild(c),c.animate([{transform:"scale(0)"},{transform:"scale(1.25)"},{transform:"scale(1)",offset:.6},{transform:"scale(0)"}],{duration:1300,easing:"cubic-bezier(.34,1.56,.64,1)"}),a.animate([{transform:"scale(0) rotate(0deg)"},{transform:"scale(1) rotate(60deg)",offset:.3},{transform:"scale(1) rotate(150deg)",offset:.75},{transform:"scale(0) rotate(200deg)"}],{duration:1300}),setTimeout(()=>{a.remove(),c.remove()},1300)}const ee=document.getElementById("skip");ee.innerHTML=`${qe} ${b("skip")}`;let vt=null;ee.addEventListener("pointerdown",n=>n.stopPropagation());ee.addEventListener("click",()=>{S.click(),vt?.()});function Gn(n,t){ee.style.display=n?"block":"none",t&&(vt=t)}const ai=1/60,te=document.getElementById("c"),ii=te.getContext("2d",{alpha:!1});_a(ii);let sn=!1,Gt=!1,xt=!1,Kn=!1;function kt(){const n=_;zt(n.sfx),Ht(n.music),z.reduceMotion=n.reduceMotion}function pe(n){const t=document.getElementById("loadfill");t&&(t.style.width=`${Math.round(n*100)}%`)}function Xn(n,t=!1){const e=t&&n===f.n;ga(n,e),xt=!1,e||(Kn=!1),Gn(Kn&&e),T.measure("level",String(f.n),"start")}async function nn(n,t=!1){qn(),await T.commercialBreak(),Xn(n,t),se()}function Ee(){sn||Le()||(sn=!0,T.gameplayStop(),U(!1),Ge())}function Ge(){si({onResume:async()=>{qn(),await T.commercialBreak(),se()},onRestart:()=>nn(f.n,!0),onStyles:()=>St(Ge),onLevels:()=>bt(f.n,n=>nn(n),Ge),onSettings:kt})}function se(){sn=!1,U(!0),lt(),Gt&&T.gameplayStart()}$n.onWin=n=>{T.gameplayStop(),T.measure("level",String(f.n),"complete");const t=String(f.n);N({level:Math.max(_.level,f.n+1),coins:f.totalCoins,stars:{..._.stars,[t]:Math.max(_.stars[t]??0,n)}}),Gn(!1),U(!1),xe()};function xe(n){const t=f.level;ei({coins:f.levelCoins,levelCoins:t.coins.length,slamsLeft:f.continued?0:f.slams,continued:f.continued,s2:t.s2,s3:t.s3,maxLeft:Math.max(0,t.slams-t.minSlams),canDouble:!xt&&f.levelCoins>0,onNext:()=>f.n>=Pe?bt(f.n,e=>nn(e),()=>xe()):nn(f.n+1),onRetry:()=>nn(f.n,!0),onStyles:()=>St(()=>xe())})}$n.onFail=n=>{T.gameplayStop(),T.measure("level",String(f.n),"fail"),U(!1),f.attempts>=3&&li(),ti({reason:n,canContinue:n==="slams"&&!f.continued,onRetry:()=>nn(f.n,!0),onContinue:()=>{qn(),Da(3),se()}})};function li(){if(Kn){Gn(!0);return}Kn=!0,T.measure("rewarded","skip","visible"),Gn(!0,async()=>{T.measure("rewarded","skip","interact"),Gn(!1),qn(),sn=!0,U(!1),await T.rewardedBreak()?(N({level:Math.max(_.level,f.n+1),coins:f.totalCoins}),Xn(Math.min(Pe,f.n+1)),S.unlock()):f.playing||Xn(f.n,!0),se()})}ss(te);Zt(Ee);function Mt(){Le()||sn||(T.gameplayStop(),U(!1),nn(f.n,!0))}ns(Mt);Jt((n,t)=>{const e=$e(),a=n-e.pause.x,o=t-e.pause.y;if(a*a+o*o<(e.pause.r+10)**2)return S.click(),Ee(),!0;const i=n-e.restart.x,c=t-e.restart.y;return i*i+c*c<(e.restart.r+8)**2?(S.click(),Mt(),!0):!1});document.addEventListener("visibilitychange",()=>{document.hidden&&Ee()});function ri(n){z.budget=[.3,.6,1][n],z.trails=n>0,is([1,1.5,2][n]),dt(te)}let et=performance.now()/1e3;function wt(n){const t=n/1e3,e=Math.min(t-et,.1);if(et=t,rs(e,ri),!sn){xo(e);let a=e,o=0;for(;a>1e-6&&o++<8;){const i=Math.min(a,ai);Ma(i*_n),a-=i}ha(e)}Pa(t),requestAnimationFrame(wt)}async function ci(){pe(.15),os(),kt(),f.style=Ce(_.style),f.totalCoins=f.hudCoins=_.coins,await T.init({onAdStart:()=>{We(!0),U(!1)},onAdEnd:()=>{We(!1),U(!sn&&!Le())}}),pe(.7),ls(te),Xn(_.level),pe(1),T.loadingFinished(),Qt(()=>{Gt=!0,T.gameplayStart()});const n=document.getElementById("loading");n.classList.add("gone"),setTimeout(()=>n.remove(),260),requestAnimationFrame(wt)}ci();
