import React, { useEffect, useState } from 'react';
import { Button, Table, Space, Image } from 'antd';
import { toast } from "react-toastify";
import { UserAddOutlined } from '@ant-design/icons';

import EditDoctorModal from './EditDoctorModal';
import { createDoctor, deleteDoctor, getAllDoctors, updateDoctor } from '../../../services/doctors.service';

const DoctorManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalType, setModalType] = useState('create');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getAllDoctors();
                // console.table(response.data);

                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const showModal = () => {
        setOpenModal(true);
    };

    const handleOk = async (values) => {
        let response;
        try {
            if (values.id) {
                response = await updateDoctor(values);
            } else {
                delete values.id;
                response = await createDoctor(values);
            }

            handleCancel();

            toast.success(response.data);

            const newDoctors = await getAllDoctors();

            setDoctors(newDoctors.data);
        } catch (error) {
            console.error('Error adding doctor:', error);
            alert('Error add new doctor. Please try again.');
        }
    }

    const handleCancel = () => {
        setOpenModal(false);
    };

    const handleEdit = (record) => {
        setSelectedDoctor(record);
        setModalType('edit');
        showModal();
    };

    const handleDelete = async (record) => {
        try {
            const response = await deleteDoctor(record.id);
            toast.success(response.data);

            setDoctors(doctors.filter((doctor) => doctor.id !== record.id));
        } catch (error) {
            console.error('Error deleting doctor:', error);
            alert('Error deleting doctor. Please try again.');
        }
    };

    return (
        <div className="doctor-container container-fluid">
            {openModal &&
                <EditDoctorModal
                    type={modalType}
                    open={openModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    doctor={selectedDoctor}
                />
            }
            <div className="title text-center">
                <p className=' font-bold text-3xl'>Doctors Information Management</p>
            </div>
            <div className="mx-1 mb-3">
                <Button type="primary" onClick={() => {
                    setModalType('create');
                    showModal();
                }}>
                    <p>
                        Add New
                        <UserAddOutlined />
                    </p>
                </Button>
            </div>
            <Table columns={[
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                // {
                //     title: 'Email',
                //     dataIndex: 'email',
                //     key: 'email',
                // },
                {
                    title: 'Phone Number',
                    dataIndex: 'phoneNumber',
                    key: 'phoneNumber',
                },
                {
                    title: 'Introduction',
                    dataIndex: 'introduction',
                    key: 'introduction',
                    render: (introduction) => {
                        return <p>{introduction.substring(0, 15)}...</p>
                    }
                },
                {
                    title: 'Note',
                    dataIndex: 'note',
                    key: 'note',
                },
                {
                    title: 'Gender',
                    dataIndex: 'gender',
                    key: 'gender',
                    render: (gender) => { return gender.name },
                },
                {
                    title: 'Position',
                    dataIndex: 'position',
                    key: 'position',
                    render: (position) => { return position.name },
                },
                // {
                //     title: 'Role',
                //     dataIndex: 'role',
                //     key: 'role',
                //     render: (role) => { return role.name },
                // },
                {
                    title: 'Price',
                    dataIndex: 'price',
                    key: 'price',
                    render: (price) => { return price.name },
                },
                {
                    title: 'Payment',
                    dataIndex: 'payment',
                    key: 'payment',
                    render: (payment) => { return payment.name },
                },
                {
                    title: 'Specialty',
                    dataIndex: 'specialty',
                    key: 'specialty',
                    render: (specialty) => { return specialty.name },
                },
                {
                    title: 'Clinic',
                    dataIndex: 'clinic',
                    key: 'clinic',
                    render: (clinic) => { return clinic.name },
                },
                {
                    title: 'Image',
                    dataIndex: 'image',
                    key: 'image',
                    render: (image) => {
                        if (image === 'data:image/jpeg;base64,') {
                            return <p>No image</p>;
                        } else {
                            return <Image width={50} src={image} />;
                        }
                    },
                },
                // {
                //     title: 'Content Markdown',
                //     dataIndex: 'contentMarkdown',
                //     key: 'contentMarkdown',
                //     render: (contentMarkdown) => {
                //         return <p>{contentMarkdown.substring(0, 15)}</p>
                //     }
                // },
                {
                    title: 'Action',
                    key: 'action',
                    render: (_, record) => {
                        return (
                            <Space size="middle">
                                <Button onClick={() => handleEdit(record)}>Edit</Button>
                                <Button onClick={() => handleDelete(record)} type="primary" danger>Delete</Button>
                            </Space>)
                    }
                },
            ]} dataSource={doctors} />
        </div>
    );
};

export default DoctorManagement;