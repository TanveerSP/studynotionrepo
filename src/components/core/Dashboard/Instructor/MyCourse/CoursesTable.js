import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse, deleteCourses, fetchInstructorCourses, } from "../../../../../services/operations/courseDetailsAPI"

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import confirmationModal from '../../../../common/ConfirmationModal';
import { COURSE_STATUS } from '../../../../../utils/constants'
import { BsClockFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { formatDate } from '../../../../../services/formatDate'
import ConfirmationModal from '../../../../common/ConfirmationModal';
import Loader from '../../../../common/Loader'
import { useNavigate } from 'react-router-dom';

export default function CoursesTable({ courses, setCourses }) {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    const DESCRIPTION_LENGTH = 30;

    const handleEdit = (courseId) => {
        navigate(`/dashboard/edit-course/${courseId}`);
    };

    const handleCourseDelete = async (courseId) => {
        setLoading(true);

        await deleteCourse({ courseId: courseId }, token);
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result)
        }
        setConfirmationModal(null);
        setLoading(false)
    }

    return (
        <>
            {!courses ? (
                <Loader />
            ) : !courses.length ? (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-5 lg:text-3xl">
                    You hav not Created in Any Course yet
                </p>
            ) : (
                <Table className="rounded-xl border border-richblack-700 " >
                    <Thead>
                        <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-8 py-2">
                            {/* <Th>
                                <input type="checkbox"/>
                            </Th> */}
                            <Th className="flex flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                                Courses
                            </Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                Duration
                            </Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                Price
                            </Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100 flex justify-center items-center">
                                Actions
                            </Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {courses.length === 0 ? (
                            <Tr>
                                <Td>
                                    No Courses Found
                                </Td>
                            </Tr>)
                            : (courses?.map((course) => (
                                <Tr key={course._id} className="flex gap-x-10 border-richblack-800 p-8">
                                    <Td className="flex flex-1 gap-x-4">
                                        <img
                                            src={course?.thumbnail}
                                            className='h-[150px] w-[220px] rounded-lg object-cover border-[1px] border-richblack-400'
                                        />
                                        <div className="flex flex-col justify-between">
                                            <p className="text-lg font-semibold text-richblack-5">
                                                {course.courseName}
                                            </p>
                                            <p className="text-xs text-richblack-300">
                                                {course.courseDescription.split(" ").length >
                                                    DESCRIPTION_LENGTH ? course.courseDescription
                                                        .split(" ")
                                                        .split(0, DESCRIPTION_LENGTH)
                                                        .join(" ") + "..."
                                                    : course.courseDescription
                                                }
                                            </p>
                                            <p className="text-[12px] text-white">
                                                Created: {formatDate(course.createdAt)}
                                            </p>
                                            {
                                                course.status === COURSE_STATUS.DRAFT ? (
                                                    <p className="text-pink-50 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium">
                                                        <BsClockFill className="flex h-3 w-3 items-center justify-center rounded-full" />
                                                        DRAFTED
                                                    </p>
                                                ) : (
                                                    <p className="text-caribbeangreen-300 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium">
                                                        <AiFillCheckCircle className="flex h-3 w-3 items-center justify-center rounded-full" />
                                                        PUBLISHED
                                                    </p>
                                                )}
                                        </div>
                                    </Td>
                                    <Td className="text-left text-sm font-medium text-richblack-100 pivoted">
                                        2h 30min
                                    </Td>
                                    <Td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                                        ₹{course.price}
                                    </Td>
                                    <Td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                                        <button
                                            title='Edit'
                                            className="px-2 Transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                            disabled={loading}
                                            onClick={() => handleEdit(course._id)}
                                        >
                                            <FiEdit2 fontSize={20} />
                                        </button>

                                        <button
                                            title='Delete'
                                            className="px-1 Transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                            disabled={loading}
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course?",
                                                    text2: "All the data related to this course will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading ? () => handleCourseDelete(courses._id) : () => { },
                                                    btn2Handler: !loading ? () => setConfirmationModal(null) : () => { },
                                                })
                                            }}
                                        >
                                            <RiDeleteBin6Line fontSize={20} />
                                        </button>
                                    </Td>
                                </Tr>
                            )))
                        }
                    </Tbody>
                </Table>
            )}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}
