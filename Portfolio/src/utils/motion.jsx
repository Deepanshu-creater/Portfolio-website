import { motion, useReducedMotion } from "framer-motion";
import { SPRING, OFFSETS } from "./constants";

/* Re-export for convenience (components import SPRING from here) */
export { SPRING, OFFSETS };

/**
 * Generic scroll-into-view wrapper. Slides from `from` direction,
 * once: true, honors prefers-reduced-motion (plain fade instead).
 */
export function Reveal({
  children,
  from = "bottom",
  delay = 0,
  className = "",
  as = "div",
  amount = 0.2,
  ...rest
}) {
  const reduced = useReducedMotion();
  const offset = reduced ? { x: 0, y: 0 } : OFFSETS[from] ?? OFFSETS.bottom;
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ ...offset, opacity: 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, amount }}
      transition={reduced ? { duration: 0.25 } : { ...SPRING, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its StaggerItem children by 0.1s. */
export function Stagger({ children, className = "", delay = 0, amount = 0.15, ...rest }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: reduced ? 0 : delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Child item for <Stagger>. Slides up with spring snap. */
export function StaggerItem({ children, className = "", ...rest }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 50 },
        show: { opacity: 1, x: 0, y: 0, transition: reduced ? { duration: 0.25 } : SPRING },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
