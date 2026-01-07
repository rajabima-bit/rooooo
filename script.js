// Halaman Navigation
const pages = document.querySelectorAll('.page');
document.querySelectorAll('.nextBtn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    let current = document.querySelector('.page.active');
    current.classList.remove('active');
    let next = current.nextElementSibling;
    if(next) next.classList.add('active');
  });
});

// Musik Latar
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', ()=>{
  if(music.paused){ music.play(); musicBtn.textContent='🎵 Pause Music'; }
  else { music.pause(); musicBtn.textContent='🎵 Play Music'; }
});

// Canvas Boneka + Bintang
const canvas = document.getElementById('bonekaCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400; canvas.height = 400;

const img1 = new Image(); img1.src='foto1.jpg';
const img2 = new Image(); img2.src='foto2.jpg';
const img3 = new Image(); img3.src='foto3.jpg';

// Stars
let stars=[];
for(let i=0;i<50;i++){
  stars.push({x:Math.random()*400, y:Math.random()*400, r:Math.random()*2+1, dx:(Math.random()-0.5)*2, dy:(Math.random()-0.5)*2});
}

function drawBoneka(){
  ctx.clearRect(0,0,400,400);
  const centerX=200, centerY=200, radius=50;

  // Foto Bundar
  ctx.save(); ctx.beginPath();
  ctx.arc(centerX,centerY-60,radius,0,Math.PI*2); ctx.clip();
  ctx.drawImage(img1, centerX-radius, centerY-60-radius, radius*2, radius*2);
  ctx.restore();

  ctx.save(); ctx.beginPath();
  ctx.arc(centerX-60,centerY+50,radius,0,Math.PI*2); ctx.clip();
  ctx.drawImage(img2, centerX-60-radius, centerY+50-radius, radius*2, radius*2);
  ctx.restore();

  ctx.save(); ctx.beginPath();
  ctx.arc(centerX+60,centerY+50,radius,0,Math.PI*2); ctx.clip();
  ctx.drawImage(img3, centerX+60-radius, centerY+50-radius, radius*2, radius*2);
  ctx.restore();

  // Stars
  stars.forEach(s=>{
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle='yellow';
    ctx.fill();
    s.x+=s.dx; s.y+=s.dy;
    if(s.x<0||s.x>400) s.dx*=-1;
    if(s.y<0||s.y>400) s.dy*=-1;
  });

  requestAnimationFrame(drawBoneka);
}
img3.onload=()=>drawBoneka();

// Transformasi Boneka ke Teks Rindu
document.getElementById('toTextBtn').addEventListener('click', ()=>{
  pages[2].classList.remove('active');
  pages[3].classList.add('active');
  const textContainer = document.getElementById('rinduText');
  const text = "Kau rindu aku gaa?";
  textContainer.textContent="";
  let i=0;
  const interval = setInterval(()=>{
    if(i<text.length){
      textContainer.textContent += text[i];
      i++;
    } else clearInterval(interval);
  },200);
});
