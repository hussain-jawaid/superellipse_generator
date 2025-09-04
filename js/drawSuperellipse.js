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
      pathElement.setAttribute("fill-opacity", "0.9");
      pathElement.setAttribute("stroke", color);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DrawSuperellipse(200, 200, 2.9, "#000000");
});
