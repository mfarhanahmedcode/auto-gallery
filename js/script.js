const header = document.querySelector("#site-header");
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");

// Close mobile menu
function closeMenu() {
  header.classList.remove("nav-open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute(
    "aria-label",
    "Open navigation menu"
  );
}

// Hamburger toggle
menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// Close menu after clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Detect current section while scrolling
const sections = document.querySelectorAll(
  "main section[id]"
);

const observer = new IntersectionObserver(
  (entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort(
        (a, b) =>
          b.intersectionRatio - a.intersectionRatio
      );

    if (!visibleSections.length) return;

    const currentId = visibleSections[0].target.id;

    navLinks.forEach((link) => {
      const isActive =
        link.getAttribute("href") === `#${currentId}`;

      link.classList.toggle("active", isActive);
    });
  },
  {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
  }
);

sections.forEach((section) => observer.observe(section));

// Navbar background on scroll
function updateNavbar() {
  header.classList.toggle("scrolled", window.scrollY > 50);
}

window.addEventListener("scroll", updateNavbar, {
  passive: true
});

updateNavbar();

// Close menu with Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header.classList.contains("nav-open")) {
    closeMenu();
    menuToggle.focus();
  }
});

// Close mobile menu when returning to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMenu();
  }
});