// Проверка версии файла (для отладки)
console.log("scripts.js loaded, version: 2025-07-17");

// Кастомный курсор с эмодзи
const trail = document.getElementById('cursor-trail');
let trailParticles = [];

if (trail) {
  document.addEventListener('mousemove', (e) => {
    const emoji = document.createElement('div');
    emoji.textContent = '😹';
    emoji.style.position = 'absolute';
    emoji.style.left = `${e.pageX - 12}px`;
    emoji.style.top = `${e.pageY - 12}px`;
    emoji.style.opacity = 1;
    emoji.style.transition = 'opacity 1.2s ease-out, transform 0.4s ease-out';
    emoji.style.transform = 'translate(-50%, -50%)';
    emoji.style.pointerEvents = 'none';
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
} else {
  console.error('Cursor trail element not found');
}

// Автоматическая галерея с синхронным переключением
let currentImageIndices = Array.from({ length: 9 }, () => 0);

function updateGallery() {
  const cells = document.querySelectorAll('.gallery-cell');
  if (cells.length > 0) {
    cells.forEach((cell, cellIndex) => {
      const cellImages = cell.querySelectorAll('.gallery-image');
      cellImages.forEach((img, i) => {
        img.classList.toggle('active', i === currentImageIndices[cellIndex]);
      });
    });
    console.log('Gallery updated, current indices:', currentImageIndices);
  } else {
    console.error('No gallery cells found');
  }
}

// Установка начального состояния и автоматическое переключение
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  updateGallery(); // Показать первую картинку при загрузке
  setInterval(() => {
    currentImageIndices = currentImageIndices.map(index => (index + 1) % 4);
    updateGallery();
  }, 3000); // Переключение каждые 3 секунды
});

// Эмодзи-звезды с медленным появлением и быстрым исчезновением
const canvas = document.getElementById('emoji-background');
if (canvas && canvas.getContext) {
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
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.life > 0);

      if (Math.random() < 0.07) particles.push(new EmojiParticle());

      particles.forEach(p => {
        if (p.alpha < 1 && p.life > 150) p.alpha += 0.003;
        else if (p.life < 50) p.alpha -= 0.02;
        p.size += p.growth;
        if (p.size > 30) p.growth = -p.growth;
        p.life--;
        ctx.globalAlpha = p.alpha;
        ctx.font = `${p.size}px serif`;
        ctx.fillText(p.emoji, p.x, p.y);
      });

      requestAnimationFrame(animate);
    } else {
      console.error('Canvas context not available');
    }
  }
  animate();
} else {
  console.error('Canvas element not found or not supported');
}

window.addEventListener('resize', () => {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
