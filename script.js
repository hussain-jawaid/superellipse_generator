class Slider {
  constructor(slidersId, valueBoxesId) {
    this.sliders = document.querySelectorAll(slidersId);
    this.valueBoxes = document.querySelectorAll(valueBoxesId);
    this.init();
    window.updateSlider = this.updateSlider;
  }

  updateSlider(slider, valueBox) {
    const value = Number(slider.value);
    const min = Number(slider.min);
    const max = Number(slider.max);
    const percent = ((value - min) / (max - min)) * 100;

    // show the slider value it's appropiate value box
    valueBox.textContent = value;

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains("dark");

    if (isDarkMode) {
      slider.style.background = `linear-gradient(to right, #ffffff ${percent}%, #374151 ${percent}%)`;
    } else {
      slider.style.background = `linear-gradient(to right, #000000 ${percent}%, #e5e7eb ${percent}%)`;
    }
  }

  init() {
    this.sliders.forEach((slider, index) => {
      this.updateSlider(slider, this.valueBoxes[index]);
      slider.addEventListener("input", () =>
        this.updateSlider(slider, this.valueBoxes[index])
      );
    });
  }
}

// CANVAS LOGIC
const previewSquare = document.getElementById("previewSquare");
const widthSlider = document.getElementById("widthBar");
const heightSlider = document.getElementById("heightBar");

// Compute slider value mapped to 0–100% respecting min/max
function sliderToPercent(slider) {
  const max = parseFloat(slider.max);
  const value = parseFloat(slider.value);
  return (value / max) * 100;
}

let sizeRaf = null;
function updateSquareSize() {
  if (sizeRaf != null) return; // batch rapid inputs
  sizeRaf = requestAnimationFrame(() => {
    sizeRaf = null;
    const widthPercent = sliderToPercent(widthSlider);
    const heightPercent = sliderToPercent(heightSlider);
    previewSquare.style.width = widthPercent + "%";
    previewSquare.style.height = heightPercent + "%";
  });
}

// Initialize and bind
updateSquareSize();
widthSlider?.addEventListener("input", updateSquareSize);
heightSlider?.addEventListener("input", updateSquareSize);

document.addEventListener("DOMContentLoaded", () => {
  new Slider(".slider", ".value-box");
});
