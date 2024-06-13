import React, { useEffect, useState } from 'react';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import { getAllDoctors } from '../../../services/doctors.service';
import { Image, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const ListDoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const navigate = useNavigate();
    const { Search } = Input;

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getAllDoctors();
                setDoctors(response.data);
                setFilteredDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleViewDoctor = (doctor) => {
        navigate(`/doctors/${doctor.id}`);
    };

    const onSearch = (value) => {
        const searchValue = value.toLowerCase();
        const filteredList = doctors.filter(doctor =>
            doctor.name.toLowerCase().includes(searchValue)
        );
        setFilteredDoctors(filteredList);
    };

    return (
        <div>
            <HomeHeader isShowBanner={false} />
            <div className=' ml-0 mr0 md:ml-48 md:mr-48'>
                <div className=' pl-6 pt-6 flex justify-between'>
                    <span className=' font-bold text-3xl'>List of doctors</span>
                    <Search placeholder="Search doctor" onSearch={onSearch} style={{ width: 400 }} className=' mb-5' />
                </div>
                <div className=' mt-10'>
                    {filteredDoctors && filteredDoctors.map(doctor => (
                        <div key={doctor.id} className='cursor-pointer' onClick={() => handleViewDoctor(doctor)}>
                            <div className=' flex'>
                                <div>
                                    <Image preview={false} src={doctor.image} width={100} className='rounded-lg' />
                                </div>
                                <div className='ml-3'>
                                    <span className="block">{doctor.position.name}, {doctor.name}</span>
                                    <span className="block">{doctor.specialty.name}</span>
                                </div>
                            </div>
                            <hr className="border-t border-gray-300 my-2 w-full" />
                        </div>
                    ))}
                </div>
            </div>
            <HomeFooter />
        </div>
    );
};

export default ListDoctor;
