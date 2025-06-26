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
        let target = document.querySelector(href);
        // Fix per Gallery: se non trova l'id, cerca la sezione con aria-labelledby=gallery-title
        if (!target && href === '#gallery') {
          target = document.querySelector('[aria-labelledby="gallery-title"]');
        }
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

  // Mostra tutte le sezioni (fallback se IntersectionObserver manca)
  function showSections() {
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('visible');
    });
  }

  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('.section');
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    sections.forEach(section => observer.observe(section));
  } else {
    showSections();
  }
}); 