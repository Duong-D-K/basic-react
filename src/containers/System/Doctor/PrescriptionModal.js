import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Modal, Upload } from 'antd';

import { getBase64 } from "../../../components/getBase64";

const PrescriptionModal = ({ open, onOk, onCancel, email }) => {
    const [image, setImage] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const onFinish = async (values) => {
        if (image) {
            const base64Image = await getBase64(image.originFileObj);

            const formData = {
                ...values,
                image: base64Image,
            };
            onOk(formData);
        } else {
            onOk({
                ...values,
                image: null,
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj); // Corrected typo here
        }

        setPreviewImage(file.url || (file.preview));
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList }) => {
        if (fileList.length > 0) {
            setImage(fileList[0]);
        } else {
            setImage(null);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={<p className="text-center font-bold text-xl mb-3">Send Prescription</p>}
            width={900}
            footer={null}
            centered
        >
            <Form
                name="basic"
                style={{ maxWidth: 900 }}
                initialValues={{ email }} // Sử dụng initialValues để thiết lập giá trị ban đầu của email
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="flex-initial w-full mt-10"
            >
                <div className="flex flex-wrap">
                    <div className=' flex items-start'>
                        <label className=' mr-3'><span>Email:</span></label>
                        <Input defaultValue={email} disabled />
                    </div>
                    <Form.Item
                        label="Upload File"
                        name="image"
                        className="w-full md:w-1/2 px-2"
                        rules={[{ required: true, message: 'Please upload your file!' }]}
                    >
                        <div>
                            <Upload
                                listType="picture-card"
                                fileList={image ? [image] : []}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {image ? null :
                                    <>
                                        <button style={{ border: 0, background: 'none' }} type="button">
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </button>
                                    </>}
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
    );
};

export default PrescriptionModal;
