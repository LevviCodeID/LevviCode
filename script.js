(function() {
  const skeleton = document.getElementById('skeleton-wrapper');
  const content = document.getElementById('content-wrapper');
  setTimeout(() => {
    skeleton.style.opacity = '0';
    setTimeout(() => {
      skeleton.style.display = 'none';
      content.style.display = 'flex';
      content.style.opacity = '1';
      initPortfolio();
      initTypingEffect();
      initAutoTechMarquee();
    }, 400);
  }, 1400);

  function initTypingEffect() {
    const words = ["Web Developer", "Bot Creator", "Fullstack Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedSpan = document.getElementById('typed-text');
    if (!typedSpan) return;
    
    function typeEffect() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typedSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
      } else {
        const speed = isDeleting ? 60 : 100;
        setTimeout(typeEffect, speed);
      }
    }
    typeEffect();
  }

  function initAutoTechMarquee() {
    const container = document.getElementById('autoMarqueeContainer');
    if (!container) return;
    const skillsData = [
      { name: "HTML5", icon: "bi-filetype-html", gradient: "linear-gradient(135deg, #E44D26, #F16529)" },
      { name: "CSS3", icon: "bi-filetype-css", gradient: "linear-gradient(135deg, #264DE4, #2965F1)" },
      { name: "JavaScript", icon: "bi-braces", gradient: "linear-gradient(135deg, #F7DF1E, #E9D54D)", textColor: "#000" },
      { name: "Node.js", icon: "bi-node-plus", gradient: "linear-gradient(135deg, #339933, #5FA04F)" },
      { name: "Baileys", icon: "bi-chat-dots", gradient: "linear-gradient(135deg, #25D366, #128C7E)" },
      { name: "Bootstrap", icon: "bi-bootstrap-fill", gradient: "linear-gradient(135deg, #7952B3, #563D7C)" },
      { name: "MongoDB", icon: "bi-database", gradient: "linear-gradient(135deg, #47A248, #3E8E41)" },
      { name: "Git", icon: "bi-git", gradient: "linear-gradient(135deg, #F05032, #DE5A2E)" },
      { name: "React", icon: "bi-filetype-js", gradient: "linear-gradient(135deg, #61DAFB, #2C3E50)", textColor: "#000" },
      { name: "Express", icon: "bi-cloud", gradient: "linear-gradient(135deg, #000000, #4A4A4A)" }
    ];

    function createBadge(skill) {
      const badge = document.createElement('div');
      badge.className = 'skill-badge';
      badge.style.background = skill.gradient;
      if (skill.textColor) badge.style.color = skill.textColor;
      else badge.style.color = 'white';
      badge.innerHTML = `<i class="bi ${skill.icon} fs-5"></i> ${skill.name}`;
      return badge;
    }

    const track = document.createElement('div');
    track.className = 'skills-track';
    skillsData.forEach(skill => track.appendChild(createBadge(skill)));
    skillsData.forEach(skill => track.appendChild(createBadge(skill)));
    container.innerHTML = '';
    container.appendChild(track);
  }

  function initPortfolio() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.getElementById('navbarMain');
    
    // Update active menu berdasarkan scroll
    function updateActive() {
      let current = '';
      const scrollPos = window.scrollY + 120;
      sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) current = section.getAttribute('id');
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
      });
      if (!current && window.scrollY < 150) document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
    }
    
    window.addEventListener('scroll', () => {
      updateActive();
      if (window.scrollY > 20) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });

    // Auto-close navbar collapse ketika link di klik
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (this.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Tutup menu mobile (jika sedang terbuka)
          if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      });
    });

    // Event untuk menambah/menghapus class menu-open saat collapse dibuka/tutup
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      navbar.classList.add('menu-open');
    });
    navbarCollapse.addEventListener('hidden.bs.collapse', () => {
      navbar.classList.remove('menu-open');
    });

    updateActive();
    if (window.location.hash) {
      const hashEl = document.querySelector(window.location.hash);
      if (hashEl) setTimeout(() => hashEl.scrollIntoView({ behavior: 'smooth' }), 100);
    }

    // Theme toggle
    const toggleBtn = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('levvi-theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      icon.classList.remove('bi-moon-fill');
      icon.classList.add('bi-sun-fill');
    } else {
      document.body.classList.remove('dark-mode');
      icon.classList.remove('bi-sun-fill');
      icon.classList.add('bi-moon-fill');
      localStorage.setItem('levvi-theme', 'light');
    }
    toggleBtn.addEventListener('click', () => {
      if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('levvi-theme', 'light');
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-fill');
      } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('levvi-theme', 'dark');
        icon.classList.remove('bi-moon-fill');
        icon.classList.add('bi-sun-fill');
      }
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        if (!name || !email || !message) {
          alert('Please fill in all fields!');
          return;
        }
        const subject = `Message from ${name} (via Portfolio)`;
        const body = `Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
        window.location.href = `mailto:levvicode@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        alert('Thank you! Your email application will open. Please send the message.');
        contactForm.reset();
      });
    }
  }
})();