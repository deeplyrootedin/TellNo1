(function themeInit(){
  const root = document.documentElement;
  const saved = localStorage.getItem("theme") || "auto";
  const mq = window.matchMedia("(prefers-color-scheme: dark)");

  function apply(mode){
    const effective = (mode === "auto") ? (mq.matches ? "dark" : "light") : mode;
    root.setAttribute("data-theme", effective);

    const btn = document.getElementById("themeToggle");
    if(btn){
      btn.dataset.mode = mode;
      const label = btn.querySelector("[data-theme-label]");
      if(label) label.textContent = mode.toUpperCase();
      btn.setAttribute("aria-label", `Theme: ${mode}. Active: ${effective}. Click to cycle.`);
    }
  }

  function cycle(){
    const current = localStorage.getItem("theme") || "auto";
    const next = current === "auto" ? "dark" : (current === "dark" ? "light" : "auto");
    localStorage.setItem("theme", next);
    apply(next);
  }

  apply(saved);
  mq.addEventListener("change", ()=>{
    const now = localStorage.getItem("theme") || "auto";
    if(now === "auto") apply("auto");
  });

  window.__tellno1ThemeCycle = cycle;
})();

(function mobileNav(){
  const btn = document.getElementById("mobileMenuButton");
  const nav = document.getElementById("mobileNav");
  const openIcon = document.getElementById("mobileMenuIconOpen");
  const closeIcon = document.getElementById("mobileMenuIconClose");
  if(!btn || !nav) return;
  let open = false;
  btn.addEventListener("click", ()=>{
    open = !open;
    nav.style.maxHeight = open ? nav.scrollHeight + "px" : "0px";
    if(openIcon && closeIcon){
      openIcon.classList.toggle("hidden", open);
      closeIcon.classList.toggle("hidden", !open);
    }
  });
})();

(function year(){
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();
})();

window.tellno1HandleFormSubmit = function(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  const button = form.querySelector("[data-submit]");
  const status = form.querySelector("[data-status]");

  if(button){
    button.disabled = true;
    button.classList.add("opacity-80","cursor-not-allowed");
    const label = button.querySelector("span");
    if(label) label.textContent = "Sending…";
  }

  setTimeout(()=>{
    if(button){
      const label = button.querySelector("span");
      if(label) label.textContent = "Sent";
    }
    if(status){
      status.textContent = "Received. We’ll respond with a short plan + next steps within one business day.";
      status.classList.add("text-emerald-600");
    }
  }, 850);
};
