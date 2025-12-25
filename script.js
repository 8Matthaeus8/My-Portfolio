// Toggle Hamburger Menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  // If menu is opening
  if (!menu.classList.contains("open")) {
    menu.classList.remove("closing");
    menu.classList.add("open");
    icon.classList.add("open");
    return;
  }

  // If menu is closing (play animation)
  menu.classList.add("closing");
  menu.classList.remove("open");
  icon.classList.remove("open");

  // After animation ends, remove closing state
  setTimeout(() => {
    menu.classList.remove("closing");
  }, 260);
}


// View Full Image
function viewFullImage(button) {
  const projectImg = button.closest(".details-container").querySelector(".project-img");
  const fullImageUrl = projectImg.getAttribute("data-full-image");

  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("image-overlay");
  document.body.appendChild(overlay);

  // Prevent background scroll
  document.body.style.overflow = "hidden";

  // Create full image container
  const fullImageContainer = document.createElement("div");
  fullImageContainer.classList.add("full-image-container");
  overlay.appendChild(fullImageContainer);

  // Create full image
  const fullImage = document.createElement("img");
  fullImage.src = fullImageUrl;
  fullImageContainer.appendChild(fullImage);

  // Create close button
  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";
  fullImageContainer.appendChild(closeButton);

  // Close functionality
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target === closeButton) {
      document.body.style.overflow = "";
      document.body.removeChild(overlay);
    }
  });
}

// View Project Description
document.addEventListener("DOMContentLoaded", () => {
  // ScrollReveal (safe if CDN fails)
  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      origin: "bottom",
      distance: "60px",
      duration: 1000,
      delay: 200,
      reset: false,
    });

    // Reveal section titles first
    sr.reveal(".section__text__p1, .title", { interval: 100 });

    // Reveal skill cards
    sr.reveal(".skill-card", {
      interval: 150,
      distance: "100px",
      scale: 0.85,
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      viewFactor: 0.2,
    });

    // Reveal project cards
    sr.reveal(".details-container", { interval: 200 });
  }

  // ✅ Nav underline follows scroll + click (desktop + hamburger)
  const sections = document.querySelectorAll("section");
  const navLinksDesktop = document.querySelectorAll(".nav-links a");
  const navLinksMobile = document.querySelectorAll(".menu-links a");
  const navLinks = [...navLinksDesktop, ...navLinksMobile];

  let manualTargetId = null;

  const setActive = (id) => {
    navLinksDesktop.forEach((link) => link.classList.remove("active"));
    navLinksDesktop.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
    });
  };

  // ✅ Close hamburger menu helper (used by click + outside click)
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const hamburgerMenu = document.querySelector(".hamburger-menu");

  const closeMenu = () => {
    if (!menu || !icon) return;
    menu.classList.remove("open");
    icon.classList.remove("open");
  };

  // ✅ Instant underline on click (smooth scroll handled by CSS)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      manualTargetId = link.getAttribute("href").replace("#", "");
      setActive(manualTargetId);

      // ✅ if user clicked a mobile menu link, close dropdown
      closeMenu();
    });
  });

  // ✅ Observe ALL sections so underline updates while user scrolls
  const observer = new IntersectionObserver(
    (entries) => {
      // If user clicked nav, wait until that target section is reached
      if (manualTargetId) {
        const reachedTarget = entries.some(
          (e) => e.isIntersecting && e.target.id === manualTargetId
        );

        if (reachedTarget) {
          setActive(manualTargetId);
          manualTargetId = null;
        }
        return;
      }

      // Normal scrolling: most visible section wins
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) setActive(visible.target.id);
    },
    {
      threshold: [0.25, 0.4, 0.55, 0.7, 0.85],
    }
  );

  sections.forEach((section) => observer.observe(section));

  // ✅ Correct underline on refresh / reload
  const currentHash = window.location.hash.replace("#", "");
  setActive(currentHash || "profile");

  // ✅ Close when clicking outside the hamburger area
  document.addEventListener("click", (e) => {
    if (!menu || !icon || !hamburgerMenu) return;

    const clickedInside = hamburgerMenu.contains(e.target);

    if (menu.classList.contains("open") && !clickedInside) {
      closeMenu();
    }
  });

  // ✅ Close when pressing ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});

