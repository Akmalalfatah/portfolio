import photoVid from "/images/Hero/photo-video.mp4";
import laptopImg from "/images/Hero/laptop-red.png";
import airpodsImg from "/images/Hero/airpodspro-cream.png";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    // Preload assets
    const preloadAssets = async () => {
      const imagePromises = [
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = laptopImg;
        }),
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = airpodsImg;
        }),
        new Promise((resolve) => {
          const video = document.createElement('video');
          video.onloadeddata = resolve;
          video.onerror = resolve;
          video.src = photoVid;
        })
      ];

      await Promise.all([
        ...imagePromises,
        document.fonts.ready
      ]);

      // Small delay to ensure smooth animation
      await new Promise(resolve => setTimeout(resolve, 300));

      setAssetsLoaded(true);
    };

    preloadAssets();
  }, []);

  useEffect(() => {
    if (!assetsLoaded) return;

    const ctx = gsap.context(() => {
      const startAnimation = () => {
        const split1 = new SplitText(".hero-text:nth-child(1) .font-ui", {
          type: "lines",
          linesClass: "line",
        });

        const split2 = new SplitText(".hero-text:nth-child(2) .font-ui", {
          type: "lines",
          linesClass: "line",
        });

        const split3 = new SplitText(".mini-text", {
          type: "lines",
          linesClass: "line",
        });

        const tl = gsap.timeline();

        // Parallax effects
        gsap.to([".laptop-wrap", ".airpods-wrap"], {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".photo-wrap", {
          y: -150,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        // Hero entrance animation
        tl.from(".hero", {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 1.2,
          ease: "expo.inOut",
        })
          .fromTo(
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
              duration: 1.6,
              ease: "expo.out",
              stagger: 0.12,
            },
            "<"
          )
          .fromTo(
            split3.lines,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.6,
              ease: "expo.out",
              stagger: 0.12,
            },
            "<"
          )
          .fromTo(
            [".airpods-wrap", ".photo-wrap", ".laptop-wrap"],
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "expo.out",
            },
            "<"
          );
      };

      startAnimation();
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [assetsLoaded]);

  return (
    <section className="hero relative min-h-[95vh]">
      <div className="hero-text w-[850px] left-[178px] top-[50px] absolute justify-start">
        <span className="font-ui text-[45px] leading-[65px]">
          Programming is more than writing code. It's about{" "}
          <span className="italic font-medium">understanding problems</span> and building{" "}
          <span className="italic font-medium">practical solutions.</span>
        </span>
      </div>

      <div className="hero-text w-[720px] left-[670px] top-[250px] absolute text-right">
        <span className="font-ui text-[45px] leading-[65px]">
          As a student, my work emphasizes{" "}
          <span className="italic font-medium">clarity, usability,</span> and{" "}
          <span className="italic font-medium">continuous learning.</span>
        </span>
      </div>

      <div className="laptop-wrap w-[270px] h-[400px] left-[237px] top-[250px] absolute overflow-hidden">
        <img src={laptopImg} className="w-full h-full object-cover" />
      </div>

      <div className="photo-wrap w-[205px] h-[306px] left-[90px] top-[333px] absolute overflow-hidden">
        <video src={photoVid} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      </div>

      <div className="airpods-wrap w-[210px] h-[268px] left-[950px] top-[390px] absolute overflow-hidden">
        <img src={airpodsImg} className="w-full h-full object-cover" />
      </div>

      <div className="mini-text left-[1300px] top-[600px] absolute">
        <span className="font-display text-[24px] ">(*Scroll. )</span>
      </div>
    </section>
  );
}