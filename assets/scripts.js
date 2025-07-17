
// Кастомный курсор
document.addEventListener('mousemove', (e) => {
  const trail = document.getElementById('cursor-trail');
  const emoji = document.createElement('div');
  emoji.textContent = '😹';
  emoji.style.position = 'absolute';
  emoji.style.left = e.pageX + 'px';
  emoji.style.top = e.pageY + 'px';
  document.body.appendChild(emoji);
  setTimeout(() => {
    emoji.remove();
  }, 800);
});

// Галерея
let currentIndex = 0;
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-track img');

document.querySelector('.carousel-arrow.left').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

document.querySelector('.carousel-arrow.right').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

function updateCarousel() {
  track.style.transform = `translateX(-${220 * currentIndex}px)`;
}

// Эмодзи-животные
const canvas = document.getElementById('emoji-background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const emojis = ['😹', '🐶', '😺', '🙀', '🐸'];
let particles = [];

function EmojiParticle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
  this.life = 200 + Math.random() * 100;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life-- > 0);
  if (Math.random() < 0.5) particles.push(new EmojiParticle());
  particles.forEach(p => {
    ctx.globalAlpha = p.life / 200;
    ctx.font = '24px serif';
    ctx.fillText(p.emoji, p.x, p.y);
  });
  requestAnimationFrame(animate);
}
animate();
