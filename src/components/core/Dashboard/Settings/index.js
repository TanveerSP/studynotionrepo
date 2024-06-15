import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'
import ChangePassword from './ChangePassword'
import { useSelector } from 'react-redux'

export default function Settings() {
    const { user } = useSelector((state) => state.profile);
    return (
        <>

            <h1 className='mb-1 text-3xl font-medium text-richblack-5'>
                Edit Profile
            </h1>
            {/* Change Profile Picture */}
            <ChangeProfilePicture />
            {/* Profile */}
            <EditProfile />
            {/* Password */}
            <ChangePassword />
            {/* Delete Acouunt */}
            <DeleteAccount />

        </>
    )
}
