// scripts.js — логика фона, курсора и каруселей

// === Космический фон с эмодзи ===
const canvas = document.getElementById("emoji-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const emojis = [“😺”,“🐶”,“🐱”,“😻”,“🐯”,“🐺”];
let stars = [];

function spawnEmoji() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  stars.push({ emoji, x, y, life: 60 });
}

function drawEmojis() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((s) => {
    ctx.font = "20px serif";
    ctx.fillText(s.emoji, s.x, s.y);
    s.life--;
  });
  stars = stars.filter((s) => s.life > 0);
}

setInterval(() => {
  spawnEmoji();
  drawEmojis();
}, 150);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


// === Кастомный курсор со шлейфом ===
const trail = [];
document.addEventListener("mousemove", (e) => {
  const el = document.createElement("div");
  el.textContent = "😺";
  el.className = "custom-cursor";
  el.style.left = `${e.pageX}px`;
  el.style.top = `${e.pageY}px`;
  document.body.appendChild(el);
  trail.push(el);
  setTimeout(() => {
    el.remove();
    trail.shift();
  }, 800);
});


// === Карусель (универсальная синхронная) ===
let index = 1;
function changeImage(dir) {
  const slides = document.querySelectorAll(".carousel-slide img");
  index += dir;
  if (index > 10) index = 1;
  if (index < 1) index = 10;

  slides.forEach((img) => {
    const src = img.src;
    const base = src.substring(0, src.lastIndexOf("_") + 1);
    img.src = base + index + ".jpg";
  });
}
