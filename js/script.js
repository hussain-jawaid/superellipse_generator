class EllipseInfo {
  constructor(
    wInfoId,
    hInfoId,
    eccInfoId,
    colorInfoId,
    wSliderId,
    hSliderId,
    eccSliderId,
    colorPickerId
  ) {
    this.wInfo = document.getElementById(wInfoId);
    this.hInfo = document.getElementById(hInfoId);
    this.eccInfo = document.getElementById(eccInfoId);
    this.colorInfo = document.getElementById(colorInfoId);
    this.widthSlider = document.getElementById(wSliderId);
    this.heightSlider = document.getElementById(hSliderId);
    this.eccSlider = document.getElementById(eccSliderId);
    this.colorPicker = document.getElementById(colorPickerId);
    this.init();
  }

  init() {
    this.wInfo.textContent = this.widthSlider.value;
    this.hInfo.textContent = this.heightSlider.value;
    this.eccInfo.textContent = this.eccSlider.value;
    this.colorInfo.style.backgroundColor = this.colorPicker.value;

    this.widthSlider.addEventListener("input", () => {
      this.wInfo.textContent = this.widthSlider.value;
    });
    this.heightSlider.addEventListener("input", () => {
      this.hInfo.textContent = this.heightSlider.value;
    });
    this.eccSlider.addEventListener("input", () => {
      this.eccInfo.textContent = this.eccSlider.value;
    });
    this.colorPicker.addEventListener("input", () => {
      this.colorInfo.style.backgroundColor = this.colorPicker.value;
    });
  }
}

class SuperellipseExporter {
  constructor(svgId) {
    this.svgElement = document.getElementById(svgId);
    if (!this.svgElement) {
      throw new Error(`SVG element with id "${svgId}" not found`);
    }
  }

  downloadSVG(filename = "superellipse.svg") {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(this.svgElement);

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    this.#triggerDownload(url, filename);
    URL.revokeObjectURL(url);
  }

  downloadPNG(filename = "superellipse.png") {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(this.svgElement);
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      // Determine canvas size from viewBox or fallback to width/height
      const viewBox = this.svgElement.viewBox.baseVal;
      const width =
        viewBox?.width || this.svgElement.width.baseVal.value || 400;
      const height =
        viewBox?.height || this.svgElement.height.baseVal.value || 400;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const pngUrl = canvas.toDataURL("image/png");
      this.#triggerDownload(pngUrl, filename);

      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  // Private helper
  #triggerDownload(url, filename) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  new EllipseInfo(
    "ellipseInfoW",
    "ellipseInfoH",
    "ellipseInfoE",
    "ellipseInfoColor",
    "widthBar",
    "heightBar",
    "eccentricityBar",
    "colorPicker"
  );

  const exporter = new SuperellipseExporter("superellipseSvg");

  document.getElementById("downloadSVG").addEventListener("click", () => {
    exporter.downloadSVG();
  });

  document.getElementById("downloadPNG").addEventListener("click", () => {
    exporter.downloadPNG();
  });
});
