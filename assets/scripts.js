// Кастомный курсор с хвостом
const trail = document.getElementById('cursor-trail');
let trailParticles = [];

document.addEventListener('mousemove', (e) => {
  const emoji = document.createElement('div');
  emoji.textContent = '😹';
  emoji.style.position = 'absolute';
  emoji.style.left = e.pageX + 'px';
  emoji.style.top = e.pageY + 'px';
  emoji.style.opacity = 1;
  emoji.style.transition = 'opacity 0.5s ease-out';
  document.body.appendChild(emoji);
  trailParticles.push(emoji);

  setTimeout(() => {
    emoji.style.opacity = 0;
    setTimeout(() => emoji.remove(), 500);
    trailParticles = trailParticles.filter(p => p !== emoji);
  }, 1000);

  if (trailParticles.length > 5) {
    trailParticles[0].remove();
    trailParticles.shift();
  }
});

// Галерея
let currentIndex = 0;
const track = document.querySelector('.gallery-track');
const slides = document.querySelectorAll('.gallery-track img');
const totalSlides = Math.ceil(slides.length / 9);

function updateGallery() {
  slides.forEach((slide, i) => {
    slide.style.opacity = (i >= currentIndex * 9 && i < (currentIndex + 1) * 9) ? 1 : 0;
  });
}

document.querySelector('.gallery-arrow.left').addEventListener('click', () => {
  currentIndex = Math.max(0, currentIndex - 1);
  updateGallery();
});

document.querySelector('.gallery-arrow.right').addEventListener('click', () => {
  currentIndex = Math.min(totalSlides - 1, currentIndex + 1);
  updateGallery();
});

document.querySelector('.gallery-switch').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateGallery();
});

// Эмодзи-звезды
const canvas = document.getElementById('emoji-background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const emojis = ["😺", "🐶", "🐱", "😻", "🐯", "🐺", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐷", "🐽", "🐮", "🐴", "🐑", "🐏", "🐐", "🐘", "🐵", "🐒", "🦍", "🐍", "🐢", "🐸", "🦎", "🐙", "🐳", "🐬", "🐟", "🐠", "🐡", "🦈", "🐝", "🐞", "🕷️", "🦂", "🦗", "🐜", "🦋", "🐌", "🐊", "🐅", "🦒", "🦓", "🦌", "🐪", "🐫", "🦘", "🐘", "🦏", "🦛", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🐕", "🐩", "🐈", "🐅", "🐆", "🦇", "🐦", "🦉", "🦅", "🦆", "🦢", "🦩", "🕊️", "🐧", "🦃", "🦚"];
let particles = [];

function EmojiParticle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
  this.life = 100 + Math.random() * 150;
  this.alpha = 0;
  this.fadeIn = true;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);

  if (Math.random() < 0.02) particles.push(new EmojiParticle());

  particles.forEach(p => {
    if (p.fadeIn && p.alpha < 1) p.alpha += 0.02;
    else if (!p.fadeIn && p.alpha > 0) p.alpha -= 0.02;
    else p.fadeIn = false;

    p.life--;
    ctx.globalAlpha = p.alpha;
    ctx.font = '20px serif';
    ctx.fillText(p.emoji, p.x, p.y);
  });

  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
