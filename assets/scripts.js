// Проверка версии файла (для отладки)
console.log("scripts.js loaded, version: 2025-07-18 00:12 CEST");

// Кастомный курсор с эмодзи
const trail = document.getElementById('cursor-trail');
let trailParticles = [];

if (trail) {
  document.addEventListener('mousemove', (e) => {
    // Создаем ведущий эмодзи как основной курсор
    const leadEmoji = document.createElement('div');
    leadEmoji.textContent = '😹';
    leadEmoji.style.position = 'absolute';
    leadEmoji.style.left = `${e.pageX - 12}px`;
    leadEmoji.style.top = `${e.pageY - 12}px`;
    leadEmoji.style.opacity = 1;
    leadEmoji.style.transform = 'translate(-50%, -50%)';
    leadEmoji.style.pointerEvents = 'none';
    document.body.appendChild(leadEmoji);
    trailParticles.push(leadEmoji);

    // Создаем хвост из дополнительных эмодзи
    for (let i = 0; i < 5; i++) {
      const tailEmoji = document.createElement('div');
      tailEmoji.textContent = '😹';
      tailEmoji.style.position = 'absolute';
      tailEmoji.style.left = `${e.pageX - 12 + i * 10}px`;
      tailEmoji.style.top = `${e.pageY - 12 + i * 10}px`;
      tailEmoji.style.opacity = 1 - (i * 0.2); // Постепенное уменьшение прозрачности
      tailEmoji.style.transform = 'translate(-50%, -50%)';
      tailEmoji.style.pointerEvents = 'none';
      document.body.appendChild(tailEmoji);
      trailParticles.push(tailEmoji);
    }

    // Управление анимацией хвоста
    trailParticles.forEach((particle, index) => {
      setTimeout(() => {
        particle.style.transition = 'opacity 0.8s ease-out';
        particle.style.opacity = 0;
        setTimeout(() => {
          particle.remove();
          trailParticles = trailParticles.filter(p => p !== particle);
        }, 800);
      }, index * 100); // Задержка для плотности
    });

    // Ограничиваем количество частиц до 20 для длинного хвоста
    if (trailParticles.length > 20) {
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
      const imageContainer = cell.querySelector('.image-container');
      if (imageContainer) {
        const cellImages = imageContainer.querySelectorAll('.gallery-image');
        cellImages.forEach((img, i) => {
          img.classList.toggle('active', i === currentImageIndices[cellIndex]);
        });
      } else {
        console.error('Image container not found in cell', cellIndex);
      }
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
