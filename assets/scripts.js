// Проверка версии файла (для отладки)
console.log("scripts.js loaded, version: 2025-07-18 12:45 CEST");

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
      }
    });
  }
}

// Предварительная загрузка изображения
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// Динамическое масштабирование гифки
function resizeLoadingGif() {
  const loadingGif = document.getElementById('loading-gif');
  if (loadingGif && loadingGif.complete) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const imgWidth = loadingGif.naturalWidth;
    const imgHeight = loadingGif.naturalHeight;
    const screenAspect = screenWidth / screenHeight;
    const imgAspect = imgWidth / imgHeight;

    if (imgAspect > screenAspect) {
      loadingGif.style.width = '100%';
      loadingGif.style.height = 'auto';
    } else {
      loadingGif.style.width = 'auto';
      loadingGif.style.height = '100%';
    }

    // Центрирование
    loadingGif.style.left = '50%';
    loadingGif.style.top = '50%';
    loadingGif.style.transform = 'translate(-50%, -50%)';
  }
}

// Установка начального состояния и автоматическое переключение
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded');
  updateGallery();
  setInterval(() => {
    currentImageIndices = currentImageIndices.map(index => (index + 1) % 4);
    updateGallery();
  }, 3000);

  // Управление загрузочным экраном
  if (!localStorage.getItem('visited')) {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    if (loadingScreen && mainContent) {
      preloadImage('assets/gif.gif')
        .then((img) => {
          console.log('GIF preloaded successfully');
          const loadingGif = document.getElementById('loading-gif');
          if (loadingGif) {
            loadingGif.style.visibility = 'visible';
            resizeLoadingGif(); // Устанавливаем начальный размер
            window.addEventListener('resize', resizeLoadingGif); // Адаптация при изменении размера
            setTimeout(() => {
              loadingScreen.style.display = 'none';
              mainContent.style.display = 'block';
              localStorage.setItem('visited', 'true');
            }, 5000);
          }
        })
        .catch((error) => {
          console.error('Error preloading GIF:', error);
          loadingScreen.style.display = 'none';
          mainContent.style.display = 'block';
          localStorage.setItem('visited', 'true');
        });
    }
  } else {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    if (loadingScreen && mainContent) {
      loadingScreen.style.display = 'none';
      mainContent.style.display = 'block';
    }
  }
});