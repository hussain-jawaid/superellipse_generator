// SLIDER FEATURE
// Get all slider elements
const sliders = document.querySelectorAll(".slider");
const valueBoxes = document.querySelectorAll(".value-box");

// Generic function to update any slider
function updateSlider(slider, valueBox) {
  const { value, min, max } = slider;
  const percent = ((value - min) / (max - min)) * 100;

  valueBox.textContent = value;

  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains("dark");

  if (isDarkMode) {
    // Dark mode: white progress, dark gray background
    slider.style.background = `linear-gradient(to right, #ffffff ${percent}%, #374151 ${percent}%)`;
  } else {
    // Light mode: black progress, light gray background
    slider.style.background = `linear-gradient(to right, #000000 ${percent}%, #e5e7eb ${percent}%)`;
  }
}

// Make updateSlider globally accessible for darkmode.js
window.updateSlider = updateSlider;

sliders.forEach((slider, index) => {
  updateSlider(slider, valueBoxes[index]);
  slider.addEventListener("input", () =>
    updateSlider(slider, valueBoxes[index])
  );
});

// COLOR BOX LOGIC WILL APPEAR HERE
// ------
// ------
// ------

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
