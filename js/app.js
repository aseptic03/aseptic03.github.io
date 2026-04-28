// js/app.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Ignition Loader (Subagent 3) ---
    const loader = document.querySelector('.ignition-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 800);
        }, 1200); // Waits for ignition animation to finish
    }

    // --- Custom Cursor (Subagent 2) ---
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const interactables = document.querySelectorAll('a, button, .masonry-item, .ig-post');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
        });
    }
    
    // --- Header Scroll Effect (Subagent 3 - Glassmorphism) ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            if (!document.querySelector('.project-hero')) {
                header.classList.remove('header-scrolled');
            }
        }
    });

    if (document.querySelector('.project-hero')) {
        header.classList.add('header-scrolled');
    }

    // --- Parallax Hero Effect (Subagent 3) ---
    const heroImg = document.querySelector('.hero-image-container');
    window.addEventListener('scroll', () => {
        if (heroImg && window.scrollY < window.innerHeight) {
            heroImg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
        }
    });

    // --- Vanilla Tilt (Subagent 2) ---
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".masonry-item"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
            "glare-prerender": false
        });
    }

    // --- Video on Hover (Subagent 2 & 4) ---
    const masonryItems = document.querySelectorAll('.masonry-item');
    masonryItems.forEach(item => {
        let video;
        item.addEventListener('mouseenter', () => {
            const videoSrc = item.getAttribute('data-video-src');
            if (videoSrc) {
                video = document.createElement('video');
                video.src = videoSrc;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.autoplay = true;
                video.classList.add('hover-video');
                item.querySelector('.image-wrapper').appendChild(video);
            }
        });
        item.addEventListener('mouseleave', () => {
            if (video) {
                video.remove();
                video = null;
            }
        });
    });

    // --- Intersection Observer for Fade Up Animations (Subagent 4) ---
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
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // --- Lazy Loading Images & Skeleton Removal (Subagent 4) ---
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
                    img.onload = () => {
                        img.classList.add('loaded');
                        if (img.parentElement.classList.contains('skeleton')) {
                            img.parentElement.classList.add('loaded');
                        }
                    };
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
