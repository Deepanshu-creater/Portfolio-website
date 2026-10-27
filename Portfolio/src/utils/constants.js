/* Shared motion constants. Kept out of motion.jsx for fast-refresh. */

/* Brutalist easing: snappy with a slight overshoot */
export const SPRING = { type: "spring", stiffness: 200, damping: 18 };

export const OFFSETS = {
  left: { x: -80, y: 0 },
  right: { x: 80, y: 0 },
  bottom: { x: 0, y: 70 },
  top: { x: 0, y: -70 },
};
