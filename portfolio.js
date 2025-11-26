document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const header = document.querySelector('.header');

    /* ---------------------------------------------------------- */
    /* 1. Mobile Navigation Toggle */
    /* ---------------------------------------------------------- */
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = navToggle.querySelector('i');
        // Toggle between hamburger and close icon
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    /* Close menu and smooth scroll when a link is clicked */
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle internal hash links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const offsetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu if open
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    navToggle.querySelector('i').classList.remove('fa-xmark');
                    navToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });

    /* ---------------------------------------------------------- */
    /* 2. Intersection Observer for Scroll Reveal Animations */
    /* ---------------------------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the section is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    /* ---------------------------------------------------------- */
    /* 3. Contact Form Handler (Front-end only) */
    /* ---------------------------------------------------------- */
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Display success message
        formMessage.textContent = 'Transfer Initiated: Message received successfully. I will be in touch soon.';
        formMessage.classList.remove('hidden', 'error');
        formMessage.classList.add('success');
        
        // Reset form fields
        contactForm.reset();

        // Hide the message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    });
});