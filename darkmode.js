(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const STORAGE_KEY = "prefers-dark";
  const sliders = document.querySelectorAll(".slider");
  const valueBoxes = document.querySelectorAll(".value-box");

  function applyTheme(isDark) {
    root.classList.toggle("dark", Boolean(isDark));
    toggle.setAttribute("aria-pressed", String(Boolean(isDark)));
    if (isDark) {
      toggle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 1rem;">wb_sunny</span>`;
    } else {
      toggle.innerHTML = `<span class="material-symbols-outlined" style="font-size: 1rem;">bedtime</span>`;
    }

    // Update all sliders after theme change
    setTimeout(() => {
      sliders.forEach((slider, index) => {
        if (valueBoxes[index] && window.updateSlider) {
          window.updateSlider(slider, valueBoxes[index]);
        }
      });
    }, 0);
  }

  function readStoredPreference() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === "true" ? true : value === "false" ? false : null;
    } catch (_) {
      return null;
    }
  }

  function systemPrefersDark() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  // Initialize
  const stored = readStoredPreference();
  applyTheme(stored ?? systemPrefersDark());

  // Toggle handler
  toggle.addEventListener("click", function () {
    const isDark = !root.classList.contains("dark");
    applyTheme(isDark);
    try {
      localStorage.setItem(STORAGE_KEY, String(isDark));
    } catch (_) {}
  });

  // React to system theme changes if user hasn't chosen
  if (stored == null && window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", (e) => applyTheme(e.matches));
  }
})();
