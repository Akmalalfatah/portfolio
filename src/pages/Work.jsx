import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { categories, focusAreas, works } from "./work.data.js";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function WorkPage() {

    const pageRef = useRef(null);
    const navigate = useNavigate();
    const hasAnimated = useRef(false);

    const [activeCategory, setActiveCategory] = useState("All");
    const [activeFocus, setActiveFocus] = useState("All");

    // Initial page load animation
    useEffect(() => {
        if (hasAnimated.current) return;

        const ctx = gsap.context(() => {

            gsap.set(pageRef.current, { y: "100%" });

            const splitTitle = new SplitText(".work-title .font-display", {
                type: "lines",
                linesClass: "line",
            });

            const splitCategory = new SplitText(".filter-category", {
                type: "lines",
                linesClass: "line",
            });

            const splitFocus = new SplitText(".filter-focus", {
                type: "lines",
                linesClass: "line",
            });

            const splitResults = new SplitText(".results-count", {
                type: "lines",
                linesClass: "line",
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    hasAnimated.current = true;
                }
            });

            tl.to(pageRef.current, {
                y: "0%",
                duration: 1.2,
                ease: "expo.inOut",
            })

                .fromTo(
                    splitTitle.lines,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1.6,
                        ease: "expo.out",
                        stagger: 0.12,
                    },
                    "-=0.6"
                )

                .fromTo(
                    [...splitCategory.lines, ...splitFocus.lines, ...splitResults.lines],
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1.2,
                        ease: "expo.out",
                        stagger: 0.05,
                    },
                    "-=1.2"
                )

                .fromTo(
                    ".work-grid",
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "expo.out",
                    },
                    "-=0.8"
                );

        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!hasAnimated.current) return;

        const ctx = gsap.context(() => {

            const splitCategory = new SplitText(".filter-category", {
                type: "lines",
                linesClass: "line",
            });

            const splitFocus = new SplitText(".filter-focus", {
                type: "lines",
                linesClass: "line",
            });

            const splitResults = new SplitText(".results-count", {
                type: "lines",
                linesClass: "line",
            });

            gsap.fromTo(
                [...splitCategory.lines, ...splitFocus.lines, ...splitResults.lines],
                { clipPath: "inset(100% 0% 0% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.8,
                    ease: "expo.out",
                    stagger: 0.03,
                }
            );

        });

        return () => ctx.revert();
    }, [activeCategory, activeFocus]);

    const filteredWorks = works.filter(work => {
        const categoryMatch =
            activeCategory === "All" || work.category === activeCategory;

        const focusMatch =
            activeFocus === "All" || work.focus.includes(activeFocus);

        return categoryMatch && focusMatch;
    });

    return (
        <section
            ref={pageRef}
            className="work-page relative min-h-screen"
        >

            <div className="pt-[70px] px-[25px] work-title">
                <span className="font-display text-[18px] md:text-[20px] inline-block">
                    (Projects & Experiences.)
                </span>
            </div>

            <div className="pt-[20px] md:pt-[20px]">
                <div className="max-w-[1440px] mx-auto px-[20px] md:px-[25px]">
                    <div className="flex flex-col md:flex-row md:justify-between gap-[24px] md:gap-[40px]">

                        <div className="grid grid-cols-2 gap-[24px] md:flex md:gap-[120px]">

                            <div className="flex flex-col gap-[8px] md:gap-[12px] font-ui font-medium text-[17px] md:text-[22px] leading-tight">
                                {categories.map((category, index) => (
                                    <span
                                        key={index}
                                        onClick={() => setActiveCategory(category.name)}
                                        className={`filter-category cursor-pointer transition-colors ${activeCategory === category.name
                                                ? "text-[#afafaf]"
                                                : "hover:text-[#afafaf]"
                                            }`}
                                    >
                                        {category.name}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-[8px] md:gap-[12px] font-ui font-medium text-[17px] md:text-[22px] leading-tight text-right md:text-left">
                                {focusAreas.map((focus, index) => (
                                    <span
                                        key={index}
                                        onClick={() => setActiveFocus(focus.name)}
                                        className={`filter-focus cursor-pointer transition-colors ${activeFocus === focus.name
                                                ? "text-[#afafaf]"
                                                : "hover:text-[#afafaf]"
                                            }`}
                                    >
                                        {focus.name}
                                    </span>
                                ))}
                            </div>

                        </div>

                        <div className="flex flex-col gap-[12px] font-ui font-medium text-[17px] md:text-[22px] text-right">
                            <span className="results-count text-[#afafaf]">
                                {filteredWorks.length} {filteredWorks.length === 1 ? "Result" : "Results"}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="pt-[28px] md:pt-[40px] pb-[56px] md:pb-0">
                <div className="max-w-[1440px] mx-auto px-[20px] md:px-[25px]">
                    <div className="work-grid flex flex-col gap-[18px] md:gap-0">
                        {filteredWorks.map((work, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/work/${work.slug}`)}
                                className="relative border-t-2 border-[#EBE6DC] py-[18px] md:py-[10px] flex flex-col-reverse md:flex-row md:justify-between md:items-start gap-[14px] md:gap-0 cursor-pointer transition-colors duration-300 hover:bg-[#F2ECE2]"
                            >
                                <div className="flex items-start gap-[14px] md:gap-[60px] flex-1 md:pr-[20px] w-full">

                                    <span className="text-[16px] md:text-[20px] font-display min-w-[44px] md:min-w-[50px] pt-[3px] md:pt-0">
                                        [ {index + 1}. ]
                                    </span>

                                    <div className="hidden md:flex w-[336px] flex-col">
                                        <span className="text-[20px] font-display">
                                            {work.role}
                                        </span>
                                        <span className="text-[20px] text-[#afafaf] italic font-ui">
                                            {work.subRole}
                                        </span>
                                    </div>

                                    <div className="w-full md:w-[370px] font-ui flex flex-col gap-[8px]">
                                        <div className="flex flex-col md:hidden mb-[2px]">
                                            <span className="text-[16px] font-display leading-tight">
                                                {work.role}
                                            </span>
                                            <span className="text-[16px] text-[#afafaf] italic font-ui leading-tight">
                                                {work.subRole}
                                            </span>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-[24px] md:text-[25px] font-medium leading-[30px] md:leading-[35px] italic">
                                                {work.name}
                                            </span>
                                            <span className="text-[16px] md:text-[20px] leading-[25px] md:leading-[35px]">
                                                {work.description}
                                            </span>
                                        </div>
                                        <span className="text-[16px] md:text-[20px] text-[#afafaf] leading-tight">
                                            {work.tag}
                                        </span>
                                    </div>

                                </div>

                                <div className="w-full md:w-[470px] h-auto aspect-[47/31] md:h-[310px] md:aspect-auto flex-shrink-0 relative z-10">
                                    <img
                                        src={work.image}
                                        className="w-full h-full object-contain"
                                        alt={work.name}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}
