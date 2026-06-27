import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Intro({ onComplete }) {
  const [shouldShow, setShouldShow] = useState(true);
  const counterRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = "0";
    window.scrollTo(0, 0);

    const isNavigation = sessionStorage.getItem("hasNavigated");

    if (isNavigation) {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      setShouldShow(false);
      if (onComplete) onComplete();
      return;
    }
    sessionStorage.setItem("hasNavigated", "true");

    const timer = setTimeout(() => {
      const createCounterDigits = () => {
        const buildReel = (selector, values) => {
          const counter = document.querySelector(selector);
          if (!counter) return;
          const reel = document.createElement("div");
          reel.className = "reel";
          counter.appendChild(reel);

          values.forEach(v => {
            const num = document.createElement("div");
            num.className = "num";
            num.textContent = v;
            reel.appendChild(num);
          });
        };

        buildReel(".counter-1", ["Q", "M", "A", "Z", "L", "R", "T", "H", "X", "W"]);
        buildReel(".counter-2", ["K", "P", "W", "E", "B", "S", "Y", "N", "O", "E"]);
        buildReel(".counter-3", ["J", "C", "V", "R", "A", "P", "M", "S", "E", "L"]);
        buildReel(".counter-4", ["A", "Z", "F", "G", "K", "O", "I", "C", "S", "C"]);
        buildReel(".counter-5", ["X", "K", "I", "Z", "F", "Q", "J", "B", "A", "O"]);
        buildReel(".counter-6", ["W", "D", "X", "I", "K", "H", "G", "M", "X", "M"]);
        buildReel(".counter-7", ["F", "O", "U", "R", "X", "M", "T", "Y", "W", "E"]);
      };

      const animateCounter = (selector, steps, duration, delay = 0) => {
        const reel = document.querySelector(selector + " .reel");
        if (!reel) return;
        // Read the actual rendered height of each digit — works correctly
        // regardless of viewport size since the font is fluid (clamp-based).
        const numHeight = reel.querySelector(".num").clientHeight;
        gsap.to(reel, {
          y: -steps * numHeight,
          duration,
          delay,
          ease: "power2.inOut",
        });
      };

      createCounterDigits();

      // Sync the overflow-hidden digit containers to the live font size so the
      // reel clip is always exactly one character tall on every screen.
      const syncDigitHeights = () => {
        const firstNum = document.querySelector(".counter-1 .num");
        if (!firstNum) return;
        const h = firstNum.clientHeight;
        document.querySelectorAll(".digit").forEach(el => {
          el.style.height = h + "px";
        });
      };
      syncDigitHeights();

      const tl = gsap.timeline({
        onComplete: () => {
          window.scrollTo(0, 0);
          document.body.style.overflow = "auto";
          document.body.style.position = "static";
          document.body.style.width = "auto";
          document.body.style.top = "auto";

          setShouldShow(false);
          if (onComplete) onComplete();
        },
      });

      tl.add(() => {
        animateCounter(".counter-7", 9, 4);
        animateCounter(".counter-6", 9, 3.8);
        animateCounter(".counter-5", 9, 3.6);
        animateCounter(".counter-4", 9, 3.2);
        animateCounter(".counter-3", 9, 3);
        animateCounter(".counter-2", 9, 2.5);
        animateCounter(".counter-1", 9, 2);
      }).to(".intro", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "expo.inOut",
        delay: 3.5,
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.scrollTo(0, 0);
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
      document.body.style.top = "auto";
    };
  }, [onComplete]);

  if (!shouldShow) return null;

  return (
    <>
      {/*
        Fluid font size: scales from ~48px on the smallest phones up to 120px
        on desktop, without any JS involvement. Each digit container starts
        with height:auto so syncDigitHeights() can read the true rendered
        character height once fonts have loaded and then lock it in.
      */}
      <style>{`
        .intro-counter-font {
          font-size: clamp(3rem, 12vw, 7.5rem);
          line-height: 1;
        }
      `}</style>

      <section
        className="intro fixed inset-0 z-[9999] flex items-center justify-center font-ui bg-white"
        ref={counterRef}
      >
        <div className="counter flex intro-counter-font">
          <div className="counter-1 digit overflow-hidden" style={{ height: "auto" }}></div>
          <div className="counter-2 digit overflow-hidden" style={{ height: "auto" }}></div>
          <div className="counter-3 digit overflow-hidden" style={{ height: "auto" }}></div>
          <div className="counter-4 digit overflow-hidden" style={{ height: "auto" }}></div>
          <div className="counter-5 digit overflow-hidden" style={{ height: "auto" }}></div>
          <div className="counter-6 digit overflow-hidden" style={{ height: "auto" }}></div>
          <div className="counter-7 digit overflow-hidden" style={{ height: "auto" }}></div>
        </div>
      </section>
    </>
  );
}