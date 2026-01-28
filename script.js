// ==================== Scroll Animations ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Animate sections on scroll
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("section, footer");
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    animateOnScroll.observe(el);
  });
});

// ==================== FAQ Accordion ====================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all FAQ items
    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      const answer = faq.querySelector(".faq-answer");
      answer.style.maxHeight = "0";
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active");
      const answer = item.querySelector(".faq-answer");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// ==================== Form Submission ====================
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    course: formData.get("course"),
    message: formData.get("message"),
  };

  // Validate phone number
  if (!/^1[3-9]\d{9}$/.test(data.phone)) {
    alert("请输入有效的手机号码");
    return;
  }

  // Here you would normally send data to your backend
  console.log("Form submitted:", data);

  // Show success message
  alert("提交成功！我们将在30分钟内联系您。");

  // Reset form
  contactForm.reset();

  // In production, you would do something like:
  /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert('提交成功！我们将在30分钟内联系您。');
        contactForm.reset();
    })
    .catch(error => {
        alert('提交失败，请稍后重试或直接联系我们。');
        console.error('Error:', error);
    });
    */
});

// ==================== Mobile Menu Toggle ====================
const mobileToggle = document.querySelector(".mobile-toggle");
const navMenu = document.querySelector(".nav-menu");

mobileToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileToggle.classList.remove("active");
  });
});

// ==================== Header Scroll Effect ====================
let lastScroll = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.background = "rgba(10, 10, 31, 0.95)";
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
  } else {
    header.style.background = "rgba(10, 10, 31, 0.8)";
    header.style.boxShadow = "none";
  }

  lastScroll = currentScroll;
});

// ==================== Smooth Scroll for Anchor Links ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ==================== Testimonial Slider (duplicate for infinite scroll) ====================
const testimonialTrack = document.querySelector(".testimonial-track");
if (testimonialTrack) {
  const testimonialCards = Array.from(testimonialTrack.children);

  // Duplicate cards for infinite scroll effect
  testimonialCards.forEach((card) => {
    const clone = card.cloneNode(true);
    testimonialTrack.appendChild(clone);
  });

  // Pause animation on hover
  testimonialTrack.addEventListener("mouseenter", () => {
    testimonialTrack.style.animationPlayState = "paused";
  });

  testimonialTrack.addEventListener("mouseleave", () => {
    testimonialTrack.style.animationPlayState = "running";
  });
}

// ==================== Dynamic Stat Counter ====================
const animateCounters = () => {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = stat.textContent;
    const isPercentage = target.includes("%");
    const isPlus = target.includes("+");
    const numericValue = parseInt(target.replace(/[^0-9]/g, ""));

    let current = 0;
    const increment = numericValue / 50;

    const updateCounter = () => {
      if (current < numericValue) {
        current += increment;
        stat.textContent =
          Math.ceil(current) + (isPercentage ? "%" : "") + (isPlus ? "+" : "");
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };

    // Start animation when element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(stat);
  });
};

// Initialize counter animation
animateCounters();

// ==================== Parallax Effect for Hero Visual ====================
const floatingCards = document.querySelectorAll(".floating-card");

window.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  floatingCards.forEach((card, index) => {
    const speed = (index + 1) * 0.01;
    const x = (clientX - centerX) * speed;
    const y = (clientY - centerY) * speed;

    card.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ==================== Loading Animation ====================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ==================== Analytics Event Tracking ====================
// Track CTA button clicks
const ctaButtons = document.querySelectorAll(".cta-button, .nav-cta");
ctaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Log analytics event
    console.log("CTA clicked:", button.textContent.trim());

    // In production with Google Analytics:
    /*
        gtag('event', 'cta_click', {
            'event_category': 'engagement',
            'event_label': button.textContent.trim()
        });
        */
  });
});

// Track section views
const trackSectionViews = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionName = entry.target.className.split(" ")[0];
        console.log("Section viewed:", sectionName);

        // In production with Google Analytics:
        /*
            gtag('event', 'section_view', {
                'event_category': 'engagement',
                'event_label': sectionName
            });
            */
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll("section").forEach((section) => {
  trackSectionViews.observe(section);
});

// ==================== Console Art ====================
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
