import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';


const ExploreMore = () => {

    const tabs = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths",
    ];

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(
        HomePageExplore[0].courses[0].heading
    );

    const setMyCards = (value) => {
        console.log(value);
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };

    return (
        <div className=" relative w-11/12 max-w-maxContent mt-7 flex items-center flex-col gap-5 mx-auto mb-[4rem]">
            <div>
                <div className="text-4xl text-white text-center font-bold font-inter">
                    Unlock the&nbsp;
                    <HighlightText text={"Power of Code"} />
                </div>
                <div className="font-semibold text-richblack-300 text-center">
                    Learn to Build Anything You Can Imagine
                </div>
            </div>
            <nav className="w-[70%] mb-[8rem] hidden lg:flex flex-row justify-between text-white  bg-richblack-800 py-2 px-[2rem]  rounded-full shadow-sm shadow-richblack-400   ">
                {tabs.map((ele, index) => {
                    return (
                        <ul
                            key={index}
                            className={`font-medium font-inter text-richblack-300 text-[1rem] cursor-pointer rounded-full py-1 px-3 my-0 hover:text-white hover:bg-richblack-900 
                ${ele === currentTab ? "bg-richblack-900 text-white" : ""} ? `}
                            onClick={() => {
                                setMyCards(ele);
                            }}
                        >
                            {ele}
                        </ul>
                    );
                })}
            </nav>
            <div className="lg:absolute top-[70%]  flex flex-col md:flex-wrap lg:flex-row items-center gap-10">
                {courses.map((course, idx) => {
                    return (
                        <CourseCard
                            animationType={
                                idx === 0 ? "fade-right" : idx === 1 ? "fade-up" : "fade-left"
                            }
                            key={idx}
                            cardData={course}
                            currentCard={currentCard}
                            setCurrentCard={setCurrentCard}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default ExploreMore