import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/common/Loader"
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const [emailSend, setEmailSend] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.auth);

    const handleOnSumit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSend))
    }


    return loading ? (

        < Loader />
    ) : (
        <div className='w-[80%] sm:w-[50%] md:w-[38%] lg:w-[28%] flex flex-col mx-auto my-auto text-white font-inter gap-5 '>
            <h1 className='text-3xl font-bold'>
                {!emailSend ? "Reset you password" : "Check your email"}
            </h1>

            <p className='text-richblack-200 font-semibold'>
                {
                    !emailSend ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                        : `We have sent the reset email to ${email}`
                }
            </p>

            <form onSubmit={handleOnSumit}
                className=' flex flex-col gap-4'
            >
                {
                    !emailSend && (
                        <label htmlFor='email' className='text-richblack-25'>
                            <p className='mb-2 text-white'>Email Address <span className='text-red-200'>*</span> </p>
                            <input
                                required
                                type='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your Email Address'
                                className='w-full bg-richblack-700 h-[3rem] rounded-lg px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 '
                            />
                        </label>
                    )
                }
                <button
                    type='submit'
                    className='bg-yellow-50 text-richblack-900 py-2 rounded-md'
                >
                    {
                        !emailSend ? "Reset Password" : "Resent Email"
                    }
                </button>
            </form>

            <Link to='/login'>
                <div className='flex flex-row items-center gap-2 hover:text-yellow-50'>
                    <FaArrowLeftLong />
                    <p>Back To Login</p>
                </div>
            </Link>

        </div>
    );
};

export default ForgotPassword