// Кастомный курсор с эмодзи
const trail = document.getElementById('cursor-trail');
let trailParticles = [];

document.addEventListener('mousemove', (e) => {
  const emoji = document.createElement('div');
  emoji.textContent = '😹';
  emoji.style.position = 'absolute';
  emoji.style.left = `${e.pageX - 12}px`;
  emoji.style.top = `${e.pageY - 12}px`;
  emoji.style.opacity = 1;
  emoji.style.transition = 'opacity 1.2s ease-out, transform 0.4s ease-out';
  emoji.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(emoji);
  trailParticles.push(emoji);

  setTimeout(() => {
    emoji.style.opacity = 0;
    setTimeout(() => emoji.remove(), 1200);
    trailParticles = trailParticles.filter(p => p !== emoji);
  }, 2000);

  if (trailParticles.length > 12) {
    trailParticles[0].remove();
    trailParticles.shift();
  }
});

// Автоматическая галерея с переключением каждые 3 секунды
let currentImageIndex = 0;

function updateGallery() {
  const cells = document.querySelectorAll('.gallery-cell');
  cells.forEach(cell => {
    const cellImages = cell.querySelectorAll('.gallery-image');
    cellImages.forEach((img, i) => {
      img.classList.toggle('active', i === currentImageIndex);
    });
  });
}

setInterval(() => {
  currentImageIndex = (currentImageIndex + 1) % 4;
  updateGallery();
}, 3000); // Переключение каждые 3 секунды

// Эмодзи-звезды с медленным появлением и быстрым исчезновением
const canvas = document.getElementById('emoji-background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const emojis = ["😺", "🐶", "🐱", "😻", "🐯", "🐺", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐷", "🐽", "🐮", "🐴", "🐑", "🐏", "🐐", "🐘", "🐵", "🐒", "🦍", "🐍", "🐢", "🐸", "🦎", "🐙", "🐳", "🐬", "🐟", "🐠", "🐡", "🦈", "🐝", "🐞", "🕷️", "🦂", "🦗", "🐜", "🦋", "🐌", "🐊", "🐅", "🦒", "🦓", "🦌", "🐪", "🐫", "🦘", "🐘", "🦏", "🦛", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🐕", "🐩", "🐈", "🐅", "🐆", "🦇", "🐦", "🦉", "🦅", "🦆", "🦢", "🦩", "🕊️", "🐧", "🦃", "🦚"];
let particles = [];

function EmojiParticle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
  this.life = 200 + Math.random() * 400;
  this.size = 10 + Math.random() * 20;
  this.alpha = 0;
  this.growth = 0.02 + Math.random() * 0.03;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);

  if (Math.random() < 0.07) particles.push(new EmojiParticle());

  particles.forEach(p => {
    if (p.alpha < 1 && p.life > 150) p.alpha += 0.003; // Медленное появление
    else if (p.life < 50) p.alpha -= 0.02; // Быстрое исчезновение
    p.size += p.growth;
    if (p.size > 30) p.growth = -p.growth;
    p.life--;
    ctx.globalAlpha = p.alpha;
    ctx.font = `${p.size}px serif`;
    ctx.fillText(p.emoji, p.x, p.y);
  });

  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
