class SliderPanel {
  constructor(slidersId, valueBoxesId, colorPickerId, cValueBoxId) {
    this.sliders = document.querySelectorAll(slidersId);
    this.valueBoxes = document.querySelectorAll(valueBoxesId);
    this.colorPicker = document.querySelector(colorPickerId);
    this.colorValueBox = document.querySelector(cValueBoxId);
    this.init();
    window.updateSlider = this.updateSlider;
  }

  updateSlider(slider, valueBox) {
    const value = Number(slider.value);
    const min = Number(slider.min);
    const max = Number(slider.max);
    const percent = ((value - min) / (max - min)) * 100;
    const color = this.colorPicker.value;

    // show the slider value it's appropiate value box
    valueBox.textContent = value;

    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains("dark");

    // Update slider track color
    slider.style.background = `linear-gradient(to right, ${color} ${percent}%, #374151 ${percent}%)`;

    // Update thumb color using CSS custom properties
    slider.style.setProperty("--thumb-color", color);

    // Set appropriate border color based on dark mode
    const borderColor = isDarkMode ? "#000000" : "#ffffff";
    slider.style.setProperty("--thumb-border", borderColor);
  }

  init() {
    this.sliders.forEach((slider, index) => {
      this.updateSlider(slider, this.valueBoxes[index]);
      slider.addEventListener("input", () =>
        this.updateSlider(slider, this.valueBoxes[index])
      );
    });

    this.colorPicker.addEventListener("input", () => {
      this.colorValueBox.textContent = this.colorPicker.value;
      this.sliders.forEach((slider, index) => {
        this.updateSlider(slider, this.valueBoxes[index]);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SliderPanel(".slider", ".value-box", "#colorPicker", "#colorValueBox");
});
