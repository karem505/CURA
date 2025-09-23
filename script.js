document.addEventListener('DOMContentLoaded', function() {
    // --- BILINGUAL LOGIC ---
    const langToggleButton = document.getElementById('lang-toggle-btn');
    const htmlEl = document.documentElement;
    const langLinks = document.querySelectorAll('[data-lang-link]');
    // ** CHANGED: Default language is now Arabic **
    const defaultLang = 'ar';

    function setLanguage(lang) {
        htmlEl.setAttribute('lang', lang);
        htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Update all links with language-specific hrefs
        langLinks.forEach(link => {
            const newHref = link.getAttribute(`data-${lang}-href`);
            if (newHref) {
                link.setAttribute('href', newHref);
            }
        });

        // Save preference
        localStorage.setItem('userLanguage', lang);
    }

    langToggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        const currentLang = htmlEl.getAttribute('lang');
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });

    // On page load, check for saved preference, otherwise use the default
    const savedLang = localStorage.getItem('userLanguage');
    setLanguage(savedLang || defaultLang);


    // --- ORIGINAL PAGE LOGIC ---

    // Animated Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText.replace('+', '');
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + (counter.nextSibling && counter.nextSibling.nodeValue.includes('+') ? '+' : '');
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + (counter.nextSibling && counter.nextSibling.nodeValue.includes('+') ? '+' : '');
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Scroll animations for sections
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            header.style.top = `-${header.offsetHeight}px`;
        } else {
            header.style.top = "0";
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const currentlyActiveHeader = document.querySelector('.accordion-header.active');
            if (currentlyActiveHeader && currentlyActiveHeader !== this) {
                currentlyActiveHeader.classList.remove('active');
                currentlyActiveHeader.nextElementSibling.style.maxHeight = 0;
            }

            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (this.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = 0;
            }
        });
    });

    // Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('active');
    });
});
