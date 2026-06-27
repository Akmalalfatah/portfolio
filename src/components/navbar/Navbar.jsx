import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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

  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Active underline animation
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

  // Hide/show navbar on scroll
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

  // Perbaikan Animasi Buka/Tutup Menu Mobile
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      // Tampilkan kontainer terlebih dahulu sebelum animasi berjalan
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -15, display: "flex" },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.killTweensOf(mobileMenuRef.current);
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: "power3.in",
        // Sembunyikan elemen lewat display setelah animasi selesai
        onComplete: () => {
          if (mobileMenuRef.current) mobileMenuRef.current.style.display = "none";
        }
      });
    }
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        ref={navRef}
        className="navbar fixed top-0 left-0 w-full z-[999] flex justify-center bg-primary h-[70px]"
      >
        <div className="w-full max-w-[1440px] px-[25px] flex items-center justify-between gap-[40px]">

          {/* Logo / Name */}
          <span
            onClick={() => navigate("/")}
            className="text-[18px] md:text-[22px] font-display cursor-pointer whitespace-nowrap"
          >
            AKMAL AL FATAH
          </span>

          {/* Desktop nav */}
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
                        if (el) activeLineRefs.current[item.target] = el;
                      }}
                      className="absolute left-0 -bottom-[3px] w-full h-[3px] bg-black"
                      style={{ transform: "scaleX(0)", transformOrigin: "left" }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop CV download */}
          <a
            href="./CV_Akmal_Bahasa_2026.pdf"
            download
            className="hidden md:block text-[22px] font-display whitespace-nowrap"
          >
            [ Download My CV ]
          </a>

          {/* Right side: logo + hamburger */}
          <div className="flex items-center gap-[16px]">
            <img
              src={navLogo}
              className="h-[45px] w-[45px] nav-logo-rotate"
              alt="logo"
            />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="md:hidden flex flex-col justify-center items-center w-[32px] h-[32px] gap-[5px] z-[1000]"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-[2px] w-[22px] bg-black transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-[22px] bg-black transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-[22px] bg-black transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile dropdown menu — Diubah agar selalu ada di DOM.
        Menggunakan style={{ display: 'none' }} sebagai inisialisasi awal.
      */}
      <div
        ref={mobileMenuRef}
        style={{ display: "none" }}
        className="md:hidden fixed top-[70px] left-0 w-full z-[998] bg-[#FFFAF1] border-t border-black/10 px-[25px] py-[24px] flex flex-col gap-[20px]"
      >
        {navItems.map(item => {
          const isActive = location.pathname === item.target;
          return (
            <span
              key={item.target}
              onClick={() => navigate(item.target)}
              className={`font-ui font-medium text-[22px] cursor-pointer ${
                isActive ? "opacity-100" : "opacity-40"
              }`}
            >
              {item.label}
            </span>
          );
        })}

        <a
          href="./CV_Akmal_Bahasa_2026.pdf"
          download
          className="font-display text-[20px] mt-[4px]"
        >
          [ Download My CV ]
        </a>
      </div>
    </>
  );
}
