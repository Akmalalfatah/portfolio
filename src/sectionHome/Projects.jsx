import { works } from '../pages/work.data.js'
import { useNavigate } from 'react-router-dom'

export default function Projects() {
    const navigate = useNavigate();
    const displayWorks = works.slice(0, 3);

    return (
        <section className="projects relative min-h-screen py-[80px] md:py-[180px]">

            <div className="mini-text absolute left-[16px] md:left-[23px] top-[24px] md:top-[100px]">
                <span className="text-[18px] md:text-[24px] font-display">(*Projects & Experiences )</span>
            </div>

            <div className="project-grid max-w-[1440px] mx-auto px-[16px] md:px-[25px] flex flex-col">
                {displayWorks.map((work, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/work/${work.slug}`)}
                        className="work-item relative border-t-2 border-[#EBE6DC] py-[16px] md:py-[10px] flex flex-col md:flex-row justify-between items-start cursor-pointer transition-colors duration-300 hover:bg-[#F2ECE2] gap-[12px] md:gap-0"
                    >
                        {/* Text content */}
                        <div className="work-content flex flex-col md:flex-row items-start gap-[8px] md:gap-[60px] flex-1 md:pr-[20px] w-full">

                            <span className="work-num text-[16px] md:text-[20px] font-display md:min-w-[50px]">
                                [ {index + 1}. ]
                            </span>

                            <div className="work-desc md:w-[336px] flex flex-col">
                                <span className="text-[16px] md:text-[20px] font-display">
                                    {work.role}
                                </span>
                                <span className="text-[14px] md:text-[20px] text-[#afafaf] italic font-ui">
                                    {work.subRole}
                                </span>
                            </div>

                            <div className="work-name md:w-[370px] font-ui flex flex-col gap-[6px] md:gap-[8px]">
                                <div className="flex flex-col">
                                    <span className="text-[18px] md:text-[25px] font-medium leading-[26px] md:leading-[35px] italic">
                                        {work.name}
                                    </span>
                                    <span className="text-[14px] md:text-[20px] leading-[22px] md:leading-[35px]">
                                        {work.description}
                                    </span>
                                </div>
                                <span className="text-[13px] md:text-[20px] font-ui text-[#afafaf]">
                                    {work.tag}
                                </span>
                            </div>
                        </div>

                        {/* Image — full width on mobile */}
                        <div className="work-image w-full md:w-[470px] md:h-[310px] flex-shrink-0 relative z-10">
                            <img
                                src={work.image}
                                className="w-full h-auto md:h-full object-cover"
                                alt={work.name}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-[1440px] mx-auto px-[16px] md:px-[25px] mt-[32px] md:mt-[40px]">
                <button
                    onClick={() => {
                        window.scrollTo(0, 0);
                        navigate('/work');
                    }}
                    className="text-[18px] md:text-[25px] font-medium font-ui italic underline inline-block cursor-pointer bg-transparent border-none p-0"
                >
                    See More +
                </button>
            </div>
        </section>
    );
}