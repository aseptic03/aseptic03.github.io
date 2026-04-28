// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            // Only remove if not on a page that should always have it scrolled (like project page)
            if (!document.querySelector('.project-hero')) {
                header.classList.remove('header-scrolled');
            }
        }
    });

    // Make header scrolled by default on project pages
    if (document.querySelector('.project-hero')) {
        header.classList.add('header-scrolled');
    }

    // --- Intersection Observer for Fade Up Animations ---
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));


    // --- Lazy Loading Images & Skeleton Removal ---
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const lazyObserverOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.01
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    
                    // Once image is fully loaded, remove skeleton
                    img.onload = () => {
                        img.classList.add('loaded');
                        if (img.parentElement.classList.contains('skeleton')) {
                            img.parentElement.classList.add('loaded');
                        }
                    };
                    
                    // Also handle cached images that might load instantly
                    if (img.complete) {
                        img.classList.add('loaded');
                        if (img.parentElement.classList.contains('skeleton')) {
                            img.parentElement.classList.add('loaded');
                        }
                    }
                }
                
                observer.unobserve(img);
            }
        });
    }, lazyObserverOptions);

    lazyImages.forEach(img => imageObserver.observe(img));

});
