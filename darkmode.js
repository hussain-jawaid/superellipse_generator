class ThemeManager {
  constructor(
    toggleId,
    sliderSelector,
    valueBoxSelector,
    storageKey = "prefers-dark"
  ) {
    this.root = document.documentElement;
    this.toggle = document.getElementById(toggleId);
    this.sliders = document.querySelectorAll(sliderSelector);
    this.valueBoxes = document.querySelectorAll(valueBoxSelector);
    this.storageKey = storageKey;
    this.init();
  }

  // Apply the selected theme
  applyTheme(isDark) {
    this.root.classList.toggle("dark", Boolean(isDark));
    this.toggle.setAttribute("aria-pressed", String(Boolean(isDark)));

    // Change icon
    this.toggle.innerHTML = isDark
      ? `<span class="material-symbols-outlined" style="font-size: 1rem;">wb_sunny</span>`
      : `<span class="material-symbols-outlined" style="font-size: 1rem;">bedtime</span>`;

    // Reapply slider styling after theme change
    setTimeout(() => {
      this.sliders.forEach((slider, index) => {
        if (this.valueBoxes[index] && window.updateSlider) {
          window.updateSlider(slider, this.valueBoxes[index]);
        }
      });
    }, 0);
  }

  // Read from localStorage
  readStoredPreference() {
    try {
      const value = localStorage.getItem(this.storageKey);
      return value === "true" ? true : value === "false" ? false : null;
    } catch (_) {
      return null;
    }
  }

  // Check system preference
  systemPrefersDark() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  // Initialize theme manager
  init() {
    const stored = this.readStoredPreference();
    this.applyTheme(stored ?? this.systemPrefersDark());

    // Toggle handler
    this.toggle.addEventListener("click", () => {
      const isDark = !this.root.classList.contains("dark");
      this.applyTheme(isDark);

      try {
        localStorage.setItem(this.storageKey, String(isDark));
      } catch (_) {}
    });

    // React to system changes if no stored preference
    if (stored == null && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener?.("change", (e) => this.applyTheme(e.matches));
    }
  }
}

// Usage
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager("themeToggle", ".slider", ".value-box");
});