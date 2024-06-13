import React, { useEffect, useState } from 'react';
import { Image, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getAllClinics } from '../../../services/clinics.service';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
const ListClinics = () => {
    const [clinics, setClinics] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    const navigate = useNavigate();

    const { Search } = Input;


    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const response = await getAllClinics();

                setClinics(response.data);
                setFilteredDoctors(response.data);
            } catch (error) {
                console.error('Error fetching clinics:', error);
            }
        };

        fetchClinics();
    }, []);

    const handleViewClinic = (clinic) => {
        navigate(`/clinics/${clinic.id}`)
    }

    const onSearch = (value) => {
        const searchValue = value.toLowerCase();
        const filteredList = clinics.filter(doctor =>
            doctor.name.toLowerCase().includes(searchValue)
        );
        setFilteredDoctors(filteredList);
    };
    return (
        <div>
            <HomeHeader isShowBanner={false} />
            <div className=' ml-0 mr0 md:ml-48 md:mr-48'>
                <div className=' pl-6 pt-6 flex justify-between'>
                    <span className=' font-bold text-3xl'>List of clinics</span>
                    <Search placeholder="Search doctor" onSearch={onSearch} style={{ width: 400 }} className=' mb-5' />
                </div>
                <div className=' mt-10'>
                    {filteredDoctors && filteredDoctors.map(clinic => {
                        return (
                            <div className='cursor-pointer' onClick={() => handleViewClinic(clinic)}>
                                <div className=' flex'>
                                    <div>
                                        <Image preview={false} src={clinic.image} width={100} className='rounded-lg' />
                                    </div>
                                    <div className='ml-3'>
                                        <span className="block"> {clinic.name}</span>
                                        <span className="block">{clinic.address}</span>
                                    </div>
                                </div>
                                <hr className="border-t border-gray-300 my-2 w-full" />
                            </div>
                        )
                    })}
                </div>
            </div>
            <HomeFooter />
        </div>
    );
};

export default ListClinics;