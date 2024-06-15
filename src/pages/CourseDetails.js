import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeatureAPI'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Loader from '../components/common/Loader'
import Error from './Error'
import Footer from '../components/common/Footer'
import ConfirmationModal from '../components/common/ConfirmationModal'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { formatDate } from '../services/formatDate'
import RatingStars from '../components/common/RatingStars'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import toast from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../utils/constants'
import { addToCart } from '../slice/cartSlice';


function CourseDetails() {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [response, setResponse] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [reviews, setReviews] = useState([]);

    // ===============================================================================
    //       get All course
    // ===============================================================================
    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                setResponse(result);
            } catch (error) {
                console.log("Could not fetch course details");
            }
        }
        getCourseFullDetails();
    }, [courseId]);

    //=========================================================================================
    // colaps section
    //=========================================================================================
    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        // console.log("called", id)
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat([id])
                : isActive.filter((e) => e !== id)
        );
    };

    //=========================================================================================
    // Average Review Count
    //=========================================================================================
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        let allReviews = []
        const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews);
        response?.data?.courseDetails.ratingAndReviews.forEach((review) => {
            allReviews = [...allReviews, review];
        });
        setAvgReviewCount(count);
        setReviews(allReviews);
    }, [response])

    //=========================================================================================
    // Total lecture coutn
    //=========================================================================================
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        response?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);
    }, [response])

    //=========================================================================================
    // This function for Add to card course
    //=========================================================================================

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Your are an Instructor, you cant buy any Course");
            return;
        }
        if (token) {
            dispatch(addToCart(response.data?.courseDetails));
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

    //=========================================================================================
    // this is for buy course handler
    //=========================================================================================
    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "you are not Logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        });
    };

    if (loading || !response) {
        return (
            <div>
                <Loader />
            </div>
        )
    }

    if (!response.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }

    const {
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = response.data?.courseDetails;


    return (
        <>
            <div className={`mt-10 relative w-full bg-richblack-800`}>
                {/* Hero Section */}
                <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative'>

                    <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
                        <div className="relative block max-h-[30rem] lg:hidden">
                            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                            <img
                                src={thumbnail}
                                alt="course thumbnail"
                                className="aspect-auto w-full"
                            />
                        </div>

                        <div
                            className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
                        >
                            <div>
                                <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>
                                    {courseName}
                                </p>
                            </div>
                            <p className='text-richblack-200'>{courseDescription}</p>
                            <div className='text-md flex flex-wrap items-center gap-2'>
                                <span className='text-yellow-25'>{avgReviewCount}</span>
                                <RatingStars Star_Size={24} />
                                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                                <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
                            </div>
                            <div>
                                <p>
                                    Create By {`${instructor.firstName} ${instructor.lastName}`}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-5 text-lg">
                                <p className='flex items-center gap-2'>
                                    {" "}
                                    <BiInfoCircle /> Create At {formatDate(createdAt)}
                                </p>
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <HiOutlineGlobeAlt /> {''} English
                                </p>
                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                            <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                                Rs. {price}
                            </p>
                            <button
                                className="bg-yellow-50 text-black py-2 rounded-lg font-semibold "
                                onClick={handleBuyCourse}>
                                Buy Now
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="bg-richblack-600 text-richblack-5 py-2 rounded-lg font-semibold ">
                                Add to Cart
                            </button>
                        </div>

                    </div>

                    {/* Course Card */}
                    <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                        <CourseDetailsCard
                            course={response?.data?.courseDetails}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-5 box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                    {/* what will you learn section */}

                    <div className="my-8 border border-richblack-600 p-8">
                        <p className='text-3xl font-semibold'>
                            What you'll learn
                        </p>
                        <div className='mt-5'>
                            {whatYouWillLearn}
                        </div>
                    </div>

                    {/* course content section */}
                    <div className='max-w-[830px] mt-5 '>
                        <div className='flex flex-col gap-3'>
                            <p className='text-[28px] font-semibold'>Course Content</p>
                        </div>

                        <div className='flex flex-wrap justify-between gap-x-3'>
                            <div className='flex gap-2'>
                                <span>{courseContent.length} {`section(s)`}</span>
                                <span>{totalNoOfLectures} {`lecture(s)`}</span>
                                <span>{response.data?.totalDuration} total length</span>
                            </div>
                            <div>
                                <button
                                    onClick={() => setIsActive([])}
                                    className='text-yellow-25'
                                >
                                    Collapse all Section
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Course Details Accordion */}
                <div>
                    <div className="py-4 mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                        {courseContent?.map((course, index) => (
                            <CourseAccordionBar
                                course={course}
                                key={index}
                                isActive={isActive}
                                handleActive={handleActive}
                            />
                        ))}
                    </div>
                </div>

                {/* Author Details */}
                <div className='mb-12 py-4 '>
                    <p className='text-yellow-25 text-[28px] font-semibold'>Author</p>
                    <div className='flex items-center gap-4 py-4'>
                        <img src={instructor.image ? instructor.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`}
                            alt="Author" className='h-14 w-14 rounded-full object-cover' />

                        <p className='text-lg'>
                            {`${instructor.firstName} ${instructor.lastName}`}
                        </p>
                        <p className='text-richblack-50 text-[20px] '>
                            {instructor?.additionalDetails?.about}
                        </p>
                    </div>
                </div>

            </div>
            <Footer />
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default CourseDetails