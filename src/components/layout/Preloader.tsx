"use client";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

const SESSION_KEY = "aurora-preloader-seen";
const counterSteps = Array.from({ length: 101 }, (_, index) =>
  String(index).padStart(3, "0"),
);

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "true";

      const announceReady = () => {
        document.documentElement.dataset.auroraReady = "true";
        window.dispatchEvent(new Event("aurora:ready"));
      };

      if (!root || reduceMotion || alreadySeen) {
        document.documentElement.classList.remove("is-preloading");
        announceReady();
        setVisible(false);
        return;
      }

      document.documentElement.classList.add("is-preloading");
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;

        const strips = root.querySelectorAll<HTMLElement>("[data-odometer-strip]");
        const line = root.querySelector<HTMLElement>("[data-preloader-line]");
        const content = root.querySelector<HTMLElement>("[data-preloader-content]");
        const curtainTop = root.querySelector<HTMLElement>("[data-curtain-top]");
        const curtainBottom = root.querySelector<HTMLElement>("[data-curtain-bottom]");

        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

        const timeline = gsap.timeline({
          defaults: { ease: "aurora" },
          onComplete: () => {
            sessionStorage.setItem(SESSION_KEY, "true");
            document.documentElement.classList.remove("is-preloading");
            announceReady();
            setVisible(false);
          },
        });

        timeline
          .to(
            strips,
            {
              yPercent: -((counterSteps.length - 1) / counterSteps.length) * 100,
              duration: 0.85,
              ease: "power2.inOut",
            },
            0,
          )
          .to(line, { scaleX: 1, duration: 0.85, ease: "none" }, 0)
          .to(content, { autoAlpha: 0, duration: 0.15 }, 0.36)
          .to(curtainTop, { yPercent: -100, duration: 1.2 }, 0.4)
          .to(curtainBottom, { yPercent: 100, duration: 1.2 }, 0.4);
      });

      return () => {
        cancelled = true;
        document.documentElement.classList.remove("is-preloading");
      };
    },
    { scope: rootRef },
  );

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      aria-label="Carregando Aurora Residências"
      aria-live="polite"
      className="aurora-preloader"
      role="status"
    >
      <div className="preloader-curtain preloader-curtain--top" data-curtain-top />
      <div
        className="preloader-curtain preloader-curtain--bottom"
        data-curtain-bottom
      />

      <div className="preloader-content" data-preloader-content>
        <div className="preloader-signature">
          <span>Aurora</span>
          <i data-preloader-line />
        </div>

        <div aria-hidden="true" className="preloader-counter">
          {[0, 1, 2].map((column) => (
            <span key={column} className="preloader-digit-window">
              <span className="preloader-digit-strip" data-odometer-strip>
                {counterSteps.map((value, index) => (
                  <span key={`${column}-${index}`}>{value[column]}</span>
                ))}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
