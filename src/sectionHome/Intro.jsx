import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Intro({ onComplete }) {
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if intro has already been shown in this session
        const introShown = sessionStorage.getItem("introShown");

        if (introShown) {
            // If already shown, skip the intro
            setHasShown(true);
            if (onComplete) onComplete();
            return;
        }

        // Show the intro animation
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
            const numHeight = reel.querySelector(".num").clientHeight;
            gsap.to(reel, {
                y: -steps * numHeight,
                duration,
                delay,
                ease: "power2.inOut",
            });
        };

        createCounterDigits();

        const tl = gsap.timeline({
            onComplete: () => {
                // Mark intro as shown
                sessionStorage.setItem("introShown", "true");
                setHasShown(true);
                if (onComplete) onComplete();
            }
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

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    // Don't render if already shown
    if (hasShown) return null;

    return (
        <section className="intro fixed inset-0 z-[9999] flex items-center justify-center font-ui bg-white">
            <div className="counter flex text-8xl leading-none">
                <div className="counter-1 digit h-[120px] overflow-hidden"></div>
                <div className="counter-2 digit h-[120px] overflow-hidden"></div>
                <div className="counter-3 digit h-[120px] overflow-hidden"></div>
                <div className="counter-4 digit h-[120px] overflow-hidden"></div>
                <div className="counter-5 digit h-[120px] overflow-hidden"></div>
                <div className="counter-6 digit h-[120px] overflow-hidden"></div>
                <div className="counter-7 digit h-[120px] overflow-hidden"></div>
            </div>
        </section>
    );
}