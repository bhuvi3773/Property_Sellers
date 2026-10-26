import { useEffect } from 'react';

/**
 * useDirectionalScroll
 * Custom hook that powers bidirectional scroll animations:
 * - When scrolling DOWN: elements with .scroll-shift-left slide left, .scroll-shift-right slide right.
 * - When scrolling UP: elements rearrange and smoothly realign back to translateX(0).
 * - Also provides continuous parallax calculation for elements with .scroll-directional-card.
 */
export function useDirectionalScroll() {
  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let lastScrollY = window.scrollY;
    let ticking = false;
    let scrollStopTimer = null;

    const leftElements = document.querySelectorAll('.scroll-shift-left');
    const rightElements = document.querySelectorAll('.scroll-shift-right');
    const directionalCards = document.querySelectorAll('.scroll-directional-card');

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);

      // Set global attribute on body so CSS can react declaratively
      if (currentScrollY > 60) {
        document.body.setAttribute('data-scroll-dir', isScrollingDown ? 'down' : 'up');
      } else {
        document.body.removeAttribute('data-scroll-dir');
      }

      // Calculate shift magnitude based on scroll velocity (capped for smoothness)
      const shiftMagnitude = Math.min(Math.max(scrollDelta * 1.8, 18), 42);

      if (isScrollingDown) {
        // SCROLLING DOWN: Displace elements left or right
        leftElements.forEach((el, index) => {
          const factor = (index % 2 === 0 ? 1 : 0.7);
          el.style.transform = `translate3d(-${shiftMagnitude * factor}px, 0, 0)`;
          el.classList.add('is-shifted');
          el.classList.remove('is-realigned');
        });

        rightElements.forEach((el, index) => {
          const factor = (index % 2 === 0 ? 1 : 0.7);
          el.style.transform = `translate3d(${shiftMagnitude * factor}px, 0, 0)`;
          el.classList.add('is-shifted');
          el.classList.remove('is-realigned');
        });

        // Alternating directional cards: even left, odd right
        directionalCards.forEach((card, index) => {
          const dir = index % 2 === 0 ? -1 : 1;
          const rect = card.getBoundingClientRect();
          // Only shift cards currently visible in viewport
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.transform = `translate3d(${dir * (shiftMagnitude * 0.7)}px, 0, 0)`;
            card.classList.add('is-shifted');
            card.classList.remove('is-realigned');
          }
        });
      } else {
        // SCROLLING UP: Rearrange and restore them back to aligned positions
        leftElements.forEach(el => {
          el.style.transform = 'translate3d(0, 0, 0)';
          el.classList.remove('is-shifted');
          el.classList.add('is-realigned');
        });

        rightElements.forEach(el => {
          el.style.transform = 'translate3d(0, 0, 0)';
          el.classList.remove('is-shifted');
          el.classList.add('is-realigned');
        });

        directionalCards.forEach(card => {
          card.style.transform = 'translate3d(0, 0, 0)';
          card.classList.remove('is-shifted');
          card.classList.add('is-realigned');
        });
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }

      // Settle back to aligned position when scrolling stops
      clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => {
        leftElements.forEach(el => {
          el.style.transform = 'translate3d(0, 0, 0)';
          el.classList.remove('is-shifted');
          el.classList.add('is-realigned');
        });
        rightElements.forEach(el => {
          el.style.transform = 'translate3d(0, 0, 0)';
          el.classList.remove('is-shifted');
          el.classList.add('is-realigned');
        });
        directionalCards.forEach(card => {
          card.style.transform = 'translate3d(0, 0, 0)';
          card.classList.remove('is-shifted');
          card.classList.add('is-realigned');
        });
        document.body.removeAttribute('data-scroll-dir');
      }, 350);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollStopTimer);
    };
  }, []);
}
