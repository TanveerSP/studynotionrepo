import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({ modalData }) => {
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm" >
            <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <p className='text-richblack-25 font-bold text-2xl mb-3'>
                    {modalData.text1}
                </p>
                <p className=' font-inter text-sm text-start text-richblack-200 mb-3'>
                    {modalData.text2}
                </p>
                <div className='flex items-center gap-x-4'>
                    {/* Exit Button */}

                    <IconBtn
                        onclick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}
                    />


                    {/* Cancel button */}
                    <button onClick={modalData?.btn2Handler}
                        className=" bg-richblack-300 text-black py-[8px] px-[20px] rounded-lg font-semibold "
                    >
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal