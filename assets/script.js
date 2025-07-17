// Кастомный курсор 😹 с шлейфом
const cursorEmoji = "😹";
const trailLength = 10;
const trail = [];
const cursor = document.createElement("div");
cursor.style.position = "fixed";
cursor.style.pointerEvents = "none";
cursor.style.fontSize = "20px";
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  trail.push({ x: e.clientX, y: e.clientY });
  if (trail.length > trailLength) trail.shift();

  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  // добавить хвост
  document.querySelectorAll(".emoji-trail").forEach((el) => el.remove());
  trail.forEach((pos, i) => {
    const dot = document.createElement("div");
    dot.textContent = cursorEmoji;
    dot.className = "emoji-trail";
    dot.style.position = "fixed";
    dot.style.left = `${pos.x}px`;
    dot.style.top = `${pos.y}px`;
    dot.style.opacity = `${i / trailLength}`;
    dot.style.pointerEvents = "none";
    dot.style.fontSize = "16px";
    document.body.appendChild(dot);
  });
});

// Эмодзи-животные в фоне
const animalEmojis = ["🐶", "🐱", "😹", "🐵", "🐸", "🐯", "🦊", "🦁", "🐮"];
function createFloatingEmoji() {
  const emoji = document.createElement("div");
  emoji.textContent = animalEmojis[Math.floor(Math.random() * animalEmojis.length)];
  emoji.style.position = "fixed";
  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.top = Math.random() * 100 + "vh";
  emoji.style.opacity = "0";
  emoji.style.transition = "opacity 1s ease-in-out";
  emoji.style.fontSize = "20px";
  emoji.style.zIndex = 0;
  document.body.appendChild(emoji);

  requestAnimationFrame(() => {
    emoji.style.opacity = "1";
    setTimeout(() => {
      emoji.style.opacity = "0";
      setTimeout(() => emoji.remove(), 1000);
    }, 3000);
  });
}
setInterval(createFloatingEmoji, 1000);

// Галерея gLPET персонажей
const galleryData = [
  { folder: "Elon Musk", handle: "@elonmusk" },
  { folder: "A.Tate", handle: "@Cobratate" },
  { folder: "Shibetoshi_nakamoto", handle: "@BillyM2k" },
  { folder: "Marcell", handle: "@MarcellxMarcell" },
  { folder: "GabrielShapiro", handle: "@lex_node" },
  { folder: "Lexaprotrader", handle: "@LexaproTrader" },
  { folder: "Ram", handle: "@0xRamonos" },
  { folder: "Bossman", handle: "@0xBossman" },
  { folder: "DJ.En", handle: "@thisisdjen" },
];

const galleryContainer = document.createElement("div");
galleryContainer.className = "gallery-container";
document.body.appendChild(galleryContainer);

const prevBtn = document.createElement("button");
const nextBtn = document.createElement("button");
prevBtn.textContent = "←";
nextBtn.textContent = "→";
prevBtn.className = "carousel-button";
nextBtn.className = "carousel-button";
galleryContainer.appendChild(prevBtn);
galleryContainer.appendChild(nextBtn);

let imageIndex = 1;
function renderGallery() {
  document.querySelectorAll(".carousel-row").forEach((e) => e.remove());
  galleryData.forEach((item) => {
    const row = document.createElement("div");
    row.className = "carousel-row";

    const img = document.createElement("img");
    img.src = `assets/${item.folder}_${imageIndex}.jpg`;
    img.alt = item.folder;

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = item.handle;

    row.appendChild(img);
    row.appendChild(caption);
    galleryContainer.appendChild(row);
  });
}
renderGallery();

nextBtn.onclick = () => {
  imageIndex++;
  renderGallery();
};
prevBtn.onclick = () => {
  imageIndex = Math.max(1, imageIndex - 1);
  renderGallery();
};
