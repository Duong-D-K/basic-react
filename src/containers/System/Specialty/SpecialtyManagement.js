import { useEffect, useState } from 'react';
import { Button, Table, Space, Image } from 'antd';
import { toast } from "react-toastify";
import { UserAddOutlined } from '@ant-design/icons';


import EditSpecialtyModal from './EditSpecialtyModal';
import { createSpecialty, getAllSpecialties, updateSpecialty, deleteSpecialty } from '../../../services/specialties.service';


const SpecialtyManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setselectedSpecialty] = useState(null);
    const [modalType, setModalType] = useState('create');

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                const response = await getAllSpecialties();

                setSpecialties(response.data);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };

        fetchSpecialties();
    }, []);

    const showModal = () => {
        setOpenModal(true);
    };

    const handleOk = async (values) => {
        console.log(values);

        let response;
        try {
            if (values.id) {
                response = await updateSpecialty(values);
            } else {
                response = await createSpecialty(values);
            }

            handleCancel();

            toast.success(response.data);

            const newSpecialties = await getAllSpecialties();

            setSpecialties(newSpecialties.data);
        } catch (error) {
            console.error('Error adding specialty:', error);
            alert('Error add new specialty. Please try again.');
        }
    }

    const handleCancel = () => {
        setOpenModal(false);
    };

    const handleEdit = (record) => {
        setselectedSpecialty(record);
        setModalType('edit');
        showModal();
    };

    const handleDelete = async (record) => {
        try {
            const response = await deleteSpecialty(record.id);
            toast.success(response.data);

            setSpecialties(specialties.filter((specialty) => specialty.id !== record.id));
        } catch (error) {
            console.error('Error deleting specialty:', error);
            alert('Error deleting specialty. Please try again.');
        }
    };

    return (
        <div className="specialty-container container-fluid">
            {openModal &&
                <EditSpecialtyModal
                    type={modalType}
                    open={openModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    specialty={selectedSpecialty}
                />
            }
            <div className="title text-center">
                <p className=' font-bold text-3xl'>Specialties Management</p>
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
            <Table
                columns={[
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
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
                            return <p>{contentMarkdown.substring(0, 50)}</p>
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
                ]}
                dataSource={specialties}
            />
        </div>
    );
};

export default SpecialtyManagement;