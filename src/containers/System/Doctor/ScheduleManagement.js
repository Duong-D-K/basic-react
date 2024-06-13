import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Select, Col } from 'antd';
import { toast } from "react-toastify";
import dayjs from 'dayjs';

import { createSchedule, getAllDoctors, getAllSchedulesByDateAndDoctorIdService } from '../../../services/doctors.service';
import { getAllTimes } from '../../../services/allcodes.service';
import useAuthStore from '../../../store/useAuthStore';

const ScheduleManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [times, setTimes] = useState([]);
    const [minDate, setMinDate] = useState(null);

    const { user } = useAuthStore();


    useEffect(() => {
        getAllDoctors()
            .then(response => {
                setDoctors(response.data.map(item => ({
                    label: item.name,
                    value: item.id,
                })));
            })
            .catch(error => console.error('Error:', error));

        // getAllSchedules()
        //     .then(response => {
        //         setSchedules(response.data.map(item => ({
        //             label: item.name,
        //             value: item.id,
        //         })));
        //     })
        //     .catch(error => console.error('Error:', error));

        getAllTimes()
            .then(response => {
                const sortedTimes = response.data.map(item => ({
                    label: item.name,
                    value: item.id,
                    isSelected: false,
                    ordinal: item.ordinal
                })).sort((a, b) => a.ordinal - b.ordinal);

                setTimes(sortedTimes);
            })
            .catch(error => console.error('Error:', error));

        const today = dayjs();
        setMinDate(today);

        if (user?.role?.name === "Doctor") {
            setSelectedDoctor(user.id);
        }

    }, [user]);

    const handleChangeTime = item => {
        const updatedTimes = times.map(time => {
            if (time.value === item.value) {
                return { ...item, isSelected: !item.isSelected };
            }

            return time;
        })

        setTimes(updatedTimes);
    }

    const handleOnChangeDate = async (date, dateString) => {
        setSelectedDate(dateString);

        // console.log({ selectedDoctor, dateString });

        if (selectedDoctor && dateString) {
            const response = await getAllSchedulesByDateAndDoctorIdService(selectedDoctor, dateString);

            // console.log(response.data);
            // console.log(times)

            const updatedTimes = times.map(time => {
                const matchingData = response.data.find(data => data.time.id === time.value);

                const isBooked = matchingData ? matchingData.isBooked : false;

                return {
                    ...time,
                    isSelected: matchingData !== undefined,
                    isBooked: isBooked
                };
            });

            // console.log(updatedTimes);

            setTimes(updatedTimes);
        }
    };


    const handleOnChangeDoctor = async (data) => {
        setSelectedDoctor(data);

        if (data && selectedDate) {
            const response = await getAllSchedulesByDateAndDoctorIdService(data, selectedDate);

            const updatedTimes = times.map(time => {
                const matchingData = response.data.find(data => data.time.id === time.value);

                return {
                    ...time,
                    isSelected: matchingData !== undefined
                };
            });

            setTimes(updatedTimes);
        }
    }

    const onFinish = async (values) => {

        values.date = dayjs(values.date).format('YYYY-MM-DD');

        values.times = times;

        if (user?.role?.name === "Doctor") {
            values.doctorId = user?.id;
        }

        // console.log(values);

        const res = await createSchedule(values);

        toast.success(res.data);
    };

    return (
        <div className="text-center">
            <div className="title">
                <p className='font-bold text-3xl'>Doctors Schedule Management</p>
            </div>
            <div>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    className=' mt-10 flex justify-center flex-col items-center'
                >
                    <div className='flex mb-4'>
                        <Form.Item
                            label="Doctor name"
                            name="doctorId"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please select doctor!',
                            //         // Thêm điều kiện kiểm tra không disable mới áp dụng quy tắc
                            //         validator: (_, value) => !user?.role?.name === "Doctor" || !!value
                            //     }
                            // ]}
                            className='w-[500px] mr-4'
                        >
                            <Select
                                showSearch
                                placeholder="Search doctor"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={doctors}
                                size='large'
                                onChange={handleOnChangeDoctor}
                                // defaultValue={user?.role?.name === "Doctor" ? user?.id : null}
                                disabled={user?.role?.name === "Doctor"}
                            >
                                {/* {user?.role?.name === "Doctor" ? (
                                    <Select.Option key={user.id} value={user.id} label={user.name}>
                                        {user.name}
                                    </Select.Option>
                                ) : null} */}
                            </Select>
                        </Form.Item>


                        <Form.Item
                            label="Select Date"
                            name="date"
                            rules={[{ required: true, message: 'Please select a date!' }]}
                        >
                            <DatePicker
                                size='large'
                                minDate={minDate}
                                onChange={handleOnChangeDate}
                            />
                        </Form.Item>
                    </div>

                    <div className='flex flex-wrap justify-center max-w-[900px]'>
                        {times.map((time) => (
                            <Col key={time.value} flex="auto" className='m-2'>
                                <Button
                                    size='large'
                                    disabled={time.isBooked === true}
                                    onClick={() => handleChangeTime(time)}
                                    className={time.isSelected === true ? " bg-yellow-200 w-[200px]" : "w-[200px]"}
                                >
                                    {time.label}
                                </Button>
                            </Col>
                        ))}
                    </div>

                    <div className='mt-4'>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size='large'>
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ScheduleManagement;
