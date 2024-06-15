import React from 'react'
import { Link } from 'react-router-dom'
import '../../../App.css'

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>

      <div
        className={`text-center  text-[13px] sm:text-[16px] mt-9 w-fit  rounded-lg font-bold py-3 px-6    border-richblack-900 transition-all duration-200 hover:scale-95 hover:shadow-none
         ${active
            ? "bg-yellow-50 text-black"
            : "bg-richblack-800 text-white shadow-sm shadow-richblue-300"
          }`}>
        {children}
      </div>

    </Link>
  )
}

export default Button
