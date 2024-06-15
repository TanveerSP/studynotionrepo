import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { RiEditBoxLine } from 'react-icons/ri';
import { formattedDate } from '../../../utils/dateFormatter'

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div>
            <h1 className='mb-14 text-richblack-5 font-medium text-3xl'>
                My Profile
            </h1>

            {/* Section 1 */}
            <div className="flex items-center flex-col md:flex-row justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-10 gap-y-4 ">
                {/* Left Part */}
                <div className='flex items-center gap-x-4 flex-col sm:flex-row'>

                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className='aspect-square rounded-full object-cover w-[78px]'
                    />
                    <div className='text-sm xs:text-lg text-center sm:text-left font-semibold text-richblack-5'>
                        <p className='text-xl font-bold'>
                            {user?.firstName + ' ' + user?.lastName}
                        </p>
                        <p className='text-sm xs:text-lg font-semibold text-richblack-5 text-center sm:text-left'>
                            {user?.email}
                        </p>
                    </div>
                </div>

                {/* Button */}
                <IconBtn
                    text='Edit'
                    onclick={() => {
                        navigate('/dashboard/settings');
                    }}
                >
                    <RiEditBoxLine />
                </IconBtn>
            </div>

            {/* Section 2 */}
            <div className='mt-10 py-8 px-10 bg-richblack-800 border-[1px] border-richblack-700 rounded-lg'>
                <div className='flex flex-col md:flex-row justify-between gap-y-4 '>
                    <p className='font-semibold text-richblack-25 gap-3'>About</p>

                    <div>
                        <IconBtn
                            text='Edit'
                            onclick={() => {
                                navigate('/dashboard/settings');
                            }}
                        >
                            <RiEditBoxLine size={18} />
                        </IconBtn>
                    </div>
                </div>
                <p className='text-richblack-100 font-inter mt-2 text-sm'>
                    {user?.additionalDetails?.about ?? 'Write Something about yourself'}
                </p>
                <p className='text-lg text-richblack-5 mt-3'>
                    Account Type:{' '}
                    <span className='text-richblack-100 font-medium'>{user?.accountType}</span>
                </p>
            </div>

            {/* Section 3 */}
            <div className='mt-10 py-8 px-10 bg-richblack-800 border-[1px] border-richblack-700 rounded-lg'>
                <div className='flex flex-col md:flex-row justify-between gap-y-4'>
                    <p className='font-semibold text-richblack-25'>Personal Details</p>

                    <div>
                        <IconBtn
                            text='Edit'
                            onclick={() => {
                                navigate('/dashboard/settings');
                            }}
                        >
                            <RiEditBoxLine />
                        </IconBtn>
                    </div>
                </div>

                <div className='mt-5 w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div>
                        <p className='mb-2 text-sm text-richblack-400'>First Name</p>
                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-richblack-25">
                            {user?.firstName}</p>
                    </div>

                    <div>
                        <p className='mb-2 text-sm text-richblack-400'>Last Name</p>
                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-richblack-25">
                            {user?.lastName}</p>
                    </div>

                    <div>
                        <p className='mb-2 text-sm text-richblack-400'>Email</p>
                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-richblack-25">
                            {user?.email}
                        </p>
                    </div>

                    <div>
                        <p className='mb-2 text-sm text-richblack-400'>Gender</p>
                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-richblack-25">
                            {user?.additionalDetails?.gender ?? "Add gender"}
                        </p>
                    </div>

                    <div>
                        <p className='mb-2 text-sm text-richblack-400'>Phone Number</p>
                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-richblack-25">
                            {user?.additionalDetails?.contactNumber ?? 'Add Contact Number'}</p>
                    </div>

                    <div>
                        <p className='mb-2 text-sm text-richblack-400'>Date of Birth</p>
                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-richblack-25">
                            {formattedDate(user?.additionalDetails?.dateOfBirth) ?? 'Add Date of Birth'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
