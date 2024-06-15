import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndCompData'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import CourseTemp from '../components/core/Catalog/CourseTemp';

const Catalog = () => {

    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1);

    // Fetch all categories
    useEffect(() => {
        const getCategories = async () => {
            const res = await apiConnector("GET", categories.CATEGORIES_API)
            const category_id =
                res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id)
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch (error) {
                console.log(error)
            }
        }
        if (categoryId) {
            getCategoryDetails();
        }

    }, [categoryId]);

    return (
        <div className=''>
            <div className='box-content bg-richblack-800 px-4'>
                <div className='mx-auto flex min-h-[260px] flex-col justify-center gap-4 max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                    {/* Path of page */}
                    <p className='text-sm text-richblack-300'>
                        {`Home / Catalog / `}
                        <span className='text-yellow-25'>
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    {/* Name of the page */}
                    <p className='text-3xl text-richblack-5'>
                        {catalogPageData?.data?.selectedCategory?.name}
                    </p>
                    {/* Description of the page */}
                    <p className='max-w-[870px] text-richblack-200'>
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* Course to be bought */}

            {/* Section 1 */}
            <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                <div className='text-richblack-5 text-3xl font-semibold'>
                    Course to get you started
                </div>
                {/* Heading / text */}
                <div className='my-4 flex border-b border-b-richblack-600 text-sm gap-x-6'>
                    <p className={`px-4 py-2 ${active === 1
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                        } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >Most Populer</p>

                    <p
                        className={`px-4 py-2 ${active === 2
                            ? "border-b border-b-yellow-25 text-yellow-25"
                            : "text-richblack-50"
                            } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >New</p>
                </div>

                <div>
                    <CourseSlider
                        Courses={catalogPageData?.data?.selectedCategory?.courses}
                    />
                </div>
            </div>

            {/* Section 2 */}
            <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                <div className='text-richblack-5 text-3xl font-semibold'>
                    Top Courses in {catalogPageData?.data?.selectedCategory?.name}
                </div>

                <div className='py-8' >
                    <CourseSlider
                        Courses={catalogPageData?.data?.selectedCategory?.courses}
                    />
                </div>
            </div>

            {/* Section 3 */}
            <div className='mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
                {/* Headings */}
                <div className='text-richblack-5 text-3xl font-semibold'>
                    Frequently Bought
                </div>

                {/* Course display */}
                <div className='block py-8 '>
                    <div className='md:grid grid-cols-1 gap-6 lg:grid-cols-2  '>
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0, 4)
                                .map((course, index) => (
                                    <CourseTemp course={course} key={index} Height={"h-[350px]"} />
                                ))
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Catalog