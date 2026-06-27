import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { workDetails } from "./workDetail.data";
import { works } from "./work.data";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function WorkDetail() {
    const pageRef = useRef(null);
    const navigate = useNavigate();
    const { slug } = useParams();
    const detail = workDetails[slug];
    const info = works.find((w) => w.slug === slug);

    useEffect(() => {
        if (!detail || !info) return;

        const ctx = gsap.context(() => {

            const splitTitle = new SplitText(".detail-title", {
                type: "lines",
                linesClass: "line",
            });
            const splitParagraphs = new SplitText(".detail-paragraph", {
                type: "lines",
                linesClass: "line",
            });
            const splitRoleLabel = new SplitText(".role-label", {
                type: "lines",
                linesClass: "line",
            });
            const splitRoleValue = new SplitText(".role-value", {
                type: "lines",
                linesClass: "line",
            });

            const tl = gsap.timeline();

            tl.fromTo(
                ".back-button",
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1.0, ease: "expo.out" }
            )
            .fromTo(
                splitTitle.lines,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.out", stagger: 0.12 },
                "-=0.8"
            )
            .fromTo(
                splitParagraphs.lines,
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out", stagger: 0.05 },
                "-=1.2"
            )
            .fromTo(
                ".role-row",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.0, ease: "expo.out", stagger: 0.1 },
                "-=1.0"
            )
            .fromTo(
                [...splitRoleLabel.lines, ...splitRoleValue.lines],
                { clipPath: "inset(100% 0% 0% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", duration: 1.0, ease: "expo.out", stagger: 0.04 },
                "-=0.8"
            )
            .fromTo(
                ".detail-link",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.0, ease: "expo.out" },
                "-=0.6"
            );

        }, pageRef);

        return () => ctx.revert();
    }, [slug, detail, info]);

    if (!detail || !info) {
        return (
            <section className="min-h-screen flex items-center justify-center text-gray-500">
                Project not found.
            </section>
        );
    }

    return (
        <section ref={pageRef} className="min-h-screen relative">

            <div className="px-[24px] md:px-6 pt-[100px] md:pt-[110px] flex flex-col gap-8 md:gap-12">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="back-button flex items-center gap-2 text-[16px] md:text-[18px] font-medium text-black/60 hover:text-black transition-colors w-fit"
                >
                    <span>←</span>
                    <span>Back</span>
                </button>

                {/* Title */}
                <h1 className="detail-title text-[28px] md:text-[38px] lg:text-[45px] font-ui font-medium max-w-3xl leading-[38px] md:leading-[50px] lg:leading-[55px]">
                    {info.name}
                </h1>

                {/* Content grid — single col on mobile, two col on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">

                    {/* Description paragraphs */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {detail.content.map((paragraph, index) => (
                            <p
                                key={index}
                                className="detail-paragraph text-[16px] md:text-[18px] lg:text-[20px] leading-[28px] md:leading-[30px] text-justify"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Role / metadata table */}
                    <div className="lg:col-span-5 flex flex-col">

                        <div className="role-row flex items-baseline justify-between border-b border-black/30 py-4 md:py-5">
                            <span className="role-label text-[15px] md:text-[18px] opacity-40 font-medium">(Role.)</span>
                            <span className="role-value text-[15px] md:text-[18px] text-right font-medium">{info.role}</span>
                        </div>

                        <div className="role-row flex items-baseline justify-between border-b border-black/30 py-4 md:py-5">
                            <span className="role-label text-[15px] md:text-[18px] opacity-40 font-medium">(Context.)</span>
                            <span className="role-value text-[15px] md:text-[18px] text-right font-medium">{info.subRole}</span>
                        </div>

                        <div className="role-row flex items-baseline justify-between border-b border-black/30 py-4 md:py-5">
                            <span className="role-label text-[15px] md:text-[18px] opacity-40 font-medium">(Tech.)</span>
                            <span className="role-value text-[15px] md:text-[18px] text-right font-medium">{detail.stack}</span>
                        </div>

                    </div>
                </div>

                {/* External link */}
                {detail.link && (
                    <div className="pt-4 md:pt-6">
                        <a
                            href={detail.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detail-link inline-block text-[18px] md:text-[20px] font-ui font-medium text-blue-600 hover:text-blue-800 hover:underline transition-all"
                        >
                            View Project →
                        </a>
                    </div>
                )}

            </div>
        </section>
    );
}