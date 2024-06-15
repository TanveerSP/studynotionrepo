import { useSelector } from "react-redux"
import RenderTotalAmount from "./RenderTotalAmount"
import RenderCartCourses from "./RenderCartCourses"

export default function Cart() {

    const { total, totalItems } = useSelector((state) => state.cart)

    return (
        <div className="text-white mt-14 ">
            <h1 className=" mb-14 font-medium text-3xl text-richblack-50">Your Cart</h1>

            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
                {totalItems} Course in Cart
            </p>

            {
                total > 0
                    ? (<div
                        className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row"
                    >
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>)
                    : (<p className="mt-4 text-center text-3xl text-richblack-100">
                        Your cart is Empty
                    </p>)
            }
        </div>
    )
}