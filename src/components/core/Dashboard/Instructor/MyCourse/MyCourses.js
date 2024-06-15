import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from "../../../../../services/operations/courseDetailsAPI"
import IconBtn from "../../../../common/IconBtn"
import { FiPlus } from "react-icons/fi";
import CoursesTable from './CoursesTable'

const MyCourses = () => {

  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getinstructorCourses = async () => {
      try {
        //calling course handler with api
        const response = await fetchInstructorCourses(token);
        if (response) {
          setCourses(response);
        }

      } catch (error) {
        console.log("Unable to fetch Enrolled Courses");
      }
    };
    getinstructorCourses();
  }, []);

  return (
    <>
      <div>
        <div className="mb-14 flex items-center justify-between">
          <h1 className="text-3xl text-richblack-50">My Courses</h1>
          <IconBtn
            text="Add Course"
            onclick={() => navigate("/dashboard/add-course")}

          >
            <FiPlus size={25} />
          </IconBtn>
        </div>
      </div>
      {courses && (<CoursesTable
        courses={courses} setCourses={setCourses} />
      )}
    </>
  )
}

export default MyCourses