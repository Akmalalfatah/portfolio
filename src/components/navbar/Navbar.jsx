import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { navItems } from "./nav.data";
import navLogo from "/nav-logo.png";
import gsap from "gsap";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeLineRefs = useRef({});
  const isFirstRender = useRef(true);

  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const activePath = location.pathname;

    requestAnimationFrame(() => {
      const activeRef = activeLineRefs.current[activePath];

      if (activeRef) {
        if (isFirstRender.current) {
          gsap.set(activeRef, { scaleX: 1, transformOrigin: "left" });
          isFirstRender.current = false;
        } else {
          gsap.fromTo(
            activeRef,
            { scaleX: 0, transformOrigin: "left" },
            {
              scaleX: 1,
              duration: 0.6,
              ease: "expo.out",
            }
          );
        }
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
            gsap.to(navRef.current, {
              y: -90,
              duration: 0.35,
              ease: "power3.out",
            });
          } else {
            gsap.to(navRef.current, {
              y: 0,
              duration: 0.35,
              ease: "power3.out",
            });
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="navbar fixed top-0 left-0 w-full z-[999] flex justify-center bg-primary h-[70px]"
    >
      <div className="w-full max-w-[1440px] px-[25px] flex items-center justify-between gap-[40px]">

        <span
          onClick={() => navigate("/")}
          className="text-[22px] font-display cursor-pointer whitespace-nowrap"
        >
          AKMAL AL FATAH
        </span>

        <ul className="hidden md:flex gap-4.5 items-center font-medium font-ui">
          {navItems.map(item => {
            const isActive = location.pathname === item.target;

            return (
              <li
                key={item.target}
                onClick={() => navigate(item.target)}
                className={`cursor-pointer text-[22px] relative
                  ${isActive ? "opacity-100" : "opacity-40"}
                `}
              >
                {item.label}
                {isActive && (
                  <span
                    ref={el => {
                      if (el) {
                        activeLineRefs.current[item.target] = el;
                      }
                    }}
                    className="absolute left-0 -bottom-[3px] w-full h-[3px] bg-black"
                    style={{ transform: "scaleX(0)", transformOrigin: "left" }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <a
          href="./CV_M Akmal Al Fatah.pdf"
          download
          className="hidden md:block text-[22px] font-display whitespace-nowrap"
        >
          [ Download My CV ]
        </a>

        <img
          src={navLogo}
          className="h-[45px] w-[45px] nav-logo-rotate"
          alt="logo"
        />
      </div>
    </nav>
  );
}
