import { useEffect } from 'react';

export function useScrollReveal(dependencies = []) {
  useEffect(() => {
    // If user prefers reduced motion, reveal all elements immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.reveal-init, .reveal-fade, .reveal-scale');

    if (prefersReducedMotion) {
      elements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    // Configured threshold to work smoothly on both mobile touchscreen and desktop mouse scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve once revealed so it remains visible permanently
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
      }
    );

    elements.forEach(el => {
      // If already marked as revealed or in viewport at load, reveal
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, dependencies);
}
