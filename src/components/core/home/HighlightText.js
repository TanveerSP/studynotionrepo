import React from 'react'

const HighlightText = ({ text }) => {
    return (
        <>
            <span className='  font-bold m-auto bg-gradient-to-t from-gradientGreen-200 to-gradientBlue-200 text-transparent bg-clip-text'>
                {text}
            </span>
        </>
    )
}

export default HighlightText