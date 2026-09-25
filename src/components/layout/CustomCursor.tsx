"use client";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

type CursorState = "default" | "view" | "drag" | "hide" | "interactive";

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const dot = dotRef.current;
      const ring = ringRef.current;
      const label = labelRef.current;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      if (!root || !dot || !ring || !label || coarsePointer) return;

      document.documentElement.classList.add("has-custom-cursor");
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      const dotX = gsap.quickSetter(dot, "x", "px");
      const dotY = gsap.quickSetter(dot, "y", "px");
      const ringX = gsap.quickTo(ring, "x", {
        duration: 0.6,
        ease: "power3.out",
      });
      const ringY = gsap.quickTo(ring, "y", {
        duration: 0.6,
        ease: "power3.out",
      });
      let currentState: CursorState = "default";
      let started = false;

      const resolveState = (target: EventTarget | null): CursorState => {
        if (!(target instanceof Element)) return "default";
        const interactive = target.closest<HTMLElement>(
          "[data-cursor],a,button,input,select,textarea",
        );
        if (!interactive) return "default";
        const declared = interactive.dataset.cursor as CursorState | undefined;
        if (declared) return declared;
        if (interactive.matches("input,select,textarea")) return "hide";
        return "interactive";
      };

      const renderState = (state: CursorState) => {
        if (state === currentState) return;
        currentState = state;

        const settings = {
          default: {
            scaleX: 1,
            scaleY: 1,
            backgroundColor: "transparent",
            borderColor: "currentColor",
            autoAlpha: 1,
            text: "",
            labelScaleX: 1,
            labelScaleY: 1,
          },
          view: {
            scaleX: 2.4,
            scaleY: 2.4,
            backgroundColor: "#f3efe8",
            borderColor: "#f3efe8",
            autoAlpha: 1,
            text: "Ver",
            labelScaleX: 0.416,
            labelScaleY: 0.416,
          },
          drag: {
            scaleX: 3.1,
            scaleY: 1.15,
            backgroundColor: "#f3efe8",
            borderColor: "#f3efe8",
            autoAlpha: 1,
            text: "← Arraste →",
            labelScaleX: 0.323,
            labelScaleY: 0.87,
          },
          hide: {
            scaleX: 0,
            scaleY: 0,
            backgroundColor: "transparent",
            borderColor: "transparent",
            autoAlpha: 0,
            text: "",
            labelScaleX: 1,
            labelScaleY: 1,
          },
          interactive: {
            scaleX: 0.4,
            scaleY: 0.4,
            backgroundColor: "#f3efe8",
            borderColor: "#f3efe8",
            autoAlpha: 1,
            text: "",
            labelScaleX: 1,
            labelScaleY: 1,
          },
        }[state];

        label.textContent = settings.text;
        gsap.to(ring, {
          scaleX: settings.scaleX,
          scaleY: settings.scaleY,
          backgroundColor: settings.backgroundColor,
          borderColor: settings.borderColor,
          autoAlpha: settings.autoAlpha,
          duration: 0.38,
          ease: "aurora",
          overwrite: "auto",
        });
        gsap.to(label, {
          scaleX: settings.labelScaleX,
          scaleY: settings.labelScaleY,
          autoAlpha: settings.text ? 1 : 0,
          duration: 0.3,
          overwrite: "auto",
        });
        gsap.to(dot, {
          autoAlpha: state === "hide" ? 0 : 1,
          duration: 0.2,
          overwrite: "auto",
        });
      };

      const onPointerMove = (event: PointerEvent) => {
        dotX(event.clientX);
        dotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);

        if (!started) {
          started = true;
          gsap.set([dot, ring], { autoAlpha: 1 });
        }
        renderState(resolveState(event.target));
      };

      const onPointerLeave = () => {
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2, overwrite: true });
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);

      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        document.documentElement.removeEventListener("pointerleave", onPointerLeave);
        document.documentElement.classList.remove("has-custom-cursor");
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} aria-hidden="true" className="custom-cursor-root">
      <span ref={dotRef} className="custom-cursor-dot" />
      <span ref={ringRef} className="custom-cursor-ring">
        <span ref={labelRef} className="custom-cursor-label" />
      </span>
    </div>
  );
}
