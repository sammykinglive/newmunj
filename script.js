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