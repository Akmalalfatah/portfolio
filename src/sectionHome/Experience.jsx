import gridLines from '/images/Experience/grid-lines.png'
import picture1 from "/images/Experience/picture-1.png";
import picture2 from "/images/Experience/picture-2.png";
import picture3 from "/images/Experience/picture-3.png";
import picture4 from "/images/Experience/picture-4.png";
import picture5 from "/images/Experience/picture-5.png";
import picture6 from "/images/Experience/picture-6.png";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Experience() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        let mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            const initialRotations = [5, -3, 4, -2, 3, -1];
            const phaseOneStartOffsets = [0, 0.03, 0.06, 0.09, 0.12, 0.15];
            const phaseTwoStartOffsets = [0.75, 0.7, 0.65, 0.6, 0.55, 0.5];

            const spotlightImages = sectionRef.current.querySelectorAll(".spotlight-img");

            if (!spotlightImages.length) {
                console.warn("Spotlight images not found");
                return;
            }

            const getFinalPositions = (container, isMobile) => {
                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;

                if (!isMobile) {
                    const desktopBaseWidth = 1440;
                    const desktopBaseHeight = 760;
                    const scaleX = containerWidth / desktopBaseWidth;
                    const scaleY = containerHeight / desktopBaseHeight;

                    return [
                        { left: 108 * scaleX, top: 80 * scaleY },
                        { left: 518 * scaleX, top: 0 * scaleY },
                        { left: 901 * scaleX, top: 120 * scaleY },
                        { left: 45 * scaleX, top: 430 * scaleY },
                        { left: 397 * scaleX, top: 390 * scaleY },
                        { left: 821 * scaleX, top: 450 * scaleY },
                    ];
                }

                return [
                    { left: containerWidth * 0.04, top: containerHeight * 0.08 },
                    { left: containerWidth * 0.5, top: containerHeight * 0.03 },
                    { left: containerWidth * 0.2, top: containerHeight * 0.24 },
                    { left: containerWidth * 0.55, top: containerHeight * 0.35 },
                    { left: containerWidth * 0.05, top: containerHeight * 0.52 },
                    { left: containerWidth * 0.48, top: containerHeight * 0.64 },
                ];
            };

            mm.add({
                isDesktop: "(min-width: 768px)",
                isMobile: "(max-width: 767px)"
            }, (context) => {
                const { isMobile } = context.conditions;
                const centerTop = isMobile ? "38%" : "50%";

                spotlightImages.forEach((img, index) => {
                    const initialRotation = initialRotations[index];

                    gsap.set(img, {
                        left: "50%",
                        top: centerTop,
                        xPercent: -50,
                        yPercent: -50,
                        transform: `translate(0%, 200%) rotate(${initialRotation}deg)`,
                    });
                });

                const scrollTriggerInstance = ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${window.innerHeight * (isMobile ? 2.2 : 6)}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const container = sectionRef.current?.querySelector(".spotlight-images");
                        if (!container) return;

                        const spotlightImgFinalPos = getFinalPositions(container, isMobile);
                        const containerWidth = container.offsetWidth;
                        const containerHeight = container.offsetHeight;

                        spotlightImages.forEach((img, index) => {
                            const initialRotation = initialRotations[index];
                            const phase1Start = phaseOneStartOffsets[index];
                            const phase1End = Math.min(phase1Start + 0.15, 0.3);

                            let x = 0;
                            let y = isMobile ? 500 : 200;
                            let rotation = initialRotation;
                            let useTranslate = true;

                            if (progress >= phase1Start && progress <= phase1End) {
                                let phase1Progress;

                                if (progress >= phase1End) {
                                    phase1Progress = 1;
                                } else {
                                    const linearProgress =
                                        (progress - phase1Start) / (phase1End - phase1Start);
                                    phase1Progress = 1 - Math.pow(1 - linearProgress, 3);
                                }

                                const startY = isMobile ? 420 : 200;
                                y = startY - phase1Progress * startY;
                            } else if (progress > phase1End && progress < 0.5) {
                                x = 0;
                                y = 0;
                            }

                            const phase2Start = phaseTwoStartOffsets[index];
                            const phase2End = Math.min(
                                phase2Start + (0.95 - phase2Start) * 0.9,
                                0.95
                            );

                            const finalPos = spotlightImgFinalPos[index];
                            const imgWidth = img.offsetWidth;
                            const imgHeight = img.offsetHeight;

                            const centerLeft = (containerWidth - imgWidth) / 2;
                            const centerTopPosition = containerHeight * (isMobile ? 0.38 : 0.5) - imgHeight / 2;

                            if (progress >= phase2Start && progress <= 0.95) {
                                let phase2Progress;

                                if (progress >= phase2End) {
                                    phase2Progress = 1;
                                } else {
                                    const linearProgress =
                                        (progress - phase2Start) / (phase2End - phase2Start);
                                    phase2Progress = 1 - Math.pow(1 - linearProgress, 3);
                                }

                                const targetLeft =
                                    centerLeft + phase2Progress * (finalPos.left - centerLeft);
                                const targetTop =
                                    centerTopPosition + phase2Progress * (finalPos.top - centerTopPosition);

                                gsap.set(img, {
                                    left: `${targetLeft}px`,
                                    top: `${targetTop}px`,
                                    xPercent: 0,
                                    yPercent: 0,
                                    transform: `rotate(${initialRotation * (1 - phase2Progress)}deg)`,
                                });

                                useTranslate = false;
                            } else if (progress > 0.95) {
                                gsap.set(img, {
                                    left: `${finalPos.left}px`,
                                    top: `${finalPos.top}px`,
                                    xPercent: 0,
                                    yPercent: 0,
                                    transform: "rotate(0deg)",
                                });

                                useTranslate = false;
                            } else if (progress >= 0.5 && progress < phase2Start) {
                                x = 0;
                                y = 0;
                            }

                            if (useTranslate) {
                                gsap.set(img, {
                                    left: "50%",
                                    top: centerTop,
                                    xPercent: -50,
                                    yPercent: -50,
                                    transform: `translate(${x}%, ${y}%) rotate(${rotation}deg)`,
                                });
                            }
                        });
                    },
                });

                return () => {
                    scrollTriggerInstance.kill(true);
                };
            });
        }, sectionRef);

        return () => {
            mm.revert();
            ctx.revert();
            ScrollTrigger.refresh();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="experience relative h-screen overflow-hidden px-[24px] md:px-0"
        >
            {/* Grid: top is manually set. Increase to move down, decrease to move up. */}
            <div
                className="grid-lines absolute z-0 pointer-events-none"
                style={{
                    top: "15vh",          /* ← tune this: move grid up/down */
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "75vw",        /* ← tune this: make grid wider/narrower */
                    maxWidth: "560px",
                }}
            >
                <img
                    src={gridLines}
                    style={{ width: "100%", height: "auto", display: "block" }}
                    alt="Grid lines"
                />
            </div>

            <div className="spotlight-images absolute w-full h-full flex items-center justify-center z-20">
                <div className="spotlight-img w-[45vw] max-w-[507px] min-w-[160px] aspect-[507/321] md:w-[507px] md:h-[321px] absolute z-2">
                    <img src={picture1} className="w-full h-full object-cover" alt="Experience 1" />
                </div>

                <div className="spotlight-img w-[46vw] max-w-[512px] min-w-[165px] aspect-[512/329] md:w-[512px] md:h-[329px] absolute z-3">
                    <img src={picture2} className="w-full h-full object-cover" alt="Experience 2" />
                </div>

                <div className="spotlight-img w-[44vw] max-w-[501px] min-w-[160px] aspect-[501/310] md:w-[501px] md:h-[310px] absolute z-4">
                    <img src={picture3} className="w-full h-full object-cover" alt="Experience 3" />
                </div>

                <div className="spotlight-img w-[45vw] max-w-[508px] min-w-[160px] aspect-[508/322] md:w-[508px] md:h-[322px] absolute z-5">
                    <img src={picture4} className="w-full h-full object-cover" alt="Experience 4" />
                </div>

                <div className="spotlight-img w-[43vw] max-w-[497px] min-w-[155px] aspect-[497/302] md:w-[497px] md:h-[302px] absolute z-6">
                    <img src={picture5} className="w-full h-full object-cover" alt="Experience 5" />
                </div>

                <div className="spotlight-img w-[45vw] max-w-[506px] min-w-[160px] aspect-[506/319] md:w-[506px] md:h-[319px] absolute z-7">
                    <img src={picture6} className="w-full h-full object-cover" alt="Experience 6" />
                </div>
            </div>

            {/* Text: top is manually set. Increase to move down, decrease to move up. */}
            <div
                className="experience-text absolute z-10 text-center pointer-events-none"
                style={{
                    top: "28vh",          /* ← tune this: move text up/down */
                    left: "24px",
                    right: "24px",
                    maxWidth: "700px",        /* ← decrease this number to make it narrower */
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <span className="font-ui block text-[22px] leading-[30px] sm:text-[28px] sm:leading-[38px] md:text-[45px] md:leading-[50px]">
                    I've been involed in <span className="italic font-medium">several</span> leadership & organizational{" "}
                    <span className="italic font-medium">experience.</span> Gained inspirations and experience. Check 'em out!
                </span>
            </div>
        </section>
    )
}