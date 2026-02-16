import { works } from '../pages/work.data.js'
import { useNavigate } from 'react-router-dom'

export default function Projects() {
    const navigate = useNavigate();

    // Only show first 3 items
    const displayWorks = works.slice(0, 3);

    return (
        <section className="projects relative min-h-screen py-[180px]">
            <div className="mini-text absolute left-[23px] top-[100px]">
                <span className="text-[24px] font-display text-right">(*Projects & Experiences )</span>
            </div>

            <div className="project-grid max-w-[1440px] mx-auto px-[25px] flex flex-col">
                {displayWorks.map((work, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/work/${work.slug}`)}
                        className="work-item relative border-t-2 border-[#EBE6DC] py-[10px] flex justify-between items-start cursor-pointer transition-colors duration-300 hover:bg-[#F2ECE2]"
                    >
                        <div className="work-content flex items-start gap-[60px] flex-1 pr-[20px] w-full">

                            <span className="work-num text-[20px] font-display min-w-[50px]">
                                [ {index + 1}. ]
                            </span>

                            <div className="work-desc w-[336px] flex flex-col">
                                <span className="text-[20px] font-display">
                                    {work.role}
                                </span>
                                <span className="text-[20px] text-[#afafaf] italic font-ui">
                                    {work.subRole}
                                </span>
                            </div>

                            <div className="work-name w-[370px] font-ui flex flex-col gap-[8px]">
                                <div className="flex flex-col">
                                    <span className="text-[25px] font-medium leading-[35px] italic">
                                        {work.name}
                                    </span>
                                    <span className="text-[20px] leading-[35px]">
                                        {work.description}
                                    </span>
                                </div>
                                <span className="text-[20px] font-ui text-[#afafaf]">
                                    {work.tag}
                                </span>
                            </div>
                        </div>

                        <div className="work-image w-[470px] h-[310px] flex-shrink-0 relative z-10">
                            <img
                                src={work.image}
                                className="w-full h-full object-cover"
                                alt={work.name}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-[1440px] mx-auto px-[25px] mt-[40px]">
                <a
                    href="/work"
                    className="text-[25px] font-medium font-ui italic underline inline-block"
                >
                    See More +
                </a>
            </div>
        </section>
    )
}