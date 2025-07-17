const galleryData = [
  {
    name: "Elon Musk",
    handle: "@elonmusk",
    images: ["Marcell_2.jpg", "Marcell_3.jpg", "Marcell_5.jpg"]
  },
  {
    name: "A.Tate",
    handle: "@Cobratate",
    images: ["Ram_2.jpg", "Ram_4.jpg", "Ram_5.jpg"]
  },
  {
    name: "Shibetoshi",
    handle: "@BillyM2k",
    images: ["Shibetoshi_nakamoto_2.png", "Shibetoshi_nakamoto_4.png", "Shibetoshi_nakamoto_5.png"]
  },
  {
    name: "Marcell",
    handle: "@MarcellxMarcell",
    images: ["Shibetoshi_nakamoto_8.png", "Marcell_6.jpg"]
  },
  {
    name: "GabrielShapiro",
    handle: "@lex_node",
    images: ["logo.png"]
  },
  {
    name: "LexaproTrader",
    handle: "@LexaproTrader",
    images: ["logo.png"]
  },
  {
    name: "Ram",
    handle: "@0xRamonos",
    images: ["logo.png"]
  },
  {
    name: "Bossman",
    handle: "@0xBossman",
    images: ["logo.png"]
  },
  {
    name: "DJ.En",
    handle: "@thisisdjen",
    images: ["logo.png"]
  }
];

let currentIndex = 0;

function renderGallery() {
  const container = document.getElementById("gallery-container");
  container.innerHTML = "";

  galleryData.forEach((item, i) => {
    const image = document.createElement("img");
    image.src = `assets/${item.images[currentIndex % item.images.length]}`;
    image.alt = item.name;
    image.style.maxWidth = "120px";
    image.style.margin = "10px auto";

    const label = document.createElement("div");
    label.textContent = item.handle;
    label.style.fontSize = "12px";
    label.style.marginBottom = "20px";

    const block = document.createElement("div");
    block.appendChild(image);
    block.appendChild(label);

    container.appendChild(block);
  });
}

document.querySelector(".gallery-prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryData[0].images.length) % galleryData[0].images.length;
  renderGallery();
});

document.querySelector(".gallery-next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryData[0].images.length;
  renderGallery();
});

document.addEventListener("DOMContentLoaded", renderGallery);
