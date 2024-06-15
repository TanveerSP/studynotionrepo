import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import {
    setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures,
} from '../slice/viewCourseSlice';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        ; (async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token)
            // console.log("Course Data here... ", courseData.courseDetails)
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))
            let lectures = 0
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='pt-14'>
            <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
                {/* Sidebar */}
                <VideoDetailsSidebar setReviewModal={setReviewModal} />

                {/* For Video */}
                <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                    <div className='mx-6'>
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </div>
    )
}

export default ViewCourse