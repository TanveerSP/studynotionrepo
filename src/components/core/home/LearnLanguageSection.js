import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './Button';
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";


const LearnLanguageSection = () => {
    return (
        <div className=" w-11/12 max-w-maxContent mt-[4rem] flex flex-col items-center mx-auto ">
            <div className="text-4xl font-inter font-semibold ">
                Your swiss knife for <HighlightText text={"learning any language"} />
            </div>
            <div className="font-inter mt-[1rem] font-medium lg:w-[75%]">
                Using spin making learning multiple languages easy. with 20+ languages
                realistic voice-over, progress tracking, custom schedule and more.
            </div>
            <div className=" mt-[2rem] flex flex-col lg:flex-row mx-auto">
                <img
                    data-aos="fade-right"
                    src={Know_your_progress}
                    className="object-contain lg:mr-[-8rem]"
                />
                <img
                    data-aos="fade-up"
                    src={Compare_with_others}
                    className="object-contain"
                />
                <img
                    data-aos="fade-left"
                    src={Plan_your_lesson}
                    className="object-contain lg:ml-[-9rem]"
                />
            </div>
            <div className="mb-[4rem]">
                <CTAButton active={true} linkto={"/signup"}>
                    {" "}
                    Learn More
                </CTAButton>
            </div>
        </div>
    )
}

export default LearnLanguageSection