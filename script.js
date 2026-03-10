// script.js - complete interactive functionality for Aethel Vault

// ---------- HERO SLIDESHOW ----------
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = slides.length;
let slideInterval;

// function to show slide by index
function showSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

function nextSlide() {
  showSlide(currentSlide + 1);
  resetSlideTimer();
}

function prevSlide() {
  showSlide(currentSlide - 1);
  resetSlideTimer();
}

function resetSlideTimer() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 6000); // 6s auto
}

// start auto slideshow
slideInterval = setInterval(nextSlide, 6000);

// event listeners for arrows
if (prevBtn) prevBtn.addEventListener('click', prevSlide);
if (nextBtn) nextBtn.addEventListener('click', nextSlide);

// dots click
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    showSlide(idx);
    resetSlideTimer();
  });
});

// ---------- SCROLL REVEAL (Intersection Observer) ----------
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // optional: keep observing if you want to keep active (no remove)
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---------- MEMBER LOGIN SIMULATION (view assets) ----------
const loginForm = document.getElementById('memberLoginForm');
const assetDisplay = document.getElementById('assetDisplay');

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();  // prevent actual submit

    // simple simulation: any non-empty credentials reveal assets
    const memberId = document.getElementById('memberId').value.trim();
    const vaultPin = document.getElementById('vaultPin').value.trim();

    if (memberId !== '' && vaultPin !== '') {
      // show asset panel (if hidden)
      if (assetDisplay) {
        assetDisplay.style.display = 'block';
        // optional smooth scroll to asset area
        assetDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      alert('Please enter both Member ID and PIN (demo accepts any values)');
      // for demo still show if they want? we'll enforce non-empty only.
    }
  });
}

// optional: prefill for demo convenience
window.addEventListener('load', function() {
  const idField = document.getElementById('memberId');
  const pinField = document.getElementById('vaultPin');
  if (idField && pinField) {
    // just placeholder hints, not prefilled to avoid confusion
  }
});

// ---------- SMOOTH SCROLL FOR INTERNAL LINKS (optional) ----------
document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// tiny extra: close mobile menu hypothetical (no mobile menu, but keeps clean)
// also handle login trigger from nav: focus login panel
const loginTrigger = document.querySelector('.login-trigger');
if (loginTrigger) {
  loginTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    const loginSection = document.getElementById('login');
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: 'smooth' });
      // optional focus on first input
      setTimeout(() => {
        document.getElementById('memberId')?.focus();
      }, 600);
    }
  });
}







// Add to your existing JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Check URL for contact form status
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.has('contact_success')) {
        alert('Thank you! Your message has been sent successfully.');
        // Remove parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname + '#contact');
    }
    
    if (urlParams.has('contact_error')) {
        alert('Error: ' + urlParams.get('contact_error'));
        window.history.replaceState({}, document.title, window.location.pathname + '#contact');
    }
});



// Mobile Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const body = document.body;
  
  if (menuToggle && mainNav) {
    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
    
    // Prevent scroll when menu is open
    mainNav.addEventListener('touchmove', function(e) {
      if (mainNav.classList.contains('active')) {
        e.stopPropagation();
      }
    }, { passive: false });
  }
  
  // Highlight active menu item based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.main-nav a');
  
  function highlightActiveSection() {
    let scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightActiveSection);
  highlightActiveSection(); // Call once on load
});






