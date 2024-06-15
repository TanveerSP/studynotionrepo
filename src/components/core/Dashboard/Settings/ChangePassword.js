import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../../services/operations/SettingsAPI';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import CTAButton from '../../../core/home/Button';
import IconBtn from '../../../common/IconBtn';
import Loader from '../../../common/Loader';

const ChangePassword = () => {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const { loading: profileLoading } = useSelector((state) => state.profile)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitPasswordForm = async (data) => {
        try {
            // console.log("passowrd data -", data)
            await changePassword(token, data);
        } catch (error) {
            console.log("Error Message - ", error.message);
        }
    };

    return profileLoading ? (
        <Loader />
    ) : (
        <>
            <form onSubmit={handleSubmit(submitPasswordForm)}
                className='text-richblack-5 mt-8'>
                <div className=" mt-8 flex flex-col gap-8 bg-richblack-800 p-2  sm:p-10 rounded-md shadow-sm shadow-richblack-500">
                    {/* Heading  */}
                    <h2 className='text-lg fount-semibold text-richblack-5'>Password</h2>

                    <div className='flex flex-col gap-5 lg:flex-row'>
                        {/* Old Password */}
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="oldPassword" className="lable-style">
                                Current Password <span className="text-red-200"> *</span>
                            </label>
                            <input
                                type={showOldPassword ? "text" : "password"}
                                name="oldPassword"
                                id="oldPassword"
                                placeholder="Enter Current Password"
                                className=" w-full bg-richblack-700 h-[2rem] md:h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                                {...register("oldPassword", {
                                    required: true
                                })}
                            />
                            <span
                                onClick={() => setShowOldPassword((prev) => !prev)}
                                className="absolute right-3 top-[42px] z-[10] cursor-pointer"
                            >
                                {showOldPassword ? (
                                    <IoMdEyeOff fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <IoMdEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                            {errors.oldPassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Current Password.
                                </span>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="newPassowrd" className="lable-style">
                                New Password <span className="text-red-200"> *</span>
                            </label>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassowrd"
                                id="newPassowrd"
                                placeholder="Enter New Password"
                                className=" w-full bg-richblack-700 h-[2rem] md:h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                                {...register("newPassowrd", {
                                    required: true,
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$ /,
                                })}
                            />
                            <span
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute right-3 top-[42px] z-[10] cursor-pointer"
                            >
                                {showNewPassword ? (
                                    <IoMdEyeOff fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <IoMdEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                            {errors.newpassword && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.newPassword.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {/* save and cancel button */}
                {/* <div className="flex justify-end gap-2">
                <CTAButton
                    onClick={() => {
                        navigate("/dashboard/my-profile");
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </CTAButton>
                <CTAButton type="submit" text="Update" active={1} > Update </CTAButton>
            </div> */}

                <div className=" mt-8 flex justify-end gap-2">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile");
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Update" />
                </div>

            </form>
        </>
    )
}

export default ChangePassword