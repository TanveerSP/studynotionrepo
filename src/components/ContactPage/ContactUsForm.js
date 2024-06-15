import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Loader from '../common/Loader'
// import {apiConnector} from '../../services/apiconnector';
// import {contactusEndpoint} from '../../services/apis';
import ContryCode from '../../data/countrycode.json'
import { elements } from 'chart.js';

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging Data", data)
        try {
            setLoading(true);
            // const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data)
            const response = { status: "OK" }
            console.log("Logging response", response);
        } catch (error) {
            console.log("Error:", error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful]);



    return loading ?
        (
            <Loader />
        )
        : (
            <form onSubmit={handleSubmit(submitContactForm)}
                className='w-full max-w-maxContent flex flex-col gap-5'
            >
                <div className='flex w-full flex-row gap-7'>
                    {/* first name */}
                    <div className='flex flex-col w-full'>
                        <label htmlFor="firstName" className='mb-1 text-richblack-5'>
                            First Name
                            <sup className='text-pink-200'>*</sup>
                        </label>
                        <input type="text"
                            name='firstName'
                            id='firstName'
                            placeholder='Enter First Name'
                            {...register("firstName", { required: true })}
                            className='w-full bg-richblack-700 h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-yellow-50 focus:bg-richblack-700'
                        />
                        {errors.firstName && (
                            <span>
                                Please enter your First Name
                            </span>
                        )}
                    </div>

                    {/* last name  */}
                    <div className='flex flex-col w-full'>
                        <label htmlFor="laseName" className='mb-1  text-richblack-5'>
                            Last Name
                            <sup className='text-pink-200'>*</sup>
                        </label>
                        <input type="text"
                            name='laseName'
                            id='laseName'
                            placeholder='Enter Last Name'
                            {...register("laseName", { required: true })}
                            className='w-full bg-richblack-700 h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-yellow-50 focus:bg-richblack-700'
                        />
                        {errors.laseName && (
                            <span>
                                Please enter your Last Name
                            </span>
                        )}
                    </div>
                </div>

                <div className='flex w-full flex-col gap-7'>
                    {/* email */}
                    <div className='flex flex-col w-full'>
                        <label htmlFor="email" className='mb-1  text-richblack-5'>
                            Email Address
                            <sup className='text-pink-200'>*</sup>
                        </label>
                        <input type="email"
                            name='email'
                            id='email'
                            placeholder='email'
                            {...register("email", { required: true })}
                            className='w-full bg-richblack-700 h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-yellow-50 focus:bg-richblack-700'
                        />
                        {errors.email && (
                            <span>
                                Please enter your email
                            </span>
                        )}
                    </div>
                    {/* Phone Number*/}
                    <div className='flex flex-col'>

                        <label htmlFor="phonenumber" className='mb-1  text-richblack-5'>
                            Phone Number <sup className='text-pink-200'>*</sup>
                        </label>

                        <div className='flex flex-row gap-6 '>
                            {/* dropdown */}
                            <div className='flex w-[15%] gap-5'>
                                <select
                                    name="dropdown"
                                    id="dropdown"
                                    {...register("countrycode", { required: true })}
                                    className='w-[4.9rem] rounded-md text-richblack-5 bg-richblack-700 py-3 px-1 shadow-sm shadow-richblack-200 focus:outline-yellow-50 focus:bg-richblack-700'
                                >
                                    {
                                        ContryCode.map((element, index) => {
                                            return (
                                                <option
                                                    value={element}
                                                    key={index}
                                                >
                                                    {element.code} -{element.country}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {/* phone number fild */}
                            <div className='w-[80%]'>
                                <input
                                    type="number"
                                    name='phonenumber'
                                    id='phonenumber'
                                    placeholder='12345 67891'
                                    className='w-full rounded-md py-3 px-4 bg-richblack-700 text-richblack-5 shadow-sm shadow-richblack-200 focus:outline-yellow-50 focus:bg-richblack-700'
                                    {...register("phoneNo",
                                        {
                                            required: { value: true, message: "Plesse enter Phone Number" },
                                            maxLength: { value: 10, message: "Invalid Phone Number" },
                                            minLength: { value: 8, message: "Invalid Phone Number" }
                                        })}
                                />
                            </div>
                        </div>
                        {
                            errors.phoneNo && (
                                <span>
                                    {errors.phoneNo.message}
                                </span>
                            )
                        }
                    </div>

                    {/* message  */}
                    <div className='flex flex-col w-full'>
                        <label htmlFor="message" className='mb-1  text-richblack-5'>
                            Message
                            <sup className='text-pink-200'>*</sup>
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            cols='30'
                            rows="7"
                            placeholder='Enter your message'
                            {...register("message", { require: true })}
                            className='w-full bg-richblack-700 rounded-md py-3 px-3 shadow-sm shadow-richblack-200 focus:outline-yellow-50 focus:bg-richblack-700'
                        >
                        </textarea>
                        {
                            errors.message && (
                                <span>
                                    Please enter your message
                                </span>
                            )
                        }
                    </div>
                    <button
                        type='submit'
                        className={`rounded-md bg-yellow-50 text-black py-3 px-6 text-[16px]
                        font-bold`}
                    >
                        Send Message
                    </button>
                </div>

            </form>
        )
}

export default ContactUsForm