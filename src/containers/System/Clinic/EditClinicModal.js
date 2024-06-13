
import { Button, Form, Input, Modal, Upload, Image } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

import { getBase64 } from "../../../components/getBase64";
import 'react-toastify/dist/ReactToastify.css';

const mdParser = new MarkdownIt();

const EditClinicModal = ({ open, type, onOk, onCancel, clinic }) => {
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const onFinish = (values) => {
        values.id = type === 'edit' ? clinic?.id : null;

        if (fileList.length > 0) {
            values.image = fileList[0]?.thumbUrl || clinic?.image;
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
        if (type === 'edit') {
            setContentMarkdown(clinic?.contentMarkdown);
            setContentHTML(clinic?.contentHTML);

            if (clinic.image) {
                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: clinic.image,
                }]);
            } if (clinic.image === 'data:image/jpeg;base64,') {
                setFileList([])
            }
        }
    }, [type, clinic]);

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
                <p className="text-center font-bold text-xl mb-3">Edit Clinic Information</p>
                :
                <p className="text-center font-bold text-xl mb-3">Create Clinic Information</p>
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
                <div className=" flex">
                    <div className=" flex-col ">
                        <Form.Item
                            label="Clinic name"
                            name="name"
                            rules={[{ required: true, message: 'Please input clinic name!' }]}
                            className="flex-1"
                            initialValue={type === 'edit' ? clinic?.name : ""}
                        >
                            <Input className=" w-[400px]" />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                            width={300}
                            className="flex-1"
                            initialValue={type === 'edit' ? clinic?.address : ""}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className=" ml-5">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreviewImage}
                            onChange={handleChangeImage}
                            className=" mb-2"
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

export default EditClinicModal;
