import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../Instructor/AddCourse/RenderSteps'
import Loader from '../../../common/Loader';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slice/courseSlice';

export default function EditCourse() {

    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if (result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails()
    }, [])

    if (loading) {
        return (
            <div>
                <Loader />
            </div>
        )
    }

    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Course
            </h1>
            <div className="mx-auto max-w-[600px]">
                {
                    course ? (<RenderSteps />)
                        : (
                            <div className="w-full border-richblack-600 border-[2px] flex justify-center items-center py-14">
                                <p className="text-3xl font-medium text-richblack-5">
                                    CourseNot Found
                                </p>
                            </div>
                        )
                }
            </div>

        </div>
    )
}
