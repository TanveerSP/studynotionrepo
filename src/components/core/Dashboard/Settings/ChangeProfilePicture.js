import React, { useRef, useState, useEffect } from 'react'
import IconBtn from '../../../common/IconBtn'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI'
import { AiOutlineUpload } from "react-icons/ai";


export default function ChangeProfilePicture() {

    const { token } = useSelector((state) => state.auth)
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    const fileInputRef = useRef(null)



    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            setImageFile(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = () => {
        try {
            // console.log("uploading...")
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture", imageFile)
            // console.log("formdata", formData)
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false)
            })
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])

    return (
        <>
            <div className="text-white bg-richblack-800 p-2 sm:p-10 rounded-md shadow-sm shadow-richblack-500 ">
                <div className="flex flex-row items-end gap-4">
                    <img
                        src={previewSource || user?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover"
                        loading='lazy'
                    />
                    <div className="flex flex-col gap-2">
                        <p className="text-center sm:text-left">Change Profile Picture</p>
                        <div className='flex flex-col sm:flex-row gap-2 w-fit'>
                            <button
                                onClick={handleClick}
                                disabled={loading}
                                className={`flex items-center   gap-3 transition-all duration-150 font-medium py-1 sm:py-2 px-3 sm:px-5 rounded-lg text-lg hover:scale-95 bg-richblack-700 text-richblack-5`}
                            >
                                Select
                            </button>


                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/gif, image/jpeg"
                            />

                            <IconBtn onclick={handleFileUpload} className={`w-fit`}>
                                {profileLoading ? (
                                    "Uploading..."
                                ) : (
                                    <div className=" flex flex-row gap-3 items-center">
                                        {" "}
                                        Upload <AiOutlineUpload />{" "}
                                    </div>
                                )}
                            </IconBtn>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
