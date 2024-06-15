import React from 'react'
import { IoIosVideocam } from "react-icons/io"

function CourseSubSectionAccordion(subSec) {
    return (
        <div>
            <div className="flex justify-between py-2">
                <div className={`flex items-center gap-2 mx-4`}>
                    <span>
                        <IoIosVideocam size={25} className="text-yellow-25" />
                    </span>
                    <p className='text-yellow-25'>{subSec?.title} Watch Lecture</p>
                </div>

                {/* <p className='text-yellow-25'>{subSec?.timeDuration}</p> */}
            </div>
        </div>
    )
}

export default CourseSubSectionAccordion