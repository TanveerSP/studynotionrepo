import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import SwiperCore, { Autoplay, FreeMode } from 'swiper/modules';

import CourseTemp from './CourseTemp';


const CourseSlider = ({ Courses }) => {
  return (
    <div className=''>
      {
        Courses?.length ? (
          <Swiper
            className='max-h-[30rem]'
            loop={true}
            slicesPerView={1}
            spaceBetween={25}
            modules={[FreeMode,  Autoplay]}
            pagination={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {Courses?.map((course, index) => {
              return (
                <SwiperSlide key={index}>
                  <CourseTemp course={course} Height={"h-[150px] sm:h-[250px]"} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        ) : (
          <p className='text-xl text-richblack-5 font-medium'>
            No Course Found
          </p>
        )
      }
    </div>
  )
}

export default CourseSlider