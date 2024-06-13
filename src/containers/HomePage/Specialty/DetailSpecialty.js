import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { getSpecialtyById } from '../../../services/specialties.service';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import DoctorProfile from '../Doctor/DoctorProfile';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Image } from 'antd';

const DetailSpecialty = () => {
    const { id } = useParams();
    const [specialty, setSpecialty] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            const res = await getSpecialtyById(id);

            console.log(res.data);

            setSpecialty(res.data);
        }

        fetchDoctor();
    }, []);

    return (
        <div className=' bg-sky-50'>
            <HomeHeader isShowBanner={false} />
            <div className="detail-specialty-body m-0 lg:m-20 ">
                <div className="specialty-description bg-white rounded-lg mb-10 p-2 lg:p-4">
                    <div className="clinic-name mb-3 flex justify-center">
                        <div>
                            <Image src={specialty?.image} preview={false} />
                        </div>
                        <span className=' text-4xl font-bold flex justify-center lg:justify-normal items-center ml-3'>
                            {specialty?.name}
                        </span>
                    </div>
                    {specialty && !_.isEmpty(specialty) ?
                        <div dangerouslySetInnerHTML={{ __html: specialty?.contentHTML }}>
                        </div>
                        : "Hiện tại chưa có phần giới thiệu cho chuyên khoa này!"
                    }
                </div>
                {specialty?.doctors?.length > 0 ? specialty?.doctors?.map((item, index) => {
                    return (
                        <div className="doctor-schedule flex mb-10 bg-white p-1 lg:p-3 rounded-lg" key={index}>
                            <div className=" w-full md:w-7/12">
                                {item && !_.isEmpty(item) ?
                                    <DoctorProfile
                                        doctor={item}
                                        name="detail-specialty"
                                        time=""
                                    /> : <>{`hien tai chua co thong tin`}</>
                                }
                                <hr class="border-t border-gray-300 mb-3 mt-3" />
                                {item && !_.isEmpty(item) ?
                                    <div className="w-full block md:hidden lg:hidden">
                                        <DoctorExtraInfo
                                            doctor={item}
                                        />
                                    </div>
                                    : <></>
                                }
                                {item && !_.isEmpty(item) ?
                                    <DoctorSchedule
                                        name="detail-specialty"
                                        doctor={item}
                                    />
                                    : <></>
                                }
                            </div>
                            {item && !_.isEmpty(item) ?
                                <div className="hidden md:block md:w-5/12">
                                    <DoctorExtraInfo
                                        doctor={item}
                                    />
                                </div>
                                : <></>
                            }
                        </div>
                    )
                }) :
                    <div>
                        <ExclamationCircleOutlined />
                        <span>There are no doctors in this specialty yet.</span>
                    </div>
                }
            </div>
            <HomeFooter />

        </div>
    );
};

export default DetailSpecialty;