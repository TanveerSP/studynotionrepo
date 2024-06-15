import React, { useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "../App.css"

import Banner from '../assets/Images/banner.mp4'
import Footer from '../components/common/Footer';

// core's Home pages contents 
import CTAButton from '../components/core/home/Button';
import CodeBlock from '../components/core/home/CodeBlock'
import HighlightText from '../components/core/home/HighlightText';
import TimelineSection from '../components/core/home/TimelineSection'
import LearnLanguageSection from '../components/core/home/LearnLanguageSection'
import InstructorSection from '../components/core/home/InstructorSection'
import ExploreMore from '../components/core/home/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider';


// for animation sliding on div
import Aos from 'aos';
import "aos/dist/aos.css"
import TextFire from '../components/core/home/TextFire';
// import Loader from '../components/common/Loader';

const Home = () => {
    useEffect(() => {
        Aos.init({
            duration: 1100,
            delay: 250,
            once: true
        });
    },[]);

    return (
        <div className='mt-14'>

            {/* section 1 */}
            <div className='relative flex flex-col mx-auto w-11/12 max-w-maxContent items-center text-white justify-between '>
                <Link to={"/signup"}>

                    <div className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit '>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight></FaArrowRight>
                        </div>
                    </div>

                </Link>

                <div className='text-center text-4xl font-semibold mt-6'>
                    Empower Your Future With 
                    <TextFire text={"  Coding Skills"} />
                </div>

                <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-200 '>
                    With our online coding courses, you can learn at your own pace, from
                    anywhere in the world, and get access to a wealth of resources,
                    including hands-on projects, quizzes, and personalized feedback from
                    instructors.
                </div>

                <div className='flex flex-row gap-7 mt-0'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/login"}>
                        Book Demo
                    </CTAButton>
                </div>

                <div className='my-10 w-[90%] shadow-[10px_-5px_50px_-5px] shadow-blue-200 '>
                    <video
                        className=' shadow-[20px_20px_white] mr-2'
                        muted
                        loop
                        autoPlay
                    >
                        <source src={Banner} type='video/mp4' />
                    </video>
                </div>

                {/* Code section one 1 */}
                <div>
                    <div>
                        <CodeBlock
                            position={"lg:flex-row"}
                            heading={
                                <div className=" text-3xl md:text-4xl font-semibold ">
                                    <p>Unlock Your &nbsp;</p>
                                    <HighlightText text={"coding potential"} />
                                    &nbsp;with our online courses
                                </div>
                            }
                            description={
                                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                            }
                            btn1={{
                                btnText: "try it yourself",
                                linkto: "/signup/",
                                active: true,
                            }}
                            btn2={{
                                btnText: "Learn more",
                                linkto: "/login/",
                                active: false,
                            }}
                            code={`<<!DOCTYPE html>\n<html>\n<head>\n<title>This is myPage</title>\n</head>\n</body>\n<h1><ahref="/">Header</a></h1>\n<nav> <a href="/one">One</a>\n <a href="/two">Two</a>\n <a href="/three">Three</a>`}
                            codeColor={"text-yellow-25"}
                            backgroudGradient={"grad"}
                        />
                    </div>
                </div>
                {/* Code section 2 */}
                <div>
                    <CodeBlock
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className=" text-3xl md:text-4xl font-semibold ">
                                <p>Start &nbsp;</p>
                                <HighlightText text={"coding in seconds"} />
                            </div>
                        }
                        description={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        btn1={{
                            btnText: "try it yourself",
                            linkto: "/signup/",
                            active: true,
                        }}
                        btn2={{
                            btnText: "Learn more",
                            linkto: "/login/",
                            active: false,
                        }}
                        code={`<<!DOCTYPE html>\n<html>\n<head>\n<title>This is myPage</title>\n</head>\n</body>\n<h1><ahref="/">Header</a></h1>\n<nav> <a href="/one">One</a>\n <a href="/two">Two</a>\n <a href="/three">Three</a>`}
                        codeColor={"text-gradientBlue-200"}
                        backgroudGradient={"grad2"}
                    />
                </div>

                <ExploreMore />
            </div>

            {/* section 2 */}
            <div className=" bg-pure-greys-5 text-richblack-900">
                <div className="homepage_bg h-[333px] flex justify-center mb-[4rem]">
                    <div className="w-11/12 max-w-maxContent flex  lg:flex-row items-center justify-center">
                        <div className="lg:mt-[10rem] flex gap-3 items-center flex-col md:flex-row">
                            <CTAButton active={true} linkTo={"/singup"}>
                                <div className="flex flex-row items-center gap-3 mx-auto ">
                                    Explore Full Catelog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkTo={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
                    {/* Job that is in Demand - Section 1 */}
                    <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                        <div className="text-4xl font-semibold lg:w-[45%] ">
                            Get the skills you need for a{" "}
                            <HighlightText text={"job that is in demand."} />
                        </div>
                        <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                            <div className="text-[16px]">
                                The modern StudyNotion is the dictates its own terms. Today, to
                                be a competitive specialist requires more than professional
                                skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="">Learn More</div>
                            </CTAButton>
                        </div>
                    </div>

                    {/* Timeline Section - Section 2 */}
                    <TimelineSection />
                    {/* Learning Language Section - Section 3 */}
                    <LearnLanguageSection />
                </div>


            </div>

            {/* section 3 */}
            <div className=' w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8
            first-letter bg-richblack-900 text-white mt-10 mb-8 '>
                <InstructorSection />

                <h2 className='text-center text-4xl font-semibold mt-10'>
                    Review from other learners
                </h2>

                {/* Review Slider here */}
                
                <ReviewSlider />

            </div>

            {/* footer */}
            <Footer />

        </div>
    )
}

export default Home