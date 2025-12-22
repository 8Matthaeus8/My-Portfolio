// Toggle Hamburger Menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// View Full Image
function viewFullImage(button) {
  const projectImg = button.closest('.details-container').querySelector('.project-img');
  const fullImageUrl = projectImg.getAttribute('data-full-image');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.classList.add('image-overlay');
  document.body.appendChild(overlay);

  // Create full image container
  const fullImageContainer = document.createElement('div');
  fullImageContainer.classList.add('full-image-container');
  overlay.appendChild(fullImageContainer);

  // Create full image
  const fullImage = document.createElement('img');
  fullImage.src = fullImageUrl;
  fullImageContainer.appendChild(fullImage);

  // Create close button
  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  fullImageContainer.appendChild(closeButton);

  // Close functionality
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target === closeButton) {
      document.body.removeChild(overlay);
    }
  });
}

// View Project Description
function viewDescription(button, descriptionText) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.classList.add('image-overlay');
  document.body.appendChild(overlay);

  // Create description container (using the NEW class)
  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('description-container'); // Changed this line
  overlay.appendChild(descriptionContainer);

  // Add description text
  const paragraph = document.createElement('p');
  paragraph.style.whiteSpace = 'pre-line'; 
  paragraph.textContent = descriptionText;
  descriptionContainer.appendChild(paragraph);

  // Add close button
  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  descriptionContainer.appendChild(closeButton);

  // Close functionality
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target === closeButton) {
      document.body.removeChild(overlay);
    }
  });
}
