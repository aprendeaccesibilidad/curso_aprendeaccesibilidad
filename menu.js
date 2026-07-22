document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("primary-navigation");
  const toggle = document.querySelector(".menu-toggle");
  const media = window.matchMedia("(max-width: 900px)");

  if (nav && toggle) {
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
  }

  const moduleSidebarLinks = Array.from(
    document.querySelectorAll('body[class^="page-module-"] .sidebar nav a[href^="#"]')
  );

  if (moduleSidebarLinks.length) {
    const sections = moduleSidebarLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    let activeId = "";
    let ticking = false;

    const setActive = (id) => {
      activeId = id;

      moduleSidebarLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        if (isActive) {
          link.setAttribute("aria-current", "location");
          link.classList.add("is-current");
        } else {
          link.removeAttribute("aria-current");
          link.classList.remove("is-current");
        }
      });
    };

    const updateActive = () => {
      const threshold = 180;
      let current = sections[0]?.id || "";

      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top <= threshold) {
          current = section.id;
        }
      });

      if (!current && location.hash) {
        current = location.hash.slice(1);
      }

      if (current && current !== activeId) {
        setActive(current);
      }
    };

    const scheduleUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        updateActive();
      });
    };

    setActive(location.hash ? location.hash.slice(1) : sections[0]?.id || "");
    updateActive();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", () => {
      setActive(location.hash ? location.hash.slice(1) : sections[0]?.id || "");
      scheduleUpdate();
    });
  }

  const faqToggle = document.querySelector("[data-faq-toggle]");
  const faqItems = Array.from(document.querySelectorAll(".faq-list .faq-item"));

  if (faqToggle && faqItems.length) {
    const faqLabel = faqToggle.querySelector(".faq-toggle-label");
    let faqOpen = true;

    const setFaqState = (open) => {
      faqOpen = open;
      faqItems.forEach((item) => {
        item.open = open;
      });

      if (faqLabel) {
        faqLabel.textContent = open ? "Plegar todas" : "Abrir todas";
      } else {
        faqToggle.textContent = open ? "Plegar todas" : "Abrir todas";
      }

      faqToggle.setAttribute("aria-expanded", String(open));
    };

    setFaqState(true);

    faqToggle.addEventListener("click", (event) => {
      event.preventDefault();
      setFaqState(!faqOpen);
    });
  }
});
