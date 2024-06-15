import React from 'react'
// import { RiDeleteBin6Line } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {deleteProfile} from '../../../../services/operations/SettingsAPI'

export default function DeleteAccount() {

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleDeletAccount() {
        try {
            dispatch(deleteProfile(token, navigate));
        } catch (error) {
            console.log("Error Message -", error.message);
        }
    }

    return (
        <div className='my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12'>
            <div className='flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700 cursor-pointer'>
                < FiTrash2 size={25} className='text-richblack-25 '
                    onClick={handleDeletAccount}
                />
            </div>

            <div className='flex flex-col sapce-y-2'>
                <h2 className='text-lg font-semibold text-richblack-5'>
                    Delete Account
                </h2>
                <div className='w-3/5 text-pink-25'>
                    <p>Would you like to delete account?</p>
                    <p>
                        This account may contain paid Courses. Deleting your account is
                        permanent and will remove all the contain associated with it.
                    </p>
                </div>
                <button
                    type='button'
                    className='w-fit cursor-pointer mt-4 italic text-pink-300 border-[1px] border-pink-700 px-2 py-2 rounded-md'
                    onClick={handleDeletAccount}
                >
                    I want to delete my account.
                </button>
            </div>

        </div >
    );
}
