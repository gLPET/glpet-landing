// Космический фон с эмодзи-животными
const emojis = ["😹", "🐸", "🐶", "🐱", "🦊", "🐭", "🐯", "🐰"];
function spawnEmoji() {
  const emoji = document.createElement("div");
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.position = "fixed";
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.top = Math.random() * 100 + "vh";
  emoji.style.fontSize = "20px";
  emoji.style.opacity = "0.6";
  emoji.style.pointerEvents = "none";
  emoji.style.zIndex = "1";
  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), 4000);
}
setInterval(spawnEmoji, 500); // быстрее

// Курсор 😹 с длинным хвостом
const cursor = document.getElementById("cursor");
const trail = document.getElementById("trail");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";

  const dot = document.createElement("div");
  dot.className = "trail-dot";
  dot.style.left = e.pageX + "px";
  dot.style.top = e.pageY + "px";
  dot.innerText = "😹";
  trail.appendChild(dot);

  setTimeout(() => dot.remove(), 1000);
});

// Галерея
const images = document.querySelectorAll(".carousel img");
let currentIndex = 0;

document.getElementById("next").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
};

document.getElementById("prev").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
};

function updateCarousel() {
  const offset = -currentIndex * 130; // 120px width + 10px gap
  document.querySelector(".carousel").style.transform = `translateX(${offset}px)`;
}
