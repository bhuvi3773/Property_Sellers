import { useEffect } from 'react';

/**
 * useScrollReveal (Instant Static Display)
 * Immediately marks elements revealed with zero scroll delays or intersection observer overhead.
 */
export function useScrollReveal(trigger = null) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-init, .reveal-fade, .reveal-scale');
    elements.forEach(el => el.classList.add('is-revealed'));
  }, [trigger]);
}
