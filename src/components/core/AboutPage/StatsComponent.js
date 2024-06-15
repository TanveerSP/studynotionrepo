import React from 'react'

const stats = [
    { count: "5K", label: "Active Student" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
    return (
        <div className=' bg-richblack-700 my-20'>
            <div className='flex flex-col gap-10  justify-between  w-11/12 max-w-maxContent  text-white mx-auto'>
                <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
                    {
                        stats.map((data, index) => {
                            return (
                                <div
                                    className='flex flex-col py-10'
                                    key={index}>
                                    <h1 className='font-bold text-[2rem] text-richblack-5'>
                                        {data.count}
                                    </h1>
                                    <h2 className='text-richblack-300 text-[16px] font-inter'>
                                        {data.label}
                                    </h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default StatsComponent