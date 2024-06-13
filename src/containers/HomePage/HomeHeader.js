import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Menu, Drawer, Image, Button } from 'antd';

import { MenuOutlined } from "@ant-design/icons";

import { useState } from "react";
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Loader } from "lucide-react";

import bg_img from '../../assets/header-background.jpg';

const HomeHeader = ({ isShowBanner }) => {
    const [openMenu, setOpenMenu] = useState(false);

    const navigate = useNavigate();

    const returnHome = () => {
        navigate('/home')
    }

    const handleCloseMenu = () => {
        setOpenMenu(false);
    };

    const handleLogin = () => {
        navigate('/login')
    }

    const handleClick = (e) => {
        console.log('Menu item clicked:', e.key);
        navigate(`/${e.key}`)
        // switch (e.key) {
        //     case '1':
        //         console.log('Specialty clicked');
        //         break;
        //     case '2':
        //         console.log('Health Facility clicked');
        //         break;
        //     case '3':
        //         console.log('Doctor clicked');
        //         break;
        //     default:
        //         break;
        // }
    };

    return (
        <div className=" h-full bg-white">
            <div className="h-[60px] lg:hidden flex items-center">
                <div className=" text-xl flex items-center ml-1 mr-2">
                    <MenuOutlined className="" onClick={() => setOpenMenu(true)} />
                </div>
                <div className=" flex items-center">
                    <Image src={logo} className="" width={100} preview={false} onClick={returnHome} />

                </div>
            </div>
            <div className="hidden lg:block">
                <div className="flex items-center justify-between">
                    <div className="flex items-center pl-2 pt-1">
                        <Image src={logo} width={200} preview={false} className="Image" onClick={returnHome} />
                    </div>
                    <div className="flex items-center justify-center">
                        <Menu
                            mode={'horizontal'}
                            className=" bg-white text-base border-none w-[600px]"
                            onClick={handleClick}
                        >
                            <Menu.Item key="specialties">Specialty</Menu.Item>
                            <Menu.Item key="clinics">Health facility</Menu.Item>
                            <Menu.Item key="doctors">Doctor</Menu.Item>
                        </Menu>
                    </div>
                    <div className=" mr-2 cursor-pointer hover:bg-sky-100" onClick={handleLogin} >
                        {/* <ClerkLoading>
                            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                        </ClerkLoading>
                        <ClerkLoaded>
                            <SignedIn>
                                <UserButton forceRedirectUrl="/system" afterSignOutUrl="/" />
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal" forceRedirectUrl="/system" signUpForceRedirectUrl="/system">
                                    <Button type="none">
                                        Login
                                    </Button>
                                </SignInButton>
                            </SignedOut>
                        </ClerkLoaded> */}
                        <span>Login</span>
                    </div>
                </div>
            </div>

            <Drawer
                open={openMenu}
                onClose={handleCloseMenu}
                closable={false}
                placement="left"
                width={250}
            >
                <div className="w-full flex justify-center">
                    <Image src={logo} className="" width={150} height={40} preview={false} onClick={returnHome} />

                </div>

                <Menu
                    mode={'inline'}
                    className="Menu"
                    onClick={handleClick}
                >
                    <Menu.Item key="specialties">Specialty</Menu.Item>
                    <Menu.Item key="clinics">Health facility</Menu.Item>
                    <Menu.Item key="doctors">Doctor</Menu.Item>
                </Menu>
                <div className=" mr-2 cursor-pointer hover:bg-sky-100" onClick={handleLogin} >
                    <span>Login</span>
                </div>
            </Drawer>

            {
                isShowBanner &&
                <div className="home-header-banner bg-no-repeat bg-cover bg-center flex flex-col">
                    <Image src={bg_img} preview={false}></Image>
                    <div className="content-down">
                        <div className="options">
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default HomeHeader;