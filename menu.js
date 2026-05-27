document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("primary-navigation");
  const toggle = document.querySelector(".menu-toggle");

  if (!nav || !toggle) {
    return;
  }

  const media = window.matchMedia("(max-width: 900px)");
  const links = nav.querySelectorAll("a");

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú principal" : "Abrir menú principal");
  };

  setOpen(false);

  toggle.addEventListener("click", () => {
    setOpen(!nav.classList.contains("is-open"));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (media.matches) {
        setOpen(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (!media.matches) {
      setOpen(false);
    }
  });
});
