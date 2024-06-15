import React from 'react'
import HighlightText from '../home/HighlightText'
import GridentText from './GridentText'

const Quote = () => {
    return (
        <div className='w-11/12 max-w-maxContent text-xl md:text-4xl font-semibold mx-auto py-5 mt-10 pb-20 text-center text-richblack-5'>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HighlightText text={" combines technology"} />,
            <GridentText  text={" expertise"} />
            <span>
                , and community to create an
            </span>
            <GridentText  text={" unparalleled educational experience."} />
        </div>
    )
}

export default Quote