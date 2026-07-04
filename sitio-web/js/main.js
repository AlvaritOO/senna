/* ============================================================
   SENNA — interacciones y animaciones
   ============================================================ */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     Preloader
     ---------------------------------------------------------- */
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    const hide = () => preloader.classList.add("is-done");
    if (reduceMotion) {
      hide();
    } else {
      window.addEventListener("load", () => setTimeout(hide, 650));
      // Respaldo por si 'load' tarda demasiado (imágenes lentas)
      setTimeout(hide, 3200);
    }
  }

  /* ----------------------------------------------------------
     Navegación: fondo sólido al hacer scroll + menú móvil
     ---------------------------------------------------------- */
  const nav = document.querySelector(".nav");
  const onScrollNav = () => {
    if (!nav) return;
    nav.classList.toggle("is-solid", window.scrollY > 40);
  };
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  const burger = document.querySelector(".nav__burger");
  const links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      })
    );
  }

  /* ----------------------------------------------------------
     Reveal on scroll (IntersectionObserver)
     ---------------------------------------------------------- */
  const revealables = document.querySelectorAll(".reveal, .draw-line");
  if (reduceMotion) {
    revealables.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach((el) => io.observe(el));
  }

  /* ----------------------------------------------------------
     Contadores animados
     ---------------------------------------------------------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    const animate = (el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const dur = 1600;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      counters.forEach((el) => (el.textContent = el.dataset.count));
    } else {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              animate(e.target);
              cio.unobserve(e.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => cio.observe(el));
    }
  }

  /* ----------------------------------------------------------
     Parallax suave en bandas editoriales
     ---------------------------------------------------------- */
  const bands = document.querySelectorAll(".band__bg");
  if (bands.length && !reduceMotion) {
    let raf = null;
    const update = () => {
      raf = null;
      const vh = window.innerHeight;
      bands.forEach((bg) => {
        const rect = bg.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -1..1
        bg.style.transform = "translateY(" + (progress * -9).toFixed(2) + "%)";
      });
    };
    window.addEventListener(
      "scroll",
      () => {
        if (raf === null) raf = requestAnimationFrame(update);
      },
      { passive: true }
    );
    update();
  }

  /* ----------------------------------------------------------
     Lightbox de galería
     ---------------------------------------------------------- */
  const galleryItems = Array.from(document.querySelectorAll(".galeria__item"));
  const lightbox = document.querySelector(".lightbox");

  if (galleryItems.length && lightbox) {
    const imgEl = lightbox.querySelector("img");
    const countEl = lightbox.querySelector(".lightbox__count");
    let index = 0;

    const show = (i) => {
      index = (i + galleryItems.length) % galleryItems.length;
      const src = galleryItems[index].querySelector("img");
      imgEl.src = src.dataset.full || src.src;
      imgEl.alt = src.alt || "";
      if (countEl) countEl.textContent = (index + 1) + " / " + galleryItems.length;
    };

    const open = (i) => {
      show(i);
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    galleryItems.forEach((item, i) =>
      item.addEventListener("click", () => open(i))
    );

    lightbox.querySelector(".lightbox__close").addEventListener("click", close);
    lightbox.querySelector(".lightbox__prev").addEventListener("click", () => show(index - 1));
    lightbox.querySelector(".lightbox__next").addEventListener("click", () => show(index + 1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
  }

  /* ----------------------------------------------------------
     Año dinámico en footer
     ---------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
