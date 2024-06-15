import React from 'react'
import CTAButton from "../home/Button"
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';


const CodeBlock = ({
    heading,
    description,
    btn1,
    btn2,
    position,
    code,
    backgroudGradient,
    codeColor,
}) => {
    return (
        <div className={` w-[100%] flex flex-col algin ${position} my-20 justify-between gap-10`}>
            {/* section 1 */}
            <div className=" w-[100%] lg:w-[50%]">
                <div className="w-[100%] flex flex-col mb-3">{heading}</div>
                <div className="text-richblack-300 font-bold ">{description}</div>

                <div className="flex gap-7 mt-7 flex-row">
                    <CTAButton active={btn1.active} linkTo={btn1.linkto} shadow={true}>
                        <div className="flex gap-2 items-center flex-nowrap">
                            {btn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={btn2.active} linkTo={btn2.linkto} shadow={true}>
                        {btn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* section 2 */}
            <div className=' relative h-fit  flex flex-row text-10[px] w-[90%] py-4 lg:w-[500px] border-2 border-richblack-500 '>
                {/* HW -> BG gradient */} 
                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 text-sm md:text-base`}>
                    <TypeAnimation
                        sequence={[code, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                        omitDeletionAnimation={true}
                    />
                    <div className={`${backgroudGradient}`}></div>
                </div>
            </div>

        </div>
    )
}

export default CodeBlock