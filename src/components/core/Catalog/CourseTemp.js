import React, { useEffect, useState } from 'react';
import RatingStars from '../../common/RatingStars';
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRating';

const CourseTemp = ({ course, Height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        if (course) {
            const count = GetAvgRating(course.ratingAndReviews);
            setAvgReviewCount(count);
            console.log("Course data: ", course);
        }
    }, [course]);

    if (!course) {
        return <div>Loading...</div>; // or some other fallback UI
    }

    const instructorName = `${course?.instructor?.firstName || ''} ${course?.instructor?.lastName || ''}`;

    return (
        <div className=" z-auto mb-5 md:p-7 lg:w-full transition-all duration-200  md:hover:scale-105 ">
            <Link to={`/courses/${course._id}`}>
                <div className='rounded-lg'>
                    <img src={course?.thumbnail} alt="Course Thumbnail"
                        className={`${Height} w-full rounded-xl object-cover border-[2px] border-richblack-700`}
                    />
                </div>

                {/* Details of courses */}
                <div className='flex flex-col gap-2 px-1 py-3'>
                    {/* title */}
                    <p className='text-xl text-richblack-5'>{course.courseName}</p>

                    {/* Instructor Name */}
                    <p className='text-sm text-richblack-50'>{instructorName}</p>

                    {/* rating and stars */}
                    <div className='flex items-center gap-2'>
                        {/* Avg review count */}
                        <span className='text-yellow-5'>{avgReviewCount || 0}</span>

                        {/* Stars */}
                        <RatingStars Review_Count={avgReviewCount} />

                        {/* how many people already given their ratings */}
                        <span className='text-richblack-400'>{course?.ratingAndReviews?.length || 0} Ratings</span>
                    </div>

                    {/* Price */}
                    <p className='text-xl text-richblack-5'>{course?.price}</p>
                </div>
            </Link>
        </div>
    );
};

export default CourseTemp;