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

  // Carosello immagini gallery
  const carouselImgs = [
    {src: 'IMG-20250626-WA0021.jpg', alt: 'Sup in acqua'},
    {src: 'IMG-20250626-WA0023.jpg', alt: 'Vista mare sup'},
    {src: 'IMG-20250626-WA0027.jpg', alt: 'Sup Poetto'},
    {src: 'IMG-20250626-WA0011.jpg', alt: 'Sup gruppo'},
    {src: 'Immagine WhatsApp 2025-06-25 ore 20.33.58_6d3e3227.jpg', alt: 'Sup WhatsApp 1'},
    {src: 'Immagine WhatsApp 2025-06-25 ore 20.33.57_8478de64.jpg', alt: 'Sup WhatsApp 2'},
    {src: 'Immagine WhatsApp 2025-06-25 ore 20.33.57_e219b93b.jpg', alt: 'Sup WhatsApp 3'},
    {src: 'Immagine WhatsApp 2025-06-25 ore 20.33.56_5753bbcb.jpg', alt: 'Sup WhatsApp 4'},
    {src: 'Immagine WhatsApp 2025-06-25 ore 20.33.56_80fe11b1.jpg', alt: 'Sup WhatsApp 5'}
  ];
  const carousel = document.getElementById('carousel');
  if (carousel) {
    const carouselImg = document.getElementById('carouselImg');
    const dots = document.getElementById('carouselDots');
    let idx = 0;
    function showImg(i) {
      idx = i;
      carouselImg.classList.add('fade');
      setTimeout(() => {
        carouselImg.src = carouselImgs[i].src;
        carouselImg.alt = carouselImgs[i].alt;
        carouselImg.classList.remove('fade');
      }, 200);
      Array.from(dots.children).forEach((d, j) => d.classList.toggle('active', j === i));
    }
    // Dots
    dots.innerHTML = '';
    carouselImgs.forEach((img, i) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.onclick = () => showImg(i);
      dots.appendChild(dot);
    });
    showImg(0);
    // Touch swipe support
    let startX = null;
    carouselImg.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    carouselImg.addEventListener('touchend', (e) => {
      if (startX === null) return;
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 40) showImg((idx - 1 + carouselImgs.length) % carouselImgs.length);
      else if (startX - endX > 40) showImg((idx + 1) % carouselImgs.length);
      startX = null;
    });
    // Mouse drag/scroll support
    let dragStartX = null;
    let dragging = false;
    carouselImg.addEventListener('mousedown', (e) => {
      dragStartX = e.clientX;
      dragging = true;
    });
    document.addEventListener('mouseup', (e) => {
      if (!dragging || dragStartX === null) return;
      let dragEndX = e.clientX;
      if (dragEndX - dragStartX > 40) showImg((idx - 1 + carouselImgs.length) % carouselImgs.length);
      else if (dragStartX - dragEndX > 40) showImg((idx + 1) % carouselImgs.length);
      dragging = false;
      dragStartX = null;
    });
    carouselImg.addEventListener('mousemove', (e) => {
      // Prevent unwanted selection while dragging
      if (dragging) e.preventDefault();
    });
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