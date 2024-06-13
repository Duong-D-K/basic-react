import React, { useEffect, useState } from 'react';
import { Image, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';
import { getAllSpecialties } from '../../../services/specialties.service';

const ListSpecialties = () => {
    const [specialties, setSpecialties] = useState([]);
    const navigate = useNavigate();
    const { Search } = Input;

    const [filteredDoctors, setFilteredDoctors] = useState([]);


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getAllSpecialties();

                setSpecialties(response.data);
                setFilteredDoctors(response.data);
            } catch (error) {
                console.error('Error fetching specialties:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleViewDoctor = (specialty) => {
        navigate(`/specialties/${specialty.id}`)
    }

    const onSearch = (value) => {
        const searchValue = value.toLowerCase();
        const filteredList = specialties.filter(doctor =>
            doctor.name.toLowerCase().includes(searchValue)
        );
        setFilteredDoctors(filteredList);
    };

    return (
        <div>

            <HomeHeader isShowBanner={false} />
            <div className=' ml-0 mr0 md:ml-48 md:mr-48'>
                <div className=' pl-6 pt-6 flex justify-between'>
                    <span className=' font-bold text-3xl'>List of specialties</span>
                    <Search placeholder="Search doctor" onSearch={onSearch} style={{ width: 400 }} className=' mb-5' />
                </div>
                <div className=' mt-10'>
                    {filteredDoctors && filteredDoctors.map(specialty => {
                        return (
                            <div className='flex flex-col cursor-pointer' onClick={() => handleViewDoctor(specialty)}>
                                <div className='flex'>
                                    <div>
                                        <Image preview={false} src={specialty.image} width={100} className='rounded-lg' />
                                    </div>
                                    <div className='ml-3 flex items-center justify-center'>
                                        <span className="block">{specialty.name}</span>
                                    </div>
                                </div>
                                <hr className="border-t  border-gray-300 w-full" />
                            </div>

                        )
                    })}
                </div>
            </div>
            <HomeFooter />
        </div>
    );
};

export default ListSpecialties;