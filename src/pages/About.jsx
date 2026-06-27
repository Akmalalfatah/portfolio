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
            className="about-page relative min-h-screen w-full px-[16px] md:px-6 pt-[80px] md:pt-[140px] pb-[60px]"
        >
            {/* Poin Perubahan Utama:
              - w-full max-w-[1300px]: Agar di mobile lebarnya fluid, di desktop maksimal 1300px
              - flex-col md:flex-row: Di mobile berjejer ke bawah, di desktop berjejer ke samping
              - gap-[20px] md:gap-[50px]: Jarak antar elemen menyesuaikan layar
            */}
            <div className="w-full max-w-[1300px] mx-auto flex flex-col md:flex-row items-start gap-[20px] md:gap-[50px]">

                <div className="min-w-none md:min-w-[100px] flex-shrink-0">
                    <span className="about-title font-display text-[18px] md:text-[20px] font-medium text-gray-800 block">
                        (*About.)
                    </span>
                </div>

                {/* Poin Perubahan Teks:
                  - text-[22px] md:text-[35px]: Ukuran font mengecil di mobile agar pas di layar HP
                  - leading-[34px] md:leading-[55px]: Jarak baris disesuaikan dengan ukuran font mobile
                  - text-left md:text-justify: Di mobile lebih rapi text-left karena text-justify sering membuat jeda spasi terlalu renggang jika layarnya sempit
                */}
                <div className="flex-1 font-ui text-[22px] md:text-[35px] leading-[34px] md:leading-[55px] flex flex-col gap-[20px] md:gap-[30px] text-left md:text-justify">

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