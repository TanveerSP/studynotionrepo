import React from 'react'

const RedText = ({ text }) => {
    return (
        <>
            <span className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]
            bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]
            ">
                {text}
            </span>
        </>
    )
}

export default RedText