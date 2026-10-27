import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SPRING } from "../../utils/constants";

/**
 * Reversed flip card: the bold message card shows by default.
 * The profile photo flips into view on hover (desktop) / tap (mobile);
 * keyboard accessible via Enter/Space.
 * With prefers-reduced-motion: falls back to a simple opacity cross-fade.
 */
export default function FlipCard({ photo, alt, backTitle, backStack = [] }) {
  const [showPhoto, setShowPhoto] = useState(false);
  const reduced = useReducedMotion();

  const toggle = () => setShowPhoto((p) => !p);

  const faceBase = "absolute inset-0 overflow-hidden border-[3px] border-ink";

  /* Reduced motion: both faces stacked, cross-fade with opacity, no 3D */
  const photoStyle = reduced
    ? {
        opacity: showPhoto ? 1 : 0,
        transition: "opacity 0.3s ease",
        backfaceVisibility: "visible",
        pointerEvents: showPhoto ? "auto" : "none",
      }
    : { backfaceVisibility: "hidden" };
  const messageStyle = reduced
    ? {
        opacity: showPhoto ? 0 : 1,
        transition: "opacity 0.3s ease",
        backfaceVisibility: "visible",
        pointerEvents: showPhoto ? "none" : "auto",
      }
    : { backfaceVisibility: "hidden", transform: "rotateY(180deg)" };

  return (
    <div
      className="flip-scene select-none"
      onMouseEnter={() => setShowPhoto(true)}
      onMouseLeave={() => setShowPhoto(false)}
    >
      <motion.button
        type="button"
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        aria-pressed={showPhoto}
        aria-label="Profile card. Hover or activate to reveal the photo."
        className="relative block h-80 w-full cursor-pointer border-[3px] border-ink bg-transparent shadow-hard sm:h-96 md:h-[26rem]"
        style={reduced ? undefined : { transformStyle: "preserve-3d" }}
        initial={false}
        animate={reduced ? { opacity: 1 } : { rotateY: showPhoto ? 0 : 180 }}
        transition={reduced ? { duration: 0.25 } : SPRING}
      >
        {/* PHOTO face — hidden by default, flips in on hover */}
        <div className={`${faceBase} bg-paper`} style={photoStyle}>
          <img
            src={photo}
            alt={alt}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* MESSAGE face — visible by default */}
        <div
          className={`${faceBase} flex flex-col items-center justify-center gap-5 bg-hot p-6 text-center`}
          style={messageStyle}
        >
          <p className="font-display text-2xl uppercase leading-tight text-ink sm:text-3xl md:text-4xl">
            {backTitle}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {backStack.map((tech) => (
              <span
                key={tech}
                className="border-2 border-ink bg-cream px-2.5 py-1 font-mono text-xs font-bold uppercase text-ink"
              >
                {tech}
              </span>
            ))}
          </div>
          <span className="mt-1 border-2 border-ink bg-ink px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-sun">
            {reduced ? "Tap to see my face ↻" : "Hover ↻"}
          </span>
        </div>
      </motion.button>
    </div>
  );
}
