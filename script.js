// Toggle Hamburger Menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
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
function viewDescription(button, descriptionText) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("image-overlay");
  document.body.appendChild(overlay);

  // Prevent background scroll
  document.body.style.overflow = "hidden";

  // Create description container
  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("description-container");
  overlay.appendChild(descriptionContainer);

  // Add description text
  const paragraph = document.createElement("p");
  paragraph.style.whiteSpace = "pre-line";
  paragraph.textContent = descriptionText;
  descriptionContainer.appendChild(paragraph);

  // Add close button
  const closeButton = document.createElement("span");
  closeButton.classList.add("close-button");
  closeButton.innerHTML = "&times;";
  descriptionContainer.appendChild(closeButton);

  // Close functionality
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target === closeButton) {
      document.body.style.overflow = "";
      document.body.removeChild(overlay);
    }
  });
}

// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if ScrollReveal is defined (prevents errors if the CDN fails)
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

    // Reveal the vertical ovals with a staggered upward "growth" effect
    sr.reveal(".skill-card", {
      interval: 150,
      distance: "100px",
      scale: 0.85,
      easing: "cubic-bezier(0.5, 0, 0, 1)",
      viewFactor: 0.2, // Animates when 20% of the element is visible
    });

    // Reveal project cards
    sr.reveal(".details-container", { interval: 200 });
  }
});
