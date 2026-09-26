"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, CustomEase);
CustomEase.create("aurora", "0.65, 0, 0.35, 1");
gsap.defaults({ ease: "aurora" });

export { CustomEase, Flip, gsap, ScrollTrigger, SplitText };
