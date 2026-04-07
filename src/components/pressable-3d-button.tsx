"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Custom3DButton } from "./threeD-button";
import { cn } from "@/lib/utils";

const pressTransition = {
  type: "spring",
  stiffness: 300,
  damping: 14,
  mass: 0.9,
};

const releaseTransition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.8,
};

function Pressable3DButton() {
  const [isPressed, setIsPressed] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const buttonAnimate = shouldReduceMotion
    ? {
        scale: isPressed ? 0.99 : 1,
        boxShadow: isPressed
          ? "0 8px 18px rgba(0, 0, 0, 0.12)"
          : "0 4px 8px rgba(0, 0, 0, 0.1)",
      }
    : isPressed
      ? {
          y: -18,
          x: 8,
          rotateZ: -14,
          scale: 1.01,
          boxShadow: "0 10px 22px rgba(0, 0, 0, 0.14)",
        }
      : {
          y: 0,
          x: 0,
          rotateZ: 0,
          scale: 1,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        };

  return (
    <div className="group relative inline-flex">
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[1.05rem] bg-neutral-100 inset-shadow-sm inset-shadow-neutral-400",
          "shadow-[inset_-12px_-8px_40px_#46464620]",
        )}
        initial={false}
        animate={{ opacity: isPressed ? 1 : 0.97 }}
        transition={{ duration: 0.1, ease: [0.23, 1, 0.32, 1] }}
      />
      <Custom3DButton
        surfaceColor="var(--color-white)"
        edgeColor="var(--color-gray-300)"
        textColor="var(--color-neutral-800)"
        className="relative z-10 flex items-center gap-4 origin-bottom transform-gpu will-change-transform select-none"
        initial={false}
        animate={buttonAnimate}
        transition={isPressed ? pressTransition : releaseTransition}
        onPointerDown={() => setIsPressed(true)}
        onPointerUp={() => setIsPressed(false)}
        onPointerCancel={() => setIsPressed(false)}
        onBlur={() => setIsPressed(false)}
      >
        <div className="size-3 rounded-full bg-neutral-100 inset-shadow-xs group-hover:inset-shadow-none inset-shadow-neutral-400 transition-colors group-hover:bg-orange-500 group-hover:shadow-2xl group-hover:shadow-orange-600" />
        <span className="font-normal font-sans">Get Started</span>
      </Custom3DButton>
    </div>
  );
}

export default Pressable3DButton;
