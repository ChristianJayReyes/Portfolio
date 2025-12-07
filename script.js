window.addEventListener("load", () => {
  const welcomeScreen = document.getElementById("welcome-screen");
  const mainContent = document.getElementById("main-content");

  // Wait 3 seconds before showing the landing page
  setTimeout(() => {
    welcomeScreen.style.display = "none";
    mainContent.style.display = "block";
  }, 3000);
});

// Role Text Animation
const roleElement = document.getElementById("role");
if (roleElement) {
  const roles = ["FULL STACK DEVELOPER", "SOFTWARE DEVELOPER"];
  let currentIndex = 0;

  // Smooth role changing animation every 3 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % roles.length;
    roleElement.style.opacity = 0;
    setTimeout(() => {
      roleElement.innerText = roles[currentIndex];
      roleElement.style.color = "#ff8e8e";
      roleElement.style.opacity = 1;
    }, 400);
  }, 3000);
}

// Dark / Light Mode Toggle
const inputEl = document.getElementById("dark-mode");
const bodyEl = document.body;

// Restore saved mode (if exists)
const savedMode = JSON.parse(localStorage.getItem("mode"));
if (savedMode !== null) {
  inputEl.checked = savedMode;
  updateTheme();
} else {
  inputEl.checked = true; // default: dark mode
  updateTheme();
}

inputEl.addEventListener("input", () => {
  updateTheme();
  localStorage.setItem("mode", JSON.stringify(inputEl.checked));
});

function updateTheme() {
  const isDark = inputEl.checked;

  // Smooth transition
  document.documentElement.style.transition = "background-color 0.4s ease, color 0.4s ease";

  if (isDark) {
    // Dark Mode
    bodyEl.style.backgroundColor = "#0a0a0a";
    bodyEl.style.color = "white";
    bodyEl.classList.remove("light-mode");
    bodyEl.classList.add("dark-mode");
    document.querySelectorAll(".nav-links a").forEach(a => a.style.color = "white");
    document.querySelectorAll(".icon").forEach(icon => {
      if (icon.alt === "GitHub") {
        icon.style.filter = "invert(1) brightness(1.3)";
      } else {
        icon.style.filter = "grayscale(100%) brightness(0.9)";
      }
    });
    if (document.getElementById("name")) document.getElementById("name").style.color = "white";
    if (document.getElementById("me")) document.getElementById("me").style.color = "white";
    // Update form inputs
    document.querySelectorAll(".form-group input, .form-group textarea").forEach(input => {
      input.style.color = "#fff";
      input.style.background = "rgba(255, 255, 255, 0.05)";
    });
    // Update social links
    document.querySelectorAll(".social-link").forEach(link => {
      link.style.color = "#fff";
      link.style.background = "rgba(255, 255, 255, 0.05)";
    });
  } else {
    // Light Mode
    bodyEl.style.backgroundColor = "#f5f5f5";
    bodyEl.style.color = "#111";
    bodyEl.classList.remove("dark-mode");
    bodyEl.classList.add("light-mode");
    document.querySelectorAll(".nav-links a").forEach(a => a.style.color = "#333");
    document.querySelectorAll(".icon").forEach(icon => icon.style.filter = "none");
    if (document.getElementById("name")) document.getElementById("name").style.color = "#111";
    if (document.getElementById("me")) document.getElementById("me").style.color = "#111";
    // Update form inputs
    document.querySelectorAll(".form-group input, .form-group textarea").forEach(input => {
      input.style.color = "#333";
      input.style.background = "rgba(0, 0, 0, 0.05)";
    });
    // Update social links
    document.querySelectorAll(".social-link").forEach(link => {
      link.style.color = "#333";
      link.style.background = "rgba(0, 0, 0, 0.05)";
    });
  }
}

// ===============================
// Mobile Menu Toggle
// ===============================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  });

  // Close menu button functionality
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', function() {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  }

  // Close menu when clicking on a link
  const navLinkItems = navLinks.querySelectorAll('a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside or on overlay
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);
    
    // Check if click is on the overlay (body::after pseudo-element area)
    // Since we can't directly detect ::after clicks, we check if it's outside nav and toggle
    if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  });

  // Also close menu when clicking on the overlay area (using mousedown for better detection)
  document.addEventListener('mousedown', function(event) {
    if (navLinks.classList.contains('active')) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnToggle = mobileMenuToggle.contains(event.target);
      const isClickOnNav = event.target.closest('nav');
      
      // If click is outside nav area, close menu
      if (!isClickInsideNav && !isClickOnToggle && !isClickOnNav) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
      }
    }
  });
}
