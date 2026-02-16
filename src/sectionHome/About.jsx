import aboutSmallImg from '/images/About/about-pic-small.jpeg'
import aboutMediumImg from '/images/About/about-pic-medium.jpeg'
import aboutLargeImg from '/images/About/about-pic-large.JPG'

import { useEffect, useRef } from 'react'
import gsap from "gsap"
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function About() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            document.fonts.ready.then(() => {
                // Check if elements exist before creating SplitText
                const text1El = sectionRef.current?.querySelector(".about-text-1");
                const text2El = sectionRef.current?.querySelector(".about-text-2");
                const text3El = sectionRef.current?.querySelector(".about-text-3");

                if (!text1El || !text2El || !text3El) {
                    console.warn("Text elements not found");
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

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    },
                });

                tl.fromTo(
                    split1.lines,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        duration: 1.6,
                        ease: "expo.out",
                        stagger: 0.12,
                    }
                )
                    .fromTo(
                        split2.lines,
                        { clipPath: "inset(100% 0% 0% 0%)" },
                        {
                            clipPath: "inset(0% 0% 0% 0%)",
                            ease: "none",
                            stagger: 0.15,
                            scrollTrigger: {
                                trigger: text2El,
                                start: "top 85%",
                                end: "bottom 40%",
                                scrub: true,
                            },
                        }
                    )
                    .fromTo(
                        split3.lines,
                        { clipPath: "inset(100% 0% 0% 0%)" },
                        {
                            clipPath: "inset(0% 0% 0% 0%)",
                            ease: "none",
                            stagger: 0.15,
                            scrollTrigger: {
                                trigger: text3El,
                                start: "top 85%",
                                end: "bottom 70%",
                                scrub: true,
                            },
                        }
                    );

                gsap.to(
                    sectionRef.current.querySelector(".large-wrap"),
                    {
                        y: -50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );

                gsap.to(
                    sectionRef.current.querySelector(".small-wrap"),
                    {
                        y: -200,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );

                gsap.to(
                    sectionRef.current.querySelector(".medium-wrap"),
                    {
                        y: -100,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );

                gsap.to(
                    sectionRef.current.querySelectorAll("img"),
                    {
                        y: -50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );

            });
        }, sectionRef);
        
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className='about relative min-h-[125vh]'>
            <div className='medium-wrap w-[305px] h-[435px] left-[60px] top-[249px] absolute'>
                <img src={aboutMediumImg} className='w-full h-full object-cover' alt="About medium" />
            </div>

            <div className='large-wrap w-[380px] h-[506px] left-[1010px] top-[140px] absolute'>
                <img src={aboutLargeImg} className='w-full h-full object-cover' alt="Airpods" />
            </div>

            <div className='about-text-1 w-[886px] left-[122px] top-[50px] absolute'>
                <span className='text-[55px] italic font-ui leading-[65px]'>
                    My Name is Akmal, and welcome to my portfolio.
                </span>
            </div>

            <div className='about-text-2 w-[600px] left-[400px] top-[264px] absolute'>
                <span className='text-[45px] font-ui leading-[65px]'>I love building full-stack products and experimenting with AI to push how digital solutions <span className='italic font-medium'>can work and adapt.</span></span>
            </div>

            <div className='about-text-3 w-[780px] left-[615px] top-[620px] text-right absolute'>
                <span className='text-[45px] font-ui leading-[65px]'>I love <span className='italic font-medium'>learning new things.</span>  whether it's technologies, leadership experiences, or better ways to build and collaborate.</span>
            </div>

            <div className='small-wrap w-[230px] h-[324px] left-[180px] top-[557px] absolute'>
                <img src={aboutSmallImg} className='w-full h-full object-cover' alt="About small" />
            </div>

        </section>
    )
}