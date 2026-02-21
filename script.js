(function() {
  const skeleton = document.getElementById('skeleton-wrapper');
  const content = document.getElementById('content-wrapper');
  
  setTimeout(() => {
    skeleton.style.opacity = '0';
    setTimeout(() => {
      skeleton.style.display = 'none';
      content.style.display = 'flex';
      content.style.opacity = '1';
    }, 500);
  }, 3000);

  const carousel = document.querySelector('#heroCarousel');
  if (carousel) {
    new bootstrap.Carousel(carousel, {
      interval: 4000,
      ride: 'carousel',
      pause: 'hover'
    });
  }

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarMain');

  function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove('active'));
  }

  function setActiveLink(href) {
    removeActiveClasses();
    const targetLink = Array.from(navLinks).find(link => link.getAttribute('href') === href);
    if (targetLink) targetLink.classList.add('active');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        setActiveLink(targetId);
      }

      if (navbarCollapse.classList.contains('show')) {
        const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
        if (collapseInstance) {
          collapseInstance.hide();
        } else {
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });

  function updateActiveLinkOnScroll() {
    let current = '';
    const sections = document.querySelectorAll('section[id], footer[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      setActiveLink(`#${current}`);
    } else {
      if (window.scrollY < 100) {
        setActiveLink('#home');
      }
    }
  }

  window.addEventListener('scroll', updateActiveLinkOnScroll);
  window.addEventListener('load', function() {
    if (window.location.hash) {
      setActiveLink(window.location.hash);
    } else {
      setActiveLink('#home');
    }
    updateActiveLinkOnScroll();
  });

  window.addEventListener('hashchange', function() {
    setActiveLink(window.location.hash);
  });

})();