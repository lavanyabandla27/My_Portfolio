/* 
  main.js
  Lavanya Sai Bandla Portfolio - Core Page Logics
*/

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbarScroll();
  initActiveNavLink();
  initScrollProgressBar();
  initBackToTop();
  initContactForm();
});

/* Page Loading Screen Hide */
function initLoader() {
  const loader = document.getElementById('loader-wrapper');
  if (!loader) return;
  
  // Hide loader after full window load
  window.addEventListener('load', () => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
  });

  // Fallback in case window load takes too long
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
  }, 1500);
}

/* Navbar Scrolled Styling Toggle */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* Active Navigation Link Matching */
function initActiveNavLink() {
  const path = window.location.pathname;
  let page = path.split('/').pop();
  
  // Default to index.html if path is empty or base dir
  if (page === '' || !page) {
    page = 'index.html';
  }

  const navLinks = document.querySelectorAll('.nav-link-custom');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* Page Scroll Progress Tracker */
function initScrollProgressBar() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (height > 0) {
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    } else {
      progressBar.style.width = '0%';
    }
  });
}

/* Back to Top Floating Button */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* Contact Form Validation and Success Animation Trigger */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Reset validations
    resetValidation(nameInput);
    resetValidation(emailInput);
    resetValidation(subjectInput);
    resetValidation(messageInput);

    // Name Validate
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Name is required.');
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      showError(nameInput, 'Name must be at least 2 characters.');
      isValid = false;
    }

    // Email Validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    }

    // Subject Validate
    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'Subject is required.');
      isValid = false;
    } else if (subjectInput.value.trim().length < 5) {
      showError(subjectInput, 'Subject must be at least 5 characters.');
      isValid = false;
    }

    // Message Validate
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Message is required.');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters.');
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission to backend
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

      setTimeout(() => {
        // Show success modal (Bootstrap 5 modal)
        const successModalEl = document.getElementById('successModal');
        if (successModalEl) {
          const successModal = new bootstrap.Modal(successModalEl);
          successModal.show();
        }

        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 1500);
    }
  });

  function showError(input, message) {
    input.classList.add('is-invalid');
    const feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback-custom')) {
      feedback.textContent = message;
      feedback.style.display = 'block';
    }
  }

  function resetValidation(input) {
    input.classList.remove('is-invalid');
    const feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback-custom')) {
      feedback.textContent = '';
      feedback.style.display = 'none';
    }
  }
}
