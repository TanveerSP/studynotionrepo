import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaBookmark, FaRegBookmark, FaShareSquare } from "react-icons/fa";
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../slice/cartSlice';

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,

  } = course;

  // This function for Add to card course
  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Your are an Instructor, you cant buy any Course");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "you are not logged in",
      text2: "Please login to add to cart",
      btn1Text: "login",
      btn2Text: "cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // This function to copy linke
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copy to Clipboard");
  }

  return (
    <>
      <div className={`flex flex-col gap-4 rounded-xl bg-richblack-700 border-[1px] border-richblack-400 p-4 text-richblack-5`}>
        <img src={ThumbnailImage} alt={course?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden border-[1px] border-richblack-400 rounded-2xl object-cover md:max-w-full"
        />
        <div className='px-4'>
          <div className='space-x-3 pb-4 text-3xl font-semibold'>
            Price {CurrentPrice}
          </div>

          <div className="flex flex-col gap-4">
            <button
              className='mt-4 bg-yellow-50 text-black py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-95'
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id) ?
                "Go to Course" : "Buy Now"}
            </button>
            {(!course?.studentsEnrolled.includes(user?._id)) && (
              <button onClick={handleAddToCart}
                className='bg-richblack-800 text-richblack-5 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-95'>
                Add to Cart
              </button>
            )
            }
          </div>
        </div>

        <div>
          <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>30-Day Money-Back Guarantee</p>
          <p className={`my-2 text-xl font-semibold `}>This Course Includes : </p>

          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {
              course?.instructions?.map((item, index) => (
                <p key={index} className={`flex gap-2 items-center`}>
                  <BsFillCaretRightFill />
                  <span className='max-w-[306]'>{item}</span>
                </p>
              ))
            }
          </div>
        </div>

        {/* Share Button */}
        <div className='text-center'>
          <button
            onClick={handleShare}
            className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
          >
            <FaShareSquare size={15} /> Share
          </button>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard