document.addEventListener('DOMContentLoaded', function() {
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
          const navLinksDiv = document.getElementById('navLinks');
          if (navLinksDiv.classList.contains('open')) {
            navLinksDiv.classList.remove('open');
            const hamburger = document.getElementById('hamburger');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });
}); 