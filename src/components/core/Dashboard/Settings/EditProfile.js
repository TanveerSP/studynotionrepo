import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/SettingsAPI'
import { Link } from 'react-router-dom'
import Loader from '../../../common/Loader'
import IconBtn from '../../../common/IconBtn'

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
const EditProfile = () => {

    const { token } = useSelector((state) => state.auth)
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitProfileFrom = async (data) => {
        // console.log("Show Form data -", data);
        try {
            dispatch(updateProfile(token, data));
        } catch (error) {
            console.log("Error Message -", error.message)
        }
    }

    return profileLoading ? (
        <Loader />
    ) : (
        <>
            <form onSubmit={handleSubmit(submitProfileFrom)}
                className='text-richblack-5 mt-8'
            >
                {/* Profile Information */}
                <div className="flex flex-col gap-8 bg-richblack-800 p-2  sm:p-10 rounded-md shadow-sm shadow-richblack-500">
                    <h2 className='text-lg font-semibold text-richblack-5'>
                        Profile Information
                    </h2>
                    <div className='flex flex-col gap-5 lg:flex-row'>
                        {/* First Name */}
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor="firstName" className='lable-style'>
                                First Name<span className="text-red-200"> *</span>
                            </label>
                            <input
                                type="text"
                                name='firsName'
                                id='firstName'
                                placeholder='Enter first name'
                                className=" w-full bg-richblack-700 h-[2rem] md:h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />
                            {errors.firstName && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    Please enter your first name.
                                </span>
                            )}
                        </div>
                        {/* Last Name */}
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor="lastName" className='lable-style'>
                                Last Name <span className="text-red-200"> *</span>
                            </label>
                            <input type="text"
                                name='lastName'
                                id='lastName'
                                placeholder='Enter first name'
                                className=" w-full bg-richblack-700 h-[2rem] md:h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName} />
                            {errors.lastName && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>
                                    Please enter your last name.
                                </span>
                            )}
                        </div>
                    </div>

                    <div className='flex flex-col gap-5 lg:flex-row'>
                        {/* Date of Birth */}
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor="dateBirth" className='lable-style'>
                                Date of Birth <span className="text-red-200"> *</span>
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className=" w-full bg-richblack-700 h-[2rem] md:h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                                {...register("dateOfBirth", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Date of Birth.",
                                    },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    },
                                })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                            />
                            {errors.dateOfBirth && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </div>

                        {/* Gender */}
                        <div className='flex flex-col gap-2 lg:w-[48%]'>
                            <label htmlFor="gender" className='lable-style'>
                                Gender <span className="text-red-200"> *</span>
                            </label>
                            <select
                                name="gender"
                                id="gender"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                                className=" w-full bg-richblack-700 h-[2rem] md:h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                            >
                                {genders.map((ele, i) => {
                                    return (
                                        <option key={i} value={ele}>
                                            {ele}
                                        </option>
                                    )
                                })}
                            </select>
                            {errors.gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Date of Birth.
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* Contact Number */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNumber" className="lable-style">
                                Contact Number <span className="text-red-200"> *</span>
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                id="contactNumber"
                                placeholder="Enter Contact Number"
                                className="w-full  bg-richblack-700 h-[2rem] md:h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                                {...register("contactNumber", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Contact Number.",
                                    },
                                    maxLength: { value: 12, message: "Invalid Contact Number" },
                                    minLength: { value: 10, message: "Invalid Contact Number" },
                                })}
                                defaultValue={user?.additionalDetails?.contactNumber}
                            />
                            {errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.contactNumber.message}
                                </span>
                            )}
                        </div>

                        {/* About */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="about" className="lable-style">
                                About <span className="text-red-200"> *</span>
                            </label>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder="Enter Bio Details"
                                className="w-full  bg-richblack-700 h-[2rem] md:h-[3rem] rounded-md px-3 shadow-sm shadow-richblack-200 focus:outline-none focus:bg-richblack-700"
                                {...register("about", { required: true })}
                                defaultValue={user?.additionalDetails?.about}
                            />
                            {errors.about && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your About.
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* save and cancel button */}
                {/* <div className="flex justify-end gap-3">
                    <Link to={"/dashboard/my-profile"}>
                        <CTAButton text={"Cancel"} > Cancel </CTAButton>
                    </Link>
                    <CTAButton type="submit" text={"Update"} active={true} > Update </CTAButton>
                </div> */}

                <div className=" mt-8 flex justify-end gap-2">
                    <button
                        onClick={() => {
                            navigate("/dashboard/my-profile")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Save" />
                </div>
            </form>
        </>
    )
}

export default EditProfile