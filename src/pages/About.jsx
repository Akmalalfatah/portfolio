import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function AboutPage() {

    const pageRef = useRef(null);
    const [fontsReady, setFontsReady] = useState(false);

    useEffect(() => {
        // Wait for fonts to load
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                setFontsReady(true);
            });
        } else {
            setFontsReady(true);
        }
    }, []);

    useEffect(() => {
        if (!fontsReady) return;

        const ctx = gsap.context(() => {

            const titleElements = document.querySelectorAll(".about-title");
            const paragraphElements = document.querySelectorAll(".about-paragraph");

            if (!titleElements.length || !paragraphElements.length) {
                console.log("Elements not found");
                return;
            }

            const splitTitle = new SplitText(".about-title", {
                type: "lines",
                linesClass: "line",
            });

            const splitParagraphs = new SplitText(".about-paragraph", {
                type: "lines",
                linesClass: "line",
            });

            const tl = gsap.timeline();

            tl.fromTo(
                splitTitle.lines,
                { 
                    clipPath: "inset(100% 0% 0% 0%)",
                    opacity: 1
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.6,
                    ease: "expo.out",
                    stagger: 0.12,
                }
            )

            .fromTo(
                splitParagraphs.lines,
                { 
                    clipPath: "inset(100% 0% 0% 0%)",
                    opacity: 1
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.4,
                    ease: "expo.out",
                    stagger: 0.06,
                },
                "-=1.2"
            );

        }, pageRef);

        return () => ctx.revert();
    }, [fontsReady]);

    return (
        <section
            ref={pageRef}
            className="about-page relative min-h-screen w-full px-6 pt-[100px]"
        >
            <div className="w-[1300px] mx-auto flex items-start gap-[50px]">

                <div className="min-w-[100px] flex-shrink-0">
                    <span className="about-title font-display text-[20px] font-medium text-gray-800">
                        (*About.)
                    </span>
                </div>

                <div className="flex-1 font-ui text-[35px] leading-[55px] flex flex-col gap-[30px] text-justify">

                    <p className="about-paragraph italic font-medium">
                        Hello People!
                    </p>

                    <p className="about-paragraph">
                        My name is Akmal, I'm a <span className="italic font-medium">Fullstack Developer</span> and <span className="italic font-medium">third-year Computer Science student</span> with hands-on experience building end-to-end web and AI-assisted applications.
                    </p>

                    <p className="about-paragraph">
                        Proven leader in <span className="italic font-medium">national-level technology competitions</span>, frequently serving as <span className="italic font-medium">Project Manager and Team Lead</span>. Strong in product-oriented development, cross-functional collaboration, and delivering project-based solutions in fast-paced environments.
                    </p>

                </div>

            </div>
        </section>
    );
}