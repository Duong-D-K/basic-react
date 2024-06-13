import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/', // Địa chỉ server mặc định
    timeout: 10000, // Thời gian chờ mặc định (ms)
    headers: {
        'Content-Type': 'application/json', // Định dạng dữ liệu mặc định
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Token xác thực (nếu có)
    }
});

export default instance;