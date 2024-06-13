import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { login } from '../../services/systems.service';
import useAuthStore from '../../store/useAuthStore';

const Login = () => {
    const navigate = useNavigate();
    const logIn = useAuthStore((state) => state.logIn);

    const onFinish = async (values) => {
        try {
            const res = await login({ email: values.email, password: values.password });

            if (Array.isArray(res.data) && res.data.length === 0) {
                alert("Email or password is incorrect.");
            } else if (res.data) {
                logIn(res.data[0]);
                navigate(`/system/${res.data[0].id}`);
            } else {
                console.log("Invalid response from server.");
            }
        } catch (error) {
            console.error("Error handle login:", error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="bg-sky-50">
            <div className='p-3 cursor-pointer hover:text-rose-300' onClick={() => { navigate('/home') }}>
                <ArrowLeftOutlined />
                <span> Return to the home page.</span>
            </div>
            <div className='flex justify-center items-center h-screen'>
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        {/* <span className={doctor ? "hidden" : "bg-red-400 mt-2"}>Email or password is incorrect.</span> */}
                        {/* <Form.Item
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}
                        <Form.Item className='flex justify-center'>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
