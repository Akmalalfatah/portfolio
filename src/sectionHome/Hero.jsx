import photoVid from "/images/Hero/photo-video.mp4";
import laptopImg from "/images/Hero/laptop-red.png";
import airpodsImg from "/images/Hero/airpodspro-cream.png";
import { useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const ENABLE_INTRO = true;

    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        gsap.killTweensOf("*");

        const createCounterDigits = () => {
          const buildReel = (selector, values) => {
            const counter = document.querySelector(selector);
            const reel = document.createElement("div");
            reel.className = "reel";
            counter.appendChild(reel);

            values.forEach(v => {
              const num = document.createElement("div");
              num.className = "num";
              num.textContent = v;
              reel.appendChild(num);
            });
          };

          buildReel(".counter-1", ["Q", "M", "A", "Z", "L", "R", "T", "H", "X", "W"]);
          buildReel(".counter-2", ["K", "P", "W", "E", "B", "S", "Y", "N", "O", "E"]);
          buildReel(".counter-3", ["J", "C", "V", "R", "A", "P", "M", "S", "E", "L"]);
          buildReel(".counter-4", ["A", "Z", "F", "G", "K", "O", "I", "C", "S", "C"]);
          buildReel(".counter-5", ["X", "K", "I", "Z", "F", "Q", "J", "B", "A", "O"]);
          buildReel(".counter-6", ["W", "D", "X", "I", "K", "H", "G", "M", "X", "M"]);
          buildReel(".counter-7", ["F", "O", "U", "R", "X", "M", "T", "Y", "W", "E"]);
        };

        const animateCounter = (selector, steps, duration, delay = 0) => {
          const reel = document.querySelector(selector + " .reel");
          const numHeight = reel.querySelector(".num").clientHeight;
          gsap.to(reel, {
            y: -steps * numHeight,
            duration,
            delay,
            ease: "power2.inOut",
          });
        };

        createCounterDigits();

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

        if (ENABLE_INTRO) {
          tl.add(() => {
            animateCounter(".counter-7", 9, 4);
            animateCounter(".counter-6", 9, 3.8);
            animateCounter(".counter-5", 9, 3.6);
            animateCounter(".counter-4", 9, 3.2);
            animateCounter(".counter-3", 9, 3);
            animateCounter(".counter-2", 9, 2.5);
            animateCounter(".counter-1", 9, 2);

          }).to(".intro", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.2,
            ease: "expo.inOut",
            delay: 3.5,
          });
        } else {
          gsap.set(".intro", { display: "none" });
          gsap.set(".hero", { scaleY: 1 });
        }

        tl.from(
          ".hero",
          {
            scaleY: 0,
            transformOrigin: "bottom",
            duration: 1.2,
            ease: "expo.inOut",
          },
          "<"
        )
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
            [".airpods-wrap", ".photo-wrap", ".laptop-wrap", ".mini-arrow"],
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "expo.out",
            },
            "<"
          );
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <section className="intro fixed inset-0 z-50 flex items-center justify-center font-ui">
        <div className="counter flex text-8xl leading-none">
          <div className="counter-1 digit h-[120px] overflow-hidden"></div>
          <div className="counter-2 digit h-[120px] overflow-hidden"></div>
          <div className="counter-3 digit h-[120px] overflow-hidden"></div>
          <div className="counter-4 digit h-[120px] overflow-hidden"></div>
          <div className="counter-5 digit h-[120px] overflow-hidden"></div>
          <div className="counter-6 digit h-[120px] overflow-hidden"></div>
          <div className="counter-7 digit h-[120px] overflow-hidden"></div>
        </div>
      </section>

      <section className="hero relative min-h-[95vh]">
        <div className="hero-text w-[850px] left-[178px] top-[50px] absolute justify-start">
          <span className="font-ui text-[45px] leading-[65px]">
            Programming is more than writing code. It’s about{" "}
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
    </>
  );
}
