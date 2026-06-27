export default function Footer() {
    return (
        <section className="footer relative min-h-[430px] md:min-h-[570px] overflow-hidden flex flex-col justify-between">

            {/* Top: links + contact */}
            <div className="flex flex-row justify-between gap-[20px] px-[20px] md:px-[32px] pt-[32px] md:pt-[45px]">

                <div className="flex flex-col gap-[8px] md:gap-[10px]">
                    <a
                        href="https://www.linkedin.com/in/muhamad-akmal-al-fatah/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[16px] sm:text-[18px] md:text-[24px] font-medium font-ui underline leading-tight"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/Akmalalfatah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[16px] sm:text-[18px] md:text-[24px] font-medium font-ui underline leading-tight"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.instagram.com/akmalfatah/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[16px] sm:text-[18px] md:text-[24px] font-medium font-ui underline leading-tight"
                    >
                        Instagram
                    </a>
                </div>

                <div className="flex max-w-[58%] flex-col gap-[8px] md:gap-[10px] text-right">
                    <span className="text-[16px] sm:text-[18px] md:text-[24px] font-medium font-ui italic text-[#afafaf] leading-tight">
                        Contact me on
                    </span>
                    <span className="text-[16px] sm:text-[18px] md:text-[24px] font-medium font-ui leading-tight break-words">
                        akmalalfatah45@gmail.com
                    </span>
                    <span className="text-[16px] sm:text-[18px] md:text-[24px] font-medium font-ui leading-tight">
                        0815-1950-7725
                    </span>
                </div>
            </div>

            <div className="overflow-hidden">
                {/* Big name */}
                <div className="relative z-0 flex justify-center items-center w-full mt-[102px] md:mt-0 overflow-hidden">
                    <span className="text-[#1c1c1c] font-medium font-display text-center leading-none whitespace-nowrap text-[15vw] md:text-[11vw] lg:text-[230px]">
                        akmal al fatah
                    </span>
                </div>

                {/* Bottom dark bar */}
                <div className="relative z-10 w-full h-[140px] lg:h-[210px] bg-[#1c1c1c] -mt-[22px] md:-mt-[42px] lg:-mt-[76px]" />
            </div>

        </section>
    );
}
