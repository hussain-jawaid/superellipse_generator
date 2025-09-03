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
