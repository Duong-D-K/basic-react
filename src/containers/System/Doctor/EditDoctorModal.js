
import { Button, Select, Form, Input, Modal, Upload, Image } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

import { getAllGenders, getAllPayments, getAllPositions, getAllPrices, getAllRoles } from "../../../services/allcodes.service";
import { getBase64 } from "../../../components/getBase64";
import 'react-toastify/dist/ReactToastify.css';
import { getAllSpecialties } from "../../../services/specialties.service";
import { getAllClinics } from "../../../services/clinics.service";

const { TextArea } = Input;

const mdParser = new MarkdownIt();

const EditDoctorModal = ({ open, type, onOk, onCancel, doctor }) => {
    const [genders, setGenders] = useState([]);
    const [prices, setPrices] = useState([]);
    const [payments, setPayments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [positions, setPositions] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const onFinish = (values) => {
        values.id = type === 'edit' ? doctor?.id : null;

        if (fileList.length > 0) {
            values.image = fileList[0]?.thumbUrl || doctor?.image;
        } else {
            values.image = '';
        }
        values.contentHTML = contentHTML;
        values.contentMarkdown = contentMarkdown;
        onOk(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        getAllGenders()
            .then(response => {
                setGenders(response.data.map(item => ({
                    label: item.name,
                    value: item.id,
                })));
            })
            .catch(error => console.error('Error:', error));

        getAllPrices()
            .then(response => {
                setPrices(response.data.map(item => ({
                    label: item.name,
                    value: item.id,
                })));
            })
            .catch(error => console.error('Error:', error));

        getAllPayments()
            .then(response => {
                setPayments(response.data.map(item => ({
                    label: item.name,
                    value: item.id,
                })));
            })
            .catch(error => console.error('Error:', error));

        getAllRoles()
            .then(response => {
                setRoles(response.data.map(item => ({
                    label: item.name,
                    value: item.id,
                })));
            })
            .catch(error => console.error('Error:', error));

        getAllPositions()
            .then(response => {
                setPositions(response.data.map(item => ({
                    label: item.name,
                    value: item.id,
                })));
            })
            .catch(error => console.error('Error:', error));

        getAllSpecialties()
            .then(response => {
                setSpecialties(response.data.map(item => ({
                    label: item.name,
                    value: item.id,
                })));
            })
            .catch(error => console.error('Error:', error));

        getAllClinics()
            .then(response => {
                setClinics(response.data.map(item => ({
                    label: item.name,
                    value: item.id,
                })));
            })
            .catch(error => console.error('Error:', error));

        if (type === 'edit') {
            setContentMarkdown(doctor?.contentMarkdown);
            setContentHTML(doctor?.contentHTML);

            if (doctor.image) {
                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: doctor.image,
                }]);
            } if (doctor.image === 'data:image/jpeg;base64,') {
                setFileList([])
            }
        }
    }, [type, doctor]);

    const handlePreviewImage = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChangeImage = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleChangeMarkdown = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={type === "edit" ?
                <p className="text-center font-bold text-xl mb-3">Edit Doctor Information</p>
                :
                <p className="text-center font-bold text-xl mb-3">Create Doctor Information</p>
            }
            width={1800}
            footer={null}
            centered
        >
            <Form
                name="basic"
                style={{ maxWidth: 1800 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="flex-initial w-full"
            >
                <div className="flex">
                    <Form.Item
                        label="Username"
                        name="name"
                        rules={[{ required: true, message: 'Please input your fullname!' }]}
                        className="flex-1"
                        initialValue={type === 'edit' ? doctor?.name : ""}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        className="flex-1"
                        initialValue={type === 'edit' ? doctor?.password : ""}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                        className="flex-1"
                        initialValue={type === 'edit' ? doctor?.email : ""}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                        width={300}
                        className="flex-1"
                        initialValue={type === 'edit' ? doctor?.phoneNumber : ""}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true, message: 'Please input your gender!' }]}
                        className="flex-1"
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
                <div className="flex">
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                        className="flex-1"
                        initialValue={type === 'edit' ? doctor?.price?.id : undefined}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={prices}
                        />
                    </Form.Item>
                    <Form.Item
                        className="flex-1"
                        label="Payment"
                        name="payment"
                        rules={[{ required: true, message: 'Please input your payment!' }]}
                        initialValue={type === 'edit' ? doctor?.payment?.id : undefined}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={payments}
                        />
                    </Form.Item>
                    <Form.Item
                        className="flex-1"
                        label="Position"
                        name="position"
                        rules={[{ required: true, message: 'Please input your position!' }]}
                        initialValue={type === 'edit' ? doctor?.position?.id : undefined}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={positions}
                        />

                    </Form.Item>
                    <Form.Item
                        className="flex-1"
                        label="Role"
                        name="role"
                        rules={[{ required: true, message: 'Please input your role!' }]}
                        initialValue={type === 'edit' ? doctor?.role?.id : undefined}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={roles}
                        />
                    </Form.Item>
                    <Form.Item
                        className="flex-1"
                        label="Specialty"
                        name="specialty"
                        rules={[{ required: true, message: 'Please input your specialty!' }]}
                        initialValue={type === 'edit' ? doctor?.specialty?.id : undefined}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={specialties}
                        />
                    </Form.Item>
                    <Form.Item
                        className="flex-1"
                        label="Clinic"
                        name="clinic"
                        rules={[{ required: true, message: 'Please input your clinic!' }]}
                        initialValue={type === 'edit' ? doctor?.clinic?.id : undefined}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={clinics}
                        />
                    </Form.Item>
                </div>
                <div className="flex">
                    <Form.Item
                        label="Introduction"
                        name="introduction"
                        rules={[{ required: true, message: 'Please input your introduction!' }]}
                        className="flex-1"
                        initialValue={type === 'edit' ? doctor?.introduction : ""}
                    >
                        <TextArea rows={4} count={{ show: true, max: 300 }} width={1000} />
                    </Form.Item>
                    <Form.Item
                        label="Note"
                        name="note"
                        rules={[{ required: true, message: 'Please input your note!' }]}
                        className="flex-1"
                        initialValue={type === 'edit' ? doctor?.note : ""}
                    >
                        <TextArea rows={4} count={{ show: true, max: 300 }} />
                    </Form.Item>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreviewImage}
                        onChange={handleChangeImage}
                        className="ml-2"
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{ display: 'none' }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </div>
                <div>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleChangeMarkdown}
                        value={contentMarkdown}
                    />
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
    );
};

export default EditDoctorModal;
