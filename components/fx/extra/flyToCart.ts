import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Makes a copy of `from` fly along a curve to `to` (a cart icon, say), shrinking on the way, and bumps `to` when it lands.
 *   flyToCart(imageElement, cartIconElement)
 * Options: `duration` (seconds), `onLand` (called when the copy arrives, e.g. to raise the cart count).
 */
export function flyToCart(from: HTMLElement, to: HTMLElement, { duration = 0.9, onLand }: { duration?: number; onLand?: () => void } = {}) {
  if (prefersReducedMotion()) {
    onLand?.();
    return;
  }
  const a = from.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  const ghost = from.cloneNode(true) as HTMLElement;
  Object.assign(ghost.style, { position: "fixed", left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px`, margin: "0", zIndex: "9999", pointerEvents: "none", transformOrigin: "50% 50%" });
  document.body.appendChild(ghost);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const lift = Math.min(160, Math.abs(dy) * 0.5 + 60);
  const tl = gsap.timeline({
    onComplete: () => {
      ghost.remove();
      gsap.fromTo(to, { scale: 1 }, { scale: 1.25, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" });
      onLand?.();
    },
  });
  tl.to(ghost, { x: dx, duration, ease: "power1.in" }, 0)
    .to(ghost, { y: dy - lift, duration: duration * 0.45, ease: "power2.out" }, 0)
    .to(ghost, { y: dy, duration: duration * 0.55, ease: "power2.in" }, duration * 0.45)
    .to(ghost, { scale: 0.12, opacity: 0.6, duration, ease: "power2.in" }, 0);
}
