class SuperellipseController {
  constructor(eccSliderId, wSliderId, hSliderId, cPickerId, sEllipsePathId) {
    this.eccentricitySlider = document.getElementById(eccSliderId);
    this.widthSlider = document.getElementById(wSliderId);
    this.heightSlider = document.getElementById(hSliderId);
    this.colorPicker = document.getElementById(cPickerId);
    this.superellipsePath = document.getElementById(sEllipsePathId);
    this.init();
  }

  updateSuperellipse() {
    const eccentricity = parseFloat(this.eccentricitySlider.value);
    const width = parseFloat(this.widthSlider.value);
    const height = parseFloat(this.heightSlider.value);
    const color = this.colorPicker.value;
    window.draw(width, height, eccentricity, color);
  }

  init() {
    this.eccentricitySlider.addEventListener(
      "input",
      this.updateSuperellipse.bind(this)
    );
    this.widthSlider.addEventListener(
      "input",
      this.updateSuperellipse.bind(this)
    );
    this.heightSlider.addEventListener(
      "input",
      this.updateSuperellipse.bind(this)
    );
    this.colorPicker.addEventListener(
      "input",
      this.updateSuperellipse.bind(this)
    );
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  new SuperellipseController(
    "eccentricityBar",
    "widthBar",
    "heightBar",
    "colorPicker",
    "superellipsePath"
  );
});
