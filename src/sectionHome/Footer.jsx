export default function Footer() {
    return (
        <section className="footer relative min-h-[570px]">
            <div className="flex justify-between px-[32px] pt-[45px]">
                <div className="flex flex-col gap-[10px]">
                    <a
                        href="https://www.linkedin.com/in/muhamad-akmal-al-fatah/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[24px] font-medium font-ui underline"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="https://github.com/Akmalalfatah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[24px] font-medium font-ui underline"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://www.instagram.com/akmalfatah/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[24px] font-medium font-ui underline"
                    >
                        Instagram
                    </a>
                </div>


                <div className="flex flex-col gap-[10px] text-right">
                    <span className="text-[24px] font-medium font-ui italic text-[#afafaf]">
                        Contact me on
                    </span>
                    <span className="text-[24px] font-medium font-ui">
                        akmalalfatah45@gmail.com
                    </span>
                    <span className="text-[24px] font-medium font-ui">
                        0815-1950-7725
                    </span>
                </div>
            </div>

            <div className="flex justify-center items-center w-full">
                <span className="text-[#1c1c1c] text-[230px] font-medium font-display text-center">
                    akmal al fatah
                </span>
            </div>
            <div className="w-full h-[210px] left-0 top-[360px] absolute bg-[#1c1c1c]"></div>
        </section>
    )
}