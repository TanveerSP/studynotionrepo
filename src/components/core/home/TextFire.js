import React from 'react'

const TextFire = ({ text }) => {
    return (
        <div>
            <>
                <span className='font-bold m-auto'>
                    {" {🔥}"}
                </span>
                <span className='  font-bold m-auto bg-gradient-to-t from-gradientGreen-200 to-gradientBlue-200 text-transparent bg-clip-text'>

                    {text}
                </span>
            </>
        </div>
    )
}

export default TextFire