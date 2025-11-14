// ===================================
// Navigation & Scroll Behavior
// ===================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
const animatedElements = document.querySelectorAll('.fade-in-up');
animatedElements.forEach(el => observer.observe(el));

// ===================================
// Skills Card Interactive Reveal
// ===================================

const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach((card, index) => {
    // Staggered animation delay
    card.style.transitionDelay = `${index * 0.1}s`;

    // Add hover effect with slight rotation
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px) scale(1)';
    });
});

// ===================================
// Achievement Cards Counter Animation
// ===================================

const achievementCards = document.querySelectorAll('.achievement-card');
let achievementsAnimated = false;

const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !achievementsAnimated) {
            achievementsAnimated = true;
            animateAchievements();
        }
    });
}, { threshold: 0.3 });

if (achievementCards.length > 0) {
    achievementObserver.observe(achievementCards[0]);
}

function animateAchievements() {
    achievementCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 150);
    });
}

// ===================================
// Timeline Animation
// ===================================

const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
});

// ===================================
// Projects Hover Effects
// ===================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const projectImage = card.querySelector('.project-image');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// Contact Form Validation & Handling
// ===================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Form field elements
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const subjectField = document.getElementById('subject');
const messageField = document.getElementById('message');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

// Validation functions
function validateName() {
    const name = nameField.value.trim();

    if (name === '') {
        showError(nameField, nameError, 'Name is required');
        return false;
    } else if (name.length < 2) {
        showError(nameField, nameError, 'Name must be at least 2 characters');
        return false;
    } else {
        clearError(nameField, nameError);
        return true;
    }
}

function validateEmail() {
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        showError(emailField, emailError, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(emailField, emailError, 'Please enter a valid email');
        return false;
    } else {
        clearError(emailField, emailError);
        return true;
    }
}

function validateSubject() {
    const subject = subjectField.value.trim();

    if (subject === '') {
        showError(subjectField, subjectError, 'Subject is required');
        return false;
    } else if (subject.length < 3) {
        showError(subjectField, subjectError, 'Subject must be at least 3 characters');
        return false;
    } else {
        clearError(subjectField, subjectError);
        return true;
    }
}

function validateMessage() {
    const message = messageField.value.trim();

    if (message === '') {
        showError(messageField, messageError, 'Message is required');
        return false;
    } else if (message.length < 10) {
        showError(messageField, messageError, 'Message must be at least 10 characters');
        return false;
    } else {
        clearError(messageField, messageError);
        return true;
    }
}

function showError(field, errorElement, message) {
    field.classList.add('error');
    errorElement.textContent = message;
}

function clearError(field, errorElement) {
    field.classList.remove('error');
    errorElement.textContent = '';
}

// Real-time validation
nameField.addEventListener('blur', validateName);
emailField.addEventListener('blur', validateEmail);
subjectField.addEventListener('blur', validateSubject);
messageField.addEventListener('blur', validateMessage);

// Clear error on input
nameField.addEventListener('input', () => {
    if (nameField.classList.contains('error')) {
        validateName();
    }
});

emailField.addEventListener('input', () => {
    if (emailField.classList.contains('error')) {
        validateEmail();
    }
});

subjectField.addEventListener('input', () => {
    if (subjectField.classList.contains('error')) {
        validateSubject();
    }
});

messageField.addEventListener('input', () => {
    if (messageField.classList.contains('error')) {
        validateMessage();
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Get form data
        const formData = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            subject: subjectField.value.trim(),
            message: messageField.value.trim()
        };

        // Log form data (in a real application, this would be sent to a server)
        console.log('Form submitted with data:', formData);

        // Show success message
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');

        // Reset form
        contactForm.reset();

        // Hide success message and show form again after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
            setTimeout(() => {
                contactForm.style.display = 'block';
            }, 500);
        }, 5000);

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // Scroll to first error
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// ===================================
// Dynamic Year in Footer
// ===================================

const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
}

// ===================================
// Typing Effect for Hero Section (Optional Enhancement)
// ===================================

const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';

    let charIndex = 0;

    function typeText() {
        if (charIndex < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeText, 500);
}

// ===================================
// Skills Progress Animation
// ===================================

const skillsSection = document.getElementById('skills');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            animateSkills();
        }
    });
}, { threshold: 0.2 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

function animateSkills() {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';

        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 100);
    });
}

// ===================================
// Parallax Effect for Hero Background
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Page Load Animation
// ===================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Scroll to Top Button (Optional)
// ===================================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 999;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'scale(1.1) translateY(-3px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'scale(1) translateY(0)';
});

// ===================================
// Console Message
// ===================================

console.log('%c👋 Hello there!', 'font-size: 20px; color: #2563eb; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #6b7280;');
console.log('%cInterested in the code? Check it out on my GitHub!', 'font-size: 14px; color: #6b7280;');

// ===================================
// Performance: Lazy Load Images (if images are added)
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===================================
// Accessibility: Skip to Content Link
// ===================================

const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -100px;
    left: 0;
    background: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    text-decoration: none;
    z-index: 9999;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-100px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ===================================
// Random Interactive Elements
// ===================================

// Add subtle cursor trail effect for desktop
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        cursorTrail.push({ x: e.clientX, y: e.clientY });

        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);

    if (konamiCode.length > konamiPattern.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        console.log('%c🎮 Konami Code Activated!', 'font-size: 24px; color: #10b981; font-weight: bold;');
        console.log('%c🚀 You found the easter egg! You must be a true developer!', 'font-size: 16px; color: #8b5cf6;');

        // Add fun animation
        document.body.style.animation = 'rainbow 2s linear';

        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Add rainbow animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
