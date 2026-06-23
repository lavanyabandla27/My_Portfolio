/* 
  animations.js
  Lavanya Sai Bandla Portfolio - Advanced Visual Interactions
*/

document.addEventListener('DOMContentLoaded', () => {
  // Initialize standard elements animations
  initCustomCursor();
  initBackgroundParticles();
  initTypewriter();
  initScrollAnimations();
  
  // Apply 3D card tilt for static elements on page load
  if (typeof window.applyTiltEffect === 'function') {
    window.applyTiltEffect(document.querySelectorAll('.tilt-card'));
  }
});

/* 3D Card Tilt Function (Exported globally) */
window.applyTiltEffect = function (elements) {
  elements.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Maximum tilt angle (10 degrees)
      const rotateX = ((centerY - y) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
};

/* Custom Cursor with smooth LERP tracking */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (!cursor || !cursorDot) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  // Track real mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  // Smooth LERP (Linear Interpolation) animation loop
  function lerpCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.15;
    cursorY += dy * 0.15;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(lerpCursor);
  }
  requestAnimationFrame(lerpCursor);

  // Hover animations using event delegation (for elements loaded via JS later)
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .social-icon-btn, .filter-btn, .btn-premium, .interactive-card, input, textarea, select');
    if (target) {
      cursor.style.width = '60px';
      cursor.style.height = '60px';
      cursor.style.borderColor = 'var(--accent-secondary)';
      cursor.style.backgroundColor = 'rgba(var(--accent-secondary-rgb), 0.05)';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .social-icon-btn, .filter-btn, .btn-premium, .interactive-card, input, textarea, select');
    if (target) {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderColor = 'var(--accent-color)';
      cursor.style.backgroundColor = 'transparent';
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });

  // Track clicking states
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

/* Typewriter animation on the home page hero */
function initTypewriter() {
  const element = document.querySelector('.typewriter-text');
  if (!element) return;

  const roles = JSON.parse(element.getAttribute('data-roles') || '[]');
  if (roles.length === 0) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 100;

  function type() {
    const currentText = roles[roleIndex];

    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      speed = 50; // Deleting is faster
    } else {
      element.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      speed = 100; // Normal typing speed
    }

    // Toggle conditions
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      speed = 2000; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 500; // Pause before typing next word
    }

    setTimeout(type, speed);
  }

  setTimeout(type, 800);
}

/* Background floating particle generators */
function initBackgroundParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const particleChars = ['0', '1', '{', '}', '<', '>', 'java', 'python', 'aws', 'code', '[]', '()', '&&', '||', 'db'];
  const count = 25;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-element';
    particle.textContent = particleChars[Math.floor(Math.random() * particleChars.length)];
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.fontSize = `${Math.random() * 0.7 + 0.8}rem`;

    // Animations config
    const duration = Math.random() * 10 + 8; // 8 to 18 seconds
    const delay = Math.random() * 5;

    particle.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;
    container.appendChild(particle);
  }
}

/* Intersection Observer animations for scroll, progress bars, and counters */
function initScrollAnimations() {
  // 1. Reveal on scroll
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  scrollElements.forEach(el => scrollObserver.observe(el));

  // 2. Skill Progress Bars reveal animation
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetPercent = fill.getAttribute('data-width');
        fill.style.width = targetPercent;
        progressObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.1 });

  progressBars.forEach(bar => progressObserver.observe(bar));

  // 3. Counter increment animation
  const counters = document.querySelectorAll('.counter-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const targetValue = parseInt(counter.getAttribute('data-target') || '0');
        const duration = 2000; // ms
        let startTime = null;

        function updateCounter(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const currentVal = Math.min(Math.floor((elapsed / duration) * targetValue), targetValue);

          counter.textContent = currentVal;

          if (elapsed < duration) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = targetValue;
          }
        }

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => counterObserver.observe(c));
}
