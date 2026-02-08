(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const isReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onReady = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
      return;
    }
    fn();
  };

  const createInViewObserver = ({ threshold, rootMargin, onEnter }) => {
    if (!("IntersectionObserver" in window)) {
      return {
        observe: (el) => onEnter(el),
        unobserve: () => {},
        disconnect: () => {},
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          onEnter(entry.target, entry);
          observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin },
    );

    return observer;
  };

  const initScrollReveal = () => {
    const targets = $$("section, footer");
    if (!targets.length) return;

    if (isReducedMotion) {
      targets.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = createInViewObserver({
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
      onEnter: (el) => el.classList.add("is-revealed"),
    });

    targets.forEach((el) => {
      el.classList.add("js-reveal");
      observer.observe(el);
    });
  };

  const initContactForm = () => {
    const contactForm = $("#contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        course: formData.get("course"),
        message: formData.get("message"),
      };

      if (!/^1[3-9]\d{9}$/.test(String(data.phone || ""))) {
        alert("请输入有效的手机号码");
        return;
      }

      console.log("Form submitted:", data);
      alert("提交成功！我们将在30分钟内联系您。");
      contactForm.reset();
    });
  };

  const initMobileNav = () => {
    const mobileToggle = $(".mobile-toggle");
    const navMenu = $(".nav-menu");
    if (!mobileToggle || !navMenu) return;

    const closeMenu = () => {
      navMenu.classList.remove("active");
      mobileToggle.classList.remove("active");
    };

    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileToggle.classList.toggle("active");
    });

    $$("a", navMenu).forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.classList.contains("active")) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (navMenu.contains(target) || mobileToggle.contains(target)) return;
      closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 769px)").matches) closeMenu();
    });
  };

  const initHeaderScrollState = () => {
    const header = $(".header");
    if (!header) return;

    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 100);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
  };

  const initSmoothScroll = () => {
    const header = $(".header");
    const getHeaderHeight = () => (header ? header.offsetHeight : 0);

    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        const target = $(href);
        if (!target) return;

        e.preventDefault();

        const y =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          getHeaderHeight();

        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  };

  const initTestimonialsMarquee = () => {
    const track = $(".testimonial-track");
    if (!track) return;

    Array.from(track.children).forEach((card) => {
      track.appendChild(card.cloneNode(true));
    });

    track.addEventListener("mouseenter", () => {
      track.classList.add("is-paused");
    });

    track.addEventListener("mouseleave", () => {
      track.classList.remove("is-paused");
    });
  };

  const parseCounterSpec = (el) => {
    const rawText = String(el.textContent || "").trim();
    const rawTarget = el.getAttribute("data-target");
    const rawSuffix = el.getAttribute("data-suffix");

    if (rawTarget) {
      const value = Number(rawTarget);
      if (!Number.isFinite(value)) return null;
      return {
        value,
        suffix: rawSuffix ?? "",
        finalText: `${Math.round(value)}${rawSuffix ?? ""}`,
      };
    }

    const value = Number(rawText.replace(/[^0-9]/g, ""));
    if (!Number.isFinite(value)) return null;
    const suffix = rawText.includes("%")
      ? "%"
      : rawText.includes("+")
        ? "+"
        : "";

    return { value, suffix, finalText: rawText };
  };

  const animateNumber = ({ el, value, suffix, finalText }) => {
    if (isReducedMotion) {
      el.textContent = finalText;
      return;
    }

    const durationMs = 900;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(value * eased);
      el.textContent = `${current}${suffix}`;

      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = finalText;
    };

    requestAnimationFrame(tick);
  };

  const initStatCounters = () => {
    const statNumbers = $$(".stat-number");
    if (!statNumbers.length) return;

    const observer = createInViewObserver({
      threshold: 0.5,
      rootMargin: "0px",
      onEnter: (el) => {
        const spec = parseCounterSpec(el);
        if (!spec) return;
        animateNumber({ el, ...spec });
      },
    });

    statNumbers.forEach((el) => observer.observe(el));
  };

  const initHeroParallax = () => {
    const floatingCards = $$(".floating-card");
    if (!floatingCards.length) return;
    if (isReducedMotion) return;

    let rafId = 0;
    let lastX = 0;
    let lastY = 0;

    const update = () => {
      rafId = 0;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 0.01;
        const x = (lastX - centerX) * speed;
        const y = (lastY - centerY) * speed;

        card.style.setProperty("--parallax-x", `${x}px`);
        card.style.setProperty("--parallax-y", `${y}px`);
      });
    };

    window.addEventListener(
      "mousemove",
      (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        if (rafId) return;
        rafId = requestAnimationFrame(update);
      },
      { passive: true },
    );
  };

  const initAnalytics = () => {
    const getSectionLabel = (section) =>
      section.getAttribute("data-section") ||
      section.id ||
      String(section.className || "").split(" ")[0] ||
      "section";

    const logSectionView = (section) => {
      console.log("Section viewed:", getSectionLabel(section));
    };

    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const cta = target.closest(
        '[data-analytics="cta"], .cta-button, .nav-cta',
      );
      if (cta)
        console.log("CTA clicked:", String(cta.textContent || "").trim());
    });

    const sections = $$("section");
    if (!sections.length) return;

    if (!("IntersectionObserver" in window)) {
      sections.forEach(logSectionView);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          logSectionView(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => observer.observe(section));
  };

  const printConsoleArt = () => {
    console.log(
      `
%c
███████╗ █████╗  ██████╗ ██╗     ███████╗███████╗██╗      █████╗ ██████╗
██╔════╝██╔══██╗██╔════╝ ██║     ██╔════╝██╔════╝██║     ██╔══██╗██╔══██╗
█████╗  ███████║██║  ███╗██║     █████╗  ███████╗██║     ███████║██████╔╝
██╔══╝  ██╔══██║██║   ██║██║     ██╔══╝  ╚════██║██║     ██╔══██║██╔══██╗
███████╗██║  ██║╚██████╔╝███████╗███████╗███████║███████╗██║  ██║██████╔╝
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝

%c专注大学生升学和就业的解决方案
%c10年经验 | 2000+学员 | 85%就业率 | 95%升学率

`,
      "color: #8b5cf6; font-weight: bold;",
      "color: #06b6d4; font-size: 14px;",
      "color: #f59e0b; font-size: 12px;",
    );
  };

  onReady(() => {
    initScrollReveal();
    initContactForm();
    initMobileNav();
    initHeaderScrollState();
    initSmoothScroll();
    initTestimonialsMarquee();
    initStatCounters();
    initHeroParallax();
    initAnalytics();
    printConsoleArt();
  });
})();
