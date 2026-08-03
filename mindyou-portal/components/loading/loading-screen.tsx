"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BRAIN_CENTER,
  BRAIN_FACETS,
  LOGO_VIEWBOX,
  WORDMARK_LETTERS,
} from "./logo-paths";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

interface LoadingScreenProps {
  /** Called once the full entrance choreography has finished playing. */
  onComplete?: () => void;
  /** Label under the mark while loading. */
  label?: string;
  /** Minimum time (ms) the screen stays up, even if onComplete fires early. */
  minDurationMs?: number;
}

// Facets ordered core-outward once, at module scope — stable across renders.
const ORDERED_FACETS = [...BRAIN_FACETS].sort((a, b) => {
  const da = Math.hypot(a.cx - BRAIN_CENTER.x, a.cy - BRAIN_CENTER.y);
  const db = Math.hypot(b.cx - BRAIN_CENTER.x, b.cy - BRAIN_CENTER.y);
  return da - db;
});

// Deterministic per-facet settle-rotation (organic, but reproducible across renders).
function seededRotation(index: number): number {
  const x = Math.sin(index * 12.9898) * 43758.5453;
  const frac = x - Math.floor(x);
  return Math.round((frac * 2 - 1) * 8); // -8deg .. 8deg
}

const FACET_STEP_MS = 11;
const FACET_DURATION_MS = 480;
const BRAIN_SPAN_MS =
  (ORDERED_FACETS.length - 1) * FACET_STEP_MS + FACET_DURATION_MS;
const WORD_START_MS = BRAIN_SPAN_MS + 150;
const LETTER_STEP_MS = 58;
const LETTER_DURATION_MS = 420;
const SEQUENCE_END_MS =
  WORD_START_MS +
  (WORDMARK_LETTERS.length - 1) * LETTER_STEP_MS +
  LETTER_DURATION_MS;

export function LogoMark({
  className,
  layoutId,
  animated = false,
  transition,
}: {
  className?: string;
  /** Pass the same layoutId used on the header logo for a shared-element transition. */
  layoutId?: string;
  /** When true, plays the full assemble-in choreography (splash use). Header usage should pass false. */
  animated?: boolean;
  /** Shared-element (layoutId) transition. Defaults to Framer's spring. */
  transition?: import("framer-motion").Transition;
}) {
  const reduceMotion = useReducedMotion();

  if (!animated) {
    // Static render — used for the settled/header instance, or reduced-motion fallback.
    return (
      <motion.svg
        layoutId={layoutId}
        layout
        transition={transition}
        viewBox={LOGO_VIEWBOX}
        className={className}
      >
        {ORDERED_FACETS.map((p) => (
          <path key={p.d.slice(0, 12)} d={p.d} fill={p.fill} />
        ))}
        {WORDMARK_LETTERS.map((p) => (
          <path key={p.letter} d={p.d} fill={p.fill} />
        ))}
      </motion.svg>
    );
  }

  return (
    <motion.svg
      layoutId={layoutId}
      viewBox={LOGO_VIEWBOX}
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id="brain-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#8FE0E2" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8FE0E2" stopOpacity="0" />
        </radialGradient>
      </defs>

      {reduceMotion ? (
        // Reduced motion: simple crossfade of the whole lockup, no per-piece choreography.
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {ORDERED_FACETS.map((p) => (
            <path key={p.d.slice(0, 12)} d={p.d} fill={p.fill} />
          ))}
          {WORDMARK_LETTERS.map((p) => (
            <path key={p.letter} d={p.d} fill={p.fill} />
          ))}
        </motion.g>
      ) : (
        <>
          <motion.circle
            cx={BRAIN_CENTER.x}
            cy={BRAIN_CENTER.y}
            r={26}
            fill="url(#brain-glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{
              duration: 0.9,
              delay: (BRAIN_SPAN_MS + 300) / 1000,
              ease: EASE_OUT,
            }}
          />

          {ORDERED_FACETS.map((facet, i) => (
            <motion.path
              key={facet.d.slice(0, 12)}
              d={facet.d}
              fill={facet.fill}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={{ opacity: 0, scale: 0.35, rotate: seededRotation(i) }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: FACET_DURATION_MS / 1000,
                delay: (i * FACET_STEP_MS) / 1000,
                ease: EASE_OUT,
              }}
            />
          ))}

          {WORDMARK_LETTERS.map((letter, i) => (
            <motion.path
              key={letter.letter}
              d={letter.d}
              fill={letter.fill}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: LETTER_DURATION_MS / 1000,
                delay: (WORD_START_MS + i * LETTER_STEP_MS) / 1000,
                ease: EASE_OUT,
              }}
            />
          ))}
        </>
      )}
    </motion.svg>
  );
}

export function LoadingScreen({
  onComplete,
  label = "Loading your space",
  minDurationMs = SEQUENCE_END_MS + 900,
}: LoadingScreenProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const holdMs = useMemo(
    () => (reduceMotion ? 500 : minDurationMs),
    [reduceMotion, minDurationMs],
  );

  // Auto-dismiss after the choreography + a short hold. In real usage, gate
  // this on your actual async readiness (auth/session check) combined with
  // a minimum hold time so the animation never feels cut off.
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, holdMs);
    return () => clearTimeout(t);
  }, [holdMs, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-7"
          style={{
            background:
              "radial-gradient(120% 100% at 18% 8%, #FBFEFE 0%, transparent 55%), radial-gradient(140% 120% at 85% 95%, #E8F6F6 0%, transparent 60%), #FBFEFE",
          }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: EASE_OUT } }}
        >
          <div className="w-[min(58vw,320px)]">
            <LogoMark animated layoutId="brand-logo" className="w-full" />
          </div>

          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: (SEQUENCE_END_MS + 100) / 1000,
              ease: EASE_OUT,
            }}
          >
            <span className="text-[12.5px] font-medium uppercase tracking-[0.09em] text-[#002E39]/60">
              {label}
            </span>
            <span className="relative h-0.5 w-[120px] overflow-hidden rounded-full bg-[#002E39]/10">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #45C3C6, #8FE0E2)",
                }}
                initial={{ right: "100%" }}
                animate={{ right: "0%" }}
                transition={{
                  duration: 1.7,
                  delay: (SEQUENCE_END_MS + 150) / 1000,
                  ease: [0.77, 0, 0.175, 1],
                }}
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
