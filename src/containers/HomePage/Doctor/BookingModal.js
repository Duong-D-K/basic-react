import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import DoctorProfile from './DoctorProfile';
import dayjs from 'dayjs';
import { getAllGenders } from '../../../services/allcodes.service';

const BookingModal = ({ open, type, onOk, onCancel, doctor, time }) => {
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        const fetchGenders = async () => {
            const res = await getAllGenders();

            setGenders(res.data.map(item => ({
                label: item.name,
                value: item.id,
            })))
        }

        fetchGenders();
    }, [])
    const onFinish = (values) => {
        onOk(values);
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Modal
                open={open}
                onCancel={onCancel}
                title={
                    <p className="text-center font-bold text-xl mb-3">Booking examination</p>
                }
                width={900}
                footer={null}
                centered
            >
                <DoctorProfile
                    doctor={doctor}
                    name=""
                    time={time}
                />

                <Form
                    name="basic"
                    style={{ maxWidth: 900 }}
                    initialValues={{ remember: true }}
                    onFinish={(onFinish)}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="flex-initial w-full"
                >
                    <div className="flex flex-wrap">
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                            className="w-full md:w-1/2 px-2"
                            initialValue={""}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone number"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                            className="w-full md:w-1/2 px-2"
                            initialValue={""}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                            className="w-full md:w-1/2 px-2"
                            initialValue={""}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                            className="w-full md:w-1/2 px-2"
                            initialValue={""}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Reason"
                            name="reason"
                            rules={[{ required: true, message: 'Please input your reason!' }]}
                            className="w-full px-2"
                            initialValue={""}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Birthday"
                            name="birthday"
                            rules={[{ required: true, message: 'Please select a birthday!' }]}
                            className="w-full md:w-1/2 px-2"
                        >
                            <DatePicker
                                size='large'
                                maxDate={dayjs()}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Gender"
                            name="gender"
                            rules={[{ required: true, message: 'Please input your gender!' }]}
                            className="w-full md:w-1/2 px-2"
                            initialValue={type === 'edit' ? doctor?.gender?.id : undefined}
                        >
                            <Select
                                showSearch
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={genders}
                            />
                        </Form.Item>
                    </div>
                    <div className="flex items-center mt-2">
                        <Form.Item className="w-full">
                            <Button type="primary" htmlType="submit" className="w-full">
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div >
    );
};

export default BookingModal;