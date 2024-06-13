import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import { getDoctorById } from "../../../services/doctors.service";
import DoctorProfile from "./DoctorProfile";
import HomeFooter from "../HomeFooter";
import HomeHeader from "../HomeHeader";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

const DetailDoctor = () => {
    const [doctor, setDoctor] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchDoctor = async () => {
            const res = await getDoctorById(id);

            setDoctor(res.data);
        }

        fetchDoctor();
    }, []);

    return (
        <div className=" bg-sky-50">
            <HomeHeader isShowBanner={false} />
            <div className="detail-doctor m-0 lg:m-20 bg-white rounded-lg">
                <div className=" flex p-0 md:p-4">
                    <div className=" w-full  md:w-6/12">
                        {doctor && !_.isEmpty(doctor) &&
                            <>
                                <div>
                                    <DoctorProfile
                                        doctor={doctor}
                                        name="detail-doctor"
                                        time=""
                                    />
                                </div>
                                <hr class="border-t border-gray-300 mb-2 mt-2 block md:hidden" />
                                <div className="block w-full md:hidden lg:hidden">
                                    {doctor && !_.isEmpty(doctor) &&
                                        <DoctorExtraInfo
                                            doctor={doctor}
                                        />
                                    }
                                </div>
                                <hr class="border-t border-gray-300 mb-2 mt-2" />
                                <div className=" ml-2">
                                    <DoctorSchedule
                                        name="detail-doctor"
                                        doctor={doctor}
                                    />
                                </div>
                                <hr class="border-t border-gray-300 mb-2 mt-2 block md:hidden" />
                            </>
                        }
                    </div>
                    <div className=" hidden md:block md:w-6/12">
                        {doctor && !_.isEmpty(doctor) &&
                            <DoctorExtraInfo
                                doctor={doctor}
                            />
                        }
                    </div>
                </div>
                <div className=" p-5">
                    {doctor && doctor.contentHTML ?
                        <div dangerouslySetInnerHTML={{ __html: doctor.contentHTML }}>
                        </div>
                        : `Hiện tại chưa có phần giới thiệu cho bác sĩ này`
                    }
                </div>
            </div>
            <HomeFooter />
        </div >
    );
}

export default DetailDoctor;
