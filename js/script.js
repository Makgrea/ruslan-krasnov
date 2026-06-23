/* ======================================
   RUSLAN KRASNOV #69
   Premium Hockey Portfolio
====================================== */

/* ==========================
   LANGUAGE SWITCHER
========================== */

const ruBtn = document.getElementById('ruBtn');
const enBtn = document.getElementById('enBtn');

function setLanguage(lang) {
    document.documentElement.lang = lang;

    // Ищем элементы с ОБОИМИ атрибутами
    const elements = document.querySelectorAll('[data-ru][data-en]');

    elements.forEach(el => {
        if (lang === 'ru') {
            el.textContent = el.dataset.ru;
        } else {
            el.textContent = el.dataset.en;
        }
    });

    // Активные кнопки
    if (lang === 'ru') {
        ruBtn.classList.add('active');
        enBtn.classList.remove('active');
    } else {
        enBtn.classList.add('active');
        ruBtn.classList.remove('active');
    }

    localStorage.setItem('siteLanguage', lang);
}

if (ruBtn && enBtn) {
    ruBtn.addEventListener('click', () => setLanguage('ru'));
    enBtn.addEventListener('click', () => setLanguage('en'));

    const savedLanguage = localStorage.getItem('siteLanguage');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    }
}

/* ==========================
   БУРГЕР-МЕНЮ
========================== */

const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Закрываем меню при клике на ссылку
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

/* ==========================
   FADE IN ON SCROLL (УЛУЧШЕНО)
========================== */

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

/* ==========================
   FADE IN FOR ELEMENTS
========================== */

const elementObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                elementObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(
    '.achievement-card, .timeline-item, .stat'
).forEach(item => {
    item.classList.add('hidden');
    elementObserver.observe(item);
});

/* ==========================
   LIGHTBOX GALLERY
========================== */

const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
    <span class="close-lightbox">&times;</span>
    <img class="lightbox-image" src="">
`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector('.lightbox-image');

galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImage.src = image.src;
        document.body.style.overflow = 'hidden';
    });
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/* ==========================
   COUNTER ANIMATION (УЛУЧШЕНО)
========================== */

const animateCounter = (element) => {
    const value = element.innerText;
    const number = parseInt(value.replace(/[^0-9]/g, ''));
    if (isNaN(number)) return;

    let start = 0;
    const duration = 2000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = number / steps;

    const update = () => {
        start += increment;
        if (start >= number) {
            element.innerText = value;
            return;
        }
        element.innerText = Math.floor(start);
        requestAnimationFrame(update);
    };
    update();
};

const statObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const h3 = entry.target.querySelector('h3');
                if (h3) {
                    animateCounter(h3);
                }
                statObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

document.querySelectorAll('.stat').forEach(stat => {
    statObserver.observe(stat);
});

/* ==========================
   PARALLAX HERO
========================== */

window.addEventListener('scroll', () => {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        const scrollY = window.scrollY;
        heroVideo.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
});

/* ==========================
   ACTIVE MENU
========================== */

const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});

/* ==========================
   SMOOTH BUTTON EFFECT
========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ==========================
   HERO GLOW EFFECT
========================== */

const heroTitle = document.querySelector('.hero-text h1');
if (heroTitle) {
    setInterval(() => {
        heroTitle.classList.toggle('pulse');
    }, 2500);
}

/* ==========================
   ЛЕНИВАЯ ЗАГРУЗКА ВИДЕО
========================== */

document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.load();
                videoObserver.unobserve(video);
            }
        });
    }, { threshold: 0.1 });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
});

/* ==========================
   АВТОМАТИЧЕСКИЙ ГОД В ФУТЕРЕ
========================== */

const footerYear = document.querySelector('footer p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Ruslan Krasnov #69`;
}

/* ==========================
   ЗАГРУЗКА ВИДЕО В ХЕДЕРЕ ПОСЛЕ СТРАНИЦЫ
========================== */

document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        setTimeout(() => {
            heroVideo.play().catch(() => {});
        }, 1000);
    }
});
