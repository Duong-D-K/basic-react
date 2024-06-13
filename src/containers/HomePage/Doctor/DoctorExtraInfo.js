import React, { useState } from 'react';

const DoctorExtraInfo = ({ doctor }) => {
    const [showInfo, setShowInfo] = useState(false);

    const showDoctorInfo = () => {
        setShowInfo(!showInfo);
    }

    return (
        <div className="doctor-extra-info-container pl-4">
            <div className="content-up mb-2">
                <div className="text-address uppercase">
                    <span>Examination address: </span>
                </div>
                <div className="clinic-name font-semibold">
                    {doctor?.clinic?.name}
                </div>
                <div className="detail-address font-semibold">
                    {doctor?.clinic?.address}
                </div>
            </div>
            <div className="content-down">
                {showInfo === false ?
                    <div className="short-info">
                        <span>Examination price: </span>
                        {doctor?.price?.name &&
                            <span>
                                {doctor.price.name}
                            </span>
                        }
                        <span className="detail cursor-pointer text-blue-300" onClick={showDoctorInfo}>
                            {` See details`}
                        </span>
                    </div>
                    :
                    <div className=' bg-gray-100'>
                        <div className="detail-info p-1">
                            <div className="price pb-1">
                                <span className="left">
                                    Price
                                </span>
                                <span className="right float-right">
                                    {doctor?.price?.name}
                                </span>
                            </div>
                            <div className="note">
                                <span>
                                    Note: {doctor?.note}
                                </span>
                            </div>
                        </div>
                        <div className="payment p-1">
                            <span>
                                Payment method: {doctor?.payment?.name}
                            </span>
                        </div>
                        <div className="hide-price mt-2">
                            <span onClick={showDoctorInfo} className='cursor-pointer text-blue-300'>
                                Hide price
                            </span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default DoctorExtraInfo;