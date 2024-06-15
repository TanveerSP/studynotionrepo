import React from 'react'
import InfoSection from '../components/ContactPage/InfoSection'
import Footer from '../components/common/Footer'
import ContactSection from '../components/ContactPage/ContactSection'
import ReviewSlider from '../components/common/ReviewSlider'

const Contact = () => {
    return (

        <div className='mt-14'>

            <div className='mx-auto flex w-11/12 max-w-maxContent mb-10 mt-8 flex-col justify-between gap-10 text-white lg:flex-row '>
                <InfoSection />
                <ContactSection/>
            </div>


            {/* heding*/}
            <section className=' py-20 mx-auto w-11/12 ' >
                <h1 className='text-center text-4xl font-semibold mt-8 text-richblack-5'>
                    Review from other learners
                </h1>
                <ReviewSlider />
            </section>

            {/* Footer */}
            <section>
                <Footer />
            </section>

        </div>

    )
}

export default Contact