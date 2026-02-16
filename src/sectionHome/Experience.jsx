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

        let scrollTriggerInstance = null;

        const ctx = gsap.context(() => {
            // Final positions (where images end up - pixel based)
            const spotlightImgFinalPos = [
                { left: 108, top: 80 },   // picture1
                { left: 518, top: 0 },    // picture2
                { left: 901, top: 120 },  // picture3
                { left: 45, top: 430 },   // picture4
                { left: 397, top: 390 },  // picture5
                { left: 821, top: 450 },  // picture6
            ];

            const initialRotations = [5, -3, 4, -2, 3, -1];
            const phaseOneStartOffsets = [0, 0.03, 0.06, 0.09, 0.12, 0.15];
            const phaseTwoStartOffsets = [0.75, 0.7, 0.65, 0.6, 0.55, 0.5];

            const spotlightImages = sectionRef.current.querySelectorAll(".spotlight-img");
            
            if (!spotlightImages.length) {
                console.warn("Spotlight images not found");
                return;
            }

            // Set initial position (bottom of screen, before scroll starts)
            spotlightImages.forEach((img, index) => {
                const initialRotation = initialRotations[index];
                gsap.set(img, {
                    transform: `translate(0%, 200%) rotate(${initialRotation}deg)`,
                });
            });

            scrollTriggerInstance = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${window.innerHeight * 6}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;

                    spotlightImages.forEach((img, index) => {
                        const initialRotation = initialRotations[index];
                        const phase1Start = phaseOneStartOffsets[index];
                        const phase1End = Math.min(
                            phase1Start + 0.15,
                            0.3
                        );

                        let x = 0;
                        let y = 200;
                        let rotation = initialRotation;
                        let useTranslate = true;

                        // Phase 1: Rising up from bottom to center (0, 0)
                        if (progress >= phase1Start && progress <= phase1End) {
                            let phase1Progress;

                            if (progress >= phase1End) {
                                phase1Progress = 1;
                            } else {
                                const linearProgress =
                                    (progress - phase1Start) / (phase1End - phase1Start);
                                phase1Progress = 1 - Math.pow(1 - linearProgress, 3);
                            }

                            x = 0;
                            y = 200 - phase1Progress * 200;
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

                        // Get container and image dimensions
                        const container = sectionRef.current?.querySelector('.spotlight-images');
                        if (!container) return;
                        
                        const containerWidth = container.offsetWidth;
                        const containerHeight = container.offsetHeight;
                        const imgWidth = img.offsetWidth;
                        const imgHeight = img.offsetHeight;

                        // Calculate center position in pixels
                        const centerLeft = (containerWidth - imgWidth) / 2;
                        const centerTop = (containerHeight - imgHeight) / 2;

                        // Phase 2: Spreading out from center to final pixel positions
                        if (progress >= phase2Start && progress <= 0.95) {
                            let phase2Progress;

                            if (progress >= phase2End) {
                                phase2Progress = 1;
                            } else {
                                const linearProgress =
                                    (progress - phase2Start) / (phase2End - phase2Start);
                                phase2Progress = 1 - Math.pow(1 - linearProgress, 3);
                            }

                            const targetLeft = centerLeft + phase2Progress * (finalPos.left - centerLeft);
                            const targetTop = centerTop + phase2Progress * (finalPos.top - centerTop);

                            gsap.set(img, {
                                left: `${targetLeft}px`,
                                top: `${targetTop}px`,
                                transform: `rotate(${initialRotation * (1 - phase2Progress)}deg)`,
                            });
                            useTranslate = false;
                        } else if (progress > 0.95) {
                            gsap.set(img, {
                                left: `${finalPos.left}px`,
                                top: `${finalPos.top}px`,
                                transform: `rotate(0deg)`,
                            });
                            useTranslate = false;
                        } else if (progress >= 0.5 && progress < phase2Start) {
                            x = 0;
                            y = 0;
                        }

                        if (useTranslate) {
                            gsap.set(img, {
                                transform: `translate(${x}%, ${y}%) rotate(${rotation}deg)`,
                            });
                        }
                    });
                },
            });
        }, sectionRef);

        return () => {
            // Kill ScrollTrigger instance first
            if (scrollTriggerInstance) {
                scrollTriggerInstance.kill(true);
            }
            
            // Kill ALL ScrollTriggers as a safety measure
            const triggers = ScrollTrigger.getAll();
            triggers.forEach(trigger => {
                if (trigger.vars.trigger === sectionRef.current) {
                    trigger.kill(true);
                }
            });
            
            // Revert GSAP context
            ctx.revert();
            
            // Force ScrollTrigger refresh to clean up any remaining state
            ScrollTrigger.refresh();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="experience relative min-h-screen flex items-center justify-center"
        >
            <div className="grid-lines absolute flex items-center justify-center z-0 w-full h-full">
                <img src={gridLines} alt="Grid lines" />
            </div>

            <div className='spotlight-images absolute w-full h-full flex items-center justify-center z-20'>
                <div className='spotlight-img w-[507px] h-[321px] absolute z-2'>
                    <img src={picture1} className="w-full h-full object-cover" alt="Experience 1" />
                </div>

                <div className="spotlight-img w-[512px] h-[329px] absolute z-3">
                    <img src={picture2} className="w-full h-full object-cover" alt="Experience 2" />
                </div>

                <div className="spotlight-img w-[501px] h-[310px] absolute z-4">
                    <img src={picture3} className="w-full h-full object-cover" alt="Experience 3" />
                </div>

                <div className="spotlight-img w-[508px] h-[322px] absolute z-5">
                    <img src={picture4} className="w-full h-full object-cover" alt="Experience 4" />
                </div>

                <div className="spotlight-img w-[497px] h-[302px] absolute z-6">
                    <img src={picture5} className="w-full h-full object-cover" alt="Experience 5" />
                </div>

                <div className="spotlight-img w-[506px] h-[319px] absolute z-7">
                    <img src={picture6} className="w-full h-full object-cover" alt="Experience 6" />
                </div>
            </div>

            <div className="experience-text w-[898px] text-center z-10 relative">
                <span className="font-ui leading-[50px] text-[45px]">
                    I've been involed in <span className="italic font-medium">several</span> leadership & organizational{" "}
                    <span className="italic font-medium">experience.</span> Gained inspirations and experience. Check 'em out!
                </span>
            </div>
        </section>
    )
}