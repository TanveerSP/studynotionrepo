import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/common/Loader';
import { useLocation } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);

    const { password, confirmPassword } = formData;

    const handlOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
    }

    const handlOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }

    return (
        <div className='w-[80%] sm:w-[50%] md:w-[38%] lg:w-[28%] flex flex-col mx-auto my-auto text-white font-inter gap-5 '>
            {
                loading ? (
                    <div>Loading.... <Loader /></div>
                ) : (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className='text-3xl font-semibold text-richblack-5 mb-2'>
                            Chose new Password
                        </h1>
                        <p className='my-4 text-richblack-200 font-semibold'>
                            Almost done. Enter your new password and youre all set
                        </p>
                        <form onSubmit={handlOnSubmit}>

                            <label className='relative'>
                                <p className='mb-2 text-white'>
                                    New Password
                                    <sup className='text-pink-200'>*</sup>
                                </p>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    required
                                    value={password}
                                    onChange={handlOnChange}
                                    placeholder='Password'
                                    className='w-full bg-richblack-700 h-[3rem] rounded-lg px-3 mb-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 '
                                />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className='absolute right-3 top-[45px] z-10 cursor-pointer '
                                >
                                    {
                                        showPassword ?
                                            <AiFillEyeInvisible fontSize={24} />
                                            : <AiFillEye fontSize={24} />
                                    }
                                </span>
                            </label>

                            <label className='relative'>
                                <p className='mb-2 text-white'>
                                    Confirm New Password
                                    <sup className='text-pink-200'>*</sup>
                                </p>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    required
                                    value={confirmPassword}
                                    onChange={handlOnChange}
                                    placeholder='Confirm Password'
                                    className='w-full bg-richblack-700 h-[3rem] rounded-lg px-3 mb-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700 '
                                />
                                <span
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className=' absolute right-3 mt-3 z-10 cursor-pointer'
                                >
                                    {
                                        showConfirmPassword ?
                                            <AiFillEyeInvisible fontSize={24} />
                                            : <AiFillEye fontSize={24} />
                                    }
                                </span>
                            </label>

                            <button type='Submit'
                                className=' w-full bg-yellow-50 text-richblack-900 py-2 mt-2 mb-2 rounded-md'
                            >
                                Reset Password
                            </button>

                        </form>

                        <Link to='/login'>
                            <div className='flex flex-row items-center gap-2 hover:text-yellow-50'>
                                <FaArrowLeftLong />
                                <p>Back To Login</p>
                            </div>
                        </Link>


                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword