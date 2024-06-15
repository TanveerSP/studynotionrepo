import React, { useEffect, useRef } from 'react';
import CountUp from 'react-countup';

const stats = [
    { count: "5K", label: "Active Student" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
];

const StatsComp = () => {
    const countUpRefs = useRef([]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (isComponentInViewport()) {
            resetCounts();
        }
    };

    const isComponentInViewport = () => {
        const element = document.getElementById('stats-section');
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    };

    const resetCounts = () => {
        countUpRefs.current.forEach(ref => {
            if (ref && ref.start) {
                ref.start();
            }
        });
    };

    return (
        <div id="stats-section" className='bg-richblack-700 my-20'>
            <div className='flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto'>
                <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
                    {stats.map((data, index) => (
                        <div className='flex flex-col py-10 items-center' key={index}>
                            <div className='flex flex-row text-center gap-1 items-center'>
                                <CountUp start={0} end={parseCount(data.count)} duration={5} delay={3} ref={(countUp) => (countUpRefs.current[index] = countUp)}>
                                    {({ countUpRef }) => (
                                        <h1 className='font-bold text-[2rem] text-richblack-5' ref={countUpRef} />
                                    )}
                                </CountUp>
                                <h1 className='text-center font-bold text-[26px] text-richblack-5'>+</h1>
                            </div>
                            <h2 className='text-richblack-300 text-[16px] font-inter'>{data.label}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StatsComp

function parseCount(count) {
    const num = parseFloat(count);
    if (count.toLowerCase().includes('k')) {
        return num * 1000;
    } else {
        return num;
    }
}