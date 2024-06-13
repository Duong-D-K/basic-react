import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import Navigator from '../../components/Navigator';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { LogoutOutlined } from '@ant-design/icons';

const Header = () => {
    // const { user } = useUser();
    const navigate = useNavigate();

    const { user, logOut } = useAuthStore();

    const handleLogout = () => {
        logOut();
    }

    const onClick = (key) => {
        navigate(`/system/${user.id}/${key}`);
    }

    return (
        <div className="flex items-center justify-between">
            <Navigator onClick={onClick} user={user} />
            {/* <UserButton /> */}
            <div className=' mr-2 flex' onClick={handleLogout}>
                <div>
                    <span>Welcome, {user.name}</span>
                </div>
                <div className='hover:bg-sky-100 '>

                    <LogoutOutlined className=' ml-2' />
                </div>


            </div>
        </div>
    );
};

export default Header;
