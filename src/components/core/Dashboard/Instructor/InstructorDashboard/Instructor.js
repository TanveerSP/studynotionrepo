import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../../services/operations/courseDetailsAPI'
import { useSelector } from 'react-redux';
import Loader from '../../../../common/Loader'
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart'
import { FaAngleRight } from "react-icons/fa";

const Instructor = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if (instructorApiData.length) {
                setInstructorData(instructorApiData);
            }

            if (result) {
                setCourses(result);
            }
            setLoading(false);
        };
        getCourseDataWithStats();
    }, []);

    const totalAmount = instructorData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce(
        (acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    return (
        <div>

            {/* Section one 1  */}
            <div>
                {/* Heading and paragraph */}
                <div className='flex gap-2'>
                    <h1 className='text-richblack-25 text-3xl'>
                        Hi
                    </h1>
                    <span className='text-yellow-25 text-3xl capitalize '>
                        {user?.firstName} <sup>👋</sup>
                    </span>
                </div>
                <p className='text-richblack-100 font-inter'>
                    Let's start something new
                </p>
            </div>


            {loading ? (
                <div>
                    <Loader />
                </div>
            ) : courses.length > 0 ? (
                <>
                    <div className=' '>
                        {/* Section Two 2 */}
                        <div className='my-4 flex h-[450px] space-x-4'>
                            <InstructorChart courses={instructorData} />
                            {/* Section Three 3*/}
                        </div>
                        <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                            <p className='text-lg font-bold text-richblack-5'>
                                Statistics
                            </p>

                            <div className='mt-4 space-y-4'>
                                <div>
                                    <p className='text-lg text-richblack-200'>Total Courses</p>
                                    <p className='text-3xl font-semibold text-richblack-50'>
                                        {courses.length}
                                    </p>
                                </div>

                                <div>
                                    <p className='text-lg text-richblack-200'>Total Students</p>
                                    <p className='text-3xl font-semibold text-richblack-50'>{totalStudents}</p>
                                </div>

                                <div>
                                    <p className='text-lg text-richblack-200'>Total Income</p>
                                    <p className='text-3xl font-semibold text-richblack-50'>{totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* last section render 3 Courses */}
                    <div className='mt-4 rounded-md bg-richblack-800 p-6'>
                        {/* heading */}
                        <div className='flex items-center justify-between'>
                            <p className='text-2xl text-richblack-25'>Your Courses</p>
                            <Link to="/dashboard/my-courses">
                                <div className='flex items-center text-xs font-semibold text-yellow-50'>
                                    View All <FaAngleRight size={20} />
                                </div>
                            </Link>
                        </div>

                        {/* Courses */}
                        <div className="my-4 flex items-start space-x-6">
                            {courses.slice(0, 3).map((course, index) => (
                                <div key={index} className="w-1/3">
                                    <img
                                        src={course.thumbnail}
                                        alt="course-img"
                                        className="h-[201px] w-full rounded-md object-cover"
                                    />

                                    <div className="mt-3 w-full">
                                        <p className="text-sm font-medium text-richblack-50">
                                            {course.courseName}
                                        </p>

                                        <div className="mt-1 flex items-center space-x-2">
                                            <p className="text-xs font-medium text-richblack-300">
                                                {course.totalStudentsEnrolled} Studens
                                            </p>
                                            <p className="text-xs font-medium text-richblack-300">
                                                |
                                            </p>
                                            <p className="text-xs font-medium text-yellow-25">
                                                Rs {course.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </>
            ) : (
                <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
                    <p className="text-center text-2xl font-bold text-richblack-5">
                        You have not create any courses yet
                    </p>
                    <Link to={"/dashboard/addCourse"}>
                        <div className="mt-3 flex items-center text-center text-lg font-semibold text-yellow-50">
                            Create a Course <FaAngleRight size={20} />
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Instructor