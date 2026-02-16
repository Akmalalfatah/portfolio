import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import Navbar from '@/components/navbar/Navbar'
import Hero from '@/sectionHome/Hero'
import About from '@/sectionHome/About'
import Experience from '@/sectionHome/Experience'
import Projects from '@/sectionHome/Projects'
import Footer from '@/sectionHome/Footer'

import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Home() {
    useEffect(() => {
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.08,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Footer />
        </>
    );
}
