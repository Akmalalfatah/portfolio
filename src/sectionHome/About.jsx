import aboutSmallImg from '/images/About/about-pic-small.jpeg'
import aboutMediumImg from '/images/About/about-pic-medium.jpeg'
import aboutLargeImg from '/images/About/about-pic-large.JPG'

import { useLayoutEffect, useRef } from 'react'
import gsap from "gsap"
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            document.fonts.ready.then(() => {
                mm.add({
                    isDesktop: "(min-width: 768px)",
                    isMobile: "(max-width: 767px)",
                }, (context) => {
                    const { isMobile } = context.conditions;

                    const layout = sectionRef.current?.querySelector(
                        isMobile ? ".about-mobile" : ".about-desktop"
                    );

                    if (!layout) return;

                    const text1El = layout.querySelector(".about-text-1");
                    const text2El = layout.querySelector(".about-text-2");
                    const text3El = layout.querySelector(".about-text-3");

                    const mediumWrap = layout.querySelector(".medium-wrap");
                    const smallWrap = layout.querySelector(".small-wrap");
                    const largeWrap = layout.querySelector(".large-wrap");

                    if (
                        !text1El ||
                        !text2El ||
                        !text3El ||
                        !mediumWrap ||
                        !smallWrap ||
                        !largeWrap
                    ) {
                        return;
                    }

                    const split1 = new SplitText(text1El, {
                        type: "lines",
                        linesClass: "line",
                    });

                    const split2 = new SplitText(text2El, {
                        type: "lines",
                        linesClass: "line",
                    });

                    const split3 = new SplitText(text3El, {
                        type: "lines",
                        linesClass: "line",
                    });

                    const imageWraps = [mediumWrap, smallWrap, largeWrap];

                    gsap.set([...split1.lines, ...split2.lines, ...split3.lines], {
                        clipPath: "inset(100% 0% 0% 0%)",
                    });

                    gsap.set(imageWraps, {
                        clipPath: "inset(100% 0% 0% 0%)",
                    });

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: isMobile ? "top 82%" : "top 70%",
                        },
                    })
                        .to(split1.lines, {
                            clipPath: "inset(0% 0% 0% 0%)",
                            duration: isMobile ? 1.2 : 1.6,
                            ease: "expo.out",
                            stagger: isMobile ? 0.08 : 0.12,
                        })
                        .to(
                            mediumWrap,
                            {
                                clipPath: "inset(0% 0% 0% 0%)",
                                duration: 1.2,
                                ease: "expo.out",
                            },
                            isMobile ? "-=0.7" : "-=0.9"
                        );

                    gsap.to(split2.lines, {
                        clipPath: "inset(0% 0% 0% 0%)",
                        ease: "none",
                        stagger: isMobile ? 0.08 : 0.15,
                        scrollTrigger: {
                            trigger: text2El,
                            start: isMobile ? "top 88%" : "top 85%",
                            end: isMobile ? "bottom 58%" : "bottom 40%",
                            scrub: true,
                        },
                    });

                    gsap.to([smallWrap, largeWrap], {
                        clipPath: "inset(0% 0% 0% 0%)",
                        ease: "none",
                        stagger: 0.12,
                        scrollTrigger: {
                            trigger: smallWrap,
                            start: isMobile ? "top 90%" : "top 85%",
                            end: isMobile ? "bottom 62%" : "bottom 55%",
                            scrub: true,
                        },
                    });

                    gsap.to(split3.lines, {
                        clipPath: "inset(0% 0% 0% 0%)",
                        ease: "none",
                        stagger: isMobile ? 0.08 : 0.15,
                        scrollTrigger: {
                            trigger: text3El,
                            start: isMobile ? "top 90%" : "top 85%",
                            end: isMobile ? "bottom 72%" : "bottom 70%",
                            scrub: true,
                        },
                    });

                    gsap.to(largeWrap, {
                        y: isMobile ? -30 : -50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });

                    gsap.to(smallWrap, {
                        y: isMobile ? -55 : -200,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });

                    gsap.to(mediumWrap, {
                        y: isMobile ? -40 : -100,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });

                    gsap.to(layout.querySelectorAll("img"), {
                        y: isMobile ? -20 : -50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });

                    return () => {
                        split1.revert();
                        split2.revert();
                        split3.revert();
                    };
                });
            });
        }, sectionRef);

        return () => {
            mm.revert();
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className='about relative overflow-hidden'>

            <div className="about-desktop hidden md:block min-h-[125vh]">
                <div className='medium-wrap w-[305px] h-[435px] left-[60px] top-[249px] absolute overflow-hidden'>
                    <img src={aboutMediumImg} className='w-full h-full object-cover' alt="About medium" />
                </div>

                <div className='large-wrap w-[380px] h-[506px] left-[1010px] top-[140px] absolute overflow-hidden'>
                    <img src={aboutLargeImg} className='w-full h-full object-cover' alt="Akmal large" />
                </div>

                <div className='about-text-1 w-[886px] left-[122px] top-[50px] absolute'>
                    <span className='text-[55px] italic font-ui leading-[65px]'>
                        My Name is Akmal, and welcome to my portfolio.
                    </span>
                </div>

                <div className='about-text-2 w-[600px] left-[400px] top-[264px] absolute'>
                    <span className='text-[45px] font-ui leading-[65px]'>
                        I love building full-stack products and experimenting with AI to push how digital solutions{" "}
                        <span className='italic font-medium'>can work and adapt.</span>
                    </span>
                </div>

                <div className='about-text-3 w-[780px] left-[615px] top-[620px] text-right absolute'>
                    <span className='text-[45px] font-ui leading-[65px]'>
                        I love <span className='italic font-medium'>learning new things.</span> whether it's technologies, leadership experiences, or better ways to build and collaborate.
                    </span>
                </div>

                <div className='small-wrap w-[230px] h-[324px] left-[180px] top-[557px] absolute overflow-hidden'>
                    <img src={aboutSmallImg} className='w-full h-full object-cover' alt="About small" />
                </div>
            </div>

            <div className="about-mobile md:hidden flex flex-col gap-[32px] px-[24px] pt-[32px] pb-[48px]">

                <div className="about-text-1">
                    <span className='text-[28px] italic font-ui leading-[42px]'>
                        My Name is Akmal, and welcome to my portfolio.
                    </span>
                </div>

                <div className='medium-wrap w-full max-w-[305px] aspect-[305/435] overflow-hidden'>
                    <img src={aboutMediumImg} className='w-full h-full object-cover' alt="About medium" />
                </div>

                <div className="about-text-2">
                    <span className='text-[22px] font-ui leading-[36px]'>
                        I love building full-stack products and experimenting with AI to push how digital solutions{" "}
                        <span className='italic font-medium'>can work and adapt.</span>
                    </span>
                </div>

                <div className="flex gap-[12px]">
                    <div className='small-wrap flex-1 aspect-[230/324] overflow-hidden'>
                        <img src={aboutSmallImg} className='w-full h-full object-cover' alt="About small" />
                    </div>

                    <div className='large-wrap flex-1 aspect-[380/506] overflow-hidden'>
                        <img src={aboutLargeImg} className='w-full h-full object-cover' alt="Akmal large" />
                    </div>
                </div>

                <div className="about-text-3 text-right">
                    <span className='text-[22px] font-ui leading-[36px]'>
                        I love <span className='italic font-medium'>learning new things.</span> whether it's technologies, leadership experiences, or better ways to build and collaborate.
                    </span>
                </div>

            </div>
        </section>
    );
}