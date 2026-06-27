import photoVid from "/images/Hero/photo-video.mp4";
import laptopImg from "/images/Hero/laptop-red.png";
import airpodsImg from "/images/Hero/airpodspro-cream.png";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero({ introComplete }) {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    gsap.set(".hero", { scaleY: 0 });

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
          const video = document.createElement("video");
          video.onloadeddata = resolve;
          video.onerror = resolve;
          video.src = photoVid;
        }),
      ];
      await Promise.all([...imagePromises, document.fonts.ready]);
      setAssetsLoaded(true);
    };

    preloadAssets();
  }, []);

  useEffect(() => {
    if (!assetsLoaded || !introComplete) return;

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop } = context.conditions;

      const split1 = new SplitText(".hero-text-1 .font-ui", {
        type: "lines",
        linesClass: "line",
      });
      const split2 = new SplitText(".hero-text-2 .font-ui", {
        type: "lines",
        linesClass: "line",
      });
      const split3 = new SplitText(".mini-text", {
        type: "lines",
        linesClass: "line",
      });

      gsap.set(split1.lines, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(split2.lines, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(split3.lines, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set([".airpods-wrap", ".photo-wrap", ".laptop-wrap"], {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      // Kontrol intensitas Parallax Scroll terpisah agar ramah layar sentuh mobile
      gsap.to([".laptop-wrap", ".airpods-wrap"], {
        y: isDesktop ? -60 : -25,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(".photo-wrap", {
        y: isDesktop ? -150 : -45,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      const tl = gsap.timeline();
      tl.to(".hero", {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 0.5,
        ease: "expo.inOut",
      })
        .to(split1.lines, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.out",
          stagger: 0.12,
        })
        .to(
          split2.lines,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.out", stagger: 0.12 },
          "<"
        )
        .to(
          split3.lines,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.out", stagger: 0.12 },
          "<"
        )
        .to(
          [".airpods-wrap", ".photo-wrap", ".laptop-wrap"],
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.out" },
          "<"
        );
    });

    return () => {
      mm.revert();
    };
  }, [assetsLoaded, introComplete]);

  return (
    <section className="hero relative min-h-screen overflow-hidden pb-[60px] md:pb-0">

      {/* Text block 1 */}
      <div className="hero-text-1
        md:absolute md:w-[850px] md:left-[178px] md:top-[50px]
        px-[24px] pt-[90px] md:px-0 md:pt-0"
      >
        <span className="font-ui text-[24px] leading-[38px] md:text-[45px] md:leading-[65px] block">
          Programming is more than writing code. It's about{" "}
          <span className="italic font-medium">understanding problems</span> and building{" "}
          <span className="italic font-medium">practical solutions.</span>
        </span>
      </div>

      {/* Text block 2 */}
      <div className="hero-text-2 text-right
        md:absolute md:w-[720px] md:left-[670px] md:top-[250px]
        px-[24px] mt-[24px] md:px-0 md:mt-0"
      >
        <span className="font-ui text-[24px] leading-[38px] md:text-[45px] md:leading-[65px] block">
          As a student, my work emphasizes{" "}
          <span className="italic font-medium">clarity, usability,</span> and{" "}
          <span className="italic font-medium">continuous learning.</span>
        </span>
      </div>

      {/* Satu Wadah Media Bersama:
        - Mobile: Menggunakan Flexbox mengalir ke bawah secara normal (relative).
        - Desktop (md:): Berubah menjadi kontainer pembungkus kaku untuk koordinat posisi absolut bawaan Anda.
      */}
      <div className="media-container relative w-full mt-[40px] px-[24px] md:px-0 md:mt-0 md:absolute md:top-0 md:left-0 md:w-full md:h-full pointer-events-none">
        
        {/* Row Atas: Video & Laptop di Mobile */}
        <div className="flex gap-[12px] md:block w-full">
          {/* Photo/Video Wrap */}
          <div className="photo-wrap w-[38%] aspect-[2/3] md:w-[205px] md:h-[306px] md:absolute md:left-[90px] md:top-[333px] overflow-hidden flex-shrink-0">
            <video src={photoVid} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </div>

          {/* Laptop Wrap */}
          <div className="laptop-wrap flex-1 aspect-[3/4] md:w-[270px] md:h-[400px] md:absolute md:left-[237px] md:top-[250px] overflow-hidden">
            <img src={laptopImg} className="w-full h-full object-cover" alt="Laptop" />
          </div>
        </div>

        {/* Row Bawah: Airpods & Teks Scroll di Mobile */}
        <div className="flex justify-between items-end mt-[24px] md:block w-full">
          {/* Airpods Wrap */}
          <div className="airpods-wrap w-[40%] aspect-square md:w-[210px] md:h-[268px] md:absolute md:left-[950px] md:top-[30px] lg:top-[400px] overflow-hidden">
            <img src={airpodsImg} className="w-full h-full object-cover" alt="Airpods" />
          </div>

          {/* Mini Scroll Text */}
          <div className="mini-text md:absolute md:left-[85%] lg:left-[1300px] md:top-[50px] lg:top-[600px]">
            <span className="font-display text-[18px] md:text-[24px]">(*Scroll. )</span>
          </div>
        </div>

      </div>

    </section>
  );
}