const slides = document.querySelectorAll(".img-slid");
const slider = document.querySelector(".image-slider");
let current = 0;
let interval;

// --- Dots ---
const dotsContainer = document.createElement("div");
dotsContainer.style.cssText = `
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 5;
`;
slider.appendChild(dotsContainer);

const dots = [];
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.style.cssText = `
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: background 0.3s;
  `;
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
  dots.push(dot);
});

// --- Show slide ---
function showSlide(index) {
  slides.forEach((img, i) => img.style.opacity = i === index ? "1" : "0");
  dots.forEach((dot, i) => dot.style.background = i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)");
  slider.style.setProperty("--bg-image", `url(${slides[index].src})`);
}

// --- Next / Prev ---
function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}
function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}
function goToSlide(index) {
  current = index;
  showSlide(index);
}

// --- Arrows ---
const leftArrow = document.createElement("button");
const rightArrow = document.createElement("button");
leftArrow.innerHTML = "&#10094;";
rightArrow.innerHTML = "&#10095;";
[leftArrow, rightArrow].forEach(btn => {
  btn.style.cssText = `
    position: absolute; top:50%; transform:translateY(-50%);
    background: rgba(0,0,0,0.5); color: rgba(255,255,255,0.8);
    border: none; font-size: 2rem; padding:5px 10px;
    cursor:pointer; border-radius:5px; z-index:10; opacity:0.5;
    transition: opacity 0.3s;
  `;
  btn.addEventListener("mouseenter", () => btn.style.opacity = "1");
  btn.addEventListener("mouseleave", () => btn.style.opacity = "0.5");
});
leftArrow.style.left = "20px";
rightArrow.style.right = "20px";
slider.appendChild(leftArrow);
slider.appendChild(rightArrow);
leftArrow.addEventListener("click", prevSlide);
rightArrow.addEventListener("click", nextSlide);

// --- Automatic slide ---
function startAutoSlide() { interval = setInterval(nextSlide, 4000); }
function stopAutoSlide() { clearInterval(interval); }
startAutoSlide();

// --- Pause on hover ---
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

// --- Initialize ---
showSlide(current);
