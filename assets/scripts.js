// Кастомный курсор с длинным хвостом
const trail = document.getElementById('cursor-trail');
let trailParticles = [];

document.addEventListener('mousemove', (e) => {
  const emoji = document.createElement('div');
  emoji.textContent = '😹';
  emoji.style.position = 'absolute';
  emoji.style.left = e.pageX + 'px';
  emoji.style.top = e.pageY + 'px';
  emoji.style.opacity = 1;
  emoji.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  document.body.appendChild(emoji);
  trailParticles.push(emoji);

  setTimeout(() => {
    emoji.style.opacity = 0;
    setTimeout(() => emoji.remove(), 800);
    trailParticles = trailParticles.filter(p => p !== emoji);
  }, 2000);

  if (trailParticles.length > 10) {
    trailParticles[0].remove();
    trailParticles.shift();
  }
});

// Галерея с переключением фотографий
let currentImageIndex = 0;
const cells = document.querySelectorAll('.gallery-cell');

function updateGallery() {
  cells.forEach(cell => {
    const cellImages = cell.querySelectorAll('.gallery-image');
    cellImages.forEach((img, i) => {
      img.style.opacity = (i === currentImageIndex) ? 1 : 0;
    });
  });
}

document.querySelector('.gallery-arrow.left').addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + 4) % 4;
  updateGallery();
});

document.querySelector('.gallery-arrow.right').addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % 4;
  updateGallery();
});

// Эмодзи-звезды с реалистичной анимацией
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
  this.size = 10 + Math.random() * 20; // Рандомный начальный размер
  this.alpha = 0;
  this.growth = 0.02 + Math.random() * 0.03; // Случайная скорость роста
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);

  if (Math.random() < 0.03) particles.push(new EmojiParticle()); // Частота появления

  particles.forEach(p => {
    if (p.alpha < 1 && p.life > 100) p.alpha += 0.005; // Плавное появление
    else if (p.life < 50) p.alpha -= 0.005; // Плавное затухание
    p.size += p.growth; // Рост размера
    if (p.size > 30) p.growth = -p.growth; // Обратный рост при достижении лимита
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
