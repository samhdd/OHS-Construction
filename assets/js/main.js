document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }
});

// Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        // Ensure track exists
        if (!track) return;

        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.carousel-btn.next');
        const prevButton = carousel.querySelector('.carousel-btn.prev');
        const counter = carousel.querySelector('.carousel-counter');

        let currentIndex = 0;

        // Update slide position
        const updateSlide = (index) => {
            // Loop navigation
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update counter
            if (counter) {
                counter.textContent = `${currentIndex + 1} / ${slides.length}`;
            }
        };

        // Buttons
        if (nextButton) {
            nextButton.addEventListener('click', () => updateSlide(currentIndex + 1));
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => updateSlide(currentIndex - 1));
        }

        // Swipe Support
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const threshold = 50; // min distance
            if (touchEndX < touchStartX - threshold) {
                // Swiped Left -> Next Slide
                updateSlide(currentIndex + 1);
            } else if (touchEndX > touchStartX + threshold) {
                // Swiped Right -> Prev Slide
                updateSlide(currentIndex - 1);
            }
        };

        // Initial Hint Animation for Mobile
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Check if mobile width (768px match with CSS)
                    if (window.innerWidth <= 768) {
                        track.classList.add('animate-hint');
                        observer.unobserve(carousel);
                    }
                }
            });
        }, { threshold: 0.5 });

        observer.observe(carousel);
    });

    // Lightbox Logic (Mobile Only Check handled inside, or always active)
    // The requirement says "for the mobile the user should click on the picture to be shown in full"
    // I'll make it active for everyone or check width. Usually good for desktop too if they want to zoom.

    // Create Lightbox Elements
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <img src="" alt="Full View">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    // Open Lightbox
    const openLightbox = (src) => {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Attach click to carousel images
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-slide img');
        images.forEach(img => {
            img.addEventListener('click', () => {
                // Check if mobile or just allow all?
                // User said "for the mobile". But it doesn't hurt on desktop.
                // If I want to restrict to mobile:
                if (window.innerWidth <= 992) {
                    openLightbox(img.src);
                }
            });
            img.style.cursor = 'pointer'; // Indicate clickable
        });
    });

});
