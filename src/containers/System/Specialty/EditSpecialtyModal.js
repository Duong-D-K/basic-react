
import { Button, Form, Input, Modal, Upload, Image } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';

import { getBase64 } from "../../../components/getBase64";
import 'react-toastify/dist/ReactToastify.css';


const mdParser = new MarkdownIt();

const EditSpecialtyModal = ({ open, type, onOk, onCancel, specialty }) => {
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const onFinish = (values) => {
        console.log()
        values.id = type === 'edit' ? specialty?.id : null;

        if (fileList.length > 0) {
            values.image = fileList[0]?.thumbUrl || specialty?.image;
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
            setContentMarkdown(specialty?.contentMarkdown);
            setContentHTML(specialty?.contentHTML);

            if (specialty.image) {
                setFileList([{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: specialty.image,
                }]);
            } if (specialty.image === 'data:image/jpeg;base64,') {
                setFileList([])
            }
        }
    }, [type, specialty]);

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
                <p className="text-center font-bold text-xl mb-3">Edit Specialty Information</p>
                :
                <p className="text-center font-bold text-xl mb-3">Create Specialty Information</p>
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
                <div className="flex mb-2">
                    <Form.Item
                        label="Specialty name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your specialty name!' }]}
                        className="flex-1"
                        initialValue={type === 'edit' ? specialty?.name : ""}
                    >
                        <Input />
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

export default EditSpecialtyModal;
