import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import ReactStars from 'react-rating-stars-component';
import { useEffect, useState } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { ratingsEndpoints } from '../../services/apis';


const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const truncateWords = 10;

    useEffect(() => {
        (async () => {
            const { data } = await apiConnector(
                "GET",
                ratingsEndpoints.REVIEWS_DETAILS_API
            )
            if (data?.success) {
                setReviews(data?.data)
            }
        })()
    }, [])

    return (
        <div className='text-white w-full'>
            <div className='my-12 h-auto max-w-full'>
                <Swiper
                    slidesPerView={1}
                    breakpoints={{
                        1024: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[FreeMode, Autoplay]}
                    className="w-full"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <div className='bg-richblack-800 border border-richblack-700 px-4 py-2 rounded-lg h-[208px] flex flex-col justify-between'>
                                <div className='flex flex-row items-center mb-3'>
                                    <img
                                        src={
                                            review?.user?.image
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                        }
                                        alt="review-avatar"
                                        className='h-12 w-12 rounded-full object-cover border-2 border-richblack-700'
                                    />
                                    <div className='ml-4'>
                                        <p className='font-bold text-richblack-100'>
                                            {review?.user?.firstName} {review?.user?.lastName}
                                        </p>
                                    </div>
                                </div>
                                <p className=' font-inter text-richblack-25 '>
                                    {review?.course?.courseName}
                                </p>
                                <p className='mb-1 flex-grow'>
                                    {review?.review.split(" ").length > truncateWords
                                        ? `${review?.review
                                            .split(" ")
                                            .slice(0, truncateWords)
                                            .join(" ")} ...`
                                        : `${review?.review}`}
                                </p>
                                <div className='flex items-center mb-2 gap-3'>
                                    <p className=''>
                                        {review?.rating.toFixed(1)}
                                    </p>
                                    <ReactStars
                                        count={5}
                                        value={review.rating}
                                        size={24}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider