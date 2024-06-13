import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Select, Space, Table } from 'antd';
import { toast } from "react-toastify";

import { getAllDoctors } from '../../../services/doctors.service';
import { getAllPatientsByDateAndDoctorId, sendPrescription } from '../../../services/patients.service';
import PrescriptionModal from './PrescriptionModal';
import dayjs from 'dayjs';
import useAuthStore from '../../../store/useAuthStore';

const PatientManagement = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

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

        if (user?.role?.name === "Doctor") {
            setSelectedDoctor(user?.id);
        }
    }, []);

    const handleOnChangeDate = async (date, dateString) => {
        setSelectedDate(dateString);
        if (selectedDoctor && dateString) {
            const response = await getAllPatientsByDateAndDoctorId(dateString, selectedDoctor);

            const soredData = response.data.sort((a, b) => (a.time.ordinal - b.time.ordinal));

            setPatients(soredData);
        }
    };

    const handleOnChangeDoctor = async (data) => {
        setSelectedDoctor(data);
        if (data && selectedDate) {
            const response = await getAllPatientsByDateAndDoctorId(selectedDate, data);

            const soredData = response.data.sort((a, b) => (a.time.ordinal - b.time.ordinal));

            setPatients(soredData);
        }
    }

    const handleConfirm = (record) => {
        setOpenModal(!openModal);
        setSelectedPatient(record);
    };

    const handleOk = async ({ image }) => {
        try {
            const res = await sendPrescription({
                email: selectedPatient.patient.email,
                doctorId: selectedDoctor,
                image: image,
                patientId: selectedPatient.patient.id,
                time: selectedPatient.time,
                patientName: selectedPatient.patient.name,
            })

            toast(res.data);

            const updatedPatient = await getAllPatientsByDateAndDoctorId(selectedDate, selectedDoctor);

            const soredData = updatedPatient.data.sort((a, b) => (a.time.ordinal - b.time.ordinal));

            setPatients(soredData);

            setOpenModal(!openModal);
        } catch (error) {
            console.error('Error send prescription:', error);
            alert('Error send prescription. Please try again.');
        }
    }

    const handleDelete = async (record) => {
        try {
            // const response = await deleteDoctor(record.id);
            // toast.success(response.data);

            // setDoctors(doctors.filter((doctor) => doctor.id !== record.id));
        } catch (error) {
            console.error('Error deleting doctor:', error);
            alert('Error deleting doctor. Please try again.');
        }
    };

    return (
        <div className="text-center">
            {openModal &&
                <PrescriptionModal
                    open={openModal}
                    onOk={handleOk}
                    onCancel={() => setOpenModal(!openModal)}
                    email={selectedPatient.patient.email}
                />
            }
            <div className="title">
                <p className='font-bold text-3xl'>Patients Schedule Management</p>
            </div>
            <div>
                <div className='flex mb-4 mt-10 items-center justify-center'>
                    <Form.Item
                        label="Doctor name"
                        name="doctorId"
                        // rules={[{ required: true, message: 'Please select doctor!' }]}
                        className='w-[500px] mr-4'
                    >
                        <Select
                            showSearch
                            placeholder="Search doctor"
                            optionFilterProp="children"
                            title='hello'
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={doctors}
                            size='large'
                            disabled={user?.role?.name === "Doctor"}
                            onChange={handleOnChangeDoctor}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Select Date"
                        name="date"
                        rules={[{ required: true, message: 'Please select a date!' }]}
                    >
                        <DatePicker
                            size='large'
                            onChange={handleOnChangeDate}
                            placeholder='Select booking date'
                        // defaultChecked={}
                        />
                    </Form.Item>
                </div>

                <Table columns={[
                    {
                        title: 'Name',
                        dataIndex: ['patient', 'name'],
                        key: 'name',
                    },
                    {
                        title: 'Email',
                        dataIndex: ['patient', 'email'],
                        key: 'email',
                    },
                    {
                        title: 'Birthday',
                        dataIndex: ['patient', 'birthday'],
                        key: 'birthday',
                    },
                    {
                        title: 'Phone Number',
                        dataIndex: ['patient', 'phoneNumber'],
                        key: 'phoneNumber',
                    },
                    {
                        title: 'Gender',
                        dataIndex: ['patient', 'gender', 'name'],
                        key: 'name',
                    },
                    {
                        title: 'Reason',
                        dataIndex: 'reason',
                        key: 'reason',
                    },
                    {
                        title: 'Booking date',
                        dataIndex: 'date',
                        key: 'date',
                    },
                    {
                        title: 'Booking Time',
                        dataIndex: ['time', 'name'],
                        key: 'name',
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (_, record) => {
                            return (
                                <Space size="middle">
                                    <Button onClick={() => handleConfirm(record)}>Confirm</Button>
                                    {/* <Button onClick={() => handleDelete(record)} type="primary" danger>Delete</Button> */}
                                </Space>)
                        }
                    },
                ]} dataSource={patients} />
            </div>
        </div>
    );
};

export default PatientManagement;
