document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));

    // 2. Sticky Navbar & Progress
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Countdown Timer Logic (Special Offers)
    const countdownHours = 23; // Set fake urgency
    const countdownMinutes = 59;
    const countdownSeconds = 59;
    
    let timeInSeconds = (countdownHours * 3600) + (countdownMinutes * 60) + countdownSeconds;
    const countdownEl = document.getElementById('countdown');

    const updateCountdown = () => {
        const h = Math.floor(timeInSeconds / 3600);
        const m = Math.floor((timeInSeconds % 3600) / 60);
        const s = timeInSeconds % 60;

        countdownEl.textContent = 
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        
        if (timeInSeconds > 0) {
            timeInSeconds--;
        } else {
            timeInSeconds = 0;
            countdownEl.textContent = "OFFER EXPIRED";
            countdownEl.classList.remove('time-pulse');
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 4. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // Toggle mobile menu
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(5,5,5,0.95)';
            navLinks.style.padding = '20px 0';
            navLinks.style.textAlign = 'center';
            navLinks.style.gap = '15px';
            navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
        }
    });

    // 5. Transformations Carousel Logic
    const track = document.getElementById('transform-track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('t-next');
    const prevButton = document.getElementById('t-prev');
    const dotsNav = document.getElementById('t-dots');
    const dots = Array.from(dotsNav.children);

    let currentIndex = 0;

    const updateCarousel = (index) => {
        track.style.transform = 'translateX(-' + (index * 100) + '%)';
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentIndex = index;
    };

    nextButton.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        updateCarousel(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = slides.length - 1;
        updateCarousel(prevIndex);
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('span');
        if (!targetDot) return;
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        updateCarousel(targetIndex);
    });

    // 6. Testimonials Auto-Slider
    const testiTrack = document.getElementById('testi-track');
    const testiSlides = Array.from(testiTrack.children);
    let testiIndex = 0;

    const autoSlideTestimonials = () => {
        testiIndex++;
        if(testiIndex >= testiSlides.length) {
            testiIndex = 0;
        }
        testiTrack.style.transform = 'translateX(-' + (testiIndex * 100) + '%)';
    };

    let testiInterval = setInterval(autoSlideTestimonials, 5000);

    // Optional: Pause auto-slide on hover/touch
    testiTrack.addEventListener('mouseenter', () => clearInterval(testiInterval));
    testiTrack.addEventListener('mouseleave', () => {
        testiInterval = setInterval(autoSlideTestimonials, 5000);
    });

    // 7. Pricing Toggle
    const toggleCheckbox = document.getElementById('pricing-toggle-checkbox');
    const labelMonthly = document.getElementById('label-monthly');
    const labelYearly = document.getElementById('label-yearly');
    const priceAmounts = document.querySelectorAll('.price .amount');
    const pricePeriods = document.querySelectorAll('.price .period');

    if(toggleCheckbox) {
        toggleCheckbox.addEventListener('change', () => {
            if(toggleCheckbox.checked) {
                // Yearly
                labelYearly.classList.add('active');
                labelMonthly.classList.remove('active');
                priceAmounts.forEach(amt => {
                    amt.textContent = amt.getAttribute('data-yearly');
                });
                pricePeriods.forEach(p => p.textContent = '/yr');
            } else {
                // Monthly
                labelMonthly.classList.add('active');
                labelYearly.classList.remove('active');
                priceAmounts.forEach(amt => {
                    amt.textContent = amt.getAttribute('data-monthly');
                });
                pricePeriods.forEach(p => p.textContent = '/mo');
            }
        });
    }

});
