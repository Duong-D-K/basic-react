import { useEffect, useState } from "react";
import { getAllSchedulesByDateAndDoctorIdService } from "../../../services/doctors.service";
import { toast } from "react-toastify";
import { Button } from "antd";

import dayjs from 'dayjs';
import { CalendarOutlined, CheckCircleOutlined } from "@ant-design/icons";
import BookingModal from "./BookingModal";
import { createBooking } from "../../../services/patients.service";

const getArrDays = () => {
    let allDays = [];

    for (let i = 0; i < 7; i++) {
        let object = {};

        if (i === 0) {
            object.label = `Today - ${dayjs().format("MM/DD")}`;
        } else {
            object.label = dayjs().add(i, 'day').locale('en').format('ddd - MM/DD');
        }

        object.value = dayjs().add(i, 'day').format('YYYY-MM-DD');

        allDays.push(object);
    }
    return allDays;
};

const DoctorSchedule = ({ name, doctor }) => {
    const [openModal, setOpenModal] = useState(false);
    const [allDays, setAllDays] = useState(getArrDays());
    const [times, setTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    const fetchSchedule = async (date) => {
        try {
            const res = await getAllSchedulesByDateAndDoctorIdService(doctor.id, date);

            const sortedData = res.data.sort((a, b) => a.time.ordinal - b.time.ordinal);

            setTimes(sortedData);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    }

    useEffect(() => {
        fetchSchedule(allDays[0].value);
    }, []);

    const handleOnChangeSelect = async (event) => {
        let date = event.target.value;

        try {
            fetchSchedule(date);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    }

    const handleViewBooking = (item) => {
        setSelectedTime(item);
        setOpenModal(!openModal);
    }

    const handleOk = async (values) => {
        try {
            values.birthday = dayjs(values?.birthday).format('YYYY-MM-DD');
            values.doctorId = doctor?.id;
            values.timeId = selectedTime?.time?.id;
            values.date = selectedTime?.date;

            const res = await createBooking(values);

            toast.success(res?.data);

            fetchSchedule(allDays[0].value);

            setOpenModal(!openModal);
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error(error.response?.data || 'An error occurred while creating the booking');
        }
    };

    return (
        <div className="mt-4">
            <div>
                <CalendarOutlined />
                <span> Doctor schedule</span>
            </div>
            {openModal &&
                <BookingModal
                    type=''
                    open={openModal}
                    onOk={handleOk}
                    onCancel={() => setOpenModal(!openModal)}
                    doctor={doctor}
                    time={selectedTime}
                />
            }
            <div className="h-full ">
                <div className="acapitalize cursor-pointer text-teal-400 font-semibold h-10 text-base">
                    <select onChange={(event) => handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (
                                <option
                                    value={item.value}
                                    key={index}
                                >
                                    {item.label}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="all-available-time">
                    <div className="time-content">
                        {times && times.length > 0 ?
                            <>
                                <div className="flex flex-wrap">
                                    {
                                        times.map((item) => {
                                            return (
                                                <div key={item.id} className=" mb-2 md:mb-4 flex items-center justify-center">
                                                    <Button
                                                        className="bg-yellow-100 rounded font-semibold ml-2 md:ml-4 border-none w-[150px] lg:w-[200px]"
                                                        onClick={() => handleViewBooking(item)}
                                                        disabled={item.isBooked ? true : false}
                                                    >
                                                        {item.time.name}
                                                    </Button>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                <div className="book-free">
                                    <span><CheckCircleOutlined /> Booking free.</span>
                                </div>
                            </>
                            :
                            <div><span>No schedule now.</span></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorSchedule;
