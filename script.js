const pages = document.querySelectorAll('.page');
const startBtn = document.getElementById('startBtn');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

musicBtn.addEventListener('click', ()=>{
  if(music.paused){ music.play(); musicBtn.textContent='🎵 Pause Music'; }
  else { music.pause(); musicBtn.textContent='🎵 Play Music'; }
});

startBtn.addEventListener('click', ()=>{
  pages[0].classList.remove('active');
  pages[1].classList.add('active');
  music.play();
  setTimeout(startPhotoAnimation, 3000); // tunggu 3 detik sebelum mulai putar/pecah
});

// FOTO → PUTAR → PECAH
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width=400; canvas.height=400;

const photoContainer = document.getElementById('photoContainer');
const photos = document.querySelectorAll('.photo');
let angle=0;
let step=0;

// Load gambar
const img1 = new Image(); img1.src='foto1.jpg';
const img2 = new Image(); img2.src='foto2.jpg';
const img3 = new Image(); img3.src='foto3.jpg';

let stars=[];
for(let i=0;i<50;i++){
  stars.push({x:Math.random()*400, y:Math.random()*400, r:Math.random()*2+1, dx:(Math.random()-0.5)*2, dy:(Math.random()-0.5)*2});
}

function startPhotoAnimation(){
  photoContainer.style.display='none';
  canvas.style.display='block';
  function animate(){
    ctx.clearRect(0,0,400,400);

    // Foto berputar
    ctx.save(); ctx.translate(200,120); ctx.rotate(angle);
    ctx.beginPath(); ctx.arc(0,0,50,0,Math.PI*2); ctx.clip();
    ctx.drawImage(img1,-50,-50,100,100); ctx.restore();

    ctx.save(); ctx.translate(120,280); ctx.rotate(-angle);
    ctx.beginPath(); ctx.arc(0,0,50,0,Math.PI*2); ctx.clip();
    ctx.drawImage(img2,-50,-50,100,100); ctx.restore();

    ctx.save(); ctx.translate(280,280); ctx.rotate(angle*1.2);
    ctx.beginPath(); ctx.arc(0,0,50,0,Math.PI*2); ctx.clip();
    ctx.drawImage(img3,-50,-50,100,100); ctx.restore();

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

    angle+=0.02;
    step++;
    if(step<200){
      requestAnimationFrame(animate);
    } else {
      explodeToText();
    }
  }
  animate();
}

// Pecah → Teks
function explodeToText(){
  pages[1].classList.remove('active');
  pages[2].classList.add('active');
  const container = document.getElementById('rinduText');
  const text = "Kau rindu aku gaa?";
  container.textContent="";
  let i=0;
  const interval = setInterval(()=>{
    if(i<text.length){
      container.textContent += text[i];
      i++;
    } else clearInterval(interval);
  },200);
}
