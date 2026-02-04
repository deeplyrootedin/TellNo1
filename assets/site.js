
// Theme auto-detect + toggle
(() => {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  if (stored) root.dataset.theme = stored;
  else if (window.matchMedia("(prefers-color-scheme: light)").matches)
    root.dataset.theme = "light";

  window.toggleTheme = () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", root.dataset.theme);
  };
})();

// Tools multi-select sync
(() => {
  const group = document.getElementById("toolsGroup");
  const hidden = document.getElementById("toolsSelected");
  const clearBtn = document.getElementById("toolsClear");
  if (!group || !hidden) return;

  const sync = () => {
    hidden.value = [...group.querySelectorAll("input:checked")]
      .map(i => i.value).join(", ");
  };

  group.addEventListener("change", sync);
  if (clearBtn) clearBtn.onclick = () => {
    group.querySelectorAll("input").forEach(i => i.checked = false);
    sync();
  };
})();
