import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactForm = () => {
    return (
        <div className='mx-auto flex flex-col items-center'>
            <h1 className=' font-semibold text-[2.25rem] text-richblack-5 py-3'>
                Get in Touch
            </h1>
            <p className='text-[16px] text-richblack-300 mb-10'>
                We'd love to here for you, Please fill out this form.
            </p>
            <div>
                <ContactUsForm />
            </div>
        </div>
    )
}

export default ContactForm