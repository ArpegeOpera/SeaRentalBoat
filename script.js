document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinksDiv = document.getElementById('navLinks');
  if (hamburger && navLinksDiv) {
    hamburger.addEventListener('click', function() {
      const isOpen = navLinksDiv.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Accessibilità: apri/chiudi con invio/space
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        const isOpen = navLinksDiv.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
  }

  // Smooth scroll per i link del menu
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Chiudi hamburger menu se aperto
          if (navLinksDiv.classList.contains('open')) {
            navLinksDiv.classList.remove('open');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });
}); 