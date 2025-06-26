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

  // Carosello immagini gallery stile card
  const carousel = document.getElementById('carousel');
  if (carousel) {
    const carouselImg = document.getElementById('carouselImg');
    const imgs = carousel.querySelectorAll('img');
    let isDown = false;
    let startX;
    let scrollLeft;
    // Drag desktop
    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('dragging');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('dragging');
    });
    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('dragging');
      snapToCard();
    });
    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.2;
      carousel.scrollLeft = scrollLeft - walk;
    });
    // Touch swipe (già presente)
    let startTouchX = null;
    carousel.addEventListener('touchstart', (e) => {
      startTouchX = e.touches[0].clientX;
    });
    carousel.addEventListener('touchend', (e) => {
      startTouchX = null;
      snapToCard();
    });
    // Snap all'immagine più vicina
    function snapToCard() {
      const cards = carousel.querySelectorAll('.carousel-card, img');
      let minDist = Infinity;
      let activeIdx = 0;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width/2 - window.innerWidth/2);
        if (dist < minDist) {
          minDist = dist;
          activeIdx = i;
        }
      });
      cards.forEach((card, i) => card.classList.toggle('active', i === activeIdx));
      // Scroll to center
      const card = cards[activeIdx];
      if (card) {
        const left = card.offsetLeft - (carousel.offsetWidth/2 - card.offsetWidth/2);
        carousel.scrollTo({ left, behavior: 'smooth' });
      }
    }
    // Snap on resize
    window.addEventListener('resize', snapToCard);
    // Snap iniziale
    setTimeout(snapToCard, 200);
  }

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