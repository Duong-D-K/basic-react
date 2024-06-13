import { useEffect } from 'react'; // Import useEffect hook
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();

    useEffect(() => {
        if (!user) {
            navigate('/home');
        } else if (user.id) {
            navigate(`/system/${user.id}`);
        }
    }, [user, navigate]);

    return null;
};

export default Home;
