import React from 'react';
import { Menu } from 'antd';

const adminMenu = [
    {
        key: 'doctor',
        label: 'Doctors',
        children: [
            { key: 'doctor-management', label: "Doctors' Information Management" },
            { key: 'schedule-management', label: "Doctors' Schedules Management" },
            { key: 'patient-management', label: "Doctors' Patients Management" },
        ],
    },
    {
        key: 'clinic',
        label: "Clinics",
        children: [
            { key: 'clinic-management', label: "Clinics' Management" },
        ],
    },
    {
        key: 'specialty',
        label: "Specialties",
        children: [
            { key: 'specialty-management', label: "Specialties' Management" },
        ],
    },
    // {
    //     key: 'handbook',
    //     label: "Handbooks",
    //     children: [
    //         { key: 'handbook-management', label: "Handbooks' Management" },
    //     ],
    // },
];

export const doctorMenu = [
    {
        key: 'doctor',
        label: 'Doctors',
        children: [
            { key: 'schedule-management', label: "Doctors' Schedules Management" },
            { key: 'patient-management', label: "Doctors' Patients Management" },
        ],
    }
];
const Navigator = ({ onClick, user }) => {
    console.log(user.role.name)
    return (
        <div className="flex items-center justify-between">
            <Menu onClick={({ key }) => onClick(key)} mode="horizontal" items={user?.role?.name === 'Admin' ? adminMenu : doctorMenu} className="w-[600px]" />
        </div>
    );
};

export default Navigator;
