document.addEventListener("DOMContentLoaded", () => {
  const emojiList = ["😹", "🐸", "🐶", "😻", "🦊", "🐵", "🐯", "🐥", "🦄","🐭","🐳","🐷","🐰"];
  const emojiLayer = document.createElement("div");
  emojiLayer.style.position = "fixed";
  emojiLayer.style.top = 0;
  emojiLayer.style.left = 0;
  emojiLayer.style.width = "100%";
  emojiLayer.style.height = "100%";
  emojiLayer.style.pointerEvents = "none";
  emojiLayer.style.zIndex = 1;
  document.body.appendChild(emojiLayer);

  let mouseX = 0;
  let mouseY = 0;

  // Отслеживание положения курсора
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function createEmoji() {
    const emoji = document.createElement("div");
    emoji.innerText = emojiList[Math.floor(Math.random() * emojiList.length)];
    emoji.style.position = "absolute";
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.top = Math.random() * 100 + "vh";
    emoji.style.fontSize = Math.random() * 18 + 18 + "px";
    emoji.style.opacity = 0;
    emoji.style.transition = "opacity 0.4s ease-in-out, transform 0.3s ease-out";
    emoji.style.animation = "floatFade 3s ease-in-out forwards";

    emojiLayer.appendChild(emoji);

    function updatePosition() {
      const emojiRect = emoji.getBoundingClientRect();
      const emojiCenterX = emojiRect.left + emojiRect.width / 2;
      const emojiCenterY = emojiRect.top + emojiRect.height / 2;

      // Расстояние от курсора до центра эмодзи
      const dx = mouseX - emojiCenterX;
      const dy = mouseY - emojiCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Если курсор близко (меньше 100px), эмодзи "убегает"
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        const force = (100 - distance) / 100; // Сила отталкивания
        const moveX = Math.cos(angle) * force * -20;
        const moveY = Math.sin(angle) * force * -20;

        emoji.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        emoji.style.transform = "translate(0, 0)"; // Сброс позиции
      }

      if (emoji.style.opacity !== "0") {
        requestAnimationFrame(updatePosition);
      }
    }

    // Запуск анимации и отслеживания
    setTimeout(() => {
      emoji.style.opacity = "1";
      updatePosition();
    }, 100);

    setTimeout(() => {
      emoji.remove();
    }, 3000);
  }

  setInterval(createEmoji, 250); // быстрее
});