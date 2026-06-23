/* 
  theme.js
  Lavanya Sai Bandla Portfolio - Theme Management
*/

// Apply theme immediately before page rendering to prevent Flash of Unstyled Content (FOUC)
(function () {
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  
  // Set initial icon based on applied theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeIcons(currentTheme);

  // Hook up event listeners for toggle buttons
  themeToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcons(newTheme);
      
      // Emit a theme-changed event for animations or other JS features
      const event = new CustomEvent('themeChanged', { detail: { theme: newTheme } });
      window.dispatchEvent(event);
    });
  });

  // Sync icon class names
  function updateThemeIcons(theme) {
    themeToggleButtons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fas fa-sun';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'fas fa-moon';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }
    });
  }
});
