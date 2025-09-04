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
});
