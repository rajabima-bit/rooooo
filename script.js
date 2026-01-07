// Halaman Navigation
const pages = document.querySelectorAll('.page');
document.getElementById('startBtn').addEventListener('click', ()=>{
  pages[0].classList.remove('active');
  pages[1].classList.add('active');
});
document.querySelectorAll('.nextBtn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    let current = document.querySelector('.page.active');
    current.classList.remove('active');
    let next = current.nextElementSibling;
    if(next) next.classList.add('active');
  });
});

// Fullscreen Gallery
document.querySelectorAll('.gallery-item').forEach(img=>{
  img.addEventListener('click', ()=>{
    const fs = document.createElement('div');
    fs.classList.add('fullscreen');
    const newImg = document.createElement('img');
    newImg.src = img.src;
    fs.appendChild(newImg);
    document.body.appendChild(fs);
    fs.addEventListener('click', ()=> fs.remove());
  });
});

// Drag & Drop Game
const draggables = document.querySelectorAll('.draggable');
const dropZone = document.getElementById('dropZone');
draggables.forEach(drag=>{
  drag.addEventListener('dragstart', e=> e.dataTransfer.setData('text', drag.id));
});
dropZone.addEventListener('dragover', e=> e.preventDefault());
dropZone.addEventListener('drop', e=>{
  e.preventDefault();
  const id = e.dataTransfer.getData('text');
  const element = document.getElementById(id);
  dropZone.appendChild(element);
  checkOrder();
});
function checkOrder(){
  const correctOrder = ['drag2','drag1','drag3'];
  const children = Array.from(dropZone.children).map(c=>c.id);
  if(JSON.stringify(children) === JSON.stringify(correctOrder)){
    document.getElementById('gameFeedback').textContent = "🎉 Betul! Urutan kenangan sudah pas!";
  } else {
    document.getElementById('gameFeedback').textContent = "";
  }
}

// Pesan Personal
document.getElementById('sendBtn').addEventListener('click', ()=>{
  const msg = document.getElementById('personalMsg').value;
  if(msg) document.getElementById('msgDisplay').textContent = "Pesan terkirim: " + msg;
});

// Musik Latar
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', ()=>{
  if(music.paused){ music.play(); musicBtn.textContent = '🎵 Pause Music'; }
  else { music.pause(); musicBtn.textContent = '🎵 Play Music'; }
});

// Confetti Animation
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let confetti = [];
for(let i=0;i<150;i++){
  confetti.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*6+2, d:Math.random()*150, color:`hsl(${Math.random()*360},100%,50%)`, tilt:Math.random()*10-10});
}
function drawConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetti.forEach(p=>{
    ctx.beginPath();
    ctx.moveTo(p.x+ p.tilt, p.y);
    ctx.lineTo(p.x+ p.tilt + p.r/2, p.y+ p.r);
    ctx.lineTo(p.x+ p.tilt - p.r/2, p.y+ p.r);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}
function updateConfetti(){
  confetti.forEach(p=>{
    p.y += Math.cos(p.d) + 1 + p.r/2;
    p.x += Math.sin(p.d);
    if(p.y > canvas.height){ p.y = -10; p.x = Math.random()*canvas.width; }
  });
}
drawConfetti();
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
