import React from "react";

const PersonalDetails = ({ title, name }) => {
    return (
        <div>
            <div className="text-richblack-500 ">{title}</div>
            <div className="text-richblack-5 text-sm font-medium">{name}</div>
        </div>
    );
};

export default PersonalDetails;
