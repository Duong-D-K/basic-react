import React, { useEffect, useState } from 'react';
import { Button, Table, Space, Image } from 'antd';
import { toast } from "react-toastify";
import { UserAddOutlined } from '@ant-design/icons';
import { createClinic, deleteClinic, getAllClinics, updateClinic } from '../../../services/clinics.service';
import EditClinicModal from './EditClinicModal';


const ClinicManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [clinics, setClinics] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const [modalType, setModalType] = useState('create');

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await getAllClinics();

                setClinics(response.data);
            } catch (error) {
                console.error('Error fetching clinics:', error);
            }
        };

        fetchClinics();
    }, []);

    const showModal = () => {
        setOpenModal(true);
    };

    const handleOk = async (values) => {
        let response;
        try {
            if (values.id) {
                response = await updateClinic(values);
            } else {
                response = await createClinic(values);
            }

            handleCancel();

            toast.success(response.data);

            const newClinics = await getAllClinics();

            setClinics(newClinics.data);
        } catch (error) {
            console.error('Error adding clinic:', error);
            alert('Error add new clinic. Please try again.');
        }
    }

    const handleCancel = () => {
        setOpenModal(false);
    };

    const handleEdit = (record) => {
        setSelectedClinic(record);
        setModalType('edit');
        showModal();
    };

    const handleDelete = async (record) => {
        try {
            const response = await deleteClinic(record.id);
            toast.success(response.data);

            setClinics(clinics.filter((clinic) => clinic.id !== record.id));
        } catch (error) {
            console.error('Error deleting clinic:', error);
            alert('Error deleting clinic. Please try again.');
        }
    };

    return (
        <div className="clinic-container container-fluid">
            {openModal &&
                <EditClinicModal
                    type={modalType}
                    open={openModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    clinic={selectedClinic}
                />
            }
            <div className="title text-center">
                <p className=' font-bold text-3xl'>Clinics Management</p>
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
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
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
                {
                    title: 'Content Markdown',
                    dataIndex: 'contentMarkdown',
                    key: 'contentMarkdown',
                    render: (contentMarkdown) => {
                        return <p>{contentMarkdown.substring(0, 15)}</p>
                    }
                },
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
            ]} dataSource={clinics} />
        </div>
    );
};

export default ClinicManagement;