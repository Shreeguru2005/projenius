/**
 * ProJenius — Animation Engine
 * 
 * Features:
 *   1. Scroll-reveal (IntersectionObserver) for any element with
 *      pj-reveal | pj-reveal-left | pj-reveal-right | pj-reveal-scale
 *   2. Auto-stagger for children of [data-pj-stagger]
 *   3. Animated counters for [data-pj-count]
 * 
 * Usage in JSX:
 *   import { useEffect } from 'react';
 *   import { initProJeniusAnimations } from '../assets/js/animations';
 *
 *   // Inside any layout/page component:
 *   useEffect(() => {
 *     const cleanup = initProJeniusAnimations();
 *     return cleanup;
 *   }, []);
 */

// ─────────────────────────────────────────────────────────────────
// 1. SCROLL-REVEAL
// ─────────────────────────────────────────────────────────────────

const REVEAL_CLASSES = [
  'pj-reveal',
  'pj-reveal-left',
  'pj-reveal-right',
  'pj-reveal-scale',
];

function initReveal() {
  const targets = document.querySelectorAll(
    REVEAL_CLASSES.map(c => `.${c}`).join(', ')
  );

  if (!targets.length) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pj-in');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}


// ─────────────────────────────────────────────────────────────────
// 2. AUTO-STAGGER CHILDREN
// ─────────────────────────────────────────────────────────────────
// Add data-pj-stagger to a container and its direct children
// will get pj-reveal + stagger delays automatically.

function initStagger() {
  const containers = document.querySelectorAll('[data-pj-stagger]');
  const DELAY_CLASSES = ['pj-d1', 'pj-d2', 'pj-d3', 'pj-d4', 'pj-d5', 'pj-d6'];

  containers.forEach((container) => {
    const dir = container.dataset.pjStagger || 'up'; // up | left | right | scale
    const revealClass =
      dir === 'left'  ? 'pj-reveal-left'  :
      dir === 'right' ? 'pj-reveal-right' :
      dir === 'scale' ? 'pj-reveal-scale' :
      'pj-reveal';

    Array.from(container.children).forEach((child, i) => {
      child.classList.add(revealClass);
      if (DELAY_CLASSES[i]) child.classList.add(DELAY_CLASSES[i]);
    });
  });
}


// ─────────────────────────────────────────────────────────────────
// 3. ANIMATED COUNTERS
// ─────────────────────────────────────────────────────────────────
// Add data-pj-count="3500" to any element to animate it counting up
// when it enters the viewport.

function animateCount(el, target, duration = 1600) {
  const start = performance.now();
  const hasPlus = el.dataset.pjCountSuffix === '+' || el.textContent.includes('+');
  const hasPct  = el.dataset.pjCountSuffix === '%' || el.textContent.includes('%');
  const suffix  = hasPlus ? '+' : hasPct ? '%' : (el.dataset.pjCountSuffix || '');

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString() + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-pj-count]');
  if (!counters.length) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.pjCount, 10);
          if (!isNaN(target)) animateCount(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}


// ─────────────────────────────────────────────────────────────────
// 4. MAIN INIT — call once per page mount
// ─────────────────────────────────────────────────────────────────

export function initProJeniusAnimations() {
  // Stagger must run before reveal so elements have their classes
  initStagger();
  const cleanReveal   = initReveal();
  const cleanCounters = initCounters();

  return () => {
    cleanReveal();
    cleanCounters();
  };
}

export default initProJeniusAnimations;
