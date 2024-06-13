import { Image } from "antd";
import _ from "lodash";
import { Link, withRouter } from 'react-router-dom';

const DoctorProfile = ({ doctor, name, time }) => {

    console.log({ doctor, name, time })

    return (
        <>
            <div className="">
                <div className="flex">
                    <div
                        className=" bg-cover bg-no-repeat bg-center w-[120px]"
                    >
                        <Image
                            src={doctor.image}
                            preview={false}
                            // width={120}
                            className=" rounded-xl"
                        />
                    </div>
                    <div className="w-4/5 flex flex-col pl-2">
                        <div className=" text-xl font-semibold">
                            <span>
                                {doctor?.position?.name}, {doctor?.name}
                            </span>
                        </div>
                        <div className="pt-2">
                            {time && !_.isEmpty(time) ?
                                <div className="capitalize">
                                    <span>Booking time: {time?.date}, {time?.time?.name}</span>
                                </div>
                                :
                                <>
                                    <span>
                                        {doctor.introduction ? doctor.introduction : "Hiện tại chưa có thông tin!"}
                                    </span>
                                </>
                            }
                        </div>
                        <div className="price">
                            <span>
                                {name === "doctor_schedule" ?
                                    (doctor?.price?.name ?
                                        (<>
                                            Price: {doctor.price.name}

                                        </>)
                                        : ("Hiện tại chưa có giá khám bệnh"))

                                    : name === "detail-specialty" || name === "detail-clinic" &&
                                    (<>
                                        <div className="view-detail-doctor">
                                            <Link to={`/doctors/${doctor.id}`}>
                                                <span className="cursor-pointer text-blue-300">More info</span>
                                            </Link>
                                        </div>
                                    </>)
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default DoctorProfile;