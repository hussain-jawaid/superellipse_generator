class SliderPanel {
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

class DrawSuperellipse {
  constructor(width, height, eccentricity, color) {
    this.draw(width, height, eccentricity, color);
    window.draw = this.draw;
  }

  draw(width, height, eccentricity, color) {
    const A = width / 2;
    const B = height / 2;
    const EXPONENT = eccentricity;
    const STEPS = 512;

    const pow = Math.pow,
      abs = Math.abs,
      sign = Math.sign;
    const pathParts = [];

    for (let i = 0; i <= STEPS; i++) {
      const t = (i / STEPS) * Math.PI * 2;
      const ct = Math.cos(t);
      const st = Math.sin(t);

      // Parametric form: x = a * sgn(cos t) * |cos t|^(2/n), y = b * sgn(sin t) * |sin t|^(2/n)
      const x = A * sign(ct) * pow(abs(ct), 2 / EXPONENT);
      const y = B * sign(st) * pow(abs(st), 2 / EXPONENT);

      pathParts.push((i === 0 ? "M" : "L") + x.toFixed(3) + " " + y.toFixed(3));
    }
    pathParts.push("Z");

    const pathElement = document.getElementById("superellipsePath");
    if (pathElement) {
      pathElement.setAttribute("d", pathParts.join(" "));
      pathElement.setAttribute("fill", color);
    }
  }
}

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
  new SliderPanel(".slider", ".value-box");
  new DrawSuperellipse(200, 200, 2.9, "#000000");
  new SuperellipseController(
    "eccentricityBar",
    "widthBar",
    "heightBar",
    "color",
    "superellipsePath"
  );
});
